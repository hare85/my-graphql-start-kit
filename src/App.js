import React from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const links = [{ to: '/', text: 'Home' }, { to: '/about', text: 'About' }];

const Home = () => (
  <div>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
  </div>
);

const About = () => (
  <div>
    <span>About</span>
  </div>
);

const App = () => (
  <div className="App">
    <ul>
      {links.map(link => (
        <li>
          <Link to={link.to} href={link.to}>
            {link.text}
          </Link>
        </li>
      ))}
    </ul>

    <hr />

    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </div>
);

export default App;
