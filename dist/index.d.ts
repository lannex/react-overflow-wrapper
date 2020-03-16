import React from 'react';
export interface OverflowListProps {
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
    x?: number;
    isDragging?: boolean;
    mouseX?: number;
}
declare class OverflowList extends React.Component<OverflowListProps, OverflowListState> {
    static defaultProps: {
        className: any;
        style: any;
        hideIcons: boolean;
        leftIcon: any;
        rightIcon: any;
        iconSize: number;
        iconColor: string;
        iconWrapStyle: {
            left: {
                backgroundImage: string;
            };
            right: {
                backgroundImage: string;
            };
        };
        iconStyle: {
            left: {};
            right: {};
        };
    };
    private rootRef;
    private wrapRef;
    state: {
        isOverflow: boolean;
        rootWidth: number;
        wrapWidth: number;
        x: number;
        isDragging: boolean;
        mouseX: number;
    };
    private debouncedResize;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private handleResize;
    private handleWheel;
    private handleMouseDown;
    private handleMouseMove;
    private handleMouseUp;
    private handleClickLeft;
    private handleClickRight;
    private renderLeftIcon;
    private renderRightIcon;
    render(): JSX.Element;
}
export default OverflowList;
