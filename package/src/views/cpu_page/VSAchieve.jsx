import React from "react";
import { Grid, Box } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DownloadIcon from '@mui/icons-material/Download';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const data = Array(20).fill(0).map((_,idx)=>{
    return {
        date: ((()=>{
            let day = new Date();
            day.setDate(idx);
            return day;
        })()),
        agentName: ['Peter','Ben','Louis'][idx%2],
        caseID: '19890604'+idx,
        voiceURL:'www.google.com',
    };
})

const VSAchieve = () => {
  return (
    <Grid
    component="form" 
    xs={12}>
        <Box style={{color:'gray', fontSize: 60}}>Voice & Summary Achieve</Box>
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.white' }}>
        {
            data.map(obj=>(
                    <ListItem sx={{ bgcolor: '#bfcfe3',margin:1 }}>
                        <a href={obj.voiceURL}>
                            <ListItemAvatar>
                                <Avatar>
                                    <DownloadIcon />
                                </Avatar>
                            </ListItemAvatar>
                        </a>
                        <ListItemText 
                            primary={'Date: ' + obj.date.toString()} 
                            secondary={'Responsible Agent: ' + obj.agentName + ', CaseID: ' + obj.caseID} />
                    </ListItem>
            ))
        }
        </List>
    </Grid>
  );
};

export default VSAchieve;

