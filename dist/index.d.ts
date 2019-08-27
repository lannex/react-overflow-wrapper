/// <reference types="lodash" />
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
    rootRef: React.RefObject<HTMLDivElement>;
    wrapRef: React.RefObject<HTMLDivElement>;
    state: {
        isOverflow: boolean;
        rootWidth: number;
        wrapWidth: number;
        x: number;
        isDragging: boolean;
        mouseX: number;
    };
    debouncedResize: (() => void) & import("lodash").Cancelable;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleResize: () => void;
    handleWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
    handleMouseDown: (e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => void;
    handleMouseMove: (e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => void;
    handleMouseUp: () => void;
    handleClickLeft: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleClickRight: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    renderLeftIcon: () => JSX.Element;
    renderRightIcon: () => JSX.Element;
    render(): JSX.Element;
}
export default OverflowList;
