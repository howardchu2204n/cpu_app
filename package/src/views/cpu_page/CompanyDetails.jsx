import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, Box } from "@mui/material";

const CompanyDetails = () => {

  return (
    <Grid
    component="form" 
    xs={12}
    >
        <Box style={{color:'gray', fontSize: 60}}>Company Details</Box>
        <TextField
            style={{margin:10}}
            sx={{ width: '100%' }}
            required
            id="outlined-required"
            label="Company Names"
            defaultValue=""
            />
        <TextField
            style={{margin:10}}
            sx={{ width: '100%' }}
            required
            id="outlined-required"
            label="Company Mail Address"
            defaultValue=""
            />
        <TextField
            style={{margin:10}}
            sx={{ width: '100%' }}
            required
            id="outlined-required"
            label="Company Physical Address"
            defaultValue=""
            />
        <TextField
            style={{margin:10}}
            sx={{ width: '100%' }}
            required
            id="outlined-required"
            label="Company Phone Number"
            defaultValue=""
            />
    </Grid>
  );
};

export default CompanyDetails;
