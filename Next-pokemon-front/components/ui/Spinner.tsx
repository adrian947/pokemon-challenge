import { Loading } from '@nextui-org/react';
import React from 'react';

const Spinner = () => {
  return (
    <Loading
      type='gradient'
      loadingCss={{ $$loadingSize: '100px', $$loadingBorder: '10px' }}
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    />
  );
};

export default Spinner;
