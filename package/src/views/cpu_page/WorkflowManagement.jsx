
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
import data from './data.js';
import CaseNode from '../../components/FlowComponents/CaseNode';
import CaseEdge from '../../components/FlowComponents/CaseEdge';
import { useCallback, useEffect, useState } from 'react';
import default_node from "./nodeStruct.js"
import "./WorkflowManagement.css";

const nodeTypes = {
  case_node: CaseNode,
};

const edgeTypes = {
  case_edge: CaseEdge
}

const WorkflowManagement = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    data
      .map((obj, idx) => ({
        type: 'case_node',
        id: obj.stageIdenty,
        position: { x: idx * 400, y: idx * 200 },
        data: obj
      }))
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    data
      .filter((obj) => obj.condition.length > 0)
      .reduce(
        (accumulator, currentValue) => currentValue.condition.concat(accumulator)
        , [])
      .map((obj) =>
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

  const [selectedNode, setSelectNode] = useState(
    default_node
  );
  const onNodeClickNDrag = (event, node) => setSelectNode(node);

  console.log(nodes);
  console.log(edges);

  return (
    <Grid container>
      <Grid item xs={8}>
        <div style={{ height: '700px', border: '2px solid #32a1ce', padding: 6 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClickNDrag}
            onNodeDrag={onNodeClickNDrag}
            onConnect={onConnect}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
      </Grid>
      <Grid item xs={4}>

        <div style={{ height: '700px', border: '2px solid #32a1ce', padding: 6, marginLeft: 3, display: "flex", flexDirection: "column" }}>
          <div style={styleSheet.detailsColumn}>Statge Title: {selectedNode == null ? "select any node" : selectedNode.data.stageTitle}</div>
          <div style={styleSheet.detailsColumn}>Statge Details: {selectedNode == null ? "select any node" : selectedNode.data.stageSummary}</div>
          <div style={styleSheet.detailsColumn}>Next Statge(s) : <br />
            {selectedNode == null ? "select any node" :
              (selectedNode.data.condition.length == 0 ?
                (
                  <div style={styleSheet.detailsColumnCondit}>
                    No Futher Condition <br />
                    Jump to - Stage ID = No Jumping
                  </div>
                ) :
                selectedNode.data.condition.map(condit => (
                  <div style={styleSheet.detailsColumnCondit}>
                    {condit.conditionTriggerDesc} <br />
                    Jump to - Stage ID = {condit.jumpTo}
                  </div>
                )))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

const styleSheet = {
  detailsColumn: {
    width: "90%",
    borderTop: '2px solid #32a1ce',
    borderLeft: '2px solid #32a1ce',
    borderBottom: '2px solid gray',
    borderRight: '2px solid gray',
    padding: "4px",
    margin: "4px"
  },
  detailsColumnCondit: {
    width: "90%",
    borderTop: '2px solid green',
    borderLeft: '2px solid green',
    borderBottom: '2px solid gray',
    borderRight: '2px solid gray',
    padding: "4px",
    margin: "4px"
  }
}

export default WorkflowManagement;
