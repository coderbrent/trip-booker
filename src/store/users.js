import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    userAdded: (users, action) => {
      users.push({
        id: action.payload.id,
        auth: action.payload.auth,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        avatar: action.payload.avatar
      })
    },
    userRemoved: (users, action) => {
      users.pop(users.indexOf({ id: action.payload.id }))
    }
  }
})

export const { userAdded, userRemoved } = slice.actions;
export default slice.reducer;