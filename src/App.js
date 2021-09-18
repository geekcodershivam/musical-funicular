import "./App.css";
import React, { useState } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
export default function App() {
  const [value, setValue] = useState("");

  return (
    <div className="app">
      <Box py={8} bgcolor="black">
        <Grid container justifyContent="center">
          <Grid item>
            <Typography
              style={{ color: "white", fontWeight: "600" }}
              variant="h4"
            >
              Search Photos
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Header data={setValue} />
      <Gallery search={value} />
    </div>
  );
}
