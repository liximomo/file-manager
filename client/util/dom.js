var nodeContainsWorksWithTextNodes = false;
try {
  var testParent = document.createElement('div'),
    testText = document.createTextNode(' ');
  testParent.appendChild(testText);
  nodeContainsWorksWithTextNodes = testParent.contains(testText);
} catch (exc) {}

export function isDescendant(parent, child, checkEquality) {
  if (!parent || !child) {
    return false;
  }
  if (parent === child) {
    return !!checkEquality;
  }
  // If parent is not an element, it can't have any descendants
  if (parent.nodeType !== 1) {
    return false;
  }
  if (nodeContainsWorksWithTextNodes || child.nodeType !== 3) {
    return parent.contains(child);
  }
  var node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

// event
export function addEventListenerExpect(expectElement, eventName, handle) {
  const evnetHandle = event => {
    if (isDescendant(expectElement, event.target, true)) return;
    handle(event);
  };
  document.addEventListener(eventName, evnetHandle);

  return () => {
    document.removeEventListener(eventName, evnetHandle)
  };
}
