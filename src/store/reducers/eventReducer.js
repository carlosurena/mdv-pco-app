const initState = {
    events: [],
    currentEvent: null,
    activeItem: "Info",

};

const eventReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_EVENT':
            console.log("created event", action.event);
            return state;
        case 'CREATE_EVENT_ERROR':
            console.log("There was an error creating a event", action.error);
            return state;
        case 'UPDATE_EVENT':
            console.log('event updated:', action.event);
            return state;
        case 'UPDATE_EVENT_ERROR':
            console.log("There was an error updating a event", action.error);
            return state;
        case 'DELETE_EVENT':
            console.log('event deleted:', action.event);
            return state;
        case 'DELETE_EVENT_ERROR':
            console.log("There was an error deleting an event", action.error);
            return state;
        case 'SET_CURRENT_EVENT':
            console.log('current event set:', action.data);
            return{
                ...state,
                currentEvent: action.data
            }
        case 'SET_CURRENT_EVENT_ERROR':
            console.log("There was an error setting the current event", action.error);
            return state;
        case 'UPDATE_CURRENT_EVENT':
            console.log('current event updated:', action.data);
            return{
                // ...state,
                currentEvent: action.data
            }
        case 'UPDATE_CURRENT_EVENT_ERROR':
            console.log("There was an error updating the current event", action.error);
            return state;
        case 'RESET_CURRENT_EVENT':
            console.log("reset current event");
            return{
                 ...state,
                currentEvent: null
            }
        case 'SET_ACTIVE_EVENT_MENU_ITEM':
            console.log("active item set");
            return{
                 ...state,
                activeItem: action.activeItem
            }
        default:
            return state;

    }
}
export default eventReducer