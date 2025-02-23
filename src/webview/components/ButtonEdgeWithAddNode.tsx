import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    useReactFlow,
  } from "@xyflow/react";
import { getLayoutedElements } from "../utils/layout";
import { useEffect, useState } from "react";
import { FlowStoreType, useFlowStore } from "../store";
import { useShallow } from "zustand/shallow";
import { v7 as uuidv7 } from 'uuid';
  
const selector = (state: FlowStoreType) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeById:state.getNodeById,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  addNode2: state.addNode,
  getNodes: state.getNodes,
});

export function ButtonEdgeWithAddNode({
  id,
  source,
  sourceX,
  sourceY,
  target,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const {   getNodeById, addNode2 } = useFlowStore(useShallow(selector));
  const {getNodes,setNodes} = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [showOptions, setShowOptions] = useState(false);

  const addNode = (type: string) => {
    const sourceNode = getNodeById(source);
    const targetNode = getNodeById(target);
    if (!sourceNode || !targetNode) {
      return;
    }

    const newNodeId = uuidv7();
    const newNode = {
      id: newNodeId,
      position: {
        x: 500,
        y:500 ,
      },
      data: { label: type === 'ifNode' ? 'IF 条件' : '新しいノード' },
      type: type,
    };
    
    addNode2(newNode,id,source,target);
    // const currentNodes = getNodes();
    // const updatedNodes = [...currentNodes, newNode];
    // // const updatedNodes = [...useFlowStore.getState().nodes, newNode];

    // const updatedEdges = [
    //   ...edges.filter((edge) => edge.id !== id),
    //   { id: `e-${sourceNode.id}-${newNodeId}`, source: sourceNode.id, target: newNodeId, type: "buttonedge" },
    //   { id: `e-${newNodeId}-${targetNode.id}`, source: newNodeId, target: targetNode.id, type: "buttonedge" },
    // ];

    // const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(updatedNodes, updatedEdges);

    // setNodes(layoutedNodes);
    // setEdges(layoutedEdges);
    setShowOptions(false);
  }
  
  const onEdgeClick = () => {
    setShowOptions(true);
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
          <button 
              style={{
                  position: 'absolute',
                  transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                  pointerEvents: 'all',
              }}
              onClick={onEdgeClick}>
              +
          </button>
          {showOptions && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              background: 'white',
              border: '1px solid black',
              padding: '5px',
              zIndex: 10,
            }}
          >
            <button onClick={() => addNode("default")}>通常ノード</button>
            <button onClick={() => addNode("ifGroupNode")}>IFノード</button>
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
}