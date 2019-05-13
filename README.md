# react-overflow-wrapper
A React component that scrolls horizontally if the list is overflow.

[![NPM](https://nodei.co/npm/react-overflow-wrapper.png?downloads=true)](https://nodei.co/npm/react-overflow-wrapper/)

<p align="">
  <a href="https://www.npmjs.com/package/react-overflow-wrapper"><img src="https://img.shields.io/npm/v/react-overflow-wrapper.svg" /></a>
  <a href="https://www.npmjs.com/package/react-overflow-wrapper"><img src="https://img.shields.io/bundlephobia/min/react-overflow-wrapper.svg" /></a>
   <a href="https://www.npmjs.com/package/react-overflow-wrapper"><img src="https://img.shields.io/github/license/lannex/react-overflow-wrapper.svg" /></a>
</p>

## Install
```
$ npm install react-overflow-wrapper
```
```
$ yarn add react-overflow-wrapper
```

## Usage
```js
import OverflowWrapper from 'react-overflow-wrapper';

<OverflowWrapper>
 {
   // some items
 }
</OverflowWrapper>

```

## Props
| Parameter | Type | Default | isRequired |
|-----------|------|---------|------------|
| children | React.ReactNode | undefined | true |
| className? | string | undefined |
| style? | object | undefined |
| iconSize? | number | 26 |
| iconColor? | string | #aeb6bb |
| iconWrapStyle? | object | { left: { backgroundImage: 'linear-gradient(to right, hsl(0, 100%, 100%) 25%, hsla(0, 0%, 0%, 0))' }, right: { backgroundImage: 'linear-gradient(to left, hsl(0, 100%, 100%) 25%, hsla(0, 0%, 0%, 0))' } }
| iconStyle? | object | { left: {}, right: {} } |

## Browser support
Tested with modern browsers.

## License
the MIT license.
