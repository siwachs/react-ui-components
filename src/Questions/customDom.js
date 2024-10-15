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

      if (currentNode.innerHTML)
        output += `${whitespaces}${getWhitespaces(INDENT_SIZE)}${currentNode.innerHTML}\n`;

      for (const child of currentNode.children)
        output += printTree(child, currentLevel + 1);

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

const div2 = vDocument.createElement("div");
const div3 = vDocument.createElement("div");

div2.innerHTML = "HTML text in div2. Inner Div of Div 1";
div3.innerHTML = "HTML text in div3.";

div.appendChild(div2);
body.appendChild(div3);

vDocument.render();
