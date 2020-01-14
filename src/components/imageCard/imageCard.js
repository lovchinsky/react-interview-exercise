import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  Typography
} from "@material-ui/core";

class ImageCard extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    download_url: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    onFavoriteClick: PropTypes.func.isRequired
  };

  handleFavoriteClick = () => {
    const { id, onFavoriteClick } = this.props;
    onFavoriteClick(id);
  };

  render() {
    const { id, author, download_url, isFavorite } = this.props;
    const imageLink = `/image/${id}`;
    const favoriteCount = isFavorite ? 1 : 0;
    const color = favoriteCount > 0 ? "secondary" : "default";

    return (
      <Grid key={id} item xs={12} md={6} lg={4}>
        <Card>
          <CardHeader title={<Link to={imageLink}>{author}</Link>}/>
          <Link to={imageLink}>
            <CardMedia
              style={{ paddingTop: '56.25%' }}
              image={download_url}
              title={author}
            />
          </Link>
          <CardActions disableSpacing>
            <IconButton color={color} onClick={this.handleFavoriteClick}>
              <MdFavorite/>
            </IconButton>
            <Typography>{favoriteCount}</Typography>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default ImageCard;