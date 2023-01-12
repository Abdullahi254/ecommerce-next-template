import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartState {
    items: [{
        id: String
        slug: String,
        name: String,
        variant: String,
        price: number,
        quantity: number,
        subTotal: number,
    }],
    total: number

}

const initialState: CartState = {
    items: [{
        id: '',
        name: '',
        price: 0,
        quantity: 0,
        slug: '',
        subTotal: 0,
        variant: ''
    }],
    total: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<typeof initialState.items[0]>) => {
            const filtered = state.items.filter(item => item.id === action.payload.id && item.variant === action.payload.variant)
            if (filtered.length > 0) {
                const index = state.items.indexOf(filtered[0])
                const subTotal = filtered[0].subTotal += action.payload.subTotal
                const quantity = filtered[0].quantity += action.payload.quantity
                const updatedItem = {
                    ...filtered[0],
                    quantity,
                    subTotal
                }
                state.items.splice(index, 1, updatedItem)
                state.total += action.payload.subTotal
            } else {
                state.items.push(action.payload)
                state.total += action.payload.subTotal
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const filtered = state.items[action.payload]
            const subTotal = filtered.subTotal
            state.items.splice(action.payload,1)
            state.total -= subTotal
        }
    },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer