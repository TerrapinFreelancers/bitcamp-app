import React from 'react';
import { Text } from 'react-native';

function AleoText(props) {

  const styles = { fontFamily: `Aleo-${props.aleoStyle}` };

  return (
    <Text {...props} style={styles}>
      {props.children}
    </Text>
  );
}

AleoText.propTypes = {
  aleoStyle: React.PropTypes.oneOf(['Bold', 'BoldItalic', 'Italic', 'Light',
    'LightItalic', 'Regular'])
};

AleoText.defaultProps = {
  aleoStyle: 'Regular'
};

export default AleoText;
