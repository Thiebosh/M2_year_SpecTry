import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Routes,
	Route,
    Navigate
} from 'react-router-dom';
import {requireLoggedUser} from './session/user'

import NavBar from './components/Navbar';

import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Project from './pages/Project';
import Projects from './pages/Projects';
import Create from './pages/user/Create';
import Login from './pages/user/Login';
import Account from './pages/user/Account';
import Settings from './pages/user/Settings';

import './index.scss';


ReactDOM.render(
    <React.StrictMode>
        <NavBar/>
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/user/projects" element={requireLoggedUser(<Projects/>)} />
                <Route path="/user/project/*" element={requireLoggedUser(<Project/>)} />

                <Route path="/user/create" element={<Create/>} />
                <Route path="/user/login" element={<Login/>} />
                <Route path="/user/account" element={requireLoggedUser(<Account/>)} />
                <Route path="/user/settings" element={requireLoggedUser(<Settings/>)} />

                <Route path="/*" element={<NotFound/>} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
