import React, { createContext, useEffect, useState} from 'react';
// import all_products from '../assets/all_products';
export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart={};
    for(let index=0; index< 300 + 1 ; index++) {
        cart[index]=0;
    }
    return cart;
}


function ShopContextProvider(props) {

    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [all_products,setAll_products] = useState([]);

    useEffect(()=>{
        fetch("http://192.168.0.57:4000/allproducts").then((response)=>response.json()).then((data)=>setAll_products(data));
        if(localStorage.getItem('auth_token')){
            fetch("http://192.168.0.57:4000/getcart",{
                method:"POST",
                headers:{
                    Accept:"application/from-data",
                    'auth_token':`${localStorage.getItem('auth_token')}`,
                    'Content-Type':'application/json'
                },
                body: "",
            }).then((response)=>response.json()).then((data)=> setCartItems(data))
        }
    }, [])

    const addToCart = (itemid)=>{
        setCartItems((prev)=>({...prev,[itemid]:prev[itemid]+1}))
        console.log(cartItems);
    }
    const removeFromCart = (itemid)=>{
        setCartItems((prev)=>({...prev,[itemid]:prev[itemid]-1}))
    }

    const getTotalCartAmount = ()=>{
        let totalAmount=0;
        for(const item in cartItems) {
            if(cartItems[item]>0){
                let itemInfo = all_products.find((product)=>
                product.id=== Number(item));
                totalAmount+=itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = ()=>{
        let totalItems =0;
        for(const item in cartItems) {
            if(cartItems[item]>0){
                totalItems+=cartItems[item];
            }
        }
        return totalItems;
    }

    const contextValue = {all_products, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems};
    // console.log(cartItems);

  return (
   <ShopContext.Provider value={contextValue}>
    {props.children}
   </ShopContext.Provider>
  )
}

export default ShopContextProvider