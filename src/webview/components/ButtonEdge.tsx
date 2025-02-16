import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    useReactFlow,
  } from "@xyflow/react";
  
  export function ButtonEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
  }: EdgeProps) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });
   

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
                onClick={() => setEdges((edges) => edges.filter((edge) => edge.id !== id))}>
                +
            </button>
        </EdgeLabelRenderer>
      </>
    );
  }