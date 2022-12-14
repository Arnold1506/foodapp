import React,{useReducer} from 'react'
import CartContext from './cart-context'

const defaultCartState={
    items:[],
    totalAmount:0
}

const cartReducer=(state,action)=>{
    if (action.type==='ADD') {
        const existingCartItemsIndex=state.items.findIndex((item)=>{
            return item.id===action.item.id;
        })

        const existingCartItem=state.items[existingCartItemsIndex]

        let updatedItems;

        if (existingCartItem) {
            const updatedItem={
                ...existingCartItem,
                amount:existingCartItem.amount+action.item.amount
            }
            updatedItems=[...state.items]
            updatedItems[existingCartItemsIndex]=updatedItem
        }else{
            updatedItems=state.items.concat(action.item)
        }

        const updatedTotalAmount=state.totalAmount+(action.item.price*action.item.amount)
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    if (action.type==="REMOVE") {
        const existingCartItemsIndex=state.items.findIndex((item)=>{
            return item.id===action.id;
        })
        const existingItem=state.items[existingCartItemsIndex]
        const updatedTotalAmount=state.totalAmount-existingItem.price
        let updatedItems;
        if (existingItem.amount===1) {
            updatedItems=state.items.filter((item)=>{
                return item.id!==action.id
            })
        }else{
            const updatedItem={...existingItem,amount:existingItem.amount-1}
            updatedItems=[...state.items]
            updatedItems[existingCartItemsIndex]=updatedItem;
        }
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    return  defaultCartState
}

export const CartProvider = (props) => {
    const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState)
    const addItemtoCartHandler=item=>{
        dispatchCartAction({type:'ADD',item:item})
    }
    const removeItemfromCartHandler=id=>{
        dispatchCartAction({type:'REMOVE',id:id})
    }
    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemtoCartHandler,
        removeItem:removeItemfromCartHandler
    }
  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider