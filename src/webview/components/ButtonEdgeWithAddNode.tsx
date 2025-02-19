import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    useReactFlow,
  } from "@xyflow/react";
import { getLayoutedElements } from "../utils/layout";
import { useState } from "react";
  
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
  const { setNodes, setEdges, getNode, getNodes, getEdges } = useReactFlow();
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
    const sourceNode = getNode(source);
    const targetNode = getNode(target);
    if (!sourceNode || !targetNode) {
      return;
    }

    const newNodeId = `node-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      position: {
        x: (sourceNode.position.x + targetNode.position.x) / 2,
        y: (sourceNode.position.y + targetNode.position.y) / 2,
      },
      data: { label: type === 'ifNode' ? 'IF 条件' : '新しいノード' },
      type: type,
    };

    let updatedNodes = [...getNodes(), newNode];
    let updatedEdges = [
      ...getEdges().filter((edge) => edge.id !== id),
      { id: `e-${sourceNode.id}-${newNodeId}`, source: sourceNode.id, target: newNodeId, type: "buttonedge" },
      { id: `e-${newNodeId}-${targetNode.id}`, source: newNodeId, target: targetNode.id, type: "buttonedge" },
    ];



    if (type === 'ifNode') {
      const trueNodeId = `node-${Date.now()}-true`;
      const falseNodeId = `node-${Date.now()}-false`;

      const trueNode = {
        id: trueNodeId,
        position: {
          x: newNode.position.x + 100,
          y: newNode.position.y - 50,
        },
        data: { label: 'IF TRUE' },
        type: 'ifNode',
      };

      const falseNode = {
        id: falseNodeId,
        position: {
          x: newNode.position.x + 100,
          y: newNode.position.y + 50,
        },
        data: { label: 'IF FALSE' },
        type: 'ifNode',
      };

      updatedNodes = [...updatedNodes, trueNode, falseNode];
      updatedEdges = [
        ...updatedEdges,
        { id: `e-${newNodeId}-${trueNodeId}`, source: newNodeId, target: trueNodeId, type: "buttonedge" },
        { id: `e-${newNodeId}-${falseNodeId}`, source: newNodeId, target: falseNodeId, type: "buttonedge" },
      ];
    }

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(updatedNodes, updatedEdges);

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
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
              className="nodrag nopan"
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
            <button onClick={() => addNode('default')}>通常ノード</button>
            <button onClick={() => addNode('ifNode')}>IFノード</button>
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
}