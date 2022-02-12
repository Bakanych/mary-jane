let level = 3;
const treeRoot = document.getElementById("tree")!;
const pathElement = document.getElementById("path")!;
const startButton = document.getElementById("start")!;
let timer: number;

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
      let link = document.createElement("button");
      link.innerHTML = `<mark>${x}</mark>`;
      let li = document.createElement("li");
      let ul = document.createElement("ul");
      li.innerHTML = `<button class=' node'>${x}</button>`;
      target.appendChild(li);
      //   li.appendChild(link);
      li.appendChild(ul);
      tree(a, b, depth - 1, ul);
    });
  return target;
}

function getPath(): HTMLElement[] {
  function iterate(node: Element, res: Element[]): void {
    let children = node.querySelectorAll("ul>li");
    if (children.length) {
      return children.forEach((x) => iterate(x, res.concat(x)));
    }
    if (res.length >= level) result.push(res);
  }

  const target = document.getElementById("tree")!;
  let result: HTMLElement[][] = [];
  iterate(target, []);
  const randomPath = result
    .sort(() => Math.random() - 0.5)[0]
    .map((x) => x.querySelector("button")!);
  pathElement.innerHTML += randomPath.map((x) => x?.outerHTML).join(" . ");
  // randomPath.forEach((x) => x!.classList.add("secondary"));

  return randomPath;
}

function stopTimer() {
  if (!timer) return false;
  clearInterval(timer);
  startButton.innerText = "start";
  pathElement.innerHTML = "";
  timer = 0;
  return true;
}
function startTimer() {
  if (stopTimer()) return;
  getPath();
  let start = Date.now();
  timer = setInterval(() => {
    let now = Date.now();
    let diff = now - start;
    let seconds = Math.floor(diff / 1000);
    let milliseconds = diff % 1000;
    startButton.innerText = `${seconds}.${milliseconds}`;
  }, 1);
}

function render(value: string | number = level) {
  //   document.location.reload();
  treeRoot.innerHTML = "";
  stopTimer();
  level = +value;
  console.log(level);
  tree("Mary", "Jain", level, treeRoot!);
}
