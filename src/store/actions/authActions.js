export const loginGoogle = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log("logging in via google")

        const firebase = getFirebase();
        const firestore = getFirestore();
        const GoogleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(GoogleProvider).then((result) => {
            const user = result.user
            const additionalUserInfo = result.additionalUserInfo
            const isNewUser = result.additionalUserInfo.isNewUser
            console.log("is this a new user?: ", result.additionalUserInfo.isNewUser, user, additionalUserInfo);
            if (isNewUser) {
                console.log('creating new user and sending to firestore', user, additionalUserInfo)

                firestore.collection('users').add({
                    accessLevel: 'pending',
                    first_name: additionalUserInfo.profile.given_name,
                    last_name: additionalUserInfo.profile.family_name,
                    email: additionalUserInfo.profile.email,
                    photoURL: user.photoURL,
                    phone: user.phoneNumber,
                    uid: user.uid,
                    provider: 'Google',
                    memberRef: null,
                    createdOn: new Date(),
                    updatedOn: new Date(),
                }).then((user) => {
                    console.log('user data sent success')
                    user.get().then((doc) => {
                        const data = doc.data()
                        console.log(data)
                        dispatch({ type: 'CREATE_USER', data });
                        //Create Access Level Request
                        firestore.collection('requests').add({
                            userRef: doc.id,
                            userName: data.first_name + " " + data.last_name,
                            accessLevel: 'pending',
                            requestedAccessLevel: 'volunteer',
                            createdOn: new Date(),
                            updatedOn: new Date()
                        }).then((request) => {
                            request.get().then((doc) => {
                                const data = doc.data()
                                console.log("access request ", data)
                                dispatch({ type: 'CREATE_ACCESS_REQUEST', data });
                            })
                        })

                    })

                }).catch((err) => {
                    dispatch({ type: 'CREATE_USER_ERROR', err });
                })
            } else {
                const userRef = firestore.collection('users').where('uid', '==', user.uid).limit(1)
                userRef.get().then(users => {
                    const data = users.docs[0].data()
                    console.log("matched existing user: ", data);
                    dispatch({ type: 'LOGIN_GOOGLE_SUCCESS', data });
                })
            }
        }).catch((err) => {
            dispatch({ type: 'LOGIN_GOOGLE_ERROR', err })
        })
    }
}
export const loginFacebook = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log("logging in via facebook")

        const firebase = getFirebase();
        const firestore = getFirestore();
        const FacebookProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(FacebookProvider).then((result) => {
            const user = result.user
            const additionalUserInfo = result.additionalUserInfo
            const isNewUser = result.additionalUserInfo.isNewUser
            console.log("is this a new user?: ", result.additionalUserInfo.isNewUser, user, additionalUserInfo);
            if (isNewUser) {
                console.log('creating new user and sending to firestore', user, additionalUserInfo)

                firestore.collection('users').add({
                    accessLevel: 'pending',
                    first_name: additionalUserInfo.profile.first_name,
                    last_name: additionalUserInfo.profile.last_name,
                    email: additionalUserInfo.profile.email,
                    photoURL: user.photoURL,
                    phone: user.phoneNumber,
                    uid: user.uid,
                    provider: 'Facebook',
                    memberRef: null,
                    createdOn: new Date(),
                    updatedOn: new Date(),
                }).then((user) => {
                    console.log('user data sent success')
                    user.get().then((doc) => {
                        const data = doc.data()
                        console.log(data)
                        dispatch({ type: 'CREATE_USER', data });
                        //Create Access Level Request
                        firestore.collection('requests').add({
                            userRef: doc.id,
                            userName: data.first_name + " " + data.last_name,
                            accessLevel: 'pending',
                            requestedAccessLevel: 'volunteer',
                            createdOn: new Date(),
                            updatedOn: new Date()
                        }).then((request) => {
                            request.get().then((doc) => {
                                const data = doc.data()
                                console.log("access request ", data)
                                dispatch({ type: 'CREATE_ACCESS_REQUEST', data });
                            })
                        })

                    })

                }).catch((err) => {
                    dispatch({ type: 'CREATE_USER_ERROR', err });
                })
            } else {
                const userRef = firestore.collection('users').where('uid', '==', user.uid).limit(1)
                userRef.get().then(users => {
                    const data = users.docs[0].data()
                    console.log("matched existing user: ", data);
                    dispatch({ type: 'LOGIN_FACEBOOK_SUCCESS', data });
                })
            }
        }).catch((err) => {
            console.log('the was an error logging in' , err)
            dispatch({ type: 'LOGIN_FACEBOOK_ERROR', err })
        })
    }
}

export const logOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        //make async call to database

        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'LOG_OUT_SUCCESS' })
        })
    }
}




export const loadUser = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        console.log('checking if user is logged in')
        const firestore = getFirestore();
        const firebase = getFirebase()

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const userRef = firestore.collection('users').where('uid', '==', user.uid).limit(1)
                userRef.get().then(users => {
                    if (users.docs.length > 0) {
                        const data = users.docs[0].data()
                        console.log("matched existing user: ", data);
                        dispatch({ type: 'LOGIN_FACEBOOK_SUCCESS', data }); // issue here
                    } else {
                        console.log('new user log in', user) // need to create new user doc?

                        
                    }

                })
            } else {
                // No user is signed in.
                console.log("no one is logged in")
            }
        });





    }
}

export const linkUser = (userRef, memberRef, penRef, photoURL) => {
    console.log("NEED TO DELETE: ", penRef);

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database

        const firestore = getFirestore();

        const requestRef = firestore.collection('requests')
                .where('userRef', '==', userRef)
                .where('requestedAccessLevel', '==', 'volunteer')
                .limit(1);
        
        console.log('linking ', userRef,memberRef)
        firestore.collection('users').doc(userRef).update({
            memberRef : memberRef,
            accessLevel : 'volunteer',
            updatedOn: new Date()
        }).then( () => {
            firestore.collection('members').doc(memberRef).update({
            userRef : userRef,
            photoURL : photoURL,
            updatedOn : new Date()
        }).then( () => {
            //deleting pending notification after linking
            // requestRef.get().then( (docs) =>{
            //     //const data = docs.docs[0].data()
            //     const data = doc(penRef).delete;
            //     console.log('Pending request to delete after linking ', data)
            // })


            //Delete document from requests collection
            firestore.collection('requests').doc(penRef).delete().then( () => {
                dispatch({ type: 'LINKED_USER_DELETE_PENDING', penRef});
            }).catch( (err) =>{
                dispatch({ type: 'LINKED_USER_DELETE_PENDING_ERROR', err});
            }) 

            console.log("user linked in firestore.")
        })
        }

        )

    }
}

export const denyUser = (penRef) => {
    console.log("DENYING PENDING USER: ", penRef)  //penRef == doc ID of pending user

    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        console.log("HELLO");

        const firestore = getFirestore();
        
        //Delete document from requests collection
        firestore.collection('requests').doc(penRef).delete().then( () => {
            dispatch({ type: 'DENY_PENDING_USER', penRef});
        }).catch( (err) =>{
            dispatch({ type: 'DENY_PENDING_USER_ERROR', err});
        }) 
    }
}
