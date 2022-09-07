import { Button } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/counter'

function CounterPage() {

    const myStyledComponentStyles = {
        backgroundColor: '#ecf0f1',
        fontFamily: 'sans-serif',
        padding: '50px',
        textAlign: 'center',
        minHeight: '200px'
    }

    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div style={myStyledComponentStyles}>
            <h1>Counter!</h1>
            <Button variant="contained" onClick={() => dispatch(decrement())}>-</Button>
            <p style={{ display: 'inline', marginLeft: 10, marginRight: 10 }}>{count}</p>
            <Button variant="contained" onClick={() => dispatch(increment())}>+</Button>
        </div>

    );
}

export default CounterPage;