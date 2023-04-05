const getWaitRoomId = (state) => state.waitRoom.roomId;
const getHostNickname = (state) => state.waitRoom.captainName;
const getWaiterList = (state) => state.waitRoom.waiterList;

export { getWaitRoomId, getHostNickname, getWaiterList };
