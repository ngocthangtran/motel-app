import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Appbar, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RentalItem } from '../../components';
import RequiredLoginWrapper from '../../components/RequiredLoginWrapper';
import { POST_DETAILS } from '../../constants/navigation';
import { getLikedPosts } from '../../store/slices/likeSlice';

function LikedScreen(props) {
  const { posts, error, loading } = useSelector(state => state.like);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (user) dispatch(getLikedPosts());
  // }, []);

  useEffect(() => {
    if (user) dispatch(getLikedPosts());
  }, [user]);

  const handleItemPress = item => navigation.navigate(POST_DETAILS, { postId: item.postId });
  const renderSeparator = () => <View style={{ height: 36 }} />;
  const handleRefresh = () => dispatch(getLikedPosts(0));
  return (
    <Surface style={styles.container}>
      <RequiredLoginWrapper>
        <Appbar.Header>
          <Appbar.BackAction />
          <Appbar.Content title='Phòng đã thích' />
        </Appbar.Header>
        <Surface style={styles.body}>
          <FlatList
            data={posts}
            keyExtractor={item => item.postId}
            renderItem={({ item }) => <RentalItem item={item} onPress={handleItemPress} />}
            ItemSeparatorComponent={renderSeparator}
            refreshing={loading}
            onRefresh={handleRefresh}
          />
        </Surface>
      </RequiredLoginWrapper>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 6,
  },
});

export default React.memo(LikedScreen);
