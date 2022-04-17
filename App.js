import React from 'react';
import AppStore from './screens/HandleScreens';
import { Provider as PaperProvider } from 'react-native-paper';
class App extends React.Component {
  render(){    
    return (
      <PaperProvider>
        <AppStore/>
      </PaperProvider>
    )};
};
export default App;