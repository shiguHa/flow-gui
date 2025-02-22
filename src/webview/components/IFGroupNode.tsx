import { NodeProps, useReactFlow } from "@xyflow/react";
import { GroupNodeType } from "../types/GroupNodeType";
import { GroupNode } from "./GroupNode";
import { useEffect } from "react";

export function IFGroupNode(props: NodeProps<GroupNodeType>) {
    const { id, data } = props;
    const { setNodes, getNodes } = useReactFlow();
  
    useEffect(() => {
        setNodes(nodes => [
            ...nodes,
            {
            id: `${id}-true`,
            position: { x: 10, y: 50 },
            data: { label: "IF TRUE" },
            parentId: id,
            extent: "parent",
            type: "output",
            draggable: true,
            },
            {
            id: `${id}-false`,
            position: { x: 200, y: 50 },
            data: { label: "IF FALSE" },
            parentId: id,
            extent: "parent",
            type: "output",
            draggable: true,
            },
        ]);
    }, []);

    return <GroupNode {...props}/>;
}