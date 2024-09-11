import React from "react";
import { Box, Button, Typography } from "@mui/material";
import sidebarBuynow from "../../../assets/images/backgrounds/sidebar-buynow.png";

const Buynow = () => {
  //const customizer = useSelector((state)=> state.CustomizerReducer);

  return (
    <Box pb={5} mt={5}>
      <Box
        p={2}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.light,
          borderRadius: "10px",
        }}
        style={{ position: "relative" }}
      >
        <img
          src="https://static.wixstatic.com/media/874a91_706ba3cb30154aa0b48db09d6891bd62~mv2.png/v1/fill/w_158,h_126,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/874a91_706ba3cb30154aa0b48db09d6891bd62~mv2.png"
          style={{
            position: "absolute",
            right: "-10px",
            top: "-18px",
          }}
        />
        <Box pb={1} pt={2} sx={{ width: "100%" }}>
          <Typography
            variant="h5"
            mb={2}
            sx={{
              color: (theme) => theme.palette.secondary.main,
              zIndex: "9",
              position: "relative",
            }}
          >
            <br /> <br /> Powered By <br /> Call Pickup Limited
          </Typography>
          <Button
            color="success"
            href="https://www.callpickup.com.hk"
            fullWidth
            disableElevation
            variant="contained"
          >
            Visit Our Page
          </Button>
        </Box>
        {/*
        <img
          src={sidebarBuynow}
          alt={sidebarBuynow}
          style={{
            position: "absolute",
            right: "-10px",
            top: "-18px",
          }}
        />
        <Box pb={1} pt={2} sx={{ width: "100%" }}>
          <Typography
            variant="h5"
            mb={2}
            sx={{
              color: (theme) => theme.palette.secondary.main,
              zIndex: "9",
              position: "relative",
            }}
          >
            Built with <br /> Material-UI
          </Typography>
          <Button
            color="success"
            href="https://www.wrappixel.com/templates/flexy-react-admin-template/"
            fullWidth
            disableElevation
            variant="contained"
          >
            Check Pro Version
          </Button>
         */}
      </Box>
    </Box>
  );
};

export default Buynow;
