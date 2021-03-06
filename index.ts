let level = 3;
let destiny: string[] = [];
const mary = "Mary";
const jane = "Jane";
const treeRoot = document.getElementById("tree")!;
const pathElement = document.getElementById("path")!;
const startButton = document.getElementById("start")!;
let timer: number;

function generateTree(a: string, b: string, depth: number, target: HTMLElement): HTMLElement {
  if (depth == 0) {
    return target;
  }
  [a, b]
    .sort(() => Math.random() - 0.5)
    .forEach((x) => {
      let button = document.createElement("button");
      button.classList.add("node");
      button.innerText = x;
      button.onclick = () => onNodeClick(button);
      let li = document.createElement("li");
      li.appendChild(button);
      let ul = document.createElement("ul");
      target.appendChild(li);
      li.appendChild(ul);
      generateTree(a, b, depth - 1, ul);
    });
  return target;
}

function onNodeClick(node: HTMLElement) {
  if (!(node instanceof HTMLButtonElement)) return;
  const path: HTMLElement[] = [];
  let i = level - 1;
  let parent = node.parentElement;
  while (parent && parent !== treeRoot) {
    if (!(parent instanceof HTMLLIElement)) {
      parent = parent.parentElement;
      continue;
    }
    const button = parent.firstChild as HTMLButtonElement;
    path.push(button);
    if (button.innerText !== destiny[i]) {
      break;
    }
    i--;
    parent = parent.parentElement;
  }
  if (i == -1) {
    clearInterval(timer);
    startButton.className = "tertiary";
    path.forEach((x) => x.classList.add("tertiary"));
    return;
  }
  wasted(path[0]);
}

function startGame() {
  startButton.setAttribute("disabled", "true");

  stopGame();

  treeRoot.innerHTML = "";
  generateTree(mary, jane, level, treeRoot);
  destiny = Array.from({ length: level }, () => [mary, jane][Math.random() > 0.5 ? 0 : 1]);

  pathElement.innerHTML = destiny.join(" . ");
  let start = Date.now();
  timer = setInterval(() => {
    let now = Date.now();
    let diff = now - start;
    let seconds = Math.floor(diff / 1000);
    let milliseconds = diff % 1000;
    startButton.innerText = `${seconds}.${milliseconds}`;
  }, 1);
  startButton.removeAttribute("disabled");
}

function stopGame() {
  clearInterval(timer);
  startButton.className = "secondary";
}

function wasted(target: HTMLElement) {
  stopGame();
  startButton.innerText = "wasted";
  target.classList.add("secondary");
}

function onChangeLevel(button: HTMLButtonElement) {
  if (button.classList.contains("primary")) return;
  stopGame();
  document.querySelectorAll("button.level").forEach((x) => {
    x.classList.remove("primary");
  });
  button.classList?.add("primary");
  treeRoot.innerHTML = "";
  if (timer) clearInterval(timer);
  startButton.innerText = "start";
  pathElement.innerHTML = "";
  timer = 0;
  level = +button.innerHTML;
}
