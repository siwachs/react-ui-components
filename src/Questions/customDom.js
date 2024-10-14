class Node {
  constructor(name) {
    this.name = name;
    this.innerHTML = "";
    this.children = [];
  }

  appendChild(node) {
    this.children.push(node);
  }
}

const INDENT_SIZE = 4;
function getWhitespaces(length) {
  return Array.from({ length }, () => " ").join("");
}

class VDocument extends Node {
  constructor() {
    super("html");
  }

  createElement(nodeName) {
    return new Node(nodeName);
  }

  render() {
    function printTree(currentNode, currentLevel) {
      const whitespaces = getWhitespaces(currentLevel * INDENT_SIZE);

      let output = "";
      output += `${whitespaces}<${currentNode.name}>\n`;
      output += `${whitespaces}</${currentNode.name}>\n`;

      return output;
    }

    console.log(printTree(this, 0));
  }
}

const vDocument = new VDocument();

const body = vDocument.createElement("body");
vDocument.appendChild(body);

const div = vDocument.createElement("div");
div.innerHTML = "HTML text render inside div.";
body.appendChild(div);

vDocument.render();
