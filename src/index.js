import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; //connect react to redux
import thunk from 'redux-thunk';
import decode from 'jwt-decode';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './rootReducer';
import { userLoggedIn } from './actions/auth';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.pathfinderJWT){
  const payload = decode(localStorage.pathfinderJWT);
  const user = {
     token: localStorage.pathfinderJWT,
     email: payload.email,
     confirmed: payload.confirmed
    };
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
  <Provider store= {store}>
    <Route component={App} />
  </Provider>
</BrowserRouter>,
 document.getElementById('root')
);
registerServiceWorker();
