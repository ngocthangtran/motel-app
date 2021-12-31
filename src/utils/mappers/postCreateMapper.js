import { unMask } from 'react-native-mask-text';

export default post => {
  const data = new FormData();
  data.append('title', post.title);
  data.append('price', unMask(post.price));
  data.append('area', unMask(post.area));
  data.append('deposit', unMask(post.deposit));
  data.append('waterCost', unMask(post.waterCost));
  data.append('electricityCost', unMask(post.electricityCost));
  data.append('phone', post.phone);
  data.append('wardId', post.ward.wardId);
  data.append('address', post.address);
  data.append('postType', post.postType);
  data.append('roomTypeId', post.roomType);
  data.append('description', post.description);
  data.append('latitude', post.location.latitude);
  data.append('longitude', post.location.longitude);

  post.images.forEach((image, index) =>
    data.append('images', {
      name: 'image' + index,
      type: 'image/jpeg',
      uri: image,
    })
  );

  post.utils.forEach(util => data.append('utilityIds', util.utilityId));

  return data;
};
