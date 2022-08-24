import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Inicio from './components/Inicio'
import Home from './components/Home';
import DogCreate from './components/DogCreate'
import Detail from './components/DogDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App" >
      <Switch>
      <Route exact path='/' component={Inicio}/>
      <Route exact path='/home' component={Home}/>
      <Route path='/dogs' component={DogCreate}/>
      <Route path='/detail/:id' component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
