/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const EditModal = createSlice({
  name: 'ProfileEditModal',
  initialState: {
    editModalState: false,
  },
  reducers: {
    handleModalState: (state, action) => {
      // 여기서 api 함수 임포트해서 axios요청 가능
      state.editModalState = action.payload;
    },
  },
});

export const { handleModalState } = EditModal.actions;
export default EditModal;
