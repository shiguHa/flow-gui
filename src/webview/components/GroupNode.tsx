import {  useEffect,useState } from "react";
import { Handle, NodeProps, Position, useInternalNode } from "@xyflow/react";
import { GroupNodeType } from "../types/GroupNodeType";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FlowStoreType, useFlowStore } from "../store";
import { useShallow } from "zustand/shallow";
// TODO: 途中でnode追加したときはHiddeされない気がする

const selector = (state: FlowStoreType) => ({
  nodes: state.nodes,
  setHiddenNodesByParentId: state.setHiddenNodesByParentId,
});

export function GroupNode({ id, data }: NodeProps<GroupNodeType>) {
  const [expanded, setExpanded] = useState(false);
  const internalNode = useInternalNode(id);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const {nodes,setHiddenNodesByParentId} = useFlowStore(useShallow(selector));
  
  const handleToggle = () => {
    setExpanded(!expanded);
    setHiddenNodesByParentId(id, expanded);
  };

  useEffect(() => {
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
