import { db } from '../../config/firebase';

const getAds1 = (limit) => {
    return dispatch => {
        db.collection("ads").orderBy('createdAt', 'desc').limit(limit).onSnapshot((snapshot)=>{
            var arr = [];

            //console.log("realtime update...");
            snapshot.forEach((change)=>{
                const obj = {id: change.id, ...change.data()}
                arr.push(obj);
            });
            dispatch({
                type: 'UPDATE_ADS',
                data: arr
            });
            //console.log(arr);
        });
    }
}
export {
    getAds1,
}