import { useState, useEffect } from "react";
import { Node } from "reactflow";
import { useKeyPress } from "reactflow";
import { v4 as uuidv4 } from "uuid";

export const useCopyPaste = (nodes: Node[], onAdd: (node: Node) => void) => {
  const [copiedNodes, setCopiedNodes] = useState<Node[]>([]);
  const copyPressed = useKeyPress(["Control+c", "Strg+c"]);
  const pastePressed = useKeyPress(["Control+v", "Strg+v"]);

  useEffect(() => {
    if (copyPressed) {
      const selectedNodes = nodes.filter((node) => node.selected);
      setCopiedNodes(selectedNodes);
    }
  }, [copyPressed, nodes]);

  useEffect(() => {
    if (pastePressed && copiedNodes.length > 0) {
      // Create new nodes with unique IDs and selected state
      copiedNodes.forEach((node) => {
        const newNode = {
          ...node,
          id: uuidv4(),
          selected: true,
        };
        onAdd(newNode);
      });
    }
  }, [pastePressed, copiedNodes, onAdd]);

  return {
    copiedNodes,
  };
};
