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
      let li = document.createElement("li");
      let ul = document.createElement("ul");
      li.innerHTML = x;
      target.appendChild(li);
      li.appendChild(ul);
      tree(a, b, depth - 1, ul);
    });
  return target;
}

function startTimer(target: HTMLElement) {
  target.setAttribute("disabled", "true");
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
