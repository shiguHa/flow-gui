import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  SelectionMode,
  PanOnScrollMode,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { ButtonEdgeWithAddNode } from './components/ButtonEdgeWithAddNode';
import { GroupNode } from './components/GroupNode';
import { IFGroupNode } from './components/IFGroupNode';
import { FlowStoreType, useFlowStore } from './store';
import { useShallow } from 'zustand/shallow';
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import ActionNode from './components/ActionNode';

// const vscode = acquireVsCodeApi();

const nodeTypes = {
  actionNode: ActionNode,
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
  setNodes: state.setNodes,
});


export default function App() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgeChange,
    setNodes
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

  // TODO:後からdnd-kit関連は別のコンポーネントに移す
  const sensors = useSensors(
    useSensor(PointerSensor),
  );

  const handleDragStart = (event: any) => {
    console.log('drag start', event);
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {

    }
  };


  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgeChange}
          draggable={false}
          edgesFocusable={false}
          elevateEdgesOnSelect={false}
          nodesConnectable={false}
          nodesDraggable={false}
          nodesFocusable={false}
          selectNodesOnDrag={true}
          selectionMode={SelectionMode.Partial}
          elementsSelectable={true}
          selectionOnDrag={true}
          panOnScroll={true}
          panOnScrollMode={PanOnScrollMode.Free}
          fitView={false}
          panOnDrag={[1, 2]}
        >
          <Controls showInteractive={false} />
          <MiniMap />
        </ReactFlow>
      </div>
    </DndContext>
  );
}


