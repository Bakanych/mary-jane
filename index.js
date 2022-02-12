"use strict";
function tree(a, b, depth, target) {
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
function getAllNodes(node) {
    let nodes = [];
    if (node.childNodes.length == 0) {
        nodes.push(node);
        return nodes;
    }
    node.childNodes.forEach((child) => {
        nodes = nodes.concat(getAllNodes(child));
    });
    return nodes;
}
function getPath() {
    function iterate(node, res) {
        let children = node.querySelectorAll("ul>li");
        if (children.length) {
            return children.forEach((x) => iterate(x, res.concat(x)));
        }
        if (res.length >= 4)
            result.push(res);
    }
    const target = document.getElementById("tree");
    let result = [];
    iterate(target, []);
    const pathElement = document.getElementById("path");
    const randomPath = result
        .sort(() => Math.random() - 0.5)[0]
        .map((x) => {
        const mark = x.querySelector("mark");
        //   pathElement.appendChild(mark);
        return mark;
    });
    pathElement.innerHTML += randomPath.map((x) => x === null || x === void 0 ? void 0 : x.outerHTML).join(".");
    // randomPath.forEach((x) => x!.classList.add("secondary"));
    return randomPath;
}
function startTimer(target) {
    var _a, _b;
    target.setAttribute("disabled", "true");
    const path = getPath();
    (_b = (_a = document
        .getElementById("path")) === null || _a === void 0 ? void 0 : _a.querySelectorAll("mark")) === null || _b === void 0 ? void 0 : _b.forEach((x, i) => (x.innerText = path[i].innerText));
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
    tree("Mary", "Jain", 4, treeElement);
}
