"use strict";
let level = 3;
const treeRoot = document.getElementById("tree");
const pathElement = document.getElementById("path");
const startButton = document.getElementById("start");
let timer;
function tree(a, b, depth, target) {
    if (depth == 0) {
        return target;
    }
    [a, b]
        .sort(() => Math.random() - 0.5)
        .forEach((x) => {
        let li = document.createElement("li");
        let ul = document.createElement("ul");
        li.innerHTML = `<button class='node'>${x}</button>`;
        target.appendChild(li);
        li.appendChild(ul);
        tree(a, b, depth - 1, ul);
    });
    return target;
}
function getPath() {
    var _a;
    function iterate(node, res) {
        let children = node.querySelectorAll("ul>li");
        if (children.length) {
            return children.forEach((x) => iterate(x, res.concat(x)));
        }
        if (res.length >= level)
            result.push(res);
    }
    const target = document.getElementById("tree");
    let result = [];
    iterate(target, []);
    const randomPath = result
        .sort(() => Math.random() - 0.5)[0]
        .map((x) => x.querySelector("button"));
    pathElement.innerHTML += randomPath.map((x) => x === null || x === void 0 ? void 0 : x.innerHTML).join(" . ");
    (_a = randomPath.pop()) === null || _a === void 0 ? void 0 : _a.onclick = () => clearInterval(timer);
    // randomPath.forEach((x) => x!.classList.add("secondary"));
    return randomPath;
}
function stopTimer() {
    if (!timer)
        return false;
    clearInterval(timer);
    startButton.innerText = "start";
    pathElement.innerHTML = "";
    timer = 0;
    document.querySelectorAll("button.node").forEach((x) => {
        console.log(x.onclick);
        x.onclick = null;
    });
    return true;
}
function startTimer() {
    if (stopTimer())
        return;
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
function render(depth) {
    var _a;
    document.querySelectorAll("button.level").forEach((x) => {
        x.classList.remove("primary");
    });
    (_a = depth.classList) === null || _a === void 0 ? void 0 : _a.add("primary");
    treeRoot.innerHTML = "";
    stopTimer();
    level = +depth.innerHTML;
    tree("Mary", "Jain", level, treeRoot);
}
