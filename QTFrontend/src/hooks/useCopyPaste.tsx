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
    if (pastePressed) {
      nodes.forEach((node) => {
        node.selected = false;
      });

      copiedNodes.forEach(async (node) => {
        const id = uuidv4();
        await onAdd({
          ...node,
          id,
          selected: true,
        });
      });
    }
  }, [pastePressed, nodes, copiedNodes, onAdd]);

  return {
    copiedNodes,
  };
};
