import { Node } from "reactflow";

export default [
  {
    id: "1",
    position: { x: 0, y: 0 },
    type: "shapeNode",
    data: { color: "F6E05E"},
    style: {
      background: "#fff",
      border: "1px solid black",
      borderRadius: 15,
      fontSize: 12,
      zIndex: -1,
      height: 20,
      width: 40,
    },
  },

  {
    id: "2",
    type: "shapeNode",
    data: { color: "#F6E05E" },
    position: { x: 100, y: 125 },
    height: 20,
    width: 20,
  },
  {
    id: "3",
    type: "shapeNode",
    data: { color: "#B794F4" },
    position: { x: 250, y: 250 },
    height: 20,
    width: 20,
  },
] as Node[];
