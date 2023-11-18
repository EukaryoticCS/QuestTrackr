import { createWithEqualityFn } from "zustand/traditional";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  XYPosition,
} from "reactflow";

export type NodeData = {
  color: string;
};

export type RFState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onConnect: OnConnect;
  updateNodeColor: (nodeId: string, color: string) => void;
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
    onAdd: (newNode: Node, position: XYPosition) => {
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
  }),
  Object.is
);

export default useStore;