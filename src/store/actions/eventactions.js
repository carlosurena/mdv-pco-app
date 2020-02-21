export const createEvent = (event,user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        console.log('creating event')
        const firestore = getFirestore();
        //const creatorRef = firestore.collection('users').doc(user.uid)
        firestore.collection('events').add({
            title: event.title,
            isRecurring: event.isRecurring,
            weekday: event.weekday,
            eventTime: event.eventTime,
            creatorID: user.uid,
            creatorName: user.displayName,
            createdOn: new Date(),
            updatedOn: new Date(),
        }).then( () => {
            dispatch({ type: 'CREATE_EVENT', event});
        }).catch( (err) =>{
            dispatch({ type: 'CREATE_EVENT_ERROR', err});
        }) 
       

    }
}



export const updateEvent = (event) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        const firestore = getFirestore();
        firestore.collection('events').doc(event.id).set({
            title: event.title,
            isRecurring: event.isRecurring,
            weekday: event.weekday,
            eventTime: event.eventTime,
            updatedOn: new Date()
        }).then( () => {
            dispatch({ type: 'UPDATE_EVENT', event});
        }).catch( (err) =>{
            dispatch({ type: 'UPDATE_EVENT_ERROR', err});
        }) 
       

    }
}

export const deleteEvent = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        const firestore = getFirestore();
        firestore.collection('events').doc(id).delete().then( () => {
            dispatch({ type: 'DELETE_EVENT', id});
        }).catch( (err) =>{
            dispatch({ type: 'DELETE_EVENT_ERROR', err});
        }) 
    }
}

export const setCurrentEvent = (event) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("settting current event")
        
        const firestore = getFirestore();
        // const creatorRef = firestore.collection('users').doc(user.uid)
        // var eventRef = firestore.collection('events').doc(eventID);
        var eventRef = firestore.collection('events').doc(event.id);

        eventRef.get().then( (doc) => {
            if (doc.exists) {
                var data = doc.data();
                data.id = event.id;
                console.log(data)
                dispatch({ type: 'SET_CURRENT_EVENT', data });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch( (err) =>{
            dispatch({ type: 'SET_CURRENT_EVENT_ERROR', err});
        }) 

    }
}

export const updateCurrentEvent = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("updating current event",)
        const currentEventID = getState().event.currentEvent.id;
         
        const firestore = getFirestore();
        const eventRef = firestore.collection('events').doc(currentEventID);
        eventRef.get().then( (doc) => {
            if (doc.exists) {
                var data = doc.data();
                data.id = currentEventID;
                console.log(data)
                dispatch({ type: 'UPDATE_CURRENT_EVENT', data });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch( (err) =>{
            dispatch({ type: 'UPDATE_CURRENT_EVENT_ERROR', err});
        }) 

    }
}
export const resetCurrentEvent = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

    dispatch({ type: 'RESET_CURRENT_EVENT'});
    }
}

export const setActiveEventMenuItem = (activeItem) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("settting current active item")
        
        dispatch({ type: 'SET_ACTIVE_EVENT_MENU_ITEM', activeItem });

    }
}