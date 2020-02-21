const initState = {
    members: [],
    activeItem: 'Info',
};

const memberReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_MEMBER':
            console.log("created member", action.member);
            return state;
        case 'CREATE_MEMBER_ERROR':
            console.log("There was en error creating a member", action.error);
            return state;
        case 'UPDATE_MEMBER':
            console.log('member updated:', action.member);
            return state;
        case 'UPDATE_MEMBER_ERROR':
            console.log("There was en error updating a member", action.error);
            return state;
        case 'DELETE_MEMBER':
            console.log('member deleted:', action.id);
            return state;
        case 'DELETE_MEMBER_ERROR':
            console.log("There was en error deleting a member", action.error);
            return state;
        case 'SEARCH_MEMBER':
            console.log('member search complete', action.query);
            return state;
        case 'SEARCH_MEMBER_ERROR':
            console.log("There was en error finding the member", action.error);
            return state;
        case 'SET_ACTIVE_MEMBER_MENU_ITEM':
            console.log("active item set");
            return{
                 ...state,
                activeItem: action.activeItem
            }
        default:
            return state;

    }
}

export default memberReducer