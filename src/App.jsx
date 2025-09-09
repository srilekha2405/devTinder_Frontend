import Login from './login';
import NavBar from "./NavBar";
import Body from "./Body";
import Profile from './profile';


import {BrowserRouter,Routes,Route} from "react-router-dom";
function App() {

  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
