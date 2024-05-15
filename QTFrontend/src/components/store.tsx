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
  options: string[];
  img: string;
  percentage: number;
};

export type RFState = {
  nodes: Node<NodeData>[];
  selectedNode: Node<NodeData>;
  edges: Edge[];
  sections: string[];
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
  addDropdownOption: (nodeId: string, option: string) => void;
  editDropdownOption: (nodeId: string, option: string) => void;
  deleteDropdownOption: (nodeId: string, option: string) => void;
  updateImage: (nodeId: string, imageURL: string) => void;
  restoreNodes: (nodes: Node[]) => void;
  deleteSection: (section: string) => void;
  addSection: (section: string) => void;
  renameSection: (section: string, newName: string) => void;
  restoreSections: (sections: string[]) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = createWithEqualityFn<RFState>(
  (set, get) => ({
    nodes: [],
    edges: [],
    sections: [],
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
        options: ["N/A"],
        img: "",
        percentage: 0,
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
    addDropdownOption: (nodeId: string, option: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId && !node.data.options.includes(option)) {
            node.data.options.push(option);
          }
          return node;
        }),
      });
    },
    editDropdownOption: (nodeId: string, option: string) => {},
    deleteDropdownOption: (nodeId: string, option: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            const index = node.data.options.indexOf(option);
            node.data.options.splice(index, 1);
            if (node.data.selected === option) {
              get().updateSelected(nodeId, "N/A");
            }
          }
          return node;
        }),
      });
    },
    updateImage: (nodeId: string, img: string) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, img };
          }
          return node;
        }),
      });
    },
    updatePercentage: (nodeId: string, percentage: number) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, percentage };
          }
          return node;
        }),
      });
    },
    restoreNodes: (nodes: Node[]) => {
      set({
        nodes: nodes,
      });
    },
    deleteSection: (section: string) => {
      set({
        sections: get().sections.filter((sec) => sec !== section),
      });
    },
    addSection: (section: string) => {
      set({
        sections: [...get().sections, section],
      });
    },
    renameSection: (section: string, newName: string) => {
      set({
        sections: get().sections.map((sec) => {
          if (sec === section) {
            sec = newName;
          }
          return sec;
        }),
      })
    },
    restoreSections: (sections: string[]) => {
      set({
        sections: sections,
      });
    },
  }),
  Object.is
);

export default useStore;
