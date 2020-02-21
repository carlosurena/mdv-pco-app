export const createLocation = (eventID,location,user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        
        const firestore = getFirestore();
        //const creatorRef = firestore.collection('users').doc(user.uid)
        //var eventRef = firestore.collection('events').doc(eventID);

        firestore.collection('locations').add({
            title: location.title,
            eventRef: eventID,
            creatorID: user.uid,
            creatorName: user.displayName,
            createdOn: new Date(),
            updatedOn: new Date()
        }).then( () => {
            dispatch({ type: 'CREATE_LOCATION', location});
        }).catch( (err) =>{
            dispatch({ type: 'CREATE_LOCATION_ERROR', err});
        }) 

    }
}


export const setCurrentLocation = (location) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("settting current location")
        
        const firestore = getFirestore();
        // const creatorRef = firestore.collection('users').doc(user.uid)
        // var eventRef = firestore.collection('events').doc(eventID);
        var locRef = firestore.collection('locations').doc(location.id);

        locRef.get().then( (doc) => {
            if (doc.exists) {
                var data = doc.data();
                data.id = location.id;
                console.log(data)
                dispatch({ type: 'SET_CURRENT_LOCATION', data });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch( (err) =>{
            dispatch({ type: 'SET_CURRENT_LOCATION_ERROR', err});
        }) 

    }
}

export const updateCurrentLocation = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("updating current location",)
        const currentLocationID = getState().location.currentLocation.id;
         
        const firestore = getFirestore();
        const locRef = firestore.collection('locations').doc(currentLocationID);
        locRef.get().then( (doc) => {
            if (doc.exists) {
                var data = doc.data();
                data.id = currentLocationID;
                console.log(data)
                dispatch({ type: 'UPDATE_CURRENT_LOCATION', data });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch( (err) =>{
            dispatch({ type: 'UPDATE_CURRENT_LOCATION_ERROR', err});
        }) 

    }
}

export const resetCurrentLocation = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

    dispatch({ type: 'RESET_CURRENT_LOCATION'});
    }
}