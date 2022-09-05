import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { getCarts, createCart, deleteCart } from "../API/api";

function ShoppingPage() {


    const myStyledComponentStyles = {
        backgroundColor: '#ecf0f1',
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
        minHeight: '200px'
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCarts()
            setItems(result.data);
        };
        fetchData();
    }, []);



    const [itemField, setItemField] = useState('')
    const [priceField, setPriceField] = useState('')
    const [items, setItems] = useState([]);

    const addItem = async (e) => {
        e.preventDefault()
        const cart = await createCart({
            totalPrice: priceField,
            items: itemField.split(',')
        })

        setItems([...items, cart.data])
    }

    const deleteCartFunc = async (id) => {
        const cart = await deleteCart(id)
        const result = await getCarts()
        setItems(result.data);
        
    }



    return (
        <div style={myStyledComponentStyles}>

            <form onSubmit={(e) => addItem(e)}>
                <label>Price </label>
                <input
                    type='text'
                    placeholder=''
                    value={priceField}
                    onChange={(e) => setPriceField(e.target.value)}
                />
                <br />
                <label>Item </label>
                <input
                    type='text'
                    placeholder=''
                    value={itemField}
                    onChange={(e) => setItemField(e.target.value)}
                />
                <br />
       
                <input type='submit' value='Save Task' className='btn btn-block' />
            </form>

            <Grid container>
            {items.map((item) => (
                <Grid item xs={12} md={6} style = {{padding: "5px"}}>
                <Card sx={{ minWidth: 275 }}>
                    <Button onClick = {() => deleteCartFunc(item._id)}>X</Button>
                    <h1>Total Price: ${item.totalPrice}</h1>
                    {item.items.map((x, index) => (
                        <>
                            <p>{index+1}: {x}</p>
                        </>
                    ))}
                </Card>
                </Grid>
            ))}
            </Grid>

        </div>
    );
}

export default ShoppingPage;