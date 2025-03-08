import { Node } from "reactflow";
import { v4 as uuidv4 } from "uuid";

export const getNodeId = () => `${uuidv4()}`;

export const nodeColor = (node: Node) => {
  switch (node.type) {
    case "shapeNode":
      return "#133C55";
    case "textNode":
    case "imageNode":
      return "#386FA4";
    case "checkboxNode":
    case "numberNode":
    case "dropdownNode":
      return "#59A5D8";
    default:
      return "#FFFFFF";
  }
};

export const createShapeNode = (
  position: { x: number; y: number },
  updateNodeSettings: (node: Node) => void
) => ({
  id: getNodeId(),
  key: getNodeId(),
  position,
  type: "shapeNode",
  data: {
    color: "#ffffff",
    selectable: true,
    section: "Total",
    updateNodeSettings,
  },
  style: {
    border: "1px solid black",
    borderRadius: 15,
    fontSize: 12,
    zIndex: -1,
    height: 20,
    width: 40,
  },
});

export const createTextNode = (
  position: { x: number; y: number },
  updateNodeSettings: (node: Node) => void
) => ({
  id: getNodeId(),
  key: getNodeId(),
  position,
  type: "textNode",
  data: {
    textColor: "#ffffff",
    fontSize: 16,
    text: "Input Text Here",
    updateNodeSettings,
    selectable: true,
  },
  style: {
    height: 40,
    width: 140,
  },
});

export const createImageNode = (
  position: { x: number; y: number },
  updateNodeSettings: (node: Node) => void
) => ({
  id: getNodeId(),
  key: getNodeId(),
  position,
  data: {
    img: "https://cdn.wikimg.net/en/zeldawiki/images/3/3a/LA_Shield_Sprite.png",
    updateNodeSettings,
    selectable: true,
  },
  type: "imageNode",
  style: {
    fontSize: 15,
    height: 20,
    width: 40,
  },
});

export const createCheckboxNode = (
  position: { x: number; y: number },
  updateNodeSettings: (node: Node) => void
) => ({
  id: getNodeId(),
  key: getNodeId(),
  position,
  data: {
    selectable: true,
    updateNodeSettings,
    section: "Total",
    checked: false,
  },
  type: "checkboxNode",
  style: {
    fontSize: 15,
    height: 20,
    width: 20,
  },
});

export const createNumberNode = (
  position: { x: number; y: number },
  updateNodeSettings: (node: Node) => void
) => ({
  id: getNodeId(),
  key: getNodeId(),
  position,
  data: {
    textColor: "#ffffff",
    total: 20,
    selectable: true,
    updateNodeSettings,
    fontSize: 16,
    section: "Total",
    collected: 0,
  },
  type: "numberNode",
});

export const createDropdownNode = (
  position: { x: number; y: number },
  updateNodeSettings: (node: Node) => void
) => ({
  id: getNodeId(),
  key: getNodeId(),
  position,
  data: {
    options: ["N/A", "Lv1", "Lv2", "Lv3"],
    selectable: true,
    updateNodeSettings,
    section: "Total",
    selected: "N/A",
  },
  style: {
    height: 40,
    width: 80,
  },
  type: "dropdownNode",
});

export const createPercentageNode = (
  position: { x: number; y: number },
  updateNodeSettings: (node: Node) => void
) => ({
  id: getNodeId(),
  key: getNodeId(),
  position,
  data: {
    textColor: "#ffffff",
    fontSize: 16,
    selectable: true,
    percentage: 0,
    updateNodeSettings,
    section: "Total",
  },
  style: {
    height: 20,
    width: 40,
  },
  type: "percentageNode",
});
