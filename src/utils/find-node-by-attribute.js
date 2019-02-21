export const findNodeByAttribute = (startNode, attribute) => {
  let node = startNode;

  do {
    if (node.getAttribute(attribute) !== null) {
      return node;
    }

    node = node.parentNode;
  } while (node !== null);

  throw new Error(`Couldn't find node by attribute ${attribute}`);
};
