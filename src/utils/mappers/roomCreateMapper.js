import { unMask } from 'react-native-mask-text';

export default (room, buildingId) => {
  return {
    name: room.name,
    buildingId,
    area: unMask(room.area),
    deposit: unMask(room.deposit),
    price: unMask(room.price),
    roomTypeId: room.roomType.roomTypeId,
  };
};
