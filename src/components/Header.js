import React from "react";
import { Box, Grid, makeStyles} from "@material-ui/core";
import Search from './SearchBar'
const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: "#fff",
    boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    "& > *": {
      height: "56px",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center">
      <Grid item> 
        <Box className={classes.wrapper} mt={-8}>
          <Search placeholder="Search Photo..." values={props.data} />
        </Box>
      </Grid>
    </Grid>
  );
}


