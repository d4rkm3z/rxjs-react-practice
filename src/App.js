import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Websockets from './components/Websockets';

const routes = [
  {
    title: 'WebSockets',
    link: '/websockets',
    component: Websockets
  }
];

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        {routes.map(({ title, link }) => (
          <Link key={`link_${title}`} to={link}>
            {title}
          </Link>
        ))}
      </nav>

      <div className="container">
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} path={route.link} component={route.component} />
          ))}
        </Switch>
      </div>
    </div>
  );
}
