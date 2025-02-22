import {create} from 'zustand';
import {
    Edge,
    Node,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    XYPosition,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    MarkerType,
  } from "@xyflow/react";

export type StoreType = {
    nodes: Node[];
    edges: Edge[];
    maxZIndex: number;
    minZIndex: number;
    check: () => void;
    addNode: (node: Node) => void;
    deleteNode: (id: string) => void;
    deleteEdge: (id: string) => void;
    getNodeById: (id: string) => Node | undefined;
    setZIndexNode: (delta: number, id: string) => void;
    onNodesChange: OnNodesChange<Node>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
};

const useFlowStore = create<StoreType>((set, get) => ({
    nodes: [],
    edges: [],
    maxZIndex: 0,
    minZIndex: 0,
    check: () => {
      console.log("nodes: ");
      console.log(get().nodes);
      console.log("edges: ");
      console.log(get().edges);
    },
    addNode: (node) => {
      set({ nodes: [...get().nodes, node] });
    },
    deleteNode: (id) => {
      set({ nodes: get().nodes.filter((nd) => nd.id !== id) });
    },
    deleteEdge: (id) => {
      set({ edges: get().edges.filter((ed) => ed.id !== id) });
    },
    getNodeById: (id) => {
      return get().nodes.find((nd) => nd.id === id);
    },
    setZIndexNode: (delta, id) => {
      set({
        nodes: get().nodes.map((prevNd) =>
          prevNd.id === id
            ? {
                ...prevNd,
                data: {
                  ...prevNd.data,
                  zIndex: prevNd?.zIndex ? prevNd.zIndex + delta : delta,
                },
              }
            : prevNd
        ),
      });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      console.log(connection);
      set({
        edges: addEdge(
          {
            ...connection,
            type: "simple-node",
            markerEnd: { type: MarkerType.Arrow },
          },
          get().edges
        ),
      });
    },
  }));