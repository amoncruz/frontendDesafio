import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import './assets/styles/styles.scss';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store,persistor} from './Redux/index'

const App=()=>{
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes/>
            </PersistGate>
        </Provider>
    );
}

ReactDOM.render(<App/>,document.getElementById("app"))