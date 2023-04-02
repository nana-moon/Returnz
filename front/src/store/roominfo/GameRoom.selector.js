const getGameId = (state) => state.gameRoom.id;
const getGameRoomId = (state) => state.gameRoom.roomId;
const getCaptainName = (state) => state.gameRoom.captainName;
const getGamerId = (state) => state.gameRoom.gamerId;
const getPlayerList = (state) => state.gameRoom.playerList;

export { getGameId, getGameRoomId, getCaptainName, getGamerId, getPlayerList };
