
import { configureStore } from "@reduxjs/toolkit";
import { AllUserSlice, Chatslice, Msgreducer, UserinfoSlice } from "./Reducer";





const Store=configureStore({
   
    reducer:{
        UserSign:UserinfoSlice.reducer,
        UserList:AllUserSlice.reducer,
        Chat:Chatslice.reducer,
        Msgstate:Msgreducer.reducer
    }

})
export default Store

    

