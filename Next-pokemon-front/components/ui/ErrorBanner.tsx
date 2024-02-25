import React, { FC } from 'react';
import styles from '../../styles/Error.module.css';

interface ErrorBannerProps {
  error?: string;
}

const ErrorBanner: FC<ErrorBannerProps> = ({ error = 'server' }) => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>{`Error ${error}`}</p>
    </div>
  );
};

export default ErrorBanner;
