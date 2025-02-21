import { Handle, Node, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GroupNodeType } from "../types/GroupNodeType";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// TODO: 途中でnode追加したときはHiddeされない気がする


export function GroupNode({ id, data, selected }: NodeProps<GroupNodeType>) {
  const [expanded, setExpanded] = useState(false);
  const { setNodes, getNodes } = useReactFlow();

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setNodes(nodes =>
      nodes.map(node => {
        if (node.parentId === id) {
          return { ...node, hidden: !expanded };
        }
        return node;
      })
    );
  }, [expanded, id, setNodes]);

  return (
    <div >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Accordion
        expanded={expanded}
        onChange={handleToggle}
        style={{ width: 300, height: 200 }} >
        <AccordionSummary>
          <Typography component="span">Accordion</Typography>
        </AccordionSummary>

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


      </Accordion>
    </div>
  );
}
