import React from 'react'
import LoginUtil from '../../HelperServices/LogInHelper' 
import {Route , Redirect } from 'react-router-dom'
export default function ProtectedRoute({children , ...rest}) {    
    return (
        <Route
            {...rest}
            render = { ( {location} ) => LoginUtil.IsLogIn ? children : <Redirect
            to={{
              pathname: "/NotAuth",
              state: { from: location }
            }}
          />
        }
        />
    )
}
