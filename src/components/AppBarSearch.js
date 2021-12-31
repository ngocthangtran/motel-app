import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Appbar, Divider, IconButton, Searchbar, Surface, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// onSearchbarPress has no effect when searchEnable = true
function AppBarSearch({
  placeholder = '',
  searchEnable = true,
  backButton,
  onChangeText,
  onSearchbarPress,
  onLocationIconPress,
  onBackActionPress,
  onSubmitEditing,
}) {
  const { colors } = useTheme();
  return (
    <>
      <Appbar.Header>
        {backButton && <Appbar.BackAction onPress={onBackActionPress} />}
        {!backButton && (
          <MaterialCommunityIcons
            name='magnify'
            size={26}
            color='#fff'
            style={styles.magnifyIcon}
          />
        )}
        <TouchableOpacity style={styles.touchable} onPress={onSearchbarPress}>
          {/* <Searchbar
            editable={searchEnable}
            style={styles.searchbar}
            iconColor='#fff'
            selectionColor='#ddd'
            placeholder={placeholder}
            placeholderTextColor='rgba(255,255,255, .6)'
            inputStyle={styles.textInput}
            onChangeText={onChangeText}
          /> */}
          <Surface style={styles.inputWrapper}>
            <TextInput
              autoFocus={true}
              editable={searchEnable}
              placeholder={placeholder}
              onChangeText={onChangeText}
              style={[styles.textInput, { color: colors.text }]}
              selectionColor={colors.placeholder}
              placeholderTextColor={colors.placeholder}
              onSubmitEditing={onSubmitEditing}
            />
          </Surface>
        </TouchableOpacity>
        <Appbar.Action icon='map-marker' color='#fff' onPress={onLocationIconPress} />
      </Appbar.Header>
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    justifyContent: 'center',
  },
  searchbar: {
    flex: 1,
    marginHorizontal: 6,
    width: '100%',
    backgroundColor: 'transparent',
    elevation: 0,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    borderRadius: 6,
  },
  textInput: {
    fontSize: 16,
    borderRadius: 6,
    paddingHorizontal: 6,
    backgroundColor: 'transparent',
    borderColor: '#rgba(255,255,255,.6)',
    borderWidth: 0.6,
  },
  magnifyIcon: {
    marginHorizontal: 6,
  },
});

export default React.memo(AppBarSearch);
