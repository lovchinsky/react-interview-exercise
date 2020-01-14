import React from "react";
import { useParams } from "react-router";
import { MdErrorOutline } from "react-icons/md";
import {
  CircularProgress,
  Grid,
  Paper,
  Typography,
  makeStyles
} from "@material-ui/core"

import Layout from "../components/layout";
import ImageDetails from "../components/imageDetails/imageDetails";
import ImageZoomDialog from "../components/imageZoomDialog/imageZoomDialog";
import RelatedImages from "../components/relatedImages/relatedImages";
import useImageDetails from "../hooks/useImageDetails";

const useStyles = makeStyles(({ spacing }) => ({
  paperError: {
    display: "flex",
    alignItems: "center",
    padding: `${spacing(1)}px ${spacing(2)}px`,
    color: "rgb(97, 26, 21)",
    backgroundColor: "rgb(253, 236, 234)"
  },
  iconError: {
    color: "#f44336",
    marginRight: spacing(1)
  }
}));

const ImagePage = () => {
  const { id } = useParams();
  const { imageDetails, isLoading, error } = useImageDetails(id);
  const [openImageDialog, setOpenImageDialog] = React.useState(false);
  const classes = useStyles();

  const handleImageClick = React.useCallback(() => {
    setOpenImageDialog(true);
  }, []);

  const handleImageDialogClose = React.useCallback(() => {
    setOpenImageDialog(false);
  }, []);

  return (
    <Layout>
      {isLoading && (
        <Grid container spacing={2} justify="center">
          <Grid item>
            <CircularProgress/>
          </Grid>
        </Grid>
      )}
      {imageDetails && (
        <>
          <ImageDetails imageDetails={imageDetails} onImageClick={handleImageClick}/>
          <ImageZoomDialog
            src={imageDetails.download_url}
            alt={imageDetails.author}
            width={imageDetails.width}
            height={imageDetails.height}
            open={openImageDialog}
            onClose={handleImageDialogClose}/>
          <RelatedImages/>
        </>
      )}
      {error && (
        <Grid container spacing={2} justify="center">
          <Grid item>
            <Paper className={classes.paperError}>
              <MdErrorOutline className={classes.iconError}/>
              <Typography>{error.message}</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default ImagePage;
