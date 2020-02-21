export const createSheet = (eventID,locationID,user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        console.log('creating sheet')
        const firestore = getFirestore();

        firestore.collection('sheets').add({
            date: new Date(),
            eventRef: eventID,
            locationRef: locationID,
            creatorID: user.uid,
            creatorName: user.displayName,
            createdOn: new Date(),
            updatedOn: new Date(),

        }).then( (sheet) => {
            
            sheet.get().then((doc) =>{
                var data = doc.data()
                data.id = sheet.id
                data.attendees = []
                dispatch({ type: 'CREATE_SHEET', data});
            })

            
        }).catch( (err) =>{
            dispatch({ type: 'CREATE_SHEET_ERROR', err});
        }) 



    }
}

export const addAttendee = (sheet, attendeeID,user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("updating attendee array with: ",sheet.id,attendeeID)
        
        const firestore = getFirestore();
        //const creatorRef = firestore.collection('users').doc(user.uid)
        //var eventRef = firestore.collection('events').doc(eventID);

        firestore.collection('sheets').doc(sheet.id).collection('attendees').doc(attendeeID).set({
            checkInDate: new Date(),
            checkOutDate: null,
            updatedOn: new Date(),
            checkedInBy: user.uid,
            attendeeID: attendeeID 
        }).then( () => {
            dispatch({ type: 'ADD_ATTENDEE', attendeeID});
        }).catch( (err) =>{
            dispatch({ type: 'ADD_ATTENDEE_ERROR', err});
        }) 

    }
}

export const setCurrentSheet = (sheet) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("settting current sheet")
        
        const firestore = getFirestore();
        // const creatorRef = firestore.collection('users').doc(user.uid)
        // var eventRef = firestore.collection('events').doc(eventID);
        var sheetRef = firestore.collection('sheets').doc(sheet.id);

        sheetRef.get().then( (doc) => {
            if (doc.exists) {
                var data = doc.data();
                data.id = doc.id;
                const attendeesRef = firestore.collection('sheets').doc(sheet.id).collection('attendees')
                attendeesRef.get().then((attendees) => {
                    data.attendees = attendees.docs.map(doc => doc.data())
                    dispatch({ type: 'SET_CURRENT_SHEET', data });
                }).catch((err) =>{
                    dispatch({ type: 'SET_CURRENT_SHEET_ERROR', err });
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch( (err) =>{
            dispatch({ type: 'SET_CURRENT_SHEET_ERROR', err});
        }) 

    }
}

export const updateCurrentSheet = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("updating current sheet",)
        const currentSheetID = getState().sheet.currentSheet.id;
         
        const firestore = getFirestore();
        const sheetRef = firestore.collection('sheets').doc(currentSheetID);
        sheetRef.get().then( (doc) => {
            
            if (doc.exists) {
                var data = doc.data();
                data.id = currentSheetID;
                const attendeesRef = firestore.collection('sheets').doc(currentSheetID).collection('attendees')
                attendeesRef.get().then((attendees) => {
                    data.attendees = attendees.docs.map(doc => doc.data())
                    dispatch({ type: 'UPDATE_CURRENT_SHEET', data });
                }).catch((err) =>{
                    dispatch({ type: 'UPDATE_CURRENT_SHEET_ERROR', err});
                })
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        }).catch( (err) =>{
            dispatch({ type: 'UPDATE_CURRENT_SHEET_ERROR', err});
        }) 

    }
}

export const getTodaySheetFromSelection = (eventRef,locationRef,user) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("finding today's sheet for selected event and location", eventRef, locationRef)
         
        const firestore = getFirestore();
        const today  = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setMilliseconds(0);
        today.setSeconds(0);

        
        const sheetRef = firestore.collection('sheets')
        .where('eventRef','==',eventRef)
        .where('locationRef','==',locationRef)
        .where('date','>=',today).limit(1);

        sheetRef.get().then((sheets) => {
            console.log(sheets)
            if(sheets.docs.length > 0){
                var currentSheet = sheets.docs[0].data();
                currentSheet.id = sheets.docs[0].id
                // Querying DB to get attendees subcollection
                const attendeesRef = firestore.collection('sheets').doc(currentSheet.id).collection('attendees')
                attendeesRef.get().then((attendees) => {
                    currentSheet.attendees = attendees.docs.map(doc => doc.data())
                    console.log("sheet found!",currentSheet)               
                    dispatch({ type: 'GET_TODAY_SHEET', currentSheet });
                }).catch((err) =>{
                    dispatch({ type: 'UPDATE_CURRENT_SHEET_ERROR', err});
                })
                 //set current sheet(sheet)
            }else{
                console.log('sheet not found. creating a sheet.')
                //dispatch({ type: 'GET_TODAY_SHEET', currentSheet });
                firestore.collection('sheets').add({
                    date: new Date(),
                    eventRef: eventRef,
                    locationRef: locationRef,
                    creatorID: user.uid,
                    creatorName: user.displayName,
                    createdOn: new Date(),
                    updatedOn: new Date(),
        
                }).then( (sheet) => {
                    
                    sheet.get().then((doc) =>{
                        var data = doc.data()
                        data.id = sheet.id
                        data.attendees = []
                        dispatch({ type: 'CREATE_SHEET', data});
                    })
        
                    
                }).catch( (err) =>{
                    dispatch({ type: 'CREATE_SHEET_ERROR', err});
                }) 

            }
            
        }).catch((err) =>{
            dispatch({ type: 'GET_TODAY_SHEET_ERROR', err});
        })

     

    }
}


export const resetCurrentSheet = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {

    dispatch({ type: 'RESET_CURRENT_SHEET'});
    }
}


export const getSheetsFromLocation = (locationRef,eventRef) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        
        console.log("getting all sheeets from location: ", locationRef, eventRef)
        const firestore = getFirestore();

        const sheetRef = firestore.collection('sheets')
        .where('eventRef','==',eventRef)
        .where('locationRef','==',locationRef).orderBy('date','desc')

        sheetRef.get().then( sheets => {
            var data = sheets.docs.map( doc => {
                return{
                    ...doc.data(),
                    id: doc.id
                }
            })
            console.log('data', data)
            dispatch({ type: 'GET_SHEETS_FROM_LOCATION', data});

        }
            
            );

    }
}


export const checkOutAttendee = (sheetID, attendeeID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        dispatch({ type: 'START_CHECKOUT'});
        console.log("checking out: ",sheetID,attendeeID)
        
        const firestore = getFirestore();
        //const creatorRef = firestore.collection('users').doc(user.uid)
        //var eventRef = firestore.collection('events').doc(eventID);

        firestore.collection('sheets').doc(sheetID).collection('attendees').doc(attendeeID).update({
            checkOutDate: new Date()
        }).then( () => {
            dispatch({ type: 'CHECKOUT_ATTENDEE', attendeeID});
        }).catch( (err) =>{
            dispatch({ type: 'CHECKOUT_ATTENDEE', err});
        }) 

    }
}