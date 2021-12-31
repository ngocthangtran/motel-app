import { useNavigation } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Button, Chip, Divider, FAB, Surface } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RentalItem } from '../../components';
import AppBarSearch from '../../components/AppBarSearch';
import {
  LOGIN,
  NEARBY,
  POST_DETAILS,
  POST_EDIT,
  SEARCH,
  VIEW_MORE,
} from '../../constants/navigation';
import { getShowcase } from '../../store/slices/postSlice';

const renderSectionHeader = ({ section: { title } }) => {
  const style = { marginVertical: 6 };
  return (
    <Chip style={style} icon='asterisk' i>
      {title}
    </Chip>
  );
};

function ListingsScreen(props) {
  useEffect(() => {
    dispatch(getShowcase());
  }, []);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const { showcase, error, loading } = useSelector(state => state.post);
  const navigation = useNavigation();

  const renderSectionFooter = ({ section }) => {
    const handlePress = () => navigation.navigate(VIEW_MORE, { postType: section.viewMoreType });
    return (
      <Surface style={styles.sectionFooter}>
        <Button uppercase={false} onPress={handlePress}>
          Xem thêm
        </Button>
        <Divider />
      </Surface>
    );
  };

  const mapToSectionListData = () => {
    return [
      {
        title: 'Phòng ở ghép',
        data: [showcase['for_share']],
        viewMoreType: 'FOR_SHARE',
      },
      {
        title: 'Phòng cho thuê',
        data: [showcase['for_rent']],
        viewMoreType: 'FOR_RENT',
      },
    ];
  };

  const handleItemPress = item => navigation.navigate(POST_DETAILS, { postId: item.postId });

  const renderSectionItems = ({ item }) => {
    return (
      <FlatList
        numColumns={2}
        data={item}
        keyExtractor={item => item.postId}
        renderItem={({ item }) => <RentalItem item={item} onPress={handleItemPress} />}
      />
    );
  };

  const handleSearchbarPress = () => navigation.navigate(SEARCH);
  const handleAdd = () => {
    navigation.navigate(user ? POST_EDIT : LOGIN);
  };
  const handleRefresh = () => {
    dispatch(getShowcase());
  };
  const handleNearbyPress = () => navigation.navigate(NEARBY);

  return (
    <>
      <AppBarSearch
        placeholder='Địa chỉ, tên đường, ...'
        searchEnable={false}
        onSearchbarPress={handleSearchbarPress}
        onLocationIconPress={handleNearbyPress}
      />
      <Surface style={styles.container}>
        <SectionList
          sections={mapToSectionListData()}
          keyExtractor={(item, index) => item + index}
          renderItem={renderSectionItems}
          renderSectionHeader={renderSectionHeader}
          renderSectionFooter={renderSectionFooter}
          refreshing={loading}
          onRefresh={handleRefresh}
        />
        <FAB icon='plus' style={styles.fab} color='#fff' onPress={handleAdd} />
      </Surface>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  sectionFooter: {
    marginTop: 6,
    marginBottom: 12,
    fontFamily: 'Inter_500Medium',
    fontWeight: 'bold',
  },
});

export default React.memo(ListingsScreen);
