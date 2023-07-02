import React from 'react';
import { getProducts } from '../../service/products';
import { useEffect, useState } from 'react';
import MainCard from '../mainCard/MainCard';
import style from './FeaturedProduct.module.scss';
import { NavLink } from 'react-router-dom';

const FeaturedProduct = () => {
    const [featured, setFeatured] = useState([]);
    const [featured2, setFeatured2] = useState([]);
    const [featured3, setFeatured3] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const productList = await getProducts();
                const randomNumber = 0.5;
                setFeatured(
                    productList[parseInt(randomNumber * productList.length) - 2]
                );
                setFeatured2(
                    productList[parseInt(randomNumber * productList.length) - 1]
                );
                setFeatured3(
                    productList[parseInt(randomNumber * productList.length) - 3]
                );
            } catch (error) {
                throw new Error(error);
            }
        })();
    }, []);

    return (
        <div className={style.scrollWindow}>
            <NavLink to={`/product/${featured.id}`}>
                <div className={style.container}>
                    <div className={style.container__image}>
                        <img
                            src={featured.image}
                            alt=""
                        />
                    </div>
                    <div className={style.container__product}>
                        <h1>{featured.name}</h1>
                        <h2>{featured.manufacturer}</h2>
                        <h3>${featured.price} AUD</h3>
                        <p>{featured.description}</p>
                    </div>
                </div>
            </NavLink>
            <NavLink to={`/product/${featured2.id}`}>
                <div className={style.container}>
                    <div className={style.container__image}>
                        <img
                            src={featured2.image}
                            alt=""
                        />
                    </div>
                    <div className={style.container__product}>
                        <h1>{featured2.name}</h1>
                        <h2>{featured2.manufacturer}</h2>
                        <h3>${featured2.price} AUD</h3>
                        <p>{featured2.description}</p>
                    </div>
                </div>
            </NavLink>
            <NavLink to={`/product/${featured3.id}`}>
                <div className={style.container}>
                    <div className={style.container__image}>
                        <img
                            src={featured3.image}
                            alt=""
                        />
                    </div>
                    <div className={style.container__product}>
                        <h1>{featured3.name}</h1>
                        <h2>{featured3.manufacturer}</h2>
                        <h3>${featured3.price} AUD</h3>
                        <p>{featured3.description}</p>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};

export default FeaturedProduct;
