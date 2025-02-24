import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
  } from "@xyflow/react";
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
  addNode: state.addNode,
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
  const {   getNodeById, addNode } = useFlowStore(useShallow(selector));
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [showOptions, setShowOptions] = useState(false);

  const addNodeHandle = (type: string) => {
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
    
    addNode(newNode,id,source,target);
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
            <button onClick={() => addNodeHandle("default")}>通常ノード</button>
            <button onClick={() => addNodeHandle("ifGroupNode")}>IFノード</button>
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
}