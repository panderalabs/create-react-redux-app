import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import styles from './layout.scss';

function Layout(props) {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
