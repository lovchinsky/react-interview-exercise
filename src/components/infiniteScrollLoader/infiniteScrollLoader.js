import React from "react";
import PropTypes from "prop-types";

class InfiniteScrollLoader extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    loader: PropTypes.node,
    isLoading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    threshold: PropTypes.number
  };

  static defaultProps = {
    loader: null,
    isLoading: false,
    hasMore: false,
    threshold: 50
  };

  isListen = true;

  componentDidMount() {
    window.addEventListener('scroll', this.handleLoad);
    window.addEventListener('resize', this.handleLoad);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleLoad);
    window.removeEventListener('resize', this.handleLoad);
  }

  componentDidUpdate(prevProps) {
    const { isLoading } = this.props;
    if (!isLoading && isLoading !== prevProps.isLoading) {
      this.isListen = true;
    }
  }

  handleLoad = () => {
    if (!this.isListen) {
      return;
    }

    const { isLoading, hasMore, onLoadMore, threshold } = this.props;
    if (!isLoading && hasMore) {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const isBottom = (innerHeight + scrollTop) > offsetHeight - threshold;

      if (isBottom) {
        onLoadMore();
      }
    }
  };

  render() {
    const { isLoading, loader, children } = this.props;
    return (
      <>
        {children}
        {isLoading && loader}
      </>
    );
  }
}

export default InfiniteScrollLoader;