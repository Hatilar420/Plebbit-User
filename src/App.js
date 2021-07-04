import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import HeaderComponent from './Components/HeaderComponent';
import LandingComponent from './Components/LandingComponent';
import FrontPageComponent from './Components/FrontPageComponents/FrontPageComponent';
import PaintComponent from './Components/PaintComponents/PaintComponent';
import ProtectedRoute from './Components/ProtectedComponent/ProtectedRoute';
import NotAuth from './Components/ServiceComponents/NotAuth';
import GroupLanding from './Components/GroupComponents/GroupLanding';
import SignUpComponent from './Components/ServiceComponents/SignUpComponent';
function App() {
  return (
    <Router>
      <div className="App">
          <div className="MainHead">
            <HeaderComponent/>
          </div>
          <div className="container-fluid backgroundBlack">
            <Switch>
                <Route exact path="/" component={LandingComponent}/>
                <ProtectedRoute exact path="/profile">
                  <FrontPageComponent/>
                </ProtectedRoute>
                <Route exact path="/paint/:id" component={PaintComponent}/>
                <Route exact path="/NotAuth" component={NotAuth}/>
                <Route path="/group/:id" component={GroupLanding}/>
                <Route path="/signUp" component={SignUpComponent}/> 
            </Switch>
          </div>
      </div>
    </Router>
   
  );
}

export default App;
