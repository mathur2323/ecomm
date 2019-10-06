import * as actionType from './../constants'

const defaultState = {
    categories:[]
}

export const categoryReducer = (state = defaultState, action)=> {
    switch(action.type){
        case actionType.ADD_CATEGORY:
            return {
                ...state,
                categories:[...this.state.categories, action.payload]
            }

        case actionType.EDIT_CATEGORY:
            return {
                ...state,
                // categories:
            }

        case actionType.DELETE_CATEGORY:
            let updatedCategories = this.state.categories.filter(item => item !== action.payload) 
            return{
                ...state,
                categories:updatedCategories
            }

        default:
            return state
    }
}