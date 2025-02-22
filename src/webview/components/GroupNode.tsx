import { Handle, Node, NodeProps, Position, ReactFlowState, useInternalNode, useStoreApi, useNodesState, useReactFlow, useStore, NodeChange, OnNodesChange, applyNodeChanges } from "@xyflow/react";
import { GroupNodeType } from "../types/GroupNodeType";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// TODO: 途中でnode追加したときはHiddeされない気がする


export function GroupNode({ id, data, selected }: NodeProps<GroupNodeType>) {
  const [expanded, setExpanded] = useState(false);
  const { setNodes, getNodes } = useReactFlow();
  const internalNode = useInternalNode(id);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const handleToggle = () => {
    setExpanded(!expanded);
    setNodes(nodes =>
      nodes.map(node => {
        if (node.parentId === id) {
          return { ...node, hidden: expanded };
        }
        return node;
      })
    );
  };

  useEffect(() => {
    const nodes = getNodes();
    const childNodes = nodes.filter(node => node.parentId === id);

    if (childNodes.length > 0) {
      const minX = Math.min(...childNodes.map(node => node.position.x));
      const maxX = Math.max(...childNodes.map(node => node.position.x + (node.measured?.width || 0)));
      const minY = Math.min(...childNodes.map(node => node.position.y));
      const maxY = Math.max(...childNodes.map(node => node.position.y + (node.measured?.height || 0)));

      setDimensions({
        width: maxX - minX,
        height: maxY - minY,
      });
    } else {
      setDimensions({ width: 0, height: 0 });
    }
    console.log(dimensions.width, dimensions.height);
  }, [id,internalNode]); //internalNodeを追加すれば起動はするが、レンダリングが多すぎ


  return (
    <div >
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Accordion
        expanded={expanded}
        onChange={handleToggle}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}>
          <Typography component="span">Accordion</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ width: dimensions.width, height: dimensions.height }}>



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

        </AccordionDetails>
      </Accordion>
    </div>
  );
}
