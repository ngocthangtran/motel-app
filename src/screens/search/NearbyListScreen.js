import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { POST_DETAILS } from '../../constants/navigation';
import { vndFormatter } from '../../utils/common';

function NearbyListScreen(props) {
  const { posts, loading, error } = useSelector(state => state.nearby);
  const navigation = useNavigation();
  const handleMotelPress = motel => () => {
    navigation.navigate(POST_DETAILS, { postId: motel.postId });
  };

  return (
    <View style={styles.container}>
      <List.Subheader>Danh sách {posts.length} địa điểm</List.Subheader>
      <FlatList
        data={posts}
        keyExtractor={item => item.postId}
        renderItem={({ item }) => {
          return (
            <List.Item
              title={item.title}
              description={vndFormatter(item.price)}
              left={props => <List.Icon {...props} icon='map-marker' />}
              onPress={handleMotelPress(item)}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(NearbyListScreen);
