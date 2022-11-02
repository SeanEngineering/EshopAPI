import React from 'react';
import { useState } from 'react';
import { addProduct } from '../../service/products';

const NewProduct = () => {
    const initialProduct = {
        name: '',
        category: '',
        description: '',
        image: '',
        manufacturer: '',
        price: '',
    }

    const [product, setProduct] = useState(initialProduct);

    const onInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]:value});
        console.log(product);
    }

    const submitService = async (e) => {
        e.preventDefault();
        console.log(`adding product:`)
        console.log(product);
        await addProduct(product);
        console.log('completed successfully, thank you for submitting');
        setProduct(initialProduct);
    }

    return (
        <form onSubmit={submitService}>
            <div>
                <label htmlFor="name">Product Name</label>
                <br />
                <input onChange={onInputChange} id='name' name='name' type="text" placeholder='Product Name...' value={product.name}/>
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <br />
                <input onChange={onInputChange} id='catgeory' name='category' type="text" placeholder='Category...' value={product.category}/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <br />
                <textarea onChange={onInputChange} name="description" id="description" cols="30" rows="10" value={product.description}></textarea>
            </div>
            <div>
                <label htmlFor="image">Image Link</label>
                <br />
                <input onChange={onInputChange} id='image' name='image' type="text" placeholder='Image link' value={product.image}/>
            </div>
            <div>
                <label htmlFor="manufacturer">Manufacturer</label>
                <br />
                <input onChange={onInputChange} id='manufacturer' name='manufacturer' type="text" placeholder='Manufacturer...' value={product.manufacturer}/>
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <br />
                <input onChange={onInputChange} id='price' name='price' type="text" placeholder='Price...' value={product.price}/>
            </div>
            <button type='submit'>Submit</button>
        </form>
      
    );
};

export default NewProduct;