import dagre from 'dagre';
import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Position,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import { ButtonEdgeWithAddNode } from './components/ButtonEdgeWithAddNode';
import { getLayoutedElements } from './utils/layout';

const vscode = acquireVsCodeApi();

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

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);


const edgeTypes = {
  buttonedge: ButtonEdgeWithAddNode,
};
 
export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
 

  const updateEditorContent = useCallback(() => {
    const newText = generateFlowText(nodes, edges);
    vscode.postMessage({ command: 'updateEditorContent', newText });
  }, [nodes, edges]);

  function generateFlowText(nodes: any[], edges: any[]) {
    // ノードとエッジの情報からテキストを生成するロジックを実装
    return JSON.stringify({ nodes, edges }, null, 2);
  }

  useEffect(() => {
    updateEditorContent();
  }, [nodes, edges, updateEditorContent]);

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

