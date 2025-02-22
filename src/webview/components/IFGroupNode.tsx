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
            position: { x: 10, y: 70 },
            data: { label: "IF TRUE" },
            parentId: id,
            extent: "parent",
            type: "input",
            draggable: true,
            },
            {
            id: `${id}-false`,
            position: { x: 200, y: 70 },
            data: { label: "IF FALSE" },
            parentId: id,
            extent: "parent",
            type: "input",
            draggable: true,
            },
        ]);
    }, []);

    return <GroupNode {...props}/>;
}