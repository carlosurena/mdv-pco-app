import authReducer from './authReducer';
import eventReducer from './eventReducer';
import memberReducer from './memberReducer';
import {combineReducers} from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import sheetReducer from './sheetReducer'
import locationReducer from './locationReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    event: eventReducer,
    member: memberReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    sheet : sheetReducer,
    location : locationReducer
});

export default rootReducer