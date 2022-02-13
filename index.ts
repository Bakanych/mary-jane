let level = 3;
const mary = "Mary";
const jane = "Jane";
const treeRoot = document.getElementById("tree")!;
const pathElement = document.getElementById("path")!;

// TODO: start timer if path element is not empty
let destiny: string[] = [];
const startButton = document.getElementById("start")!;
let timer: number;

function generateTree(
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
  let i = level - 1;
  let parent = node.parentElement;
  while (parent) {
    if (!(parent instanceof HTMLLIElement)) {
      parent = parent.parentElement;
      continue;
    }
    if (parent.firstChild.innerText !== destiny[i]) return;
    console.log(parent);
    i--;
    parent = parent.parentElement;
  }
  // win
  clearInterval(timer);
}
function showPath() {
  pathElement.innerHTML += destiny.join(" . ");
}
// function stopTimer() {
//   if (!timer) return false;
//   clearInterval(timer);
//   startButton.innerText = "start";
//   pathElement.innerHTML = "";
//   timer = 0;
//   document.querySelectorAll<HTMLButtonElement>("button.node").forEach((x) => {
//     x.onclick = null;
//   });
//   return true;
// }
function startTimer() {
  const currentLevelButton = document.querySelector<HTMLButtonElement>(
    "button.level.primary"
  );
  render(currentLevelButton!);
  showPath();
  let start = Date.now();
  timer = setInterval(() => {
    let now = Date.now();
    let diff = now - start;
    let seconds = Math.floor(diff / 1000);
    let milliseconds = diff % 1000;
    startButton.innerText = `${seconds}.${milliseconds}`;
  }, 1);
}
function render(caller: HTMLElement) {
  document.querySelectorAll("button.level").forEach((x) => {
    x.classList.remove("primary");
  });
  caller.classList?.add("primary");
  treeRoot.innerHTML = "";
  if (timer) clearInterval(timer);
  startButton.innerText = "start";
  pathElement.innerHTML = "";
  timer = 0;
  level = +caller.innerHTML;
  generateTree(mary, jane, level, treeRoot!);

  destiny = Array.from(
    { length: level },
    (v, i) => [mary, jane][Math.random() > 0.5 ? 0 : 1]
  );
}
