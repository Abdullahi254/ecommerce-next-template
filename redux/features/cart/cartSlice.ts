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
        image: string
    }],
    total: number

}

export const initialState: CartState = {
    items: [{
        id: '',
        name: '',
        price: 0,
        quantity: 0,
        slug: '',
        subTotal: 0,
        variant: '',
        image: ''
    }],
    total: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        overrideCart: (state, action: PayloadAction<CartState>) => {
            const newItems = action.payload.items
            const newTotal = action.payload.total
            state.items = newItems
            state.total = newTotal
        },
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
            localStorage.setItem('cart', JSON.stringify(state));
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const filtered = state.items[action.payload]
            const subTotal = filtered.subTotal
            state.items.splice(action.payload, 1)
            state.total -= subTotal
            localStorage.setItem('cart', JSON.stringify(state));
        },
        reduceItemQuantity: (state, action: PayloadAction<number>) => {
            const filtered = state.items[action.payload]
            const updatedQuantity = filtered.quantity - 1
            const updatedSubTotal = filtered.price * updatedQuantity
            if (updatedQuantity < 1) {
                state.items.splice(action.payload, 1)
                state.total -= filtered.price
            } else {
                const updatedItem: typeof initialState.items[0] = {
                    ...filtered,
                    quantity: updatedQuantity,
                    subTotal: updatedSubTotal
                }
                state.items.splice(action.payload, 1, updatedItem)
                state.total -= filtered.price
            }
            localStorage.setItem('cart', JSON.stringify(state));

        }
    },
})

// Action creators are generated for each case reducer function
export const { overrideCart, addToCart, removeFromCart, reduceItemQuantity } = cartSlice.actions

export default cartSlice.reducer