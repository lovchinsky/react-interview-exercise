import React from "react";
import {
  MdFileDownload,
  MdLink
} from "react-icons/md";
import {
  Grid,
  IconButton,
  Typography,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
  image: {
    width: "100%",
    cursor: "pointer"
  }
});

const ImageDetails = ({ imageDetails: { url, download_url, author }, onImageClick }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12} sm={10} md={8}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">{author}</Typography>
          </Grid>
          <Grid item>
            <a href={url} target="_blank">
              <IconButton>
                <MdLink/>
              </IconButton>
            </a>
            <a href={download_url} download={download_url.split("/").pop()} target="_blank">
              <IconButton>
                <MdFileDownload/>
              </IconButton>
            </a>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} md={8}>
        <img className={classes.image} src={download_url} alt={author} onClick={onImageClick}/>
      </Grid>
    </Grid>
  );
};

export default React.memo(ImageDetails);