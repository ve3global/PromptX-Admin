const initialSettings = {
    settings: {},
    loading: true
}

const settingReducer = (state = initialSettings, action) => {
    switch (action.type) {
        case 'UPDATE_SETTINGS':
            return {
                ...state,
                settings: action.payload, // Update the settings state
                loading: false,
            };
        default:
            return state;
    }
}

export default settingReducer;