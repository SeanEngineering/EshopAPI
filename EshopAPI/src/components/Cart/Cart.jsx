import React, { useEffect, useState, useContext } from 'react';
import style from './Cart.module.scss';
import { getCart, cartContext, addToCart, deleteCartProductById} from '../../service/products';
import { NavLink } from 'react-router-dom';
import loadingImage from '../../media/images/loading2.gif'

const Cart = () => {
    const [cart, setCart] = useContext(cartContext);
    const [image, setImage] = useState([]);
    const [price, setPrice] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [productTotal, setProductTotal] = useState([]);
    const [total, setTotal] = useState(0);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [quant, setQuant] = useState(0);
    const [shipping, setShipping] = useState("Free");
    const [items, setItems] = useState(false);

    const updateValue = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }

    const cartChange = async (id, qty, checkQuantity) => {
        setLoading(true);
        if ((checkQuantity > 0 && qty == -1) || qty == 1) {
            await addToCart(id, qty);

        } else {
            await deleteCartProductById(id);
        }
        setCart(await getCart());
        setLoading(false);
    }

    const removeItem = async (id) => {
        await deleteCartProductById(id);
        setCart(await getCart());
    }

    useEffect(() => {
        ( async () => {
            const altCart = await cart;
            setTotal(await altCart.reduce(
                (a,b) => a + (b.price * b.quantity), 
                0))
            setImage(await altCart.map((item,index) => {
                return <NavLink to={`/product/${item.id}`}><div key={index} className={style.container__column__name}><img src={item.image} alt="" />{item.name}</div></NavLink>
            }));
            setPrice(await altCart.map((item, index) => {
                return <div key={index} className={style.container__column__name}>${item.price}</div>
            }));
            setQuantity(await altCart.map((item, index) => {
                return <div key={index} className={style.container__column__name__qty}>{!loading && <><button onClick={()=>{cartChange(item.id, -1, item.quantity)}}>-</button>{item.quantity}<button onClick={()=>{cartChange(item.id,1)}}>+</button></>}{loading && <div className={style.container__column__loading} ><img src={loadingImage} /></div>}</div>
            }));
            setProductTotal(await altCart.map((item,index) => {
                return <div key={index} className={style.container__column__name}>${item.price * item.quantity}<button onClick={()=>{removeItem(item.id)}}>remove</button></div>
            }));
            setQuant(await altCart.reduce((a,b) =>
            a + parseInt(b.quantity), 0 )); 
        })();

  
    },[cart, update, loading])

    useEffect(() => {
            if (total < 300 && total != 0) {
                console.log(total);
                setShipping("$30")
                setItems(true);
            } else if (total > 300){
                setShipping("Free");
                setItems(true);
            }
            else if (total == 0) {
                setItems(false);
            }
            console.log(items);
    }, [total]);

    return (
        <div className={style.container}>
            <div className={style.container__scroll}>
                <div className={style.container__scroll__titles}>
                    <h4>Product</h4>
                    <h4>Price</h4>
                    <h4>QTY</h4>
                    <h4>Total</h4>
                </div>
                <div className={style.container__scroll__box}>
                    <section className={style.container__column}>
                        {image}
                    </section>
                    <section className={style.container__column}>
                        {price}
                    </section>
                    <section className={style.container__column}>
                        {quantity}
                        
                    </section>
                    <section className={style.container__column}>
                        {productTotal}
                    </section>
                </div>
            </div>
            <main className={style.container__main}>
                {items && <>
                <div>
                    <h2>Order Summary</h2>
                    <h4>Subtotal ({quant}): ${total} AUD</h4>
                    <h4>Estimated Shipping: {shipping}</h4>
                </div>

                
                <button>Checkout</button>
                </>}
                {!items && <><h2>Oh no...</h2><h5>Your Cart is Empty</h5></>}
            </main>
        </div>
       
    );
};

export default Cart;