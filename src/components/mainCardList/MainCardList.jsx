import React, { useEffect, useContext } from 'react';
import style from './MainCardList.module.scss';
import MainCard from '../mainCard/MainCard';
import { useState } from 'react';
import { getProducts, cartContext } from '../../service/products';

const MainCardList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useContext(cartContext);

    useEffect(() => {
        (async () => {
            try {
                const productList = await getProducts();
                setProducts(productList);
            } catch (error) {
                throw new Error(error);
            }
         })()
    },[])

    return (
        products.map(item => {
            let quant = item.quantity;
            for (let items of cart){
                if (item.id == items.id){
                    quant = item.quantity - items.quantity;
                }
            }

        return <MainCard key={item.id} id={item.id} name={item.name} price={item.price} description={item.description} category={item.category} image={item.image} manufacturer={item.manufacturer} favourite={item.favourite} quantity={quant}/>
        })
    );
};

export default MainCardList;