import './gesture-handler';

/**
 * @format
 */

import {AppRegistry, useColorScheme} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

import './src/utils/i18n';

export default function Main() {
  // const isDarkMode = true; // Change this dynamically based on user preference or system settings
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  
  return (
    // <PaperProvider theme={isDarkMode ? MD3DarkTheme : MD3LightTheme}>
    <PaperProvider theme={colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

// AppRegistry.registerComponent(appName, () => App);
