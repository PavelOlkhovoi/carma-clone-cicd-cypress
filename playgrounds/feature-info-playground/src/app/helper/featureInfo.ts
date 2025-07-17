export const getLeafNodes = (node, result: any = {}): any => {
  if (node.nodeType === Node.ELEMENT_NODE) {
    const children = Array.from(node.children);
    if (children.length === 0) {
      // It's a leaf node
      result[node.nodeName] = node.textContent;
    } else {
      // Recursively find leaf nodes in children
      children.forEach((child) => getLeafNodes(child, result));
    }
  }
  return result;
};

export const findLayerByTitle = (array: any[], title: string) => {
  for (let i = 0; i < array.length; i++) {
    let layers = array[i].layers;
    for (let j = 0; j < layers.length; j++) {
      if (layers[j].Title === title) {
        return layers[j];
      }
    }
  }
  return null;
};
