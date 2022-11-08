import React, { useEffect, useState } from 'react';
import { getProductBySearchTerm } from '../../service/products';
import { useParams } from 'react-router-dom';
import MainCard from '../mainCard/MainCard';
import style from './ProductSearch.module.scss';


const ProductSearch = () => {
    const {terms} = useParams();
    const [prod,setProd] = useState([]);
    const [ser,noSer] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ( async () => {
            setLoading(true);
            const productList = await getProductBySearchTerm(terms);
            setProd(productList);
            if (productList.length == 0){
                noSer(false);
            } else {
                noSer(true);
            }
            setLoading(false);
        })();
    },[terms])

    return (
        <>{loading && <h1 className={style.container}>Loading...</h1>}{!loading && !ser && <h1 className={style.container}>No results for "{terms.split('+').join(' ')}"</h1>}{!loading && ser && 
            <div className={style.search}>
                <h2>Search results for "{terms.split('+').join(' ')}"</h2>
                <div className={style.search__flex}>
                {prod.map(item => <MainCard key={item.id} id={item.id} name={item.name} price={item.price} description={item.description} category={item.category} image={item.image} manufacturer={item.manufacturer} favourite={item.favourite}/>)}
                </div>
            </div> 
            }</>
    );
};

export default ProductSearch;