"use client";
import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import AppBar from '@/components/AppBar';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges = [
  { id: '1-2', source: '1', target: '2' }
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeText, setNodeText] = useState('');

  const onConnect = useCallback(
    (params:any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const handleAddNode = () => {
    const id = (nodes.length + 1).toString();
    const newNode = {
      id,
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      data: { label: nodeText || `Node ${id}` },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeText(''); // Reset the input field after adding the node
  };

  const handleNodeTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeText(event.target.value);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        <AppBar signup={false} contactSales={true} threeLines={true} Login={false} network={true} />
      <div className="mb-4 flex justify-center items-center mt-10">
        <input
          type="text"
          value={nodeText}
          onChange={handleNodeTextChange}
          placeholder="Enter node text"
          className="border p-2 rounded-lg "

        />
        <button
          onClick={handleAddNode}
          className="ml-2 p-2 bg-blue-500 text-white"
        >
          Add Node
        </button>
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Controls />
          <Background  gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
