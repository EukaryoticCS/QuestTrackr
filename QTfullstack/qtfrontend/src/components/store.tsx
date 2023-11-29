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
  total: number;
  selectable: boolean;
  openNodeSettings: Function;
};

export type RFState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onConnect: OnConnect;
  updateNodeColor: (nodeId: string, color: string) => void;
  updateTextColor: (nodeId: string, color: string) => void;
  updateText: (nodeId: string, text: string) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = createWithEqualityFn<RFState>(
  (set, get) => ({
    nodes: [],
    edges: [],
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
      set ({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = {...node.data, textColor}
          }
          return node;
        })
      });
    },
    updateText: (nodeId: string, text: string) => {
      set ({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = {...node.data, text}
          }
          return node;
        })
      })
    },
    restoreNodes: (nodes: Node[]) => {
      set ({
        nodes: nodes
      });
    },
  }),
  Object.is
);

export default useStore;
