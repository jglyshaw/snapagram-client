import { Button } from "@mui/material";
import { useState } from "react";


function CounterPage() {

    const myStyledComponentStyles = {
        backgroundColor: '#ecf0f1',
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
        minHeight: '200px'
    }

    const [count, setCount] = useState({
        value: 0
    });

    

    const changeCounter = (amount) => {
        setCount({...count, value: count.value+amount})
    }

    return (
        <div style={myStyledComponentStyles}>
            <Button variant="contained" onClick={() => changeCounter(-1)}>-</Button>
            <p style={{ display: 'inline', marginLeft: 10, marginRight: 10}}>{count.value}</p>
            <Button variant="contained" onClick={() => changeCounter(1)}>+</Button>
        </div>
    );
}

export default CounterPage;