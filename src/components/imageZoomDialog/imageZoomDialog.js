import React from "react";
import {
  MdZoomIn,
  MdZoomOut,
  MdClose
} from "react-icons/md";
import {
  Dialog,
  IconButton,
  useTheme,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    width: "100%"
  },
  image: {
    width: "100%",
    transition: "all 0.5s ease",
  },
  iconClose: {
    float: "right"
  }
});

const ImageZoomDialog = ({ src, alt, width, open, onClose, scaleStep = 0.5, maxSteps = 6 }) => {
  const [scale, setScale] = React.useState(1);
  const { breakpoints } = useTheme();
  const classes = useStyles();

  let maxWidth = breakpoints.keys.find((key, index) => {
    return breakpoints.width(key) > width || breakpoints.keys.length === index + 1;
  });

  const handleZoomIn = React.useCallback(() => {
    setScale((scale) => scale + scaleStep);
  }, [scaleStep]);

  const handleZoomOut = React.useCallback(() => {
    setScale((scale) => scale - scaleStep);
  }, [scaleStep]);

  const zoomOutDisabled = scale === 1;
  const zoomInDisabled = maxSteps * scaleStep === scale;

  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} scroll="paper">
      <img className={classes.image} src={src} alt={alt} style={{ transform: `scale(${scale})` }}/>
      <div className={classes.container}>
        <IconButton color="secondary" disabled={zoomOutDisabled} onClick={handleZoomOut}>
          <MdZoomOut/>
        </IconButton>
        <IconButton color="secondary" disabled={zoomInDisabled} onClick={handleZoomIn}>
          <MdZoomIn/>
        </IconButton>
        <IconButton className={classes.iconClose} onClick={onClose}>
          <MdClose/>
        </IconButton>
      </div>
    </Dialog>
  );
};

export default ImageZoomDialog;