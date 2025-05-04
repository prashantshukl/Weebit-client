import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets.js";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const[search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);

        if (!size) {
            toast.error('Select a size');
            return;
        }

        if (cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
    }

    const getCartCount = () => {
        let count = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        count += cartItems[items][item];
                    }
                } catch (error) {
                    toast.error(error.message);
                }
            }
        }

        return count;
    }

    const currency = '₹';
    const delivery_fee = 100;

    const value = {
        products, currency, delivery_fee, 
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;