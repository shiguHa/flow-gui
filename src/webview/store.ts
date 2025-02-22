import { create } from 'zustand';
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
import { getLayoutedElements } from './utils/layout';
import { initialEdges, initialNodes } from './initFlow';

export type FlowStoreType = {
    nodes: Node[];
    edges: Edge[];
    maxZIndex: number;
    minZIndex: number;
    check: () => void;
    addNode: (node: Node) => void;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    deleteNode: (id: string) => void;
    deleteEdge: (id: string) => void;
    getNodeById: (id: string) => Node | undefined;
    setHiddenNodesByParentId: (parentId: string, hidden: boolean) => void;
    onNodesChange: OnNodesChange<Node>;
    onEdgesChange: OnEdgesChange;
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);

export const useFlowStore = create<FlowStoreType>((set, get) => ({
    nodes: layoutedNodes,
    edges: layoutedEdges,
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
    setNodes: (nodes) => {
        set({ nodes });
    },
    setEdges: (edges) => {
        set({ edges });
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
    setHiddenNodesByParentId: (parentId, hidden) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.parentId === parentId) {
                    return { ...node, hidden };
                }
                return node;
            }),
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
    }
}));