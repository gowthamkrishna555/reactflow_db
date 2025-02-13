import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Box, Typography, Paper } from "@mui/material";
import { useRouter } from "next/router";
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";

const defaultNodes = [];

export default function Dashboard() {
  const router = useRouter();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [editingNodeId, setEditingNodeId] = useState(null);
  const [editText, setEditText] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedNodes = JSON.parse(localStorage.getItem("nodes")) || defaultNodes;
      const storedEdges = JSON.parse(localStorage.getItem("edges")) || [];
      setNodes(storedNodes);
      setEdges(storedEdges);
    }
  }, []);
    
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nodes", JSON.stringify(nodes));
      localStorage.setItem("edges", JSON.stringify(edges));
    }
  }, [nodes, edges]);

  
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("user")) {
      router.push("/login");
    }
  }, []);

  const addNode = () => {
    const newNodeId = `${nodes.length + 1}`;
    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: { x: 250, y: nodes.length * 100 + 50 },
      style: {}
    };
    setNodes((prev) => [...prev, newNode]);

    
    if (selectedNodeId) {
      setEdges((prev) => [...prev, { id: `e${selectedNodeId}-${newNodeId}`, source: selectedNodeId, target: newNodeId }]);
    }
  };

  
  const markAsDone = (id) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id ? { ...node, style: { backgroundColor: "lightgreen", border: "2px solid green" } } : node
      )
    );
  };

  
  const deleteNode = (id) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
    setEdges((prev) => prev.filter((edge) => edge.source !== id && edge.target !== id));
  };

  
  const onNodeDoubleClick = (event, node) => {
    setEditingNodeId(node.id);
    setEditText(node.data?.label || "Unnamed Node");
  };

  const onTextChange = (event) => setEditText(event.target.value);

  const onTextBlur = () => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === editingNodeId ? { ...node, data: { ...node.data, label: editText } } : node
      )
    );
    setEditingNodeId(null);
  };

  return (
    <Container maxWidth="md">
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} mb={2}>
        <Typography variant="h4" fontWeight="bold">React Flow Dashboard</Typography>
        <Button variant="contained" onClick={addNode} sx={{ backgroundColor: "#1976d2" }}>Add Node</Button>
      </Box>

      
      <Paper elevation={3} sx={{ height: "500px", borderRadius: 2, overflow: "hidden" }}>
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange} 
          onEdgesChange={onEdgesChange} 
          onNodeDoubleClick={onNodeDoubleClick} 
          onNodeClick={(event, node) => setSelectedNodeId(node.id)}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </Paper>

      
      <Box mt={3}>
        {nodes.map((node) => (
          <Box key={node.id} display="flex" alignItems="center" mt={1}>
            
            {editingNodeId === node.id ? (
              <TextField value={editText} onChange={onTextChange} onBlur={onTextBlur} autoFocus size="small" />
            ) : (
              <Typography variant="body1" sx={{ minWidth: 80 }}>
                {node.data?.label || "Unnamed Node"}
              </Typography>
            )}

            {/* Action Buttons */}
            <Button variant="contained" size="small" color="primary" onClick={() => setEditingNodeId(node.id)} sx={{ ml: 1 }}>Edit</Button>
            <Button variant="contained" size="small" color="success" onClick={() => markAsDone(node.id)} sx={{ ml: 1 }}>Mark Done</Button>
            <Button variant="contained" size="small" color="error" onClick={() => deleteNode(node.id)} sx={{ ml: 1 }}>Delete</Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
