import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  RadioButton,
} from 'react-native-paper';

function SelectLanguageDialog({ visible, onDismiss }) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Select language</Dialog.Title>
        <Dialog.Content>
          <RadioButton.Group>
            <RadioButton.Item value='VI' label='Tiếng Việt' />
            <RadioButton.Item value='EN' label='Tiếng Anh' />
          </RadioButton.Group>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Đóng</Button>
          <Button onPress={null}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default React.memo(SelectLanguageDialog);
