import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FlatList, Swipeable } from 'react-native-gesture-handler';
import { Appbar, IconButton, List, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AfterInteractions, Container, SwipeableAction } from '../../components/common';
import { deletePost, getPostedPosts } from '../../store/slices/postedSlice';
import { POST_DETAILS, POST_EDIT } from '../../constants/navigation';

function PostedScreen(props) {
  const navigation = useNavigation();
  const { posts, loading, error, deleting } = useSelector(state => state.posted);
  const { user } = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleBack = () => navigation.goBack();
  const handleShowDetail = item => () => {
    navigation.navigate(POST_DETAILS, { postId: item.postId });
  }

  useEffect(() => {
    dispatch(getPostedPosts());
  }, []);

  useEffect(() => {
    dispatch(getPostedPosts());
  }, [user]);

  const handleRefresh = () => { };

  const handleDeletePost = post => () => {
    dispatch(deletePost({ postId: post.postId }));
  };

  const handleEdit = postId => () => {
    navigation.navigate(POST_EDIT, postId);
  };

  return (
    <Surface style={styles.container}>
      <Appbar.Header style={{ height: 40 }}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title='Bài đã đăng' />
      </Appbar.Header>
      <AfterInteractions>
        <Surface style={styles.body}>
          <FlatList
            style={{ flex: 1 }}
            data={posts}
            keyExtractor={item => item.postId}
            renderItem={({ item }) => (
              <Swipeable
                renderRightActions={() => {
                  return (
                    <SwipeableAction
                      icon='file-document-edit-outline'
                      processing={deleting}
                      onPress={handleEdit(item.postId)}
                    />
                  );
                }}
                renderLeftActions={() => {
                  return (
                    <SwipeableAction
                      icon='trash-can-outline'
                      background='tomato'
                      onPress={handleDeletePost(item)}
                    />
                  );
                }}
              >
                <List.Item
                  onPress={handleShowDetail(item)}
                  title={item.title}
                  description={item.address}
                  right={() => <List.Icon icon='chevron-right' />}
                />
              </Swipeable>
            )}
            refreshing={loading}
            onRefresh={handleRefresh}
          />
          <Text>{error}</Text>
        </Surface>
      </AfterInteractions>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
});

export default React.memo(PostedScreen);
