// One anchored ball, one OPEN thread. Coordinates are percentages of a square.
export const YARN_ANCHOR = 0;
export const YARN_POINT_SPACING = 9;
const chain = count => Array.from({length:count - 1}, (_, i) => [i, i + 1]);
const points = rows => rows.map(([x,y]) => ({x,y}));
const level = (name, rows, moves, initialCrossings) => ({
  name, anchor:YARN_ANCHOR,
  points:points(rows), edges:chain(rows.length),
  solution:moves.map(([node,x,y]) => ({type:'move',node,x,y})),
  metrics:{initialCrossings,bends:rows.length-2,referenceMoves:moves.length,optimal:false}
});
export const YARN_LEVELS = [
  level('Первая петля', [[14,80],[28,30],[75,72],[29,72],[72,30],[86,65]],
    [[1,12,55],[2,18,30]],1),
  level('Две петли', [[14,80],[25,26],[78,70],[24,70],[76,22],[78,87],[45,30]],
    [[1,12,55],[2,18,30],[3,38,16]],6),
  level('Нить под нитью', [[14,80],[32,20],[83,76],[22,64],[73,18],[76,88],[20,35],[88,45]],
    [[1,12,55],[3,38,16],[4,64,16],[5,85,32],[6,88,58]],10),
  level('Петли на коврике', [[14,80],[32,18],[85,68],[22,64],[72,18],[77,88],[18,34],[88,38],[40,86]],
    [[1,12,55],[3,38,16],[4,64,16],[6,88,58],[2,18,30],[8,49,87],[7,91,9],[5,85,32],[7,74,81]],14),
  level('Длинная путаница', [[14,80],[42,15],[88,70],[20,60],[76,20],[76,88],[16,34],[88,38],[40,85],[50,44]],
    [[1,12,55],[3,38,16],[4,64,16],[6,88,58],[2,18,30],[8,49,87],[9,37,60],[7,91,9],[5,85,32],[7,74,81]],18)
];
