import { Handle, Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GroupNodeType } from "../types/GroupNodeType";
 
export function GroupNode({ id, data, selected }: NodeProps<GroupNodeType>) {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      {data.label && (
        <div style={
          { 
            padding: 10,
            backgroundColor: 'rgba(255, 0, 255, 0.2)',
            textAlign: 'center' 
          }
        }> 
          {data.label}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
