import './App.css';
import { Container } from 'react-bootstrap';
import Menupage from './common/home/Menupage';
import { UserProvider } from './components/user/UserContext'; // UserProvider 가져오기
function App() {
    return (
        <UserProvider>
            <Container>
                <Menupage />
            </Container>
        </UserProvider>
    );
}

export default App;
