import { createContext, useReducer } from 'react'

export const AdminContext = createContext()

export const leadsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_INVENTORY':
            return {
                ...state,
                inventory: action.payload
            }
        case 'SET_BOOKINGS':
            return {
                ...state,
                recentBookings: action.payload
            }
        case 'DELETE_BOOKING':
            return {
                ...state,
                recentBookings: state.recentBookings.filter((l) => l._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const AdminContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(leadsReducer, {
        inventory: [],
        recentBookings: []
    })

    return (
        <AdminContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AdminContext.Provider>
    )
}