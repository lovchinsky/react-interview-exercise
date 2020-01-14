import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography
} from "@material-ui/core";

const RelatedImages = () => {
  return (
    <Grid container spacing={2} justify="space-between">
      <Grid item xs={12}>
        <Typography variant="h5">Related images</Typography>
      </Grid>
      <Grid item>
        <Link to="/image/0">First</Link>
      </Grid>
      <Grid item>
        <Link to="/image/1">Second</Link>
      </Grid>
      <Grid item>
        <Link to="/image/2">Third</Link>
      </Grid>
      <Grid item>
        <Link to="/image/3">Fourth</Link>
      </Grid>
      <Grid item>
        <Link to="/image/4">Fifth</Link>
      </Grid>
    </Grid>
  );
};

export default React.memo(RelatedImages);