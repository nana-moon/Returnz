const getWaitRoomId = (state) => state.waitRoom.roomId;
const getCaptainName = (state) => state.waitRoom.captainName;
const getMemberCount = (state) => state.waitRoom.memberCount;
const getWaiterList = (state) => state.waitRoom.waiterList;
const getSelectedTheme = (state) => state.waitRoom.theme;
const getCustom = (state) => state.waitRoom.custom;

export { getWaitRoomId, getCaptainName, getMemberCount, getWaiterList, getSelectedTheme, getCustom };
