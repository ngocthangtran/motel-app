import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaskedText } from 'react-native-mask-text';
import { IconButton, Surface, Text, useTheme } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../api/post';
import { updateLike } from '../store/slices/likeSlice';

function RentalItem({ item, horizontal = false, large = false, onPress }) {
  const { colors } = useTheme();
  const [liked, setLiked] = useState(item.like);
  const dispatch = useDispatch();

  useEffect(() => {
    setLiked(item.like);
  }, [item]);

  const handlePress = () => onPress(item);
  const handleHeartPress = async () => {

    try {
      if (liked) {
        await unlikePost(item.postId);
        const actionUpdateLiked = updateLike({
          post: item,
          type: "unliked"
        })
        await dispatch(actionUpdateLiked)
      } else {
        await likePost(item.postId);
        const actionUpdateLiked = updateLike({
          post: { ...item, like: true },
          type: "liked"
        })
        await dispatch(actionUpdateLiked)
      }
      setLiked(!liked);
    } catch (error) {
      alert('Có lỗi xảy ra');
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Surface style={horizontal && { flexDirection: 'row' }}>
        <Surface style={[horizontal && { width: 120, marginRight: 6 }]}>
          <Image style={styles.image} source={{ uri: item.linkImage.thumbUrl }} />
          <LinearGradient colors={['#rgba(0, 0, 0, .3)', 'transparent']} style={styles.gradient}>
            <IconButton
              icon={liked ? 'heart' : 'heart-outline'}
              style={styles.buttonLike}
              onPress={handleHeartPress}
              color='#fff'
              size={18}
            />
          </LinearGradient>
        </Surface>
        <Surface style={{ flexShrink: 1 }}>
          <Surface
            style={[
              { flexDirection: 'row', justifyContent: 'space-between' },
              !horizontal && { marginTop: 6 },
            ]}
          >
            <Text style={styles.roomType} numberOfLines={2}>
              {item.postType === 'FOR_RENT' ? 'Phòng cho thuê' : 'Phòng ở ghép'}
            </Text>
            <Text style={{ fontSize: 10 }}>{'T2 21/01/2021'}</Text>
          </Surface>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {item.title + '\n'}
          </Text>
          <Text style={[styles.price, { color: colors.primary }]} numberOfLines={2}>
            <MaskedText
              type='currency'
              options={{
                suffix: 'đ',
                decimalSeparator: '.',
                groupSeparator: '.',
                precision: 3,
              }}
            >
              {item.price}
            </MaskedText>
          </Text>
          <Text style={styles.address} numberOfLines={2}>
            {item.address}
          </Text>
        </Surface>
      </Surface>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    backgroundColor: 'transparent',
    borderRadius: 6,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 120,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 6,
  },
  title: {
    fontSize: 12,
    marginTop: 6,
  },
  price: {
    marginVertical: 6,
  },
  address: {
    fontSize: 10,
    color: '#aaa',
  },
  roomType: {
    fontSize: 10,
    // color: '#aaa',
  },
  buttonLike: {
    position: 'absolute',
    top: -4,
    right: -4,
    zIndex: 999,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    right: 0,
    // zIndex: 1000,
    height: '40%',
    width: '100%',
  },
});

export default React.memo(RentalItem);
