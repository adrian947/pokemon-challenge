import { useTheme as useNextTheme } from 'next-themes';
import { SunIcon } from '../icons/SunIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { Switch, useTheme } from '@nextui-org/react';

const SwitchTheme = () => {
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();
  return (
    <Switch
      checked={isDark}
      onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      size='xl'
      iconOn={<SunIcon filled />}
      iconOff={<MoonIcon filled />}
      css={{ marginRight: '20px' }}
    />
  );
};

export default SwitchTheme;
