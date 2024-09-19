
import React from "react";
import { Grid, Box } from "@mui/material";
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
import data  from './data.js';
import CaseNode from '../../components/FlowComponents/CaseNode';
import CaseEdge from '../../components/FlowComponents/CaseEdge';
import { useCallback, useEffect, useState } from 'react';

const nodeTypes = {
  case_node: CaseNode,
};

const edgeTypes = {
  case_edge: CaseEdge
}

const WorkflowManagement = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(

    data
    .map((obj,idx)=>({
      type: 'case_node', 
      id: obj.stageIdenty,
      position: { x: idx*400, y: idx*200 },
      data: obj
    }))
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(

    data
    .filter((obj)=> obj.condition.length>0)
    .reduce(
      (accumulator, currentValue) => currentValue.condition.concat(accumulator)
      ,[])
    .map((obj)=>
      ({
        id: 'e' + obj.source + '-' + obj.jumpTo,
        source: obj.source,
        target: obj.jumpTo,
        type: 'case_edge'
      }))
  );
 
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

    console.log(nodes);
    console.log(edges);

  return (
    <Box>
      <div style={{ width: '100%', height: '700px', border: '2px solid #32a1ce',padding:6}}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </Box>
  );
};

export default WorkflowManagement;
