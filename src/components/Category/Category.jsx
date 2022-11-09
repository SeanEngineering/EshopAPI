import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProductByCategory } from '../../service/products';
import MainCard from '../mainCard/MainCard';
import style from './Category.module.scss';
import Flexbox from '../Containers/Container/Flexbox';

const Category = ({setCateg}) => {
    const {category} = useParams();
    const [catItems, setCatItems] = useState([]);

    useEffect(() => {
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
            {catItems.map(item => <MainCard key={item.id} id={item.id} name={item.name} price={item.price} description={item.description} category={item.category} image={item.image} manufacturer={item.manufacturer} favourite={item.favourite}/>)}
         </section>
        </main>
    )
};

export default Category;