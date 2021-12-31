import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Caption, Divider, Surface, Text } from 'react-native-paper';

function ExpandableText({
  textStyle,
  expandText = 'View More',
  collapseText = 'Collapse',
  children,
}) {
  const [expanded, setExpanded] = useState();

  const handleExpandPress = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, !expanded && { maxHeight: 142 }]}>
        {children}
      </Text>
      <Surface style={styles.expandView}>
        <Divider />
        <TouchableOpacity onPress={handleExpandPress}>
          <Caption style={styles.expandText}>
            {expanded ? collapseText : expandText}
          </Caption>
        </TouchableOpacity>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // maxHeight: 100,
    overflow: 'hidden',
  },
  text: {
    lineHeight: 21,
    color: '#6a6a6a',
  },
  expandView: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandText: {
    color: 'dodgerblue',
  },
});

export default React.memo(ExpandableText);
