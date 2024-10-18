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
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import data from './data.js';
import CaseNode from '../../components/FlowComponents/CaseNode';
import CaseEdge from '../../components/FlowComponents/CaseEdge';
import { useCallback, useEffect, useState } from 'react';
import default_node from "./nodeStruct.js"
import "./WorkflowManagement.css";
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { postData, readyData, changeData, init } from '../../action/WorkflowDetailsAction.js';


const nodeTypes = {
  case_node: CaseNode,
};

const edgeTypes = {
  case_edge: CaseEdge
}

const WorkflowManagement = () => {

  const dispatch = useDispatch();
  const { WorkflowDetailsReducer } = useSelector((state) => {
    console.log("VSAchieve ->");
    console.log(state.WorkflowDetailsReducer);
    return state;
  });

  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState(
    data
      .map((obj, idx) => ({
        type: 'case_node',
        id: obj.stageIdenty,
        position: { x: idx * 400, y: idx * 200 },
        data: {
          ...obj,
          addNew: (e, d) => { },
          delOld: (e, d) => { }
        }
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

  const [selectedNode, setSelectNode] = useState({
    ...default_node,
    data: {
      ...default_node.data,
      addNew: () => {
        console.log("clicked add");
      },
      delOld: () => {
        console.log("clicked del");
      }
    },
    node_length: Math.max(...nodes.map(nd => parseInt(nd.stageIdenty) + 1))
  });

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  const addNew = useCallback(
    (event, soruce_node) => {
      console.log("addNew->");
      console.log("node_length: " + selectedNode.node_length.toString());
      setSelectNode((node) => {
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        const newNode = {
          type: 'case_node',
          id: node.node_length.toString(),
          position: screenToFlowPosition({
            x: clientX + 350,
            y: clientY,
          }),
          data: {
            "stageIdenty": node.node_length.toString(),
            "stageTitle": "unnamed",
            "stageSummary": "empty symmary",
            "condition": [],
            addNew,
            delOld
          },
          origin: [0.5, 0.0],
        };
        setNodes((nds) =>
          [...nds, newNode]
            .map((nd) => {
              if (nd.data.stageIdenty == soruce_node.stageIdenty) {
                nd.data.condition = [...nd.data.condition, {
                  conditionTriggerDesc: 'Please update condition',
                  source: soruce_node.stageIdenty,
                  jumpTo: node.node_length.toString()
                }];
              }
              return nd;
            }));
        setEdges((edg) => [...edg, {
          id: 'e' + soruce_node.stageIdenty + '-' + node.node_length.toString(),
          type: 'case_edge',
          source: soruce_node.stageIdenty,
          target: node.node_length.toString()
        }]);
        return { ...node, node_length: node.node_length + 1 };
      });
      console.log(edges);

      console.log(nodes);
    }, [screenToFlowPosition, setNodes, setEdges, setSelectNode]);

  const delOld = useCallback(
    (event, target_node) => {
      console.log("delOld->");
      console.log(nodes);
      console.log(edges);
      console.log(target_node);
      setNodes((nds) =>
        treeDelReducing(nds, target_node.stageIdenty)
      );
      setEdges((eds) =>
        eds.filter((ed) =>
          !(ed.source == target_node.stageIdenty ||
            ed.target == target_node.stageIdenty)
        ));
    }, [setNodes, setEdges]);

  const treeDelReducing = (tree, id_list) => {

    const node_todel = tree.filter(nd => id_list.includes(nd.data.stageIdenty));
    const jumpTo_condition = node_todel.reduce((prev, next) => {
      return prev.concat(next.data.condition);
    }, []).map(cdt => cdt.jumpTo);

    const new_tree = tree
      .filter(nd => !id_list.includes(nd.data.stageIdenty))
      .map(nd => {
        if (nd.data.condition.some(cdt => id_list.includes(cdt.jumpTo))) {
          nd.data.condition = nd.data.condition.filter(cdt => !id_list.includes(cdt.jumpTo));
        }
        return nd;
      });

    // .map()
    // .map(nd => {
    //   if (nd.data.condition.some(cdt => cdt.jumpTo == tree.data.stageIdenty)) {
    //     nd.data.condition = nd.data.condition.filter(cdt => cdt.jumpTo != tree.data.stageIdenty);
    //   }
    //   return nd;
    // });

    if (jumpTo_condition.length != 0)
      return treeDelReducing(new_tree, jumpTo_condition)
    else
      return new_tree;
  }

  const updateNodeById = useCallback((id, column, value, index = -1, condit_column = 'undefined') => {
    setNodes((nds) => {
      return nds.map((nd) => {
        if (nd.id == id) {
          if (column == 'condition' & index != -1 & condit_column != 'undefined') {
            nd.data[column][index][condit_column] = value;
          } else {
            nd.data[column] = value;
          }
        }
        return nd;
      });
    })
  }, [setNodes]);

  const onNodeClickNDrag = (event, node) => {
    setSelectNode(nd => ({ ...node, node_length: nd.node_length }));
  };

  const submitChange = () => {
    dispatch(changeData({
      ...WorkflowDetailsReducer.parameters, data:
        nodes.map(nd => {
          nd.data.addNew = undefined;
          nd.data.delOld = undefined;
          return nd.data;
        })
    }));
  }

  const refresh_flow = () => {
    dispatch(postData(WorkflowDetailsReducer.parameters, (ret_data) => {
      console.log(ret_data);
      if (ret_data != null && ret_data.resources != null && ret_data.resources.length != 0) {
        setNodes((nds) => {
          const ret_nds = ret_data.resources[0].stage_data;
          setSelectNode((node) => ({ ...node, node_length: Math.max(...ret_nds.map(nd => parseInt(nd.stageIdenty) + 1)) }));
          return ret_nds
            .map((obj, idx) => ({
              type: 'case_node',
              id: obj.stageIdenty,
              position: { x: idx * 400, y: idx * 200 },
              data: {
                ...obj,
                addNew: addNew,
                delOld: delOld,
              }
            }))
        });
        setEdges(
          ret_data.resources[0].stage_data
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
            })));
      }
    }));
  }
  useEffect(() => {
    refresh_flow();
  }, []);

  return (
    <Box>
      <Box style={{ color: 'gray', fontSize: 60 }}>Workflow Management</Box>
      <Grid container sx={{ background: "linear-gradient(to bottom right,#32a1ce, #e66465)", height: "740px", padding: 1 }}>
        <Grid item xs={8} sx={{ height: '700px' }}>
          <div style={{ height: '94%', border: '2px solid #32a1ce', margin: "1%", backgroundColor: "white" }}>
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
              defaultViewport={{ x: 50, y: 50, zoom: 0.7 }}
            >
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
          <div style={{ height: '4%', border: '2px solid #32a1ce', margin: "1%", padding: 2, backgroundColor: "white" }}>
            {"Click the stage rectangle for details & modification."}
            {JSON.stringify(WorkflowManagement)}
          </div>
        </Grid>
        <Grid item xs={4} sx={{ height: '700px' }}>

          <div style={{ height: '100%', border: '2px solid #32a1ce', padding: 3, margin: "1%", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", backgroundColor: "white" }}>

            <div style={styleSheet.detailsColumn}>
              <FormControl variant="standard" sx={{ width: '97%', margin: '5px' }}>
                <InputLabel htmlFor="component-simple">Statge Title</InputLabel>
                <Input id="component-simple"
                  onChange={(e) => { updateNodeById(selectedNode.id, 'stageTitle', e.target.value) }}
                  value={selectedNode == null ? "select any node" : selectedNode.data.stageTitle} />
              </FormControl>
            </div>
            <div style={styleSheet.detailsColumn}>
              <FormControl variant="standard" sx={{ width: '97%', margin: '5px' }}>
                <InputLabel htmlFor="component-simple">Statge Summary</InputLabel>
                <Input id="component-simple"
                  multiline
                  rows={4}
                  onChange={(e) => { updateNodeById(selectedNode.id, 'stageSummary', e.target.value) }}
                  value={selectedNode == null ? "select any node" : selectedNode.data.stageSummary} />
              </FormControl>
            </div>

            <div style={{ ...styleSheet.detailsColumn }}>
              <InputLabel fullWidth htmlFor="component-simple" style={{ fontSize: '15px', borderBottom: "1px solid gray" }}>Next Statge(s) : </InputLabel>
              <div style={{ height: '320px', overflow: "scroll", margin: "3px" }}>
                {selectedNode == null ? "select any node" :
                  (selectedNode.data.condition.length == 0 ?
                    (
                      <div style={styleSheet.detailsColumnCondit}>
                        <FormControl variant="standard" sx={{ width: '97%', margin: '5px' }}>
                          <InputLabel htmlFor="component-simple">Condition Identifer</InputLabel>
                          <Input
                            multiline
                            rows={2}
                            value={"No Futher Condition, click add child to enable"} />
                        </FormControl>
                        <FormControl variant="standard" sx={{ width: '97%', margin: '5px' }}>
                          <TextField
                            variant="standard"
                            required
                            disabled
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <div style={{ fontSize: '15px', width: '180px', color: "green" }}>Jump To ID &#8594; &nbsp; </div>
                              ),
                            }}
                            value={"No Jumping"}
                          />
                        </FormControl>
                      </div>
                    ) :
                    selectedNode.data.condition.map((condit, index) => (
                      <div style={styleSheet.detailsColumnCondit}>
                        <FormControl variant="standard" sx={{ width: '97%', margin: '5px' }}>
                          <InputLabel htmlFor="component-simple">Condition Identifer</InputLabel>
                          <Input
                            multiline
                            rows={2}
                            onChange={(e) => { updateNodeById(selectedNode.id, 'condition', e.target.value, index, 'conditionTriggerDesc') }}
                            value={condit.conditionTriggerDesc} />
                        </FormControl>
                        <FormControl variant="standard" sx={{ width: '97%', margin: '5px' }}>
                          <TextField
                            variant="standard"
                            required
                            fullWidth
                            disabled
                            onChange={(e) => { updateNodeById(selectedNode.id, 'condition', e.target.value, index, 'jumpTo') }}
                            InputProps={{
                              startAdornment: (
                                <div style={{ fontSize: '15px', width: '180px', color: "green" }}>Jump To ID &#8594; &nbsp; </div>
                              ),
                            }}
                            value={condit.jumpTo}
                          />
                        </FormControl>
                      </div>
                    )))}
              </div>
            </div>
            <div style={{ width: '93%', display: "flex", flexDirection: 'column', justifyContent: 'space-around' }}>
              <Button
                fullWidth
                sx={{ margin: "3px" }}
                variant="contained"
                disabled
                onClick={(e) => { console.log(selectedNode.node_length) }}
                color={'secondary'}>Save Node Changes</Button>
              <Button
                fullWidth
                sx={{ margin: "3px" }}
                variant="contained"
                onClick={() => {
                  submitChange();
                }}
                color={'secondary'}>Save All Changes</Button>
            </div>
          </div>
        </Grid>
      </Grid >
    </Box>
  );
};

const styleSheet = {
  detailsColumn: {
    width: "90%",
    borderTop: '2px solid #32a1ce',
    borderLeft: '2px solid #32a1ce',
    borderBottom: '2px solid #a5a5a5',
    borderRight: '2px solid #a5a5a5',
    padding: "4px",
    margin: "4px"
  },
  detailsColumnCondit: {
    width: "90%",
    borderTop: '2px solid green',
    borderLeft: '2px solid green',
    borderBottom: '2px solid #a5a5a5',
    borderRight: '2px solid #a5a5a5',
    padding: "4px",
    margin: "4px"
  }
}


export default () => (
  <ReactFlowProvider>
    <WorkflowManagement />
  </ReactFlowProvider>
);

