import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Menupage from './common/home/Menupage';

function App() {
    const callAPI = async () => {
        const res = await axios.get("/test/list")
        console.log(res.data);
    }

    useEffect(() => {
        callAPI();
    }, [])
    return (
        <Container>
            <Menupage />
        </Container>
    );
}

export default App;
