import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { getProductByFavourites, topFunction,cartContext } from '../../service/products';
import style from './Favourites.module.scss';
import MainCard from '../mainCard/MainCard';
import Flexbox from '../Containers/Container/Flexbox';

const Favourites = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useContext(cartContext);

    const [ser,noSer] = useState(false);

    useEffect(() => {
        topFunction();
        ( async () => {
            setLoading(true);
            const favourites = await getProductByFavourites();
            setProducts(favourites);
            if (favourites.length == 0){
                noSer(false);
            } else {
                noSer(true);
            }
            setLoading(false);
        })();
    },[])

    return (
        <>{loading && <h1 className={style.container}>Loading...</h1>}{!loading && !ser && <h1 className={style.container}>You have no favourite products</h1>}{ser && 
            <div className={style.favourites}>
                <h1>Favourites</h1>
                 <div className={style.favourites__flex}>
                 {products.map(item => {
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
                 </div>
            </div>}
           </>
    );
};

export default Favourites;