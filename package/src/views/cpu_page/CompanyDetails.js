import React from "react";
import { TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, Box } from "@mui/material";

const CompanyDetails = () => {

  return (
    <Box
    component="form" 
    sx={{ width: '100%' }}>
        <Box>Company Details</Box>
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
    </Box>
  );
};

export default CompanyDetails;
