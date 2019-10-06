import * as actionType from './../constants';

const addCategory = () => ({
    type:actionType.ADD_CATEGORY
})

const editCategory = ()=> ({
    type:actionType.EDIT_CATEGORY
})

const deleteCategory = () => ({
    type:actionType.DELETE_CATEGORY
})

export { addCategory, editCategory, deleteCategory };