import React from "react";
import { Link } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  CircularProgress,
  Button,
  Snackbar
} from "@material-ui/core";

import Layout from "../components/layout";
import InfiniteScrollLoader from "../components/infiniteScrollLoader";
import { getListImages } from "../images";

const DEFAULT_IMAGES_PAGE = 1;
const DEFAULT_IMAGES_LIMIT = 10;

class Homepage extends React.Component {
  state = {
    images: [],
    isLoading: true,
    hasMore: true,
    page: 0,
    error: null
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

  componentDidMount() {
    this.loadImages(DEFAULT_IMAGES_PAGE);
  }

  render() {
    const { images, isLoading, hasMore, error } = this.state;
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
              {images.map(({id, author, download_url}) => {
                const imageLink = `/image/${id}`;
                return (
                  <Grid key={id} item xs={12} md={6} lg={4}>
                    <Card>
                      <CardHeader title={<Link to={imageLink}>{author}</Link>} />
                      <Link to={imageLink}>
                        <CardMedia
                          style={{ paddingTop: '56.25%' }}
                          image={download_url}
                          title={author}
                        />
                      </Link>
                      <CardActions disableSpacing>
                        <Button>
                          <MdFavorite/> 0
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </InfiniteScrollLoader>
      </Layout>
    );
  }
}

export default Homepage;