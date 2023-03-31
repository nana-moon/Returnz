import { configureStore } from '@reduxjs/toolkit';
import { test } from './TestFolder/Test.reducer';
import { BuySellData } from './buysellmodal/BuySell.reducer';
import { gamedata } from './gamedata/GameData.reducer';
import { waitRoom } from './roominfo/WaitRoom.reducer';
import { gameRoom } from './roominfo/GameRoom.reducer';
import { EditModal } from './profileeditmodal/ProfileEdit.reducer';

export const store = configureStore({
  reducer: {
    BuySell: BuySellData.reducer,
    gamedatas: gamedata.reducer,
    waitRoom: waitRoom.reducer,
    gameRoom: gameRoom.reducer,
    test: test.reducer,
    editModal: EditModal.reducer,
  },
});
