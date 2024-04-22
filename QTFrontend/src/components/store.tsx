import { createWithEqualityFn } from "zustand/traditional";
import {
  Connection,
  Edge,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnConnect,
  applyNodeChanges,
} from "reactflow";

export type NodeData = {
  label: string;
  color: string;
  textColor: string;
  text: string;
  fontSize: number;
  total: number;
  selectable: boolean;
  updateNodeSettings: Function;
  section: string;
  checked: boolean;
  selected: string;
  collected: number;
  img: string;
};

export type RFState = {
  nodes: Node<NodeData>[];
  selectedNode: Node<NodeData>;
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onConnect: OnConnect;
  updateSelectedNode: (node: Node<NodeData>) => void;
  updateNodeColor: (nodeId: string, color: string) => void;
  updateTextColor: (nodeId: string, color: string) => void;
  updateText: (nodeId: string, text: string) => void;
  updateFontSize: (nodeId: string, fontSize: number) => void;
  updateSection: (nodeId: string, section: string) => void;
  updateChecked: (nodeId: string, checked: boolean) => void;
  updateSelected: (nodeId: string, selected: string) => void;
  updateCollected: (nodeId: string, collected: number) => void;
  updateImage: (nodeId: string, imageURL: string) => void;
  restoreNodes: (nodes: Node[]) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = createWithEqualityFn<RFState>(
  (set, get) => ({
    nodes: [],
    edges: [],
    selectedNode: {
      id: "",
      position: { x: 0, y: 0 },
      data: {
        label: "",
        color: "",
        textColor: "",
        text: "",
        fontSize: 16,
        total: 20,
        selectable: false,
        updateNodeSettings: () => {},
        section: "",
        checked: false,
        selected: "N/A",
        collected: 0,
        img: "",
      },
    },
    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onConnect: (connection: Connection) => {
      set({
        edges: addEdge(connection, get().edges),
      });
    },
    onAdd: (newNode: Node) => {
      set({
        nodes: [...get().nodes, newNode],
      });
    },
    updateSelectedNode: (node: Node<NodeData>) => {
      set({
        selectedNode: node,
      });
    },
    updateNodeColor: (nodeId: string, color: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            // it's important to create a new object here, to inform React Flow about the cahnges
            node.data = { ...node.data, color };
          }
          return node;
        }),
      });
    },
    updateTextColor: (nodeId: string, textColor: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, textColor };
          }
          return node;
        }),
      });
    },
    updateText: (nodeId: string, text: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, text };
          }
          return node;
        }),
      });
    },
    updateFontSize: (nodeId: string, fontSize: number) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, fontSize };
          }
          return node;
        }),
      });
    },
    updateSection: (nodeId: string, section: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, section };
          }
          return node;
        }),
      });
    },
    updateChecked: (nodeId: string, checked: boolean) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, checked };
          }
          return node;
        }),
      });
    },
    updateSelected: (nodeId: string, selected: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, selected };
          }
          return node;
        }),
      });
    },
    updateCollected: (nodeId: string, collected: number) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, collected };
          }
          return node;
        }),
      });
    },
    updateImage: (nodeId: string, img: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, img}
          }
          return node;
        })
      })
    },
    restoreNodes: (nodes: Node[]) => {
      set({
        nodes: nodes,
      });
    },
  }),
  Object.is
);

export default useStore;
