import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { Linking, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import {
  Appbar,
  Caption,
  Divider,
  Headline,
  Subheading,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AfterInteractions, Container, ExpandableText } from '../../components/common';
import { getPostDetails } from '../../store/slices/postSlice';
import { SliderBox } from 'react-native-image-slider-box';
import { MaskedText } from 'react-native-mask-text';
import { UtilitiesPicker, UtilityItem } from '../../components';
import { vndFormatter } from '../../utils/common';
import ContactBar from '../../components/ContactBar';

function PostDetailsScreen(props) {
  const { post, error, loading } = useSelector(state => state.post);
  const dispatch = useDispatch();
  const { params } = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    dispatch(getPostDetails({ postId: params.postId }));
  }, []);

  const mapToSliderImages = () => {
    return post.postImages.map(p => {
      return p.url;
    });
  };

  const handleCall = () => Linking.openURL(`tel:${post.phone}`);

  const handleMessage = () => Linking.openURL(`sms:${post.phone}?body=${post.title}`);

  const handleMapDirect = () =>
    Linking.openURL(`https://www.google.com/maps/dir//${post.latitude},${post.longitude}`);

  const handleBack = () => navigation.goBack();

  return (
    <Surface style={styles.container}>
      <Appbar.Header style={{ height: 40 }}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title='Chi tiết phòng' />
      </Appbar.Header>
      <AfterInteractions>
        <ScrollView>
          {post?.postImages && <SliderBox images={mapToSliderImages()} sliderBoxHeight={240} />}
          {post && (
            <Surface style={styles.body}>
              <Container horizontal>
                <MaterialCommunityIcons
                  name={post.postType === 'FOR_SHARE' ? 'alpha-s' : 'alpha-r'}
                  size={24}
                />
                <Caption>{post.postType === 'FOR_SHARE' ? 'Tìm ở ghép' : 'Phòng cho thuê'}</Caption>
              </Container>
              <Headline>{post?.title}</Headline>
              <MaskedText
                type='currency'
                options={{
                  suffix: 'đ',
                  decimalSeparator: '.',
                  groupSeparator: '.',
                  precision: 3,
                }}
              >
                {post.price}
              </MaskedText>
              <Container horizontal style={styles.headingUtilsContainer}>
                <UtilityItem name='flash' label={vndFormatter(post.electricityCost)} />
                <UtilityItem name='water' label={vndFormatter(post.waterCost)} />
                <UtilityItem name='ruler' label={post.area + 'm²'} />
              </Container>
              <Divider />
              <Subheading style={styles.sectionHeading}>Mô tả chi tiết</Subheading>
              <ExpandableText expandText='Xem thêm' collapseText='Thu gọn'>
                {post.description}
              </ExpandableText>
              <Subheading style={styles.sectionHeading}>Tiện ích phòng</Subheading>
              <UtilitiesPicker disable items={post.utility} />
              <Subheading style={styles.sectionHeading}>Thông tin liên hệ</Subheading>
              <Surface>
                <Container horizontal style={styles.contactItem}>
                  <MaterialCommunityIcons
                    size={18}
                    name='cellphone-android'
                    style={styles.contactIcon}
                    color='#6a6a6a'
                  />
                  <Text style={styles.text}>{post.phone}</Text>
                </Container>
                <Container horizontal style={styles.contactItem}>
                  <MaterialCommunityIcons
                    size={18}
                    name='map-marker'
                    style={styles.contactIcon}
                    color='#6a6a6a'
                  />
                  <Text style={styles.text}>{post.address}</Text>
                </Container>
              </Surface>
              <Subheading style={styles.sectionHeading}>Ngày cập nhật</Subheading>
              <Container horizontal style={styles.contactItem}>
                <MaterialCommunityIcons
                  size={18}
                  name='calendar'
                  style={styles.contactIcon}
                  color='#6a6a6a'
                />
                <Text style={styles.text}>{Date.create}</Text>
              </Container>
              <Subheading style={styles.sectionHeading}>Vị trí</Subheading>
              <MapView
                style={{ height: 200 }}
                initialRegion={{
                  latitude: +post.latitude,
                  longitude: +post.longitude,
                  latitudeDelta: 0,
                  longitudeDelta: 0,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: +post.latitude,
                    longitude: +post.longitude,
                  }}
                  // image={{ uri: 'custom_pin' }}
                />
              </MapView>
            </Surface>
          )}
        </ScrollView>
        <ContactBar onCall={handleCall} onMessage={handleMessage} onMapDirect={handleMapDirect} />
      </AfterInteractions>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: '#6a6a6a',
  },
  body: {
    padding: 10,
    marginBottom: 60,
  },
  headingUtilsContainer: {
    marginTop: 6,
  },
  sectionHeading: {
    marginVertical: 10,
  },
  contactIcon: {
    marginRight: 10,
  },
  contactItem: {
    marginBottom: 12,
  },
});

export default React.memo(PostDetailsScreen);
