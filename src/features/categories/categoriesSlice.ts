import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface Category {
    id: string,
    name: string,
    userEmail: string
}

const categoriesAdapter = createEntityAdapter<Category>()


const categoriesSlice = createSlice({
    name: 'categories',
    initialState: categoriesAdapter.getInitialState(),
    reducers: {
        categoryAdded: categoriesAdapter.addOne
    }
})

export const {categoryAdded} = categoriesSlice.actions

const {
    selectAll: selectAllCategories
} = categoriesAdapter.getSelectors<RootState>(state => state.categories) 

export const selectCategoriesByUser = createSelector(
    [selectAllCategories,(state:RootState,userEmail:string) => userEmail],
    (categories,userEmail) => categories.filter(category => category.userEmail === userEmail)
)

export default categoriesSlice.reducer