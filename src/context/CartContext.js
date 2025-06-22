"use client";
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newItem = action.payload;
      const existingIndex = state.cart.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existingIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += 1;
        return {
          ...state,
          cart: updatedCart,
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...newItem, quantity: 1 }],
      };
    }
    case "INCREMENT_QTY": {
      return {
        ...state,
        cart: state.cart.map((item, idx) =>
          idx === action.index ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }

    case "DECREMENT_QTY": {
      return {
        ...state,
        cart: state.cart.map((item, idx) =>
          idx === action.index && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }
    case "CLEAR_CART": {
      return {
        ...state,
        cart: [],
      };
    }

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
