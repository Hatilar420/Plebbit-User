import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import HeaderComponent from './Components/HeaderComponent';
import LandingComponent from './Components/LandingComponent';
import FrontPageComponent from './Components/FrontPageComponent';

function App() {
  return (
    <Router>
      <div className="App">
          <div className="MainHead">
            <HeaderComponent/>
          </div>
          <div className="container-fluid">
            <Switch>
                <Route exact path="/" component={FrontPageComponent}/>
                <Route exact path="/Landing" component={LandingComponent}/>
            </Switch>
          </div>
      </div>
    </Router>
   
  );
}

export default App;
