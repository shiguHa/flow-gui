import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import { ButtonEdge } from './components/ButtonEdge';
 
const initialNodes = [
  { id: "1", position: { x: 250, y: 0 }, data: { label: "開始" }, type: "default" },
  { id: "2", position: { x: 250, y: 100 }, data: { label: "処理 1" }, type: "default" },
  { id: "3", position: { x: 250, y: 200 }, data: { label: "処理 2" }, type: "default" },
  { id: "4", position: { x: 250, y: 300 }, data: { label: "終了" }, type: "default" },
];
const initialEdges = [
  { id: "e1-2", source: "1", target: "2", type: "buttonedge" },
  { id: "e2-3", source: "2", target: "3" , type: "buttonedge"},
  { id: "e3-4", source: "3", target: "4" , type: "buttonedge"},
];

const edgeTypes = {
  buttonedge: ButtonEdge,
};
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params:any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls showInteractive={false}/>
        <MiniMap/>
      </ReactFlow>
    </div>
  );
}

