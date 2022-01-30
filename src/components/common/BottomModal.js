import React from 'react';
import { View, StyleSheet, Modal, Pressable } from 'react-native';
import { IconButton, Surface } from 'react-native-paper';

function BottomModal({ visible, onClose, children }) {
  return (
    <View style={styles.container}>
      <Modal transparent visible={visible} animationType='fade'>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.6)' }} onPress={onClose}>
          <Pressable style={styles.modalContent}>
            <Pressable style={{ justifyContent: 'center', alignItems: 'center' }} onPress={onClose}>
              <IconButton icon='chevron-down' />
            </Pressable>
            {/* <Divider /> */}
            <Surface style={styles.contentContainer}>{children}</Surface>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 6,
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  contentContainer: {
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default React.memo(BottomModal);
