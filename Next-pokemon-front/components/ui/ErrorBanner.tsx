import React, { FC } from 'react';
import styles from '../../styles/Error.module.css';
import { useRouter } from 'next/router';
import { Button } from '@nextui-org/react';

interface ErrorBannerProps {
  error?: string;
}

const ErrorBanner: FC<ErrorBannerProps> = ({ error = 'server' }) => {
  const { push } = useRouter();

  const goToHome = () => {
    localStorage.removeItem('token');
    push('/');
  };

  return (
    <div className={styles.container}>
      <p className={styles.text}>{`Error ${error}`}</p>

      <Button color='gradient' bordered auto onClick={goToHome}>
        Back to login
      </Button>
    </div>
  );
};

export default ErrorBanner;
