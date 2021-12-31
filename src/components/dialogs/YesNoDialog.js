import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

function YesNoDialog({
  title,
  message,
  visible,
  onDismiss,
  onPositive,
  onNegative,
}) {
  const handlePositive = () => {
    onPositive();
    onDismiss();
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Đóng</Button>
          <Button onPress={handlePositive}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(YesNoDialog);
