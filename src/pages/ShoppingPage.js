import { Button } from "@mui/material";
import { useState } from "react";

function ShoppingPage() {

    const myStyledComponentStyles = {
        backgroundColor: '#ecf0f1',
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
        minHeight: '200px'
    }


    const [itemField, setItemField] = useState('')
    const [priceField, setPriceField] = useState('')

    const [items, setItems] = useState([
        { item: 'apple', price: 52 },
        { item: 'cake', price: 51 },
    ]);

    const addItem = (e, name, value) => {
        e.preventDefault()
        setItems([...items, { item: name, price: value }])
    }

    

    return (
        <div style={myStyledComponentStyles}>
            <form onSubmit={(e) => addItem(e, itemField, priceField)}>
                <label>Item </label>
                <input
                    type='text' 
                    placeholder=''
                    value={itemField}
                    onChange={(e) => setItemField(e.target.value)}
                />
                <br/>
                <label>Price </label>
                <input
                    type='text'
                    placeholder=''
                    value={priceField}
                    onChange={(e) => setPriceField(e.target.value)}
                />
                     <br/>  
                <input type='submit' value='Save Task' className='btn btn-block' />
            </form>

            {items.map((item) => (
                <>
                    <p>{item.item} : ${item.price}.00</p>
                </>
            ))}
        </div>
    );
}

export default ShoppingPage;