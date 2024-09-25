import React, { useEffect } from "react";
import { Grid, Box, TextField } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DownloadIcon from '@mui/icons-material/Download';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import './VSAchieve.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { postData, readyData } from '../../action/VSAchieveAction';


const VSAchieve = () => {
    const dispatch = useDispatch();
    const { loading, data, error, parameters } = useSelector((state) => state);
    const changeValuePairData = (name, value) => {
        changeData(
            parameters.company_id,
            parameters.interval_value,
            parameters.page_num,
            parameters.search_value_pair.map(obj => {
                if (obj.value_name == name) {
                    let obj_replace = {};
                    obj_replace.value_name = obj.value_name;
                    obj_replace.value = value;
                    return obj_replace;
                }
                return obj;
            }));
    };
    const changeData = (company_id, interval_value, page_num, search_value_pair, callbacks = (i) => { }) => {
        const parameters_ = {
            "company_id": company_id,
            "interval_value": interval_value,
            "page_num": page_num,
            "search_value_pair": [
                {
                    "value_name": "start",
                    "value": search_value_pair.filter(obj => obj.value_name == 'start')[0].value
                },
                {
                    "value_name": "end",
                    "value": search_value_pair.filter(obj => obj.value_name == 'end')[0].value
                },
                {
                    "value_name": "agentName",
                    "value": search_value_pair.filter(obj => obj.value_name == 'agentName')[0].value
                }]
        };
        callbacks(parameters_);
        dispatch(readyData(parameters_));
    };
    const submitData = (parameters_) => {
        console.log(parameters_);
        dispatch(postData(parameters_));
    }

    return (
        <Grid
            component="form"
            xs={12}
        >
            <Box style={{ color: 'gray', fontSize: 60 }}>Voice & Summary Achieve</Box>
            <div className={"flexbox-row"}>
                <div>Agent Name:</div>
                <TextField label="Agent Name" onChange={(e) => changeValuePairData('agentName', e.target.value)} value={parameters.search_value_pair.filter(obj => obj.value_name == 'agentName')[0].value} />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column", margin: 3 }}>
                        <div style={{ width: "100px" }}>StartDate</div>
                        <DatePicker selected={parameters.search_value_pair.filter(obj => obj.value_name == 'start')[0].value} onChange={(date) => { changeValuePairData('start', date.getTime()); console.log(parameters.search_value_pair); }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", margin: 3 }}>
                        <div style={{ width: "100px" }}>EndDate</div>
                        <DatePicker selected={parameters.search_value_pair.filter(obj => obj.value_name == 'end')[0].value} onChange={(date) => { changeValuePairData('end', date.getTime()); console.log(parameters.search_value_pair); }} />
                    </div>
                </div>
                <Button variant="contained" onClick={() => { changeData(parameters.company_id, parameters.interval_value, parameters.page_num, parameters.search_value_pair, submitData); }}>Search</Button>
                <ButtonGroup variant="contained" aria-label="Basic button group">
                    <Button>Previous</Button>
                    {
                        data == null ?
                            Array(5).fill(0).map((_, idx) => {
                                return <Button disabled>
                                    {idx + 1}
                                </Button>
                            }) :
                            Array(5).fill(0).map((_, idx) => {
                                const pn_plus_one = parseInt(data.page_num) + 1;
                                let shown_text = idx + 1;
                                let callback = () => { };
                                let color = 'primary';
                                if (pn_plus_one <= 2) {
                                    callback = () => {
                                        changeData(parameters.company_id, parameters.interval_value, idx.toString(), parameters.search_value_pair, submitData);
                                    };
                                    color = data.page_num == idx ? 'secondary' : 'primary';
                                    shown_text = idx + 1;
                                } else {
                                    callback = () => {
                                        changeData(parameters.company_id, parameters.interval_value, (data.page_num - 2 + idx).toString(), parameters.search_value_pair, submitData);
                                    };
                                    color = data.page_num == (data.page_num - 2 + idx) ? 'secondary' : 'primary';
                                    shown_text = pn_plus_one - 3 + (idx + 1);
                                }
                                return <Button
                                    onClick={callback}
                                    color={color}>
                                    {shown_text}
                                </Button>;
                            })
                    }
                    <Button>Next</Button>
                </ButtonGroup>
            </div>
            <div className={"flexbox-wrapper"}>
                <List sx={{ width: '99%', maxWidth: '99%', bgcolor: 'background.white' }}>
                    {
                        data == null ? 'Loading..' :
                            data.resources.map(obj => (
                                <ListItem sx={{ bgcolor: '#bfcfe3', margin: 1 }}>
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
            </div>
        </Grid>
    );
};

export default VSAchieve;

