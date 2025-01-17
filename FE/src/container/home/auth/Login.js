import React from 'react';
import './Login.scss'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Login(props) {
    return (
        <>
            <Button variant="contained">Hello world</Button>
            <TextField id="standard-basic" label="Standard" variant="standard" />
        </>
    );

}

export default Login;