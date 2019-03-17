import * as firebase from 'firebase';
import { register } from '../serviceWorker';
import Login from '../components/login';

// var config = {
//     apiKey: "AIzaSyBI2QVlaKmmAmAOd24ACJOjCaThsDhBuBo",
//     authDomain: "munshi-myfirstreact.firebaseapp.com",
//     databaseURL: "https://munshi-myfirstreact.firebaseio.com",
//     projectId: "munshi-myfirstreact",
//     storageBucket: "munshi-myfirstreact.appspot.com",
//     messagingSenderId: "1046837677340"
// };
// var config = {
//     apiKey: "AIzaSyCQ7s6wLxDOSbYLHZ4JYWfm6RlltRoFViY",
//     authDomain: "saylani-8099b.firebaseapp.com",
//     databaseURL: "https://saylani-8099b.firebaseio.com",
//     projectId: "saylani-8099b",
//     storageBucket: "saylani-8099b.appspot.com",
//     messagingSenderId: "1028251352751"
// };
// firebase.initializeApp(config);

var config = {
    apiKey: "AIzaSyDNjY1YzL7zrZVOuZkl6Zy8b5sV-lMMGpU",
    authDomain: "olxm-b5467.firebaseapp.com",
    databaseURL: "https://olxm-b5467.firebaseio.com",
    projectId: "olxm-b5467",
    storageBucket: "olxm-b5467.appspot.com",
    messagingSenderId: "118644880783"
};
firebase.initializeApp(config);
const db = firebase.firestore();


function registerFB(name, age, email, password) {
    console.log("Running registerFB")
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (res) {
            addUser(res, name, age, email)
            alert('Registered Successful');
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
            // ...
        });
}

function loginFB(email, password) {
    return new Promise((resolve, reject) => {
        console.log("Running LoginFB");
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (res) {
            alert("Login Successfull", res.user.uid)
            getUser(res).then(function (ress) {
                const obj = { id: res.user.uid, ...ress}
                resolve(obj)
            })
        })
            .catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            })
    })

}

function loginWithFacebook() {
    console.log("LOGIN WITH FACEBOOK")
    return new Promise((resolve, reject) => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            var data = {
                id: user.uid,
                fullname: user.displayName,
                email: user.email
            }
            const res ={
                user: {
                    uid: user.uid
                }
            }
            addUser(res, user.displayName, 0, user.email)
            console.log(token, user.displayName)
            resolve(data)
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error.message)
            // ...
        });
    })
}

function loginWithGoogle() {
    return new Promise((resolve, reject) => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            var data = {
                id: user.uid,
                fullname: user.displayName,
                email: user.email
            }
            const res ={
                user: {
                    uid: user.uid
                }
            }
            addUser(res, user.displayName, 0, user.email)
            console.log(token, user.displayName)
            resolve(data)
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(error.message)
            // ...
        });
    })

}
function addUser(res, fullname, age, email) {
    db.collection("users").doc(res.user.uid).get().then(doc=>{
        if(!doc.exists){
            db.collection("users").doc(res.user.uid).set({ fullname, age, email }).then(function (user) {
                alert("User Added Successfully")
            });
        }
        else{
            alert("Welcome Again")
        }
    })
    
}

function getUser(res) {
    return new Promise((resolve, reject) => {
        console.log("Into get user")
        console.log(res.user.uid)
        var docRef = db.collection("users").doc(res.user.uid);
        console.log("docref", docRef);
        docRef.get()
            .then(function (doc) {
                if (doc.exists) {
                    console.log("User==>", doc.data());
                    resolve(doc.data())
                } else {
                    console.log("No such Data")
                }
            })
            .catch(function (error) {
                console.log("Error Getting Doc", error)
            })
    })
}
function updateFB(name, age, email) {
    db.collection('users').where('email', '==', email)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log("", doc.id, " => ", doc.data())
                update(name, age, doc)
            })
        })
}
function update(fullname, age, doc) {
    db.collection('users').doc(doc.id).update({
        fullname,
        age
    }).then(function (user) {
        alert("user updated successfully")
    }).catch(function (err) {
        alert("Error updating user");
        alert(err.errorMessage)
    })
}

function signoutFB() {
    firebase.auth().signOut().then(function () {
        alert("You have been logged out")
    }).catch(function (err) {
        alert(err.errorMessage)
        // An error happened.
    });
}

function changePasswordFB(password) {
    var user = firebase.auth().currentUser;
    // confirmOldPassword(oldPassword);
    user.updatePassword(password).then(function () {
        alert("Password Changed Successfully")
    }).catch(function (err) {
        alert(err.errorMessage)
        // An error happened.
    });
}

function confirmOldPasswordFB(oldPassword) {
    return new Promise((resolve, reject) => {
        var user = firebase.auth().currentUser;
        console.log(user.email);
        var email = user.email;
        var password = oldPassword;
        var credential = firebase.auth.EmailAuthProvider.credential(
            email,
            password
        );
        user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
            // User re-authenticated.
            alert("Password Verified")
            resolve(true)
        }).catch(function (err) {
            // An error happened.
            alert("Invalid Old Password provided")
            resolve(false)
        });
    })
}

function addImage(image) {
    return new Promise((resolve, reject) => {
        const lastDot = image.name.lastIndexOf('.');
        const filename = image.name.substring(0, lastDot) + '_' + Date.now() + image.name.substring(lastDot);
        var storageRef = firebase.storage().ref('expertizo/' + filename);

        storageRef.put(image).then(function (snapshot) {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
                resolve(downloadURL)
            })
        })
    })
}
async function addAd(title, description, price, images, category, location) {
    console.log(images)
    var imagesToDB = [];
    var length = images.length;
    for (var i = 0; i < length; i++) {
        var urladdImage = await addImage(images[i]);
        imagesToDB.push(urladdImage);
    }
    let obj = {
        title, description, price, images: imagesToDB, createdAt: Date.now(), category, location
    }
    obj.user = db.doc('users/' + firebase.auth().currentUser.uid);
    db.collection("ads").add(obj).then(function (user) {
        alert("Ad Added Successfully")
    });
}

function getCategories() {
    return new Promise((resolve, reject) => {
        db.collection("categories").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                resolve(doc.data().categories)
            });
        });
    })
}

function getLocation() {
    return new Promise((resolve, reject) => {
        db.collection("location").get().then(function (querySnapshot) {
            var locations = []
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                locations.push({ id: doc.id, ...doc.data() })
            });
            resolve(locations)
        });
    })
}
function getAds() {
    return new Promise((resolve, reject) => {
        db.collection("ads").onSnapshot(function (querySnapshot) {
            var data = []
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                data.push({ id: doc.id, data: doc.data() })
            });
            resolve(data);
        });
        //     var data = []
        //     db.collection("ads")
        //     .onSnapshot(function(snapshot) {
        //     snapshot.docChanges().forEach(function(change) {
        //         if (change.type === "added") {
        //             console.log(change.doc.id, " => ", change.doc.data());
        //             data.push({id: change.doc.id, data: change.doc.data()})
        //         }
        //         if (change.type === "modified") {
        //             console.log(change.doc.id, " => ", change.doc.data());
        //             data.push({id: change.doc.id, data: change.doc.data()})
        //         }
        //         if (change.type === "removed") {
        //             console.log(change.doc.id, " => ", change.doc.data());
        //             data.push({id: change.doc.id, data: change.doc.data()})
        //         }
        //     });
        // });
        // resolve(data)

    })
}

function getUsers() {
    return new Promise((resolve, reject) => {
        db.collection("users").get().then(docs=> {
            var data = []
            docs.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                data.push({ id: doc.id, ...doc.data() })
            });
            resolve(data);
        })
    })
            
}
function getLocByName(name) {
    return new Promise((resolve, reject) => {
        console.log("CITY NAME>>>>>>>>.", name)
        // db.collection("location").where("name", "==", name).get().then(function (doc) {
        //     if (doc.exists) {
        //         console.log("Document data:", doc.data());
        //         resolve(doc.data())
        //     } else {
        //         // doc.data() will be undefined in this case
        //         console.log("No such document!");
        //     }
        // }).catch(function (error) {
        //     console.log("Error getting document:", error);
        // });
        db.collection("location").where('name', '==', name)
            .get().then(doc => {
                console.log("DOC", doc.docs[0].data())
                // var data = []
                // doc.forEach(res => {
                //     // doc.data() is never undefined for query doc snapshots
                //     console.log(res.id, " => ", res.data());
                //     data.push({ id: res.id, data: res.data() })
                // });
                resolve(doc.docs[0].data());
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
    })
}
function getAdsWithSearch(input) {
    return new Promise((resolve, reject) => {
        console.log(input)
        const start = input;
        const end = start + "\uF8FF"

        db.collection('ads').orderBy('title')
            .startAt(start)
            .endAt(end)
            .get().then(doc => {
                console.log("DOC", doc)
                var data = []
                doc.forEach(res => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(res.id, " => ", res.data());
                    data.push({ id: res.id, data: res.data() })
                });
                resolve(data);
            })
    })
}
function getAdsByCategory(input) {
    return new Promise((resolve, reject) => {
        console.log(input)
        db.collection('ads')
            .where('category', '==', input)
            .get().then(doc => {
                console.log("DOC", doc)
                var data = []
                doc.forEach(res => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(res.id, " => ", res.data());
                    data.push({ id: res.id, data: res.data() })
                });
                resolve(data);
            })
    })
}
function getAdsByLocation(input) {
    return new Promise((resolve, reject) => {
        console.log(input)
        db.collection('ads')
            .where('location', '==', input)
            .get().then(doc => {
                console.log("DOC", doc)
                var data = []
                doc.forEach(res => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(res.id, " => ", res.data());
                    data.push({ id: res.id, data: res.data() })
                });
                resolve(data);
            })
    })
}
function getAdById(id) {
    return new Promise((resolve, reject) => {
        var docRef = db.collection("ads").doc(id);

        docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                console.log(doc.data().user.id)
                resolve(doc.data())
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    })
}

function getAdsByPrice(from, to) {
    // return new Promise((resolve, reject) => {
    //     console.log(from, to)
    //     db.collection('ads')
    //         .orderBy('price')
    //         .startAt(from)
    //         .endAt(to)
    //         .get().then(doc => {
    //             console.log("DOC", doc)
    //             var data = []
    //             doc.forEach(res => {
    //                 // doc.data() is never undefined for query doc snapshots
    //                 console.log(res.id, " => ", res.data());
    //                 data.push({ id: res.id, data: res.data() })
    //             });
    //             resolve(data);
    //         })
    // })
    return new Promise((resolve, reject) => {
        console.log(from, to)
        db.collection('ads')
            .where('price', '>=', from)
            .where('price', '<=', to)
            .get().then(doc => {
                console.log("DOC", doc)
                var data = []
                doc.forEach(res => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(res.id, " => ", res.data());
                    data.push({ id: res.id, data: res.data() })
                });
                resolve(data);
            })
    })
}

function checkAndCreateRoom(friendId) {
    return new Promise((resolve, reject) => {
        console.log(firebase.auth().currentUser.uid)
        var currentUserId = firebase.auth().currentUser.uid;
        const users = {
            [friendId]: true,
            [currentUserId]: true
        }
        db.collection('chatrooms').where(`users.${friendId}`, '==', true)
            .where(`users.${currentUserId}`, '==', true).get().then(docs => {
                console.log(docs)
                let room = {}
                docs.forEach((snapshot) => {
                    console.log("rooms ===> ", snapshot.data())
                    room = snapshot.data()
                    room.id = snapshot.id
                   
                })
                if (!room.id) {
                    room = { users, createdAt: Date.now(), lastMessage: {} }
                    db.collection('chatrooms').add(room).then(res => {
                        room.id = res.id;
                        resolve(room)
                    })
                }
                else {
                    resolve(room)
                }
            })
    })


}
function getRoomInfo(id){
    return new Promise((resolve, reject) => {
        db.collection('chatrooms').doc(id).get().then(res=>{
            const obj = {id: res.id, ...res.data()}
            resolve(obj)
        })
    })
    
}
function sendMessageToDb(text, roomId){
    const message = {text, createdAt: Date.now(), userId: firebase.auth().currentUser.uid}
    db.collection('chatrooms').doc(roomId).collection('messages').add(message)
}
function getCurrentUserId(){
    console.log('firebase.auth().currentUser.uid',firebase.auth().currentUser.uid)
    return firebase.auth().currentUser.uid
}
function getUserById(id){
    return new Promise((resolve, reject) => {
        db.collection('users').doc(id).get().then(res=>{
            const obj = {id: res.id, ...res.data()}
            resolve(obj)
        })
    })
}
export {
    registerFB,
    loginFB,
    updateFB,
    signoutFB,
    changePasswordFB,
    confirmOldPasswordFB,
    addAd,
    getCategories,
    getAds,
    getAdsWithSearch,
    getAdsByCategory,
    getAdsByLocation,
    getAdById,
    loginWithFacebook,
    loginWithGoogle,
    getLocation,
    getLocByName,
    getAdsByPrice,
    db,
    checkAndCreateRoom,
    getRoomInfo,
    sendMessageToDb,
    getCurrentUserId,
    getUserById,
    getUsers
}