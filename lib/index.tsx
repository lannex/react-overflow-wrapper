import React, { CSSProperties } from 'react';
import throttle from 'lodash/throttle';

interface OverflowListProps {
  children: React.ReactNode;
  className?: string;
  style?: {};
  hideIcons?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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
  isDragging: boolean;
  mouseX: number;
}

const rootStyle: CSSProperties = {
  position: 'relative',
  overflowX: 'hidden',
};

const wrapStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  zIndex: 0,
  height: '100%',
  whiteSpace: 'nowrap',
};

const arrowWrapStyle: CSSProperties = {
  position: 'absolute',
  zIndex: 1,
  top: 0,
  minWidth: 50,
  height: '100%',
  cursor: 'pointer',
  outline: 0,
};

class OverflowList extends React.Component<
  OverflowListProps,
  OverflowListState
> {
  static defaultProps = {
    className: undefined,
    style: undefined,
    hideIcons: false,
    leftIcon: undefined,
    rightIcon: undefined,
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
    isDragging: false,
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
    const rootWidth = this.rootRef.current
      ? this.rootRef.current.clientWidth
      : 0;
    const wrapWidth = this.wrapRef.current
      ? this.wrapRef.current.scrollWidth
      : 0;
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
        isDragging: true,
        mouseX,
      });
    }
  };

  handleMouseMove = e => {
    const {
      isOverflow,
      isDragging,
      rootWidth,
      wrapWidth,
      x,
      mouseX,
    } = this.state;
    if (isOverflow && isDragging) {
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
    const { isOverflow, isDragging } = this.state;
    if (isOverflow && isDragging) {
      this.setState({
        isDragging: false,
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
      hideIcons,
      leftIcon,
      rightIcon,
      iconSize,
      iconWrapStyle,
      iconStyle,
      iconColor,
    } = this.props;
    const { x, isOverflow, isDragging, rootWidth, wrapWidth } = this.state;

    return (
      <div
        className={className}
        ref={this.rootRef}
        style={{
          ...rootStyle,
          ...style,
        }}
      >
        <div
          ref={this.wrapRef}
          style={{
            ...wrapStyle,
            transition:
              isOverflow && isDragging ? 'none' : 'transform 0.3s ease-in-out',
            transform: `translate3d(${x}px, 0, 0)`,
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
        {!hideIcons && isOverflow && x < 0 && (
          <div
            style={{
              ...arrowWrapStyle,
              left: 0,
              textAlign: 'left',
              ...iconWrapStyle.left,
            }}
            role="button"
            tabIndex={0}
            onClick={this.handleClickLeft}
          >
            {leftIcon || (
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
            )}
          </div>
        )}
        {!hideIcons && isOverflow && -x < wrapWidth - rootWidth && (
          <div
            style={{
              ...arrowWrapStyle,
              right: 0,
              textAlign: 'right',
              ...iconWrapStyle.right,
            }}
            role="button"
            tabIndex={0}
            onClick={this.handleClickRight}
          >
            {rightIcon || (
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
            )}
          </div>
        )}
      </div>
    );
  }
}

export default OverflowList;
