import React from "react";
import {
  Grid,
  CircularProgress,
  Snackbar
} from "@material-ui/core";

import Layout from "../components/layout";
import InfiniteScrollLoader from "../components/infiniteScrollLoader";
import ImageCard from "../components/imageCard/imageCard";
import { getListImages } from "../images";

const DEFAULT_IMAGES_PAGE = 1;
const DEFAULT_IMAGES_LIMIT = 10;

class Homepage extends React.Component {
  state = {
    images: [],
    isLoading: true,
    hasMore: true,
    page: 0,
    error: null,
    favorites: {}
  };

  loadImages = (page, limit = DEFAULT_IMAGES_LIMIT) => {
    this.setState({
      isLoading: true,
      error: null
    });

    getListImages(page, limit)
      .then((loadedImages) => {
        this.setState(({ images }) => ({
          page,
          images: images.concat(loadedImages),
          hasMore: loadedImages.length === limit
        }));
      })
      .catch((error) => {
        this.setState({
          error
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  handleLoadMore = () => {
    const { page } = this.state;
    this.loadImages(page + 1);
  };

  clearError = () => {
    this.setState({
      error: null
    });
  };

  handleFavoriteClick = (id) => {
    this.setState(({ favorites }) => {
      const { [id]: hasId, ...rest } = favorites;

      if (hasId) {
        return {
          favorites: rest
        };
      }

      return {
        favorites: {
          [id]: true,
          ...favorites
        }
      }
    });
  };

  componentDidMount() {
    this.loadImages(DEFAULT_IMAGES_PAGE);
  }

  render() {
    const { images, isLoading, hasMore, error, favorites } = this.state;
    const hasError = error !== null;
    return (
      <Layout>
        <Snackbar open={hasError} onClose={this.clearError} autoHideDuration={2000}/>
        <InfiniteScrollLoader
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={this.handleLoadMore}
          loader={(
            <Grid container spacing={2} justify="center">
              <Grid item>
                <CircularProgress />
              </Grid>
            </Grid>
          )}
        >
          {images.length > 0 && (
            <Grid container spacing={2}>
              {images.map(({id, author, download_url}) => (
                <ImageCard
                  key={id}
                  id={id}
                  author={author}
                  download_url={download_url}
                  isFavorite={Boolean(favorites[id])}
                  onFavoriteClick={this.handleFavoriteClick}/>
              ))}
            </Grid>
          )}
        </InfiniteScrollLoader>
      </Layout>
    );
  }
}

export default Homepage;