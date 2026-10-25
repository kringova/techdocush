// Offline content tooling only. Runtime reads the solutions stored in levels.mjs.
export const SHELF_TYPES = ['yarn', 'bowl', 'brush'];

export function validateShelfLevel(level) {
  if (!Number.isInteger(level.capacity) || level.capacity < 1 || level.capacity > 4 ||
      !Array.isArray(level.shelves) || level.shelves.length < 2 || level.shelves.length > 6) {
    throw new TypeError('Expected 2–6 shelves with capacity 1–4');
  }
  const counts = Object.fromEntries(SHELF_TYPES.map(type => [type, 0]));
  for (const shelf of level.shelves) {
    if (!Array.isArray(shelf) || shelf.length > level.capacity) throw new TypeError('Shelf exceeds capacity');
    for (const item of shelf) {
      if (!(item in counts)) throw new TypeError(`Unsupported shelf item: ${item}`);
      counts[item]++;
    }
  }
  if (Object.values(counts).some(count => count % level.capacity)) {
    throw new TypeError('Item counts must form complete homogeneous shelves');
  }
  return counts;
}

export function shelfSolved(shelves, capacity) {
  return shelves.every(shelf => !shelf.length ||
    (shelf.length === capacity && shelf.every(item => item === shelf[0])));
}

// Independent rules: return null for an illegal move, otherwise a new board.
export function shelfTransfer(shelves, capacity, from, to) {
  if (!Number.isInteger(from) || !Number.isInteger(to) || from === to ||
      !shelves[from]?.length || !shelves[to] || shelves[to].length >= capacity) return null;
  const item = shelves[from].at(-1);
  if (shelves[to].length && shelves[to].at(-1) !== item) return null;
  const next = shelves.map(shelf => [...shelf]);
  next[to].push(next[from].pop());
  return next;
}

const letters = { yarn: 'a', bowl: 'b', brush: 'c' };
const shelfKey = shelves => shelves.map(shelf => shelf.map(item => letters[item]).join('')).sort().join('|');
const typeOrders = [
  ['a', 'b', 'c'], ['a', 'c', 'b'], ['b', 'a', 'c'],
  ['b', 'c', 'a'], ['c', 'a', 'b'], ['c', 'b', 'a']
];

// Content identity ignores shelf order AND every global renaming of the three types.
export function shelfGeometryKey(level) {
  const variants = typeOrders.map(order => level.shelves.map(shelf =>
    shelf.map(item => order[SHELF_TYPES.indexOf(item)]).join('')).sort().join('|'));
  return `${level.capacity}:${variants.sort()[0]}`;
}

// Any final shelf can preserve only a homogeneous BOTTOM prefix of its original
// contents. A type with k full groups can retain prefixes on at most k shelves.
// Every other item must move at least once, so this is an admissible lower bound.
export function shelfLowerBound(shelves, capacity) {
  const counts = Object.fromEntries(SHELF_TYPES.map(type => [type, 0]));
  const prefixes = Object.fromEntries(SHELF_TYPES.map(type => [type, []]));
  let items = 0;
  for (const shelf of shelves) {
    for (const type of shelf) { counts[type]++; items++; }
    if (!shelf.length) continue;
    let length = 1;
    while (length < shelf.length && shelf[length] === shelf[0]) length++;
    prefixes[shelf[0]].push(length);
  }
  let retained = 0;
  for (const type of SHELF_TYPES) {
    prefixes[type].sort((a, b) => b - a);
    retained += prefixes[type].slice(0, counts[type] / capacity).reduce((sum, count) => sum + count, 0);
  }
  return items - retained;
}

export function shelfMetrics(level, solution = []) {
  const counts = validateShelfLevel(level);
  const runs = level.shelves.reduce((sum, shelf) => sum + shelf.filter((item, i) => !i || shelf[i - 1] !== item).length, 0);
  return {
    shelves: level.shelves.length, capacity: level.capacity,
    items: level.shelves.flat().length,
    groups: Object.fromEntries(SHELF_TYPES.map(type => [type, counts[type] / level.capacity])),
    filledGroups: level.shelves.flat().length / level.capacity,
    emptyShelves: level.shelves.filter(shelf => !shelf.length).length,
    mixedShelves: level.shelves.filter(shelf => new Set(shelf).size > 1).length,
    runs, buriedItems: level.shelves.reduce((sum, shelf) => sum + shelf.slice(0, -1).filter((item, i) => item !== shelf.at(-1)).length, 0),
    lowerBound: shelfLowerBound(level.shelves, level.capacity),
    solutionMoves: solution.length
  };
}

class Heap {
  items = [];
  // Prefer deeper nodes at equal f; this changes search order, not optimality.
  less(a, b) { return a.f < b.f || (a.f === b.f && a.g > b.g); }
  push(item) {
    const a = this.items; a.push(item); let at = a.length - 1;
    while (at) { const parent = (at - 1) >> 1; if (!this.less(a[at], a[parent])) break;
      [a[at], a[parent]] = [a[parent], a[at]]; at = parent; }
  }
  pop() {
    const a = this.items, first = a[0], last = a.pop();
    if (a.length) { a[0] = last; let at = 0;
      for (;;) { let next = at, left = at * 2 + 1, right = left + 1;
        if (left < a.length && this.less(a[left], a[next])) next = left;
        if (right < a.length && this.less(a[right], a[next])) next = right;
        if (next === at) break; [a[at], a[next]] = [a[next], a[at]]; at = next; }
    }
    return first;
  }
}

function replay(level, actions) {
  let board = level.shelves;
  for (const [from, to] of actions) {
    board = shelfTransfer(board, level.capacity, from, to);
    if (!board) throw new TypeError('Illegal constructive solution');
  }
  if (!shelfSolved(board, level.capacity)) throw new TypeError('Constructive solution does not solve the level');
}

// A* over every legal single-item transfer, quotienting interchangeable shelves.
// This reduction preserves legal moves and goals; no full/solved-shelf pruning.
// A budget may leave a legal incumbent, but never an invented optimality claim.
export function solveShelfLevel(level, { maxExpanded = 150_000, incumbent = null } = {}) {
  validateShelfLevel(level);
  if (!Number.isInteger(maxExpanded) || maxExpanded < 0) throw new TypeError('Invalid search budget');
  if (incumbent) replay(level, incumbent);
  let best = incumbent?.map(action => [...action]) ?? null;
  const initialBound = shelfLowerBound(level.shelves, level.capacity);
  const open = new Heap();
  const root = { board: level.shelves.map(shelf => [...shelf]), g: 0, f: initialBound, parent: null, action: null };
  open.push(root);
  const distance = new Map([[shelfKey(root.board), 0]]);
  let expanded = 0, complete = false, frontierBound = initialBound;
  const pathTo = node => { const path = []; while (node.parent) { path.push(node.action); node = node.parent; } return path.reverse(); };
  while (open.items.length) {
    const node = open.pop();
    if (distance.get(shelfKey(node.board)) !== node.g) continue;
    frontierBound = node.f;
    if (best && node.f >= best.length) { complete = true; break; }
    if (shelfSolved(node.board, level.capacity)) { best = pathTo(node); complete = true; break; }
    if (expanded >= maxExpanded) break;
    expanded++;
    const fromSeen = new Set();
    for (let from = 0; from < node.board.length; from++) {
      const source = node.board[from], sourceKey = source.join(',');
      if (!source.length || fromSeen.has(sourceKey)) continue;
      fromSeen.add(sourceKey);
      const toSeen = new Set();
      for (let to = 0; to < node.board.length; to++) {
        if (from === to) continue;
        const targetKey = node.board[to].join(',');
        if (toSeen.has(targetKey)) continue;
        toSeen.add(targetKey);
        const board = shelfTransfer(node.board, level.capacity, from, to);
        if (!board) continue;
        const g = node.g + 1, key = shelfKey(board);
        if ((distance.get(key) ?? Infinity) <= g) continue;
        const f = g + shelfLowerBound(board, level.capacity);
        if (best && f >= best.length) continue;
        distance.set(key, g); open.push({ board, g, f, parent: node, action: [from, to] });
      }
    }
  }
  if (!open.items.length && expanded < maxExpanded) complete = true;
  return {
    solvable: best ? true : complete ? false : null,
    solution: best, moves: best?.length ?? null, minMoves: best && complete ? best.length : null,
    proof: {
      method: 'A*; single-item rules; shelf-permutation quotient; admissible retained-bottom-prefix bound',
      complete, optimal: !!best && complete,
      lowerBound: best && complete ? best.length : complete ? null : Math.min(frontierBound, best?.length ?? Infinity),
      upperBound: best?.length ?? null, expandedStates: expanded, discoveredStates: distance.size,
      maxExpanded, reason: complete ? (best ? 'optimal-frontier-bound' : 'state-space-exhausted') : 'expansion-budget'
    }
  };
}
