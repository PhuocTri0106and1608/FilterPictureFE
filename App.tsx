import React from 'react';
import RootNavigator from './src/routes/navigation';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
const App = () => {
  return (
      <RootNavigator/>
  );
};

export default App;
