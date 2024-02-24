import React from 'react';
import styles from '../../styles/Error.module.css';

const ErrorBanner = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>Error server</p>
    </div>
  );
};

export default ErrorBanner;
