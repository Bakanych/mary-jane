function tree(
  a: string,
  b: string,
  depth: number,
  target: HTMLElement
): HTMLElement {
  if (depth == 0) {
    return target;
  }
  [a, b]
    .sort(() => Math.random() - 0.5)
    .forEach((x) => {
      let link = document.createElement("a");
      link.innerHTML = `<mark>${x}</mark>`;
      let li = document.createElement("li");
      let ul = document.createElement("ul");
      //   li.innerHTML = x;
      target.appendChild(li);
      li.appendChild(link);
      li.appendChild(ul);
      tree(a, b, depth - 1, ul);
    });
  return target;
}

// get node children

// get all nodes from tree paths from root to leaf and put them to arrays
function getAllNodes(node: Node): Node[] {
  let nodes: Node[] = [];
  if (node.childNodes.length == 0) {
    nodes.push(node);
    return nodes;
  }
  node.childNodes.forEach((child) => {
    nodes = nodes.concat(getAllNodes(child));
  });
  return nodes;
}

function getPath(): HTMLElement[] {
  function iterate(node: Element, res: Element[]): void {
    let children = node.querySelectorAll("ul>li");
    if (children.length) {
      return children.forEach((x) => iterate(x, res.concat(x)));
    }
    if (res.length >= 4) result.push(res);
  }

  const target = document.getElementById("tree")!;
  let result: HTMLElement[][] = [];
  iterate(target, []);
  const pathElement = document.getElementById("path")!;
  const randomPath = result
    .sort(() => Math.random() - 0.5)[0]
    .map((x) => {
      const mark = x.querySelector("mark");
      //   pathElement.appendChild(mark);
      return mark;
    });
  pathElement.innerHTML += randomPath.map((x) => x?.outerHTML).join(".");
  // randomPath.forEach((x) => x!.classList.add("secondary"));

  return randomPath;
}

function startTimer(target: HTMLElement) {
  target.setAttribute("disabled", "true");
  const path = getPath();
  document
    .getElementById("path")
    ?.querySelectorAll("mark")
    ?.forEach((x, i) => (x.innerText = path[i].innerText));
  let start = Date.now();
  let interval = setInterval(() => {
    let now = Date.now();
    let diff = now - start;
    // get seconds and milliseconds
    let seconds = Math.floor(diff / 1000);
    let milliseconds = diff % 1000;
    target.innerText = `${seconds}.${milliseconds}`;
  }, 1);
  return interval;
}

function render() {
  let treeElement = document.getElementById("tree");
  tree("Mary", "Jain", 4, treeElement!);
}
