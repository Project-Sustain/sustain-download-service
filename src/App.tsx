import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid } from '@material-ui/core';
import Header from './components/Header';

function App() {
    return (
        <div className="App">
            <Grid container>
                <Grid item xs={12}>
                    <Header/>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
