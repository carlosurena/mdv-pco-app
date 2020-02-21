export const createMember = (member) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        const firestore = getFirestore();
        firestore.collection('members').add({
            first_name: member.fname,
            last_name: member.lname,
            dob: new Date(member.dob+ " 00:00"),
            gender: member.gender,
            phone: member.phone,
            type: member.type,
            createdOn: new Date(),
            updatedOn: new Date()
        }).then( () => {
            dispatch({ type: 'CREATE_MEMBER', member});
        }).catch( (err) =>{
            dispatch({ type: 'CREATE_EVENT_ERROR', err});
        }) 
       

    }
}

export const updateMember = (member) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        const firestore = getFirestore();
        firestore.collection('members').doc(member.id).update({
            first_name: member.first_name,
            last_name: member.last_name,
            dob: member.dob,
            gender: member.gender,
            phone: member.phone,
            type: member.type,
            email:member.email,
            allergies: member.allergies,
            other: member.other,
            updatedOn: new Date()
        }).then( () => {
            dispatch({ type: 'UPDATE_MEMBER', member});
        }).catch( (err) =>{
            dispatch({ type: 'UPDATE_MEMBER_ERROR', err});
        }) 
    }
}

export const deleteMember = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        const firestore = getFirestore();
        firestore.collection('members').doc(id).delete().then( () => {
            dispatch({ type: 'DELETE_MEMBER', id});
        }).catch( (err) =>{
            dispatch({ type: 'DELETE_MEMBER_ERROR', err});
        }) 
    }
}

export const searchMembers = (query) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database

        const firestore = getFirestore();
        firestore.collection('members').where('first_name', '>=', query).then( () => {
            dispatch({ type: 'SEARCH_MEMBER', query});
        }).catch( (err) =>{
            dispatch({ type: 'SEARCH_MEMBER_ERROR', err});
        }) 
    }
}

export const updateMembersList = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log('updating members list')
        const firestore = getFirestore();
        firestore.collection('members').get().then( (members) =>{
            var data = members.docs.map( doc => {
                return{
                    ...doc.data(),
                    id: doc.id
                }
            })
            //dispatch({})
        }
        )

    }
}

export const setActiveMemberMenuItem = (activeItem) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //make async call to database
        console.log("settting current active item")
        
        dispatch({ type: 'SET_ACTIVE_MEMBER_MENU_ITEM', activeItem });

    }
}

