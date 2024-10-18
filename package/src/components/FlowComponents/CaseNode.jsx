import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Box, ButtonGroup, Button } from '@mui/material';
import './CaseNode.css';
import { Handle, Position } from '@xyflow/react';

export default function CaseNode({ id, data }) {
  return (
    <div style={{ width: '350px', display: 'flex', flexDirection: 'column', background: "linear-gradient(to bottom right,#32a1ce, #e66465)", padding: "3px", borderRadius: "3px" }}>

      <Handle type="target" position={Position.Left} />
      <div>
        <p className='title'>{data.stageIdenty + '/' + data.stageTitle}</p>

        <label style={{ display: 'flex', flexDirection: 'column' }}>
          <span className='jobsTitle'>Job Details</span>
          <span className='jobsSummary'>{data.stageSummary}</span>
        </label>

        <center><label>
          {
            data.condition.length > 0 ?
              <List className='jobsConList'>
                {data.condition.map((obj, idx) => (
                  <ListItem className='jobsConItem' sx={{ margin: '3px', width: 'unset' }}>
                    <div>{obj.conditionTriggerDesc}</div>
                    <div>{' - Jump to stage ' + obj.jumpTo}</div>
                  </ListItem>
                ))}
              </List>
              : <></>
          }
        </label></center>
        <ButtonGroup
          sx={{ width: '100%' }}
          style={{ flexDirection: 'row' }}
          variant="contained" aria-label="Basic button group">
          <Button
            sx={{ width: '100%', margin: "3px" }}
            onClick={(e) => data.addNew(e, data)}
            color={'secondary'}>Add Child Node</Button>
          <Button
            sx={{ width: '100%', margin: "3px" }}
            onClick={(e) => {
              data.delOld(e, data);
            }}
            color={'secondary'}>Delete Node</Button>
        </ButtonGroup>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
      />
    </div>
  );
};