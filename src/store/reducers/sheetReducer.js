const initState = {
    sheets: [
    ],
    currentSheet:null,
    isCheckingOut : false

};

const sheetReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_SHEET':
            console.log('sheet created:', action.data);
            return{
                ...state,
                currentSheet : action.data
            };
        case 'CREATE_SHEET_ERROR':
            console.log("There was an error creating a sheet", action.err);
            return state;
        case 'ADD_ATTENDEE':
            console.log('attendee added:', action.attendeeID);
            return state;
        case 'ADD_ATTENDEE_ERROR':
            console.log("There was an error adding an attendee to the sheet", action.err);
            return state;
        case 'START_CHECKOUT':
        return{
            ...state,
            isCheckingOut: true
        }        
        case 'CHECKOUT_ATTENDEE':
            console.log('attendee checkout successful:', action.attendeeID);
            return{
                ...state,
                isCheckingOut: false
            }   
        case 'CHECKOUT_ATTENDEE_ERROR':
            console.log("There was an error checking out an attendee", action.err);
            return state;
        case 'SET_CURRENT_SHEET':
            console.log('current sheet set:', action.data);
            return{
                ...state,
                currentSheet: action.data
            }
        case 'SET_CURRENT_SHEET_ERROR':
            console.log("There was an error setting the current sheet", action.err);
            return state;
        case 'UPDATE_CURRENT_SHEET':
            console.log('current sheet updated:', action.data);
            return{
                // ...state,
                currentSheet: action.data
            }
        case 'UPDATE_CURRENT_SHEET_ERROR':
            console.log("There was an error updating the current sheet", action.err);
            return state;
        case 'RESET_CURRENT_SHEET':
            console.log("reset current sheet");
            return{
                 ...state,
                currentSheet: null
            }
        case 'GET_TODAY_SHEET':
            console.log("found today's sheet", action.currentSheet);
            return{
                 ...state,
                currentSheet: action.currentSheet
            }
        case 'GET_SHEETS_FROM_LOCATION':
            console.log("found all sheets for SPECIFIED location", action.data);
            return{
                 ...state,
                sheets: action.data
            }
            
        default:
            return state;

    }
}
export default sheetReducer