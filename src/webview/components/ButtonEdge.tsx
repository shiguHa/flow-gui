import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    useReactFlow,
  } from "@xyflow/react";
  
  export function ButtonEdge({
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
    const { setNodes, setEdges, getNode } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
   
    const onEdgeClick = () => {
      const sourceNode = getNode(source);
      const targetNode = getNode(target);
      if (sourceNode && targetNode) {
        const newNodeId = `node-${Date.now()}`;
        const newNode = {
          id: newNodeId,
          position: {
            x: (sourceNode.position.x + targetNode.position.x) / 2,
            y: (sourceNode.position.y + targetNode.position.y) / 2,
          },
          data: { label: `新しいノード` },
          type: 'default',
        };
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds
            .filter((edge) => edge.id !== id)
            .concat([
              { id: `e-${sourceNode.id}-${newNodeId}`, source: sourceNode.id, target: newNodeId,type: "buttonedge" },
              { id: `e-${newNodeId}-${targetNode.id}`, source: newNodeId, target: targetNode.id,type: "buttonedge" },
            ])
        );
      }
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
        </EdgeLabelRenderer>
      </>
    );
  }