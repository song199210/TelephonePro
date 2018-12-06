import {combineReducers} from "redux";
import {SAVEDONE,DELDONE,UPDATEDONE} from "./actionsType";

const defaultState={
    phoneUserList:[]
}

function reducerFuns(state=defaultState,action){
    switch(action.type){
        case SAVEDONE:
            let arr=[];
            arr.concat(state.phoneUserList,[action.data])
            return 
    }
}

export default combineReducers({
    reducerFuns
})