import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    products : []
}

const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        setProducts: (state, action)=>{
            state.products = action.payload
        }
    }
})

export const {setProducts} = productsSlice.actions
export default productsSlice.reducer;