import Login from './components/Login';
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Profile from './components/Profile';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Provider} from "react-redux"
import appStore from './utils/appStore'
import Feed from './components/Feed';
import Connections from './components/Connections';

function App() {

  return (
    <div>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path='/' element={<Body/>}>
            <Route path='/' element={<Feed/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/connections' element={<Connections/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
