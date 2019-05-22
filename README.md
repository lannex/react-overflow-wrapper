# react-overflow-wrapper
A React component that scrolls horizontally if the list is overflow.

[![NPM](https://nodei.co/npm/react-overflow-wrapper.png?compact=true)](https://nodei.co/npm/react-overflow-wrapper/)

[![Version](https://img.shields.io/npm/v/react-overflow-wrapper.svg)](https://www.npmjs.com/package/react-overflow-wrapper)
[![Build](https://travis-ci.org/lannex/react-overflow-wrapper.svg?branch=master)](https://www.npmjs.com/package/react-overflow-wrapper)
[![Coverage Status](https://coveralls.io/repos/github/lannex/react-overflow-wrapper/badge.svg?branch=master)](https://coveralls.io/github/lannex/react-overflow-wrapper?branch=master)
[![Size](https://img.shields.io/bundlephobia/min/react-overflow-wrapper.svg)](https://www.npmjs.com/package/react-overflow-wrapper)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License](https://img.shields.io/github/license/lannex/react-overflow-wrapper.svg)](https://www.npmjs.com/package/react-overflow-wrapper)

![Gif](./examples/static/example.gif)

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
#### `children`: React.ReactNode
- isRequired
- default: `undefined`

#### `className`: string
- default: `undefined`

#### `style`: object
- default: `undefined`

#### `iconSize`: number
- default: `26`

#### `iconColor`: string
- default: `#aeb6bb`

#### `iconWrapStyle`: object
- default: 
  ```
  { 
    left: { 
      backgroundImage: 'linear-gradient(to right, hsl(0, 100%, 100%) 25%, 
      hsla(0, 0%, 0%, 0))', 
    }, 
    right: { 
      backgroundImage: 'linear-gradient(to left, hsl(0, 100%, 100%) 25%, 
      hsla(0, 0%, 0%, 0))', 
    }, 
  }
  ```

#### `iconStyle`: object
- default: 
  ```
  {
    left: {},
    right: {},
  }
  ```

#### `hideIcons`: boolean
- default: `false`

#### `leftIcon`: React.ReactNode
- default: `undefined`

#### `rightIcon`: React.ReactNode
- default: `undefined`

## Browser support
Tested with modern browsers.

## License
the MIT license.
