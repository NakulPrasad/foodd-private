import React, { createContext, useContext, useReducer } from 'react'
const CartStateContex = createContext();
const CartDispatchContex = createContext();
//using use reducer than useState
//can seprate use context and reducer
//children can be components
//useReducer me dispatch ki functionality define krna hai
//dispatch me multiple cases hote hai. like add, delete
//reducer me logic hoga, addtocart..


const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        //we can't delete directly form state, make copy then cut .
        //react re-render component after deletling
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        //update functionality
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    // console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: (parseInt(action.qty) + parseInt(food.qty)), price: (action.price + food.price) }
                }

            })
            return arr
        case "DROP":
            let emptyArr = []
            return emptyArr
        default:
            console.log("Error in reducer");
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, [])
    return (

        <CartDispatchContex.Provider value={dispatch}>
            <CartStateContex.Provider value={state}>
                {children}
            </CartStateContex.Provider>
        </CartDispatchContex.Provider>
    )
}

export const useCart = () => useContext(CartStateContex);
export const useDispatchCart = () => useContext(CartDispatchContex);
