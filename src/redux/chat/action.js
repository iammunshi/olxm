import { db } from "../../config/firebase";

const getMessages = (roomId) => {
    console.log('roomId in action', roomId)
    return dispatch => {
        db.collection('chatrooms').doc(roomId).collection('messages').orderBy('createdAt').onSnapshot(docs => {
            const messages=[]
            docs.forEach(doc=>{
                const obj = {...doc.data(), id: doc.id}
                messages.push(obj)
            })
            console.log('messages in action>>>>>',messages)
            dispatch({
                type: 'UPDATE_MESSAGES',
                data: messages
            })
        })
    }
}


export {
    getMessages
}