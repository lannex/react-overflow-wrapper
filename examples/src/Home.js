import React, { PureComponent } from 'react';
import OverflowWrapper from '../../dist';

class Home extends PureComponent {
  render() {
    const styles = {
      box: {
        border: 'solid 1px #ddd',
      },
      wrapper: {
        height: 26,
      },
      item: {
        margin: '0 10px',
      },
    };
    const items = [
      'apple',
      'grape',
      'banana',
      'melon',
      'kiwi',
      'peach',
      'mango',
      'tomato',
      'pineapple',
      'blueberry',
      'avocado',
      'papaya',
      'pear',
    ];

    return (
      <div>
        <div style={styles.box}>
          <OverflowWrapper style={styles.wrapper}>
            {items.map(el => (
              <div key={el} style={styles.item}>
                {el}
              </div>
            ))}
          </OverflowWrapper>
        </div>
      </div>
    );
  }
}

export default Home;
