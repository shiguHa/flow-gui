import React, { memo } from 'react';
import { Handle, NodeProps, Position } from '@xyflow/react';
import { ActionNodeProps } from '../types/GroupNodeType';
import { useDraggable } from '@dnd-kit/core';

function ActionNode(props: NodeProps<ActionNodeProps>) {
  const { id, data } = props;
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: id,
  });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
        <strong>{data.label}</strong>
    </div>
  );
}

export default memo(ActionNode);