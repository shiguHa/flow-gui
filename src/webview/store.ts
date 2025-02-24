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
    addNode: (node: Node, edgeId:string, sourceId:string, targetId:string) => void;
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
    addNode: (newNode, edgeId, sourceNodeId, targetNodeId) => { // TODO:たぶんEdgeIdだけで十分なので修正する
        const updatedNodes = [...get().nodes.map(node => ({ ...node })), newNode];
        const updatedEdges = [
            ...get().edges.filter((edge) => edge.id !== edgeId),
            { id: `e-${sourceNodeId}-${newNode.id}`, source: sourceNodeId, target: newNode.id, type: "buttonedge" },
            { id: `e-${newNode.id}-${targetNodeId}`, source: newNode.id, target: targetNodeId, type: "buttonedge" },
          ];
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(updatedNodes, updatedEdges);
        console.log('addNode', layoutedNodes);
        set({ nodes: layoutedNodes, edges: layoutedEdges });
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