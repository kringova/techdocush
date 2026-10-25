import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { SHELF_LEVELS } from '../dist/shelves/levels.mjs';
import { SHELF_TYPES, validateShelfLevel, shelfSolved, shelfTransfer, shelfGeometryKey,
  shelfLowerBound, shelfMetrics, solveShelfLevel } from '../dist/shelves/solver.mjs';
import { SHELF_LEVELS as productionLevels, createShelfGame, transfer, solved } from '../dist/shelves/engine.mjs';

// Deliberately separate from solver.mjs: unheuristic breadth-first search with
// its own move rules. Only interchangeable shelf positions are quotiented.
function referenceBFS(level, budget = 250_000) {
  const win = board => board.every(shelf => shelf.length === 0 ||
    (shelf.length === level.capacity && new Set(shelf).size === 1));
  const key = board => board.map(shelf => JSON.stringify(shelf)).sort().join('|');
  const queue = [{ board: level.shelves.map(shelf => [...shelf]), depth: 0 }];
  const seen = new Set([key(queue[0].board)]);
  for (let cursor = 0; cursor < queue.length && cursor < budget; cursor++) {
    const { board, depth } = queue[cursor];
    if (win(board)) return depth;
    for (let from = 0; from < board.length; from++) for (let to = 0; to < board.length; to++) {
      if (from === to || !board[from].length || board[to].length === level.capacity ||
        (board[to].length && board[to][board[to].length - 1] !== board[from][board[from].length - 1])) continue;
      const next = board.map(shelf => shelf.slice()); next[to].push(next[from].pop());
      const signature = key(next);
      if (!seen.has(signature)) { seen.add(signature); queue.push({ board: next, depth: depth + 1 }); }
    }
  }
  if (queue.length > budget) throw new Error('Reference BFS budget exhausted');
  return null;
}

test('50 shelf levels are content-distinct under every shelf permutation and global type renaming', () => {
  assert.equal(SHELF_LEVELS.length, 50);
  assert.equal(new Set(SHELF_LEVELS.map(shelfGeometryKey)).size, 50);
  for (const level of SHELF_LEVELS) {
    validateShelfLevel(level);
    assert.ok(level.capacity === 3 || level.capacity === 4);
    assert.ok(level.shelves.length >= 4 && level.shelves.length <= 6);
    assert.ok(SHELF_TYPES.every(type => level.shelves.flat().includes(type)));
    assert.equal(level.shelves.filter(shelf => !shelf.length).length, 1);
    assert.ok(level.shelves.filter(shelf => shelf.length).every(shelf => shelf.length === level.capacity));
    assert.equal(shelfSolved(level.shelves, level.capacity), false);
    const renamed = { ...level, shelves: level.shelves.toReversed().map(shelf => shelf.map(type =>
      ({ yarn: 'bowl', bowl: 'brush', brush: 'yarn' })[type])) };
    assert.equal(shelfGeometryKey(renamed), shelfGeometryKey(level));
  }
});

test('the first layout preserves the exact existing tutorial and state-zero interaction', () => {
  const expected = { name: 'Первый порядок', capacity: 3, shelves: [
    ['yarn', 'yarn', 'bowl'], ['bowl', 'bowl', 'yarn'], ['brush', 'brush', 'brush'], []
  ] };
  for (const field of ['name', 'capacity', 'shelves']) assert.deepEqual(SHELF_LEVELS[0][field], expected[field]);
  const state = createShelfGame(0), before = JSON.stringify(state);
  assert.equal(transfer(state, 0, 1), state);
  const next = transfer(state, 0, 3);
  assert.deepEqual(next.shelves, [['yarn', 'yarn'], ['bowl', 'bowl', 'yarn'], ['brush', 'brush', 'brush'], ['bowl']]);
  assert.equal(JSON.stringify(state), before);
  assert.equal(SHELF_LEVELS[0].solution.length, 3);
});

test('every stored solution replays identically through independent and production transfer rules', () => {
  const snapshot = JSON.stringify(SHELF_LEVELS);
  for (const level of SHELF_LEVELS) {
    let board = level.shelves;
    // Production transfer reads only the selected capacity; works before and
    // after the new content import without mutating its registry or app state.
    const index = productionLevels.findIndex(candidate => candidate.capacity === level.capacity);
    assert.ok(index >= 0);
    let state = { index, shelves: board.map(shelf => [...shelf]), moves: 0, won: false };
    const inventory = level.shelves.flat().sort();
    for (let i = 0; i < level.solution.length; i++) {
      const action = level.solution[i], oldBoard = JSON.stringify(board), oldState = JSON.stringify(state);
      assert.equal(action.length, 2);
      const next = shelfTransfer(board, level.capacity, ...action);
      assert.ok(next, `Illegal stored move ${i + 1} in ${level.name}`);
      const nextState = transfer(state, ...action);
      assert.notEqual(nextState, state);
      assert.deepEqual(nextState.shelves, next);
      assert.equal(nextState.moves, i + 1);
      assert.equal(JSON.stringify(board), oldBoard);
      assert.equal(JSON.stringify(state), oldState);
      assert.deepEqual(next.flat().sort(), inventory);
      assert.ok(next.every(shelf => shelf.length <= level.capacity));
      assert.equal(solved(next, level.capacity), shelfSolved(next, level.capacity));
      if (i < level.solution.length - 1) assert.equal(nextState.won, false, 'No moves after an early victory');
      board = next; state = nextState;
    }
    assert.equal(state.won, true);
    assert.equal(shelfSolved(board, level.capacity), true);
    assert.deepEqual(level.metrics, { ...shelfMetrics(level, level.solution), band: level.metrics.band, optimalMoves: level.metrics.optimalMoves });
  }
  assert.equal(JSON.stringify(SHELF_LEVELS), snapshot);
});

test('later levels have four or five filled groups and one empty shelf, with repeated full groups legal', () => {
  for (let index = 0; index < 50; index++) {
    const level = SHELF_LEVELS[index];
    const expectedShelves = index < 20 ? 4 : index < 35 ? 5 : 6;
    assert.equal(level.shelves.length, expectedShelves);
    assert.equal(level.metrics.filledGroups, expectedShelves - 1);
    const counts = Object.values(level.metrics.groups).sort();
    assert.deepEqual(counts, expectedShelves === 4 ? [1, 1, 1] : expectedShelves === 5 ? [1, 1, 2] : [1, 2, 2]);
    if (index < 10) assert.equal(level.capacity, 3);
    else if (index < 20) assert.equal(level.capacity, 4);
    if (index >= 35) {
      assert.ok(level.solution.length >= 10);
      assert.equal(level.metrics.mixedShelves, 5, 'All five occupied late shelves are genuinely mixed');
      assert.equal(new Set(level.solution.flat()).size, 6, 'The solution actually uses all six shelves');
    }
  }
  const repeated = [['yarn', 'yarn', 'yarn'], ['yarn', 'yarn', 'yarn'],
    ['bowl', 'bowl', 'bowl'], ['bowl', 'bowl', 'bowl'], ['brush', 'brush', 'brush'], []];
  assert.equal(shelfSolved(repeated, 3), true);
  assert.equal(solved(repeated, 3), true);
  const partial = repeated.map(shelf => [...shelf]); partial[0].pop(); partial[5].push('yarn');
  assert.equal(shelfSolved(partial, 3), false, 'Homogeneous partial shelves are not solved');
});

test('independent state-BFS confirms early optimality and the retained-prefix lower bound', () => {
  const fixtures = [...SHELF_LEVELS.slice(0, 20), {
    capacity: 2, shelves: [['yarn', 'bowl'], ['bowl', 'yarn'], ['yarn', 'yarn'], ['brush', 'brush'], []]
  }];
  for (const level of fixtures) {
    const exact = referenceBFS(level);
    assert.ok(exact !== null);
    assert.ok(shelfLowerBound(level.shelves, level.capacity) <= exact);
    const result = solveShelfLevel(level);
    assert.equal(result.minMoves, exact);
    assert.equal(result.proof.complete, true);
    assert.equal(result.proof.optimal, true);
  }
});

test('offline A* verifies all 50 stored solutions and reports honest optimal bounds', () => {
  for (const level of SHELF_LEVELS) {
    const result = solveShelfLevel(level, { maxExpanded: 100_000, incumbent: level.solution });
    assert.equal(result.solvable, true);
    assert.equal(result.proof.complete, true);
    assert.equal(result.proof.optimal, true);
    assert.equal(result.minMoves, level.solution.length);
    assert.equal(result.proof.lowerBound, result.proof.upperBound);
    assert.equal(level.proof.optimal, true);
    assert.equal(level.proof.upperBound, level.solution.length);
    assert.equal(level.metrics.optimalMoves, level.solution.length);
  }
});

test('budget limits preserve legal incumbent solutions without false optimality or impossibility', () => {
  const level = SHELF_LEVELS[0]; // h=2, true distance=3.
  const unknown = solveShelfLevel(level, { maxExpanded: 0 });
  assert.equal(unknown.solvable, null);
  assert.equal(unknown.solution, null);
  assert.equal(unknown.minMoves, null);
  assert.equal(unknown.proof.complete, false);
  const bounded = solveShelfLevel(level, { maxExpanded: 0, incumbent: level.solution });
  assert.equal(bounded.solvable, true);
  assert.equal(bounded.proof.optimal, false);
  assert.equal(bounded.minMoves, null);
  assert.equal(bounded.proof.lowerBound, 2);
  assert.equal(bounded.proof.upperBound, 3);
  assert.deepEqual(bounded.solution, level.solution);
  const noRoute = solveShelfLevel({ capacity: 2, shelves: [['yarn', 'bowl'], ['bowl', 'yarn']] });
  assert.equal(noRoute.solvable, false);
  assert.equal(noRoute.proof.complete, true);
  assert.equal(noRoute.proof.optimal, false);
  assert.throws(() => solveShelfLevel(level, { incumbent: [[0, 1]] }), /Illegal constructive/);
});

test('rightmost-item compatibility, capacity, validation and immutability have explicit regressions', () => {
  const board = [['yarn', 'bowl'], ['brush'], []], snapshot = JSON.stringify(board);
  assert.equal(shelfTransfer(board, 2, 0, 1), null);
  assert.equal(shelfTransfer(board, 2, 0, 0), null);
  assert.equal(shelfTransfer(board, 2, 2, 1), null);
  const next = shelfTransfer(board, 2, 0, 2);
  assert.deepEqual(next, [['yarn'], ['brush'], ['bowl']]);
  assert.equal(JSON.stringify(board), snapshot);
  assert.equal(shelfTransfer(next, 2, 0, 2), null);
  assert.throws(() => validateShelfLevel({ capacity: 3, shelves: [['yarn'], []] }), /counts/);
  assert.throws(() => validateShelfLevel({ capacity: 2, shelves: [['fish', 'fish'], []] }), /Unsupported/);
  assert.throws(() => validateShelfLevel({ capacity: 5, shelves: [[], []] }), /capacity/);
});

test('runtime data is literal and imports neither the offline solver nor authoring tool', async () => {
  const text = await readFile(new URL('../dist/shelves/levels.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(text, /\bimport\s|solveShelfLevel\s*\(|Math\.random/);
});
