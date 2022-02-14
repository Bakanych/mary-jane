var level = 3;
var destiny = [];
var mary = "Mary";
var jane = "Jane";
var treeRoot = document.getElementById("tree");
var pathElement = document.getElementById("path");
var startButton = document.getElementById("start");
var timer;
function generateTree(a, b, depth, target) {
    if (depth == 0) {
        return target;
    }
    [a, b]
        .sort(function () { return Math.random() - 0.5; })
        .forEach(function (x) {
        var button = document.createElement("button");
        button.classList.add("node");
        button.innerText = x;
        button.onclick = function () { return onNodeClick(button); };
        var li = document.createElement("li");
        li.appendChild(button);
        var ul = document.createElement("ul");
        target.appendChild(li);
        li.appendChild(ul);
        generateTree(a, b, depth - 1, ul);
    });
    return target;
}
function onNodeClick(node) {
    if (!(node instanceof HTMLButtonElement))
        return;
    var path = [];
    var i = level - 1;
    var parent = node.parentElement;
    while (parent && parent !== treeRoot) {
        if (!(parent instanceof HTMLLIElement)) {
            parent = parent.parentElement;
            continue;
        }
        var button = parent.firstChild;
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
        path.forEach(function (x) { return x.classList.add("tertiary"); });
        return;
    }
    wasted(path[0]);
}
function startGame() {
    startButton.setAttribute("disabled", "true");
    stopGame();
    treeRoot.innerHTML = "";
    generateTree(mary, jane, level, treeRoot);
    destiny = Array.from({ length: level }, function () { return [mary, jane][Math.random() > 0.5 ? 0 : 1]; });
    pathElement.innerHTML = destiny.join(" . ");
    var start = Date.now();
    timer = setInterval(function () {
        var now = Date.now();
        var diff = now - start;
        var seconds = Math.floor(diff / 1000);
        var milliseconds = diff % 1000;
        startButton.innerText = seconds + "." + milliseconds;
    }, 1);
    startButton.removeAttribute("disabled");
}
function stopGame() {
    clearInterval(timer);
    startButton.className = "secondary";
}
function wasted(target) {
    stopGame();
    startButton.innerText = "wasted";
    target.classList.add("secondary");
}
function onChangeLevel(button) {
    var _a;
    if (button.classList.contains("primary"))
        return;
    stopGame();
    document.querySelectorAll("button.level").forEach(function (x) {
        x.classList.remove("primary");
    });
    (_a = button.classList) === null || _a === void 0 ? void 0 : _a.add("primary");
    treeRoot.innerHTML = "";
    if (timer)
        clearInterval(timer);
    startButton.innerText = "start";
    pathElement.innerHTML = "";
    timer = 0;
    level = +button.innerHTML;
}
