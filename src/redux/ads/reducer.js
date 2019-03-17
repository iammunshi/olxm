const INITIAL_STATE = {
    ads: null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "UPDATE_ADS":{
            return {...state, ads: action.data};
        }
        default:{
            return state;
        }
    }
}

export default reducer;