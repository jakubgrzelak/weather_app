import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import '../styles/cover.scss';
import '../styles/components/Header.scss';

export default () => (
    <header className="header-container">
      <div className="inner">
        <h3 className="masthead-brand">Wheather App</h3>
        <nav className="nav nav-masthead justify-content-center">
          <NavLink activeClassName="active" exact className="nav-link" to="/">Home</NavLink>
          <NavLink activeClassName="active" exact className="nav-link" to="/recent-checks">Recent</NavLink>
        </nav>
      </div>
    </header>
);