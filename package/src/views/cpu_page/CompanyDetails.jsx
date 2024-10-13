import React, { useEffect } from "react";
import { Button, TextField, ButtonGroup } from "@mui/material";
import { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, Box } from "@mui/material";
import axios from "axios";
import { postData, readyData, init } from "../../action/CompanyDetailsAction";
import { useDispatch, useSelector } from 'react-redux';

const CompanyDetails = () => {
  let i = 0;
  const dispatch = useDispatch();
  const { CompanyDetailsReducer } = useSelector((state) => {
    console.log("CompanyDetails->");
    console.log(state);
    return state;
  });
  const getData = () => {
    dispatch(postData(CompanyDetailsReducer.parameters));
  }
  useEffect(() => { 
    getData();
  }, []);
  return (
    <Grid
      component="form"
      xs={12}
    >
      {/* {JSON.stringify(CompanyDetailsReducer)} */}
      <Box style={{ color: 'gray', fontSize: 60 }}>Company Details</Box>
      <TextField
        style={{ margin: 10 }}
        sx={{ width: '100%' }}
        required
        id="outlined-required"
        label="Company Names"
        value={CompanyDetailsReducer.data == null ? '' : CompanyDetailsReducer.data.resources[0].company_name}
      />
      <TextField
        style={{ margin: 10 }}
        sx={{ width: '100%' }}
        id="outlined-required"
        label="Company Mail Address"
        value={CompanyDetailsReducer.data == null ? '' : CompanyDetailsReducer.data.resources[0].company_mail}
      />
      <TextField
        style={{ margin: 10 }}
        sx={{ width: '100%' }}
        required
        id="outlined-required"
        label="Company Physical Address"
        value={CompanyDetailsReducer.data == null ? '' : CompanyDetailsReducer.data.resources[0].company_address}
      />
      <TextField
        style={{ margin: 10 }}
        sx={{ width: '100%' }}
        required
        id="outlined-required"
        label="Company Phone Number"
        value={CompanyDetailsReducer.data == null ? '' : CompanyDetailsReducer.data.resources[0].company_phone}
      />
      <TextField
        style={{ margin: 10 }}
        sx={{ width: '100%' }}
        required
        id="outlined-required"
        label="Contact Person"
        defaultValue=""
      />
      <TextField
        style={{ margin: 10 }}
        sx={{ width: '100%' }}
        required
        id="outlined-required"
        label="Title of Contact Person"
        defaultValue=""
      />
      <TextField
        style={{ margin: 10 }}
        sx={{ width: '100%' }}
        required
        id="outlined-required"
        label="Client Reference No."
        defaultValue=""
      />
      <Grid container
        style={{ margin: 10 }}>
        <Grid item xs={8}>

          {/* <ButtonGroup
            sx={{ width: '100%' }}
            variant="contained" aria-label="Basic button group">

            <Button
              onClick={getData}
              sx={{ width: '100%' }}
              color={'primary'}>Get Data</Button>
          </ButtonGroup>  */}
        </Grid>
        <Grid item xs={4}>
          <ButtonGroup
            sx={{ width: '100%' }}
            variant="contained" aria-label="Basic button group">
            <Button
              sx={{ width: '100%' }}
              color={'primary'}>Save</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompanyDetails;
