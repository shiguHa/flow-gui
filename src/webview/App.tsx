import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import { ButtonEdgeWithAddNode } from './components/ButtonEdgeWithAddNode';
import { GroupNode } from './components/GroupNode';
import { IFGroupNode } from './components/IFGroupNode';
import { FlowStoreType, useFlowStore } from './store';
import { useShallow } from 'zustand/shallow';

// const vscode = acquireVsCodeApi();

const nodeTypes = {
  groupNode: GroupNode,
  ifGroupNode: IFGroupNode,
};
const edgeTypes = {
  buttonedge: ButtonEdgeWithAddNode,
};
 
const selector = (state: FlowStoreType) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgeChange: state.onEdgesChange,
});


export default function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgeChange,
  } = useFlowStore(useShallow(selector));
 
  const updateEditorContent = useCallback(() => {
    const newText = generateFlowText(nodes, edges);
    // vscode.postMessage({ command: 'updateEditorContent', newText });
  }, [nodes, edges]);

  function generateFlowText(nodes: any[], edges: any[]) {
    // ノードとエッジの情報からテキストを生成するロジックを実装
    return JSON.stringify({ nodes, edges }, null, 2);
  }

  useEffect(() => {
    updateEditorContent();
  }, [nodes, edges, updateEditorContent]);
  
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgeChange}
      >
        <Controls showInteractive={false}/>
        <MiniMap/>
      </ReactFlow>
    </div>
  );
}


