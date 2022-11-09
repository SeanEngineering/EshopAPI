import React, { useEffect } from 'react';
import style from './Welcome.module.scss';
import { useState } from 'react';
import MainCard from '../mainCard/MainCard';
import { getProducts } from '../../service/products';

const Welcome = ({yPos}) => {
    const [vis, setVis] = useState(false);
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

    const handleClick = (e) => {
        e.preventDefault();
        setVis(true);

    }

    useEffect(() => {
        if (yPos>10){
            setVis(true);
        }

    },[yPos])

    return (
        <div className={[style.container, vis && style.container__vis].join(' ')} onClick={(e) => handleClick(e)}>
            <div className={[style.ball, vis && style.ball__vis].join(' ')}>{products.length>0 &&<MainCard key={products[11].id} id={products[11].id} name={products[11].name} price={products[11].price} description={products[11].description} category={products[11].category} image={products[11].image} manufacturer={products[11].manufacturer} favourite={products[11].favourite}/>}</div>
            <div className={style.container__intro}>
                <h1>mrchnt</h1>
                <h3>noun</h3>
                <h4>A person or company involved in wholesale trade, especially one dealing with foreign countries or supplying goods to a particular trade.</h4>
            </div>
        </div>
    );
};

export default Welcome;