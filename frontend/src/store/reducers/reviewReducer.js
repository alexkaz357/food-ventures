const initialState = {
    updatedUser: null,
    selectedReview: null
};

export function reviewReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_REVIEWS':
            return {
                ...state,
                reviews: action.updatedUser
            };
        case 'ADD_REVIEW':
            return {
                ...state,
                updatedUser: action.updatedUser
            };
        default:
            return state;
    }
}