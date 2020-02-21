const initState = {
    locations: [],
    currentLocation: null

};

const eventReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_LOCATION':
            console.log('location created:', action.location);
            return state;
        case 'CREATE_LOCATION_ERROR':
            console.log("There was an error creating a location", action.error);
            return state;
        
        case 'SET_CURRENT_LOCATION':
            console.log('current location set:', action.data);
            return{
                ...state,
                currentLocation: action.data
            }
        case 'SET_CURRENT_LOCATION_ERROR':
            console.log("There was an error setting the current location", action.error);
            return state;
        case 'UPDATE_CURRENT_LOCATION':
            console.log('current location updated:', action.data);
            return{
                // ...state,
                currentLocation: action.data
            }
        case 'UPDATE_CURRENT_LOCATION_ERROR':
            console.log("There was an error updating the current location", action.error);
            return state;
        case 'RESET_CURRENT_LOCATION':
            console.log("reset current location");
            return{
                 ...state,
                currentLocation: null
            }
        default:
            return state;

    }
}
export default eventReducer