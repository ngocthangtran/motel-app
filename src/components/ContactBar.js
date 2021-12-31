import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Divider, Surface } from 'react-native-paper';

function ContactBar({ onMessage, onCall, onMapDirect }) {
  return (
    <Surface style={styles.container}>
      <Button
        uppercase={false}
        icon='email-open-outline'
        style={styles.button}
        onPress={onMessage}
      >
        Nhắn tin
      </Button>
      <View style={styles.divider} />
      <Button
        uppercase={false}
        icon='phone'
        style={styles.button}
        onPress={onCall}
      >
        Gọi
      </Button>
      <View style={styles.divider} />
      <Button
        uppercase={false}
        icon='map-marker-left'
        style={styles.button}
        onPress={onMapDirect}
      >
        Chỉ đường
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    borderTopWidth: 0.2,
    borderTopColor: '#ddd',
  },
  divider: {
    borderLeftWidth: 0.2,
    borderLeftColor: '#ddd',
    height: '100%',
  },
  button: {
    width: '33%',
  },
});

export default React.memo(ContactBar);
