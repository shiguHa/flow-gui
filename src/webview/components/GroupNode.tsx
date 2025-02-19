import { Handle, Node, NodeProps, Position } from "@xyflow/react";
 
type GroupNode = Node<{
  label: string;
}>;
 
export function GroupNode({ data, selected }: NodeProps<GroupNode>) {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      {data.label && (
        <div style={{ padding: 10, backgroundColor: 'rgba(255, 0, 255, 0.2)', textAlign: 'center' }}> 
          {data.label}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
