import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import HeaderComponent from './Components/HeaderComponent';
import LandingComponent from './Components/LandingComponent';
import FrontPageComponent from './Components/FrontPageComponents/FrontPageComponent';
import ProtectedRoute from './Components/ProtectedComponent/ProtectedRoute';
import NotAuth from './Components/ServiceComponents/NotAuth';
import GroupLanding from './Components/GroupComponents/GroupLanding';
import SignUpComponent from './Components/ServiceComponents/SignUpComponent';
import PaintHigherComponent from './Components/PaintComponents/PaintHigherComponent';
import SideNav from './Components/SideNavComponents/SideNav';
import React,{ useState} from 'react';

export const PlebContext = React.createContext()

function App() {
  const [AuthUserState, setAuthUserState] = useState({
    IsAuthenticated : false

  }) 
  const [GroupGlobalState, setGroupGlobalState] = useState(null)
  return (
    <PlebContext.Provider value={{AuthUserState,setAuthUserState,setGroupGlobalState,GroupGlobalState}}>
    <Router>
      <div className="App">
        <div className="d-flex">
          <div className="sideNav">
            <SideNav/>
          </div>
          <div className="ContentSide">
              <div className="MainHead">
                  <HeaderComponent/>
                </div>
                <div className="container-fluid backgroundBlack">
                  <Switch>
                      <Route exact path="/" component={LandingComponent}/>
                      <ProtectedRoute exact path="/profile">
                        <FrontPageComponent/>
                      </ProtectedRoute>
                      <Route exact path="/paint/:id" component={PaintHigherComponent}/>
                      <Route exact path="/NotAuth" component={NotAuth}/>
                      <Route path="/group/:id" component={GroupLanding}/>
                      <Route path="/signUp" component={SignUpComponent}/> 
                  </Switch>
                </div>
              </div>       
        </div>
      </div>
    </Router>
   </PlebContext.Provider>
  );
}

export default App;
