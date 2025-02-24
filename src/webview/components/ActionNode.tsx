import React, { memo } from 'react';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { ActionNodeProps } from '../types/GroupNodeType';
import { useDraggable } from '@dnd-kit/core';

function ActionNode(props: NodeProps<ActionNodeProps>) {
  const { id, data } = props;
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
        <strong>{data.label}</strong>
    </div>
  );
}

export default memo(ActionNode);