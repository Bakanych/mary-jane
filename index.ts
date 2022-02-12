function tree(a: string, b: string, depth: number, target: HTMLElement): Node {
  if (depth == 0) {
    return target;
  }
  [a, b]
    .sort(() => Math.random() - 0.5)
    .forEach((x) => {
      let li = document.createElement("li");
      let ul = document.createElement("ul");
      li.innerHTML = x;
      target.appendChild(li);
      li.appendChild(ul);

      tree(a, b, depth - 1, ul);
    });
  return target;
}

const treeElement = document.getElementById("tree");
const ul = document.createElement("ul");
tree("Mary", "Jain", 4, ul);
treeElement!.appendChild(ul);
