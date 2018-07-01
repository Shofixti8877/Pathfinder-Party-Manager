import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'; //connect react to redux
import thunk from 'redux-thunk';
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
  const user = {token: localStorage.pathfinderJWT};
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
  <Provider store= {store}><App /></Provider>
</BrowserRouter>,
 document.getElementById('root')
);
registerServiceWorker();
