import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';

function App() {
  const callAPI = async ()=>{
    const res = await axios.get("/test/list")
    console.log(res.data);
  }
  
  useEffect(()=>{
    callAPI();
  },[])
  return (
    <Container>
    
    </Container>
  );
}

export default App;
