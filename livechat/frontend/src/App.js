import './App.css';
import {BrowserRouter,Link,Route, Routes,} from "react-router-dom"
import { Login } from './Screen/Login';

import { Admin } from './Screen/Admin';
import { Check } from './component/Check';
import { Attempt } from './Screen/Attempt';
// booo

import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from 'react-redux';


function App() {
  // const {pathname} = useLocation()
  const {Userinfo}=useSelector((state)=>state.UserSign)
 
  return (
    <BrowserRouter>
    
   
    <div className="App">
   <header>
   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Link to="/Admin" className='as'>{Userinfo.name&&Userinfo.email}</Link>
            <Link to="/" className='as'>Login</Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    

   </header>

   
  <main>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/Admin' element={<Admin/>}></Route>
      <Route path='/attempt/:id' element={<Attempt/>}></Route>
      <Route path='/attempt' element={<Attempt/>}></Route>
    </Routes>

  </main>


    

     
    <footer>
      { 
      
      // <Chat/>
     <Check/>
      }
     <div className='footers'> All right reserverd</div>
     
      </footer>
     
    </div>

    </BrowserRouter>
  );
}

export default App;
