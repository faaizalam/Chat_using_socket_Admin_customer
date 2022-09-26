
import './App.css';
import {BrowserRouter,Route, Routes, useLocation} from "react-router-dom"
import { Home } from './Screen/Home';
import { Chat } from './component/Chat';
import { Admin } from './Screen/Admin';
import { Check } from './component/Check';


function App() {
  // const {pathname} = useLocation()
 
  return (
    <BrowserRouter>
    
   
    <div className="App">
   <header>
    <div>SupportChat</div>
    <div>
      <a href='/Admin'>Admin</a>
    </div>

   </header>

   
  <main>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Admin' element={<Admin/>}></Route>
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
