"use client";

import { useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import axios from "axios";

export default function Dashboard() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nodeRes, edgeRes] = await Promise.all([axios.get<any[]>("/api/node"), axios.get<any[]>("/api/edge")]);

        setNodes(
          nodeRes.data.map((node: any) => ({
            id: node.id.toString(),
            data: { label: node.label },
            position: { x: node.positionX, y: node.positionY },
            style: { backgroundColor: node.color || "#ddd" },
          }))
        );

        setEdges(
          edgeRes.data.map((edge: any) => ({
            id: edge.id.toString(),
            source: edge.source.toString(),
            target: edge.target.toString(),
          }))
        );
      } catch (error) {
        console.error("Error fetching nodes and edges:", error);
      }
    };
    fetchData();
  }, []);

  const addNode = async () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      label: `Node ${nodes.length + 1}`,
      position_x: 250,
      position_y: nodes.length * 100 + 50,
      color: "#1976d2",
    };

    setNodes((prev) => [
      ...prev,
      { id: newNode.id, data: { label: newNode.label }, position: { x: newNode.position_x, y: newNode.position_y }, style: { backgroundColor: newNode.color } },
    ]);

    try {
      await axios.post("/api/node", newNode);
    } catch (error) {
      console.error("Error adding node:", error);
    }
  };

  const deleteNode = async (id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
    setEdges((prev) => prev.filter((edge) => edge.source !== id && edge.target !== id));

    try {
      await axios.delete("/api/node", { params: { id } });
    } catch (error) {
      console.error("Error deleting node:", error);
    }
  };

  const onConnect = async (connection: Connection) => {
    const newEdge = { id: `${edges.length + 1}`, source: connection.source, target: connection.target };

    setEdges((prev) => [...prev, newEdge]); 
    try {
      await axios.post("/api/edge", newEdge);
    } catch (error) {
      console.error("Error creating edge:", error);
    }
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
          onConnect={onConnect}
          onNodeClick={(_, node) => deleteNode(node.id)}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </Paper>
    </Container>
  );
}
