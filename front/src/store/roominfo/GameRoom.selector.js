const getGameId = (state) => state.gameRoom.id;
const getGameRoomId = (state) => state.gameRoom.roomId;
const getHostNickname = (state) => state.gameRoom.hostNickname;
const getGamerId = (state) => state.gameRoom.gamerId;
const getPlayerList = (state) => state.gameRoom.playerList;

export { getGameId, getGameRoomId, getHostNickname, getGamerId, getPlayerList };
