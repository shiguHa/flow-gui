import {
    Node,
  } from '@xyflow/react';

export const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "開始" }, type: "default" },
  { id: "2", position: { x: 0, y: 0 }, data: { label: "処理 1" }, type: "default"},
  { id: "3", position: { x: 0, y: 0 }, data: { label: "処理 2" }, type: "default"},
  // { id: "3", position: { x: 0, y: 0 }, data: { label: "IF" } , type: "ifGroupNode",
  // },
];
export const initialEdges = [
  { id: "e1-2", source: "1", target: "2", type: "buttonedge" },
  { id: "e2-3", source: "2", target: "3" , type: "buttonedge"},
];