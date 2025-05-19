// digitPathCalc.js

function digits(n) {
  return Math.abs(n).toString().split('').map(Number);
}

function nextResults(n) {
  const ds = digits(n);
  const results = [];

  const sum = ds.reduce((a, b) => a + b, 0);
  results.push([sum, `${ds.join(' + ')} = ${sum}`]);

  const product = ds.reduce((a, b) => a * b, 1);
  results.push([product, `${ds.join(' * ')} = ${product}`]);

  if (Math.abs(n) >= 10 && Math.abs(n) <= 99) {
    const [a, b] = ds;
    const diff = Math.abs(a - b);
    results.push([diff, `|${a} - ${b}| = ${diff}`]);
  }

  return results;
}

function explore(n, seen = new Set(), path = [n], ops = []) {
  const key = `${n}:${path.join(',')}`;
  if (seen.has(key)) return [];

  seen.add(key);
  if (Math.abs(n) < 10) return [[n, path, ops]];

  let results = [];
  for (const [next, expr] of nextResults(n)) {
    results.push(...explore(next, seen, [...path, next], [...ops, expr]));
  }
  return results;
}

function getPathsTo7(n) {
  const finals = explore(n);
  return finals.filter(([fd]) => fd === 7);
}

module.exports = { getPathsTo7 };
