import React from 'react';
import throttle from 'lodash/throttle';

interface OverflowListProps {
  children: React.ReactNode;
  className?: string;
  style?: {};
  iconSize?: number;
  iconColor?: string;
  iconWrapStyle?: {
    left?: {};
    right?: {};
  };
  iconStyle?: {
    left?: {};
    right?: {};
  };
}

interface OverflowListState {
  isOverflow: boolean;
  rootWidth: number;
  wrapWidth: number;
  x: number;
  canUseMouseMove: boolean;
  mouseX: number;
}

class OverflowList extends React.Component<
  OverflowListProps,
  OverflowListState
> {
  static defaultProps = {
    className: undefined,
    style: undefined,
    iconSize: 26,
    iconColor: '#aeb6bb',
    iconWrapStyle: {
      left: {
        backgroundImage:
          'linear-gradient(to right, hsl(0, 100%, 100%) 25%, hsla(0, 0%, 0%, 0))',
      },
      right: {
        backgroundImage:
          'linear-gradient(to left, hsl(0, 100%, 100%) 25%, hsla(0, 0%, 0%, 0))',
      },
    },
    iconStyle: {
      left: {},
      right: {},
    },
  };

  rootRef = React.createRef<HTMLDivElement>();

  wrapRef = React.createRef<HTMLDivElement>();

  state = {
    isOverflow: false,
    rootWidth: 0,
    wrapWidth: 0,
    x: 0,
    canUseMouseMove: false,
    mouseX: 0,
  };

  throttledResize = throttle(() => {
    this.handleResize();
  }, 400);

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.throttledResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledResize);
  }

  handleResize = () => {
    const { isOverflow } = this.state;
    const rootWidth = this.rootRef.current.clientWidth;
    const wrapWidth = this.wrapRef.current.scrollWidth;
    if (rootWidth < wrapWidth) {
      this.setState({
        isOverflow: true,
        rootWidth,
        wrapWidth,
      });
    } else if (isOverflow) {
      this.setState({
        isOverflow: false,
      });
    }
  };

  handleWheel = e => {
    const { isOverflow, rootWidth, wrapWidth, x } = this.state;
    if (isOverflow) {
      let newX = x;
      if (e.deltaX > 0) {
        if (rootWidth - wrapWidth < x) {
          newX -= 4;
        }
        // console.log('left', newX);
      } else if (x < 0) {
        newX += 4;
        // console.log('right', newX);
      }
      this.setState({
        x: newX,
      });
    }
  };

  handleMouseDown = e => {
    const { isOverflow, x } = this.state;
    if (isOverflow) {
      let mouseX = 0;
      if (e.type === 'mousedown') {
        mouseX = e.pageX + -x;
      } else if (e.type === 'touchstart') {
        const touchEvent = e.changedTouches[0];
        mouseX = touchEvent.pageX + -x;
      }
      this.setState({
        canUseMouseMove: true,
        mouseX,
      });
    }
  };

  handleMouseMove = e => {
    const {
      isOverflow,
      canUseMouseMove,
      rootWidth,
      wrapWidth,
      x,
      mouseX,
    } = this.state;
    if (isOverflow && canUseMouseMove) {
      let distance = 0;
      if (e.type === 'mousemove') {
        e.preventDefault();
        distance = e.pageX - mouseX;
      } else if (e.type === 'touchmove') {
        const touchEvent = e.changedTouches[0];
        distance = touchEvent.pageX - mouseX;
      }

      let newX = (x + distance) * 0.5;
      if (newX > 0) {
        newX = 0;
      }
      if (-newX > wrapWidth - rootWidth) {
        newX = -(wrapWidth - rootWidth);
      }
      this.setState({
        x: newX,
      });
    }
  };

  handleMouseUp = () => {
    const { isOverflow, canUseMouseMove } = this.state;
    if (isOverflow && canUseMouseMove) {
      this.setState({
        canUseMouseMove: false,
      });
    }
  };

  handleClickLeft = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    this.setState(prevState => {
      let newX = prevState.x + 100;
      if (newX > 0) {
        newX = 0;
      }
      return {
        x: newX,
      };
    });
  };

  handleClickRight = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const { rootWidth, wrapWidth } = this.state;
    this.setState(prevState => {
      let newX = prevState.x - 100;
      if (-newX > wrapWidth - rootWidth) {
        newX = -(wrapWidth - rootWidth);
      }
      return {
        x: newX,
      };
    });
  };

  render() {
    const {
      children,
      className,
      style,
      iconSize,
      iconWrapStyle,
      iconStyle,
      iconColor,
    } = this.props;
    const { x, isOverflow, rootWidth, wrapWidth } = this.state;

    return (
      <div
        className={className}
        ref={this.rootRef}
        style={{
          position: 'relative',
          overflowX: 'hidden',
          ...style,
        }}
      >
        <div
          ref={this.wrapRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            // transition: 'all 0.1s',
            transform: `translateX(${x}px)`,
            whiteSpace: 'nowrap',
          }}
          role="presentation"
          onWheel={this.handleWheel}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseUp}
          onTouchStart={this.handleMouseDown}
          onTouchMove={this.handleMouseMove}
          onTouchEnd={this.handleMouseUp}
        >
          {children}
        </div>
        {isOverflow && x < 0 && (
          <div
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 0,
              left: 0,
              minWidth: 50,
              height: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              outline: 0,
              ...iconWrapStyle.left,
            }}
            role="button"
            tabIndex={0}
            onClick={this.handleClickLeft}
          >
            <svg
              style={{
                position: 'relative',
                ...iconStyle.left,
              }}
              width={iconSize}
              height={iconSize}
              viewBox="0 0 48 48"
            >
              <path
                d="M30.83 32.67l-9.17-9.17 9.17-9.17L28 11.5l-12 12 12 12z"
                fill={iconColor}
              />
              <path d="M0-.25h48v48H0z" fill="none" />
            </svg>
          </div>
        )}
        {isOverflow && -x < wrapWidth - rootWidth && (
          <div
            style={{
              position: 'absolute',
              zIndex: 1,
              top: 0,
              right: 0,
              minWidth: 50,
              height: '100%',
              textAlign: 'right',
              cursor: 'pointer',
              outline: 0,
              ...iconWrapStyle.right,
            }}
            role="button"
            tabIndex={0}
            onClick={this.handleClickRight}
          >
            <svg
              style={{
                position: 'relative',
                ...iconStyle.right,
              }}
              width={iconSize}
              height={iconSize}
              viewBox="0 0 48 48"
            >
              <path
                d="M17.17 32.92l9.17-9.17-9.17-9.17L20 11.75l12 12-12 12z"
                fill={iconColor}
              />
              <path d="M0-.25h48v48H0z" fill="none" />
            </svg>
          </div>
        )}
      </div>
    );
  }
}

export default OverflowList;
