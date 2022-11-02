import React, { useEffect } from 'react';
import style from './MainCardList.module.scss';
import MainCard from '../mainCard/MainCard';
import { useState } from 'react';
import { getProducts } from '../../service/products';

const MainCardList = () => {
    const [products, setProducts] = useState([]);
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
        products.map(item => <MainCard key={item.id} name={item.name} price={item.price} description={item.description} category={item.category} image={item.image} manufacturer={item.manufacturer} favourite={item.favourite}/>)
    );
};

export default MainCardList;