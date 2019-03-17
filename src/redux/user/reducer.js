const INITIAL_STATE = {
    user: null,
    users: null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "UPDATE_USER":{
            return {...state, user: action.data};
        }
        case "UPDATE_USERS":{
            return {...state, users: action.data};
        }
        case "REMOVE_USER":{
            return {...state, user: null};
        }
        default:{
            return state;
        }
    }
}

export default reducer;