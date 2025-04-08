// import React from 'react'
// import AppNavigator from './AppNavigator'

// const App = () => {
//   return (
//      <AppNavigator />
//   )
// }

// export default App

import React from 'react';
import AppNavigator from './AppNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <AppNavigator />
      <Toast />
    </>
  );
};

export default App;
