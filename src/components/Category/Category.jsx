import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getProductByCategory, topFunction, cartContext } from '../../service/products';
import MainCard from '../mainCard/MainCard';
import style from './Category.module.scss';
import Flexbox from '../Containers/Container/Flexbox';

const Category = ({setCateg}) => {
    const {category} = useParams();
    const [catItems, setCatItems] = useState([]);
    const [cart, setCart] = useContext(cartContext);


    useEffect(() => {
        topFunction();
        ( async () => {
            const items = await getProductByCategory(category);
            setCatItems(items);
            setCateg(category);
        })();

    },[category]);

    return (
        <main className={style.container}>
         <h1 className={style.container__title}>{category}</h1>
         <section className={style.container__flex}>
            {catItems.map(item => {
                        let quant = item.quantity;
                        if (cart){
                            for (let items of cart){
                                if (item.id == items.id){
                                    quant = item.quantity - items.quantity;
                                }
                            }
                        }
                    return <MainCard key={item.id} id={item.id} name={item.name} price={item.price} description={item.description} category={item.category} image={item.image} manufacturer={item.manufacturer} favourite={item.favourite} quantity={quant}/>
                    })}
         </section>
        </main>
    )
};

export default Category;