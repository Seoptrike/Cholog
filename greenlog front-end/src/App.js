import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Menupage from './common/home/Menupage';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
    return (
        <Container>
            <Menupage/>
        </Container>
    );
}

export default App;
