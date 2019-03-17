const INITIAL_STATE = {
    messages: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "UPDATE_MESSAGES":{
            return {...state, messages: action.data};
        }
        default:{
            return state;
        }
    }
}

export default reducer;