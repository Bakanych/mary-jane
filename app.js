const treeElement = document.getElementById("tree");

function renderTree(leaf, children) {
  const li = document.createElement("li");
  li.innerHTML = leaf;
  children.forEach((child) => {
    li.appendChild(renderTree(child));
  });
  return li;
}

const combinations = (a, b, n) => {
  if (n === 0) {
    return [[]];
  }
  return [
    ...combinations(a, b, n - 1).map((x) => [a, ...x]),
    ...combinations(a, b, n - 1).map((x) => [b, ...x]),
  ];
};

const comb = (a, b, n) => {
  if (n === 0) {
    return [[]];
  }
  return [
    ...comb(a, b, n - 1).map((x) => [a, ...x]),
    ...comb(a, b, n - 1).map((x) => [b, ...x]),
  ];
};
async function render() {
  const paths = combinations("A", "B", 3);
  console.log(paths);
  console.log(comb("A", "B", 2));
  console.log(comb("A", "B", 3));
  //   renderMatrix(paths);
  //   renderTreePath(paths[0]);
  //   renderTreePath(paths[1]);
  //   renderTreePath(paths[2]);
}

function renderTreePath(array) {
  const html = array.reduce(
    (prev, curr) => `<li>${curr}<ul>${prev}</ul></li>`,
    ""
  );
  return html;
}

function renderMatrix(matrix) {
  const target = document.getElementById("tree");
  const html = matrix.reduce((acc, path) => {
    let result = document.createElement("ul");
    path.reduce((node, value) => {
      const root = path[0];
    });

    return `<li>${root}</li><ul>${acc}</ul>`;
  }, "");
  //   matrix.reduce(
  //     (prev, curr) => `<li>${renderTreePath(curr)}<ul>${prev}</ul></li>`,
  //     ""
  //   );
  treeElement.innerHTML = `<ul>${html}</ul>`;
}

render();
