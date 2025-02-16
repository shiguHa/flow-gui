import {
    BaseEdge,
    EdgeLabelRenderer,
    EdgeProps,
    getBezierPath,
    useReactFlow,
  } from "@xyflow/react";
  
  interface ButtonEdgeProps extends EdgeProps {
    onEdgeClick: (id: string) => void;
  }

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
          <div
            className="nodrag nopan pointer-events-auto absolute"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            }}
          >
            <button 
                style={{
                    pointerEvents: 'all',
                }}
                onClick={() => setEdges((edges) => edges.filter((edge) => edge.id !== id))}>
                +
            </button>
          </div>
        </EdgeLabelRenderer>
      </>
    );
  }