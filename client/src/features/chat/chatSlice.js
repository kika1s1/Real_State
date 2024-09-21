import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id : "",
  username : "",
  email : "",
  avatar : "",
  token : "",
  onlineUser : [],
  socketConnection : null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUser : (state,action)=>{
        state._id = action.payload._id
        state.username = action.payload.username 
        state.email = action.payload.email 
        state.avatar = action.payload.avatar 
    },
    setToken : (state,action)=>{
        state.token = action.payload
    },
    logout : (state)=>{
        state._id = ""
        state.username = ""
        state.email = ""
        state.avatar = ""
        state.token = ""
        state.socketConnection = null
    },
    setOnlineUser : (state,action)=>{
      state.onlineUser = action.payload
    },
    setSocketConnection : (state,action)=>{
      state.socketConnection = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setToken ,logout, setOnlineUser,setSocketConnection } = chatSlice.actions

export default chatSlice.reducer