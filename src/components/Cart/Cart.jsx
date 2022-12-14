import React, { useEffect, useState, useContext } from 'react';
import style from './Cart.module.scss';
import { getCart, cartContext, addToCart, deleteCartProductById, getCartProductById, getProductById, topFunction} from '../../service/products';
import { NavLink } from 'react-router-dom';
import loadingImage from '../../media/images/loading2.gif'

const Cart = ({uuid, loaded, setLoaded}) => {
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
    const [grandTotal, setGrandTotal] = useState(total);
    

    const cartChange = async (id, qty, checkQuantity) => {
        setLoading(true);
        if (checkQuantity > 0 && qty == -1) {
            await addToCart(id, qty);

        } else if (qty==1){
            const inCart = await getCartProductById(id);
            const inShop = await getProductById(id);
            console.log(inShop.quantity);
            console.log(inCart.quantity);
            if ((inShop.quantity - inCart.quantity) > 0){
                await addToCart(id, qty);
            }
        }else {
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
            console.log(altCart);
            setTotal(altCart.reduce(
                (a,b) => a + (b.price * b.quantity), 
            0));
            setQuant(await altCart.reduce((a,b) =>
            a + parseInt(b.quantity), 0 )); 
            if (altCart.length > 1) {
                setImage(await altCart.map((item,index) => {
                    return <NavLink to={`/product/${item.id}`}><div key={item.id} className={style.container__column__name}><img src={item.image} alt="" />{item.name}</div></NavLink>
                }));
                setPrice(await altCart.map((item, index) => {
                    return <div key={index} className={style.container__column__name}>${item.price}</div>
                }));
                setQuantity(await altCart.map((item, index) => {
                    console.log(item.id);
                    return <div key={index} className={style.container__column__name__qty}>{!loading && <><button onClick={()=>{cartChange(item.id, -1, item.quantity)}}>-</button>{item.quantity}<button onClick={()=>{cartChange(item.id,1)}}>+</button></>}{loading && <div className={style.container__column__loading} ><img src={loadingImage} /></div>}</div>
                }));
                setProductTotal(await altCart.map((item,index) => {
                    return <div key={index} className={style.container__column__name}>${item.price * item.quantity}<button onClick={()=>{removeItem(item.id)}}>remove</button></div>
                }));
                
            } else if (altCart.length == 1){
                setPrice(<div key={altCart[0].id} className={style.container__column__name}>${altCart[0].price}</div>);
                setQuantity(<div key={altCart[0].id} className={style.container__column__name__qty}>{!loading && <><button onClick={()=>{cartChange(altCart[0].id, -1, altCart[0].quantity)}}>-</button>{altCart[0].quantity}<button onClick={()=>{cartChange(altCart[0].id,1)}}>+</button></>}{loading && <div className={style.container__column__loading} ><img src={loadingImage} /></div>}</div>);
                setProductTotal(<div key={altCart[0].id} className={style.container__column__name}>${altCart[0].price * altCart[0].quantity}<button onClick={()=>{removeItem(altCart[0].id)}}>remove</button></div>);
                setImage(<NavLink to={`/product/${altCart[0].id}`}><div key={altCart[0].id} className={style.container__column__name}><img src={altCart[0].image} alt="" />{altCart[0].name}</div></NavLink>);
            } else {
                setPrice(null);
                setQuantity(null);
                setProductTotal(null);
                setImage(null);
            }
           
        })();

  
    },[cart, update, loading]);

    useEffect(() => {
        console.log (total);

        (async () => {
            const realTotal = await total;

            if (realTotal < 300 && realTotal != 0) {
                console.log(realTotal);
                setShipping("$30")
                setItems(true);
                setGrandTotal(realTotal+30);
            } else if (realTotal >= 300){
                setShipping("Free");
                setItems(true);
                setGrandTotal(realTotal);
            }
            else if (realTotal == 0) {
                setItems(false);
                setGrandTotal(realTotal);
            }
            console.log(items);

        })();
         
    }, [total,cart]);

    useEffect(() => {
        topFunction();
    },[])

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
                <div className={style.container__main__price}>
                    <h2>Order Summary</h2>
                    <h4>Order no. : <span>#{uuid}</span></h4>
                    <h4>Subtotal ({quant}): <span>${total} AUD</span></h4>
                    <h4>Estimated Shipping: <span>{shipping}</span></h4>
                    <h4>Incl. Shipping: <span>${grandTotal} AUD</span></h4>
                </div>
                <form className={style.container__main__form} action="">
                    <section className={style.container__main__form__user}>
                        <h2>Contact Details</h2>
                        <div>
                            <label htmlFor="name">Full name</label>
                            <input type="name" />
                        </div>
                        <div>
                            <label htmlFor="Mobile">Mobile</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="Email">Email</label>
                            <input type="text" />
                        </div>
                    </section>
                    <section className={style.container__main__form__user}>
                        <h2>Address</h2>
                        <div>
                            <label htmlFor="company">Company</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="Address1">Address Line 1 </label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="Address2">Address Line 2 </label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="city">City </label>
                            <input type="text" />
                        </div>
                        <div className={style.container__main__form__user__special}>
                            <label htmlFor="postCode">Post Code</label>
                            <input className={style.container__main__form__user__special__input} type="text" />
                            <label htmlFor="state">State</label>
                                <select name="state" id="state">
                                        <option value="nsw">NSW</option>
                                        <option value="vic">VIC</option>
                                        <option value="qld">QLD</option>
                                        <option value="wa">TAS</option>
                                        <option value="wa">WA</option>
                                        <option value="sa">SA</option>
                                        <option value="act">ACT</option>
                                        <option value="nt">NT</option>
                                        <option value="jbt">JBT</option>
                                    </select>
                        </div>
                    </section>
                    <section className={style.container__main__form__user}>
                        <h2>Additional Info</h2>
                        <div>
                            <label htmlFor="notes">Notes</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="notes">Coupon Code</label>
                            <input type="text" />
                        </div>
                    </section>
                </form>
                <button>Continue to Payment</button>
                </>}
                {!items && <><h2>Oh no...</h2><h5>Your Cart is Empty</h5></>}
            </main>
        </div>
       
    );
};

export default Cart;