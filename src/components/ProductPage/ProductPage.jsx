import React from 'react';
import style from './ProductPage.module.scss';
import { useState,useEffect,useContext } from 'react';
import { getProductById, addToCart, getCart, cartContext, changeToFavourite, getCartProductById, topFunction } from '../../service/products';
import { useParams } from 'react-router-dom';
import fav from '../../media/images/favo.svg';
import nfav from '../../media/images/nfav.svg';


const ProductPage = ({qtyChange, setQtyChange}) => {
    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState([]);
    const [cartProduct, setCartProduct] = useState([]);
    const [add,changeAdd] = useState("ADD TO CART")
    const {id} = useParams();
    const [cart, setCart] = useContext(cartContext);
    const [favourite, setFavourite] = useState(nfav);
    const [favCheck, setFavCheck] = useState(false);
    const [stock, setStock] = useState(true);
    
    useEffect(() => {
        topFunction();
    },[])

    useEffect(() => {
        (async () => {
            const getProduct = await getProductById(id);
            setProduct(getProduct);
            if (!product.favourite){
                setFavourite(nfav);
            } else {
                setFavourite(fav);
            }
        })();
    },[favCheck]);

    useEffect(() => {
            if (!product.favourite){
                setFavourite(nfav);
            } else {
                setFavourite(fav);
            }
    },[product]);

    useEffect(() => {
        (async () =>{
            const getCartProd = await getCartProductById(id);
            setCartProduct(getCartProd);
            
        })();
    },[quantity])

    useEffect(()=>{
        if (cartProduct && cartProduct.quantity >= product.quantity){
            setStock(false);
        }
    }, [cartProduct]);

    const addProduct = (e) => {
        e.preventDefault();
        if (quantity < (product.quantity - (cartProduct? cartProduct.quantity: 0))){
            setQuantity(quantity + 1);
        } 
       
    }

    const removeProduct = (e) => {
        e.preventDefault();
        if (quantity > 0){
            setQuantity(quantity - 1);
        }
       
    }

    const cartUpdate = async (e) => {
        e.preventDefault();
        if (quantity > 0){
            changeAdd("ADDING");
            await addToCart(id, quantity);
            changeAdd("ADDED TO CART!");
            setQuantity(0);
            await setCart(getCart());
            setQtyChange(!qtyChange);
        }
    }
    
    const favUpdate = async () => {
        await changeToFavourite(id);
        setFavCheck(!favCheck);
    }

    

    return (
        <div className={style.product}>
            <section className={style.product__preview}>
                <img src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-5_large.png?format=webp&v=1530129458" alt="" />
                <img src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-5_large.png?format=webp&v=1530129199" alt="" />
                <img src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-lifestyle-2_large.png?format=webp&v=1530129263" alt="" />
            </section>
            <div className={style.product__main}>
                <img src={product.image} alt="" />
            </div>
            <form onSubmit={cartUpdate} className={style.product__description}>
                <h1>{product.name}</h1>
                <h3 className={style.product__description__option__price}><img onClick={async () => favUpdate()} src={favourite} alt="" /> ${product.price} AUD</h3>
                <p>{product.description}</p>
                {stock && <section className={style.product__description__sizeQty}>
                    <div className={style.product__description__sizeQty__size}>
                        <label htmlFor="size">Size</label>
                        <select className={style.product__description__sizeQty__size__dropdown} name="size" id="size">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                    <div className={style.product__description__sizeQty__qty}>
                        <label htmlFor="quantity">Quantity</label>
                        <div className={style.product__description__sizeQty__qty__select}>
                            <button onClick={removeProduct}>-</button>
                            <div name="quantity" id="quantity">{quantity}</div>
                            <button onClick={addProduct}>+</button>
                        </div>
                    </div>
                </section>}
                {!stock && <section className={style.product__description__sizeQty__size}><h2>Out of Stock</h2></section>}
                {stock && <button className={style.product__description__button} type='submit'>{add}</button>}
            </form>
        </div>
    );
};

export default ProductPage;