import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { Appbar, Surface, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RentalItem } from '../../components';
import { AfterInteractions } from '../../components/common';
import { POST_DETAILS } from '../../constants/navigation';
import { fetchForRentPosts } from '../../store/slices/forRentSlice';
import { fetchForSharePosts } from '../../store/slices/forShareSlice';

function ViewMoreScreen(props) {
  const {
    params: { postType },
  } = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { data, loading, error, next } = useSelector(state =>
    postType === 'FOR_RENT' ? state.forRent : state.forShare
  );

  const fetchPosts = async () => {
    if (!loading && next) {
      dispatch(
        postType === 'FOR_RENT'
          ? fetchForRentPosts({ postType: postType })
          : fetchForSharePosts({ postType: postType })
      );
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePress = postId => () => navigation.navigate(POST_DETAILS, { postId });
  const handleBack = () => navigation.goBack();
  const renderFooter = () => {
    return loading ? <ActivityIndicator animating color='red' /> : null;
  };

  return (
    <Surface style={styles.container}>
      <Appbar.Header style={{ height: 40, backgroundColor: colors.surface }}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title={postType === 'FOR_RENT' ? 'Phòng cho thuê' : 'Phòng ở ghép'} />
      </Appbar.Header>
      <AfterInteractions>
        <Surface>
          <FlatList
            data={data}
            keyExtractor={item => item.postId}
            renderItem={({ item }) => {
              return <RentalItem item={item} onPress={handlePress(item.postId)} />;
            }}
            numColumns={2}
            onEndReached={fetchPosts}
            onEndReachedThreshold={1}
            removeClippedSubviews
            ListFooterComponent={renderFooter}
          />
        </Surface>
      </AfterInteractions>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(ViewMoreScreen);
