# react-overflow-wrapper
A React component that scrolls horizontally if the list is overflow.

[![NPM](https://nodei.co/npm/react-overflow-wrapper.png?downloads=true)](https://nodei.co/npm/react-overflow-wrapper/)

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
