import React from 'react';
import AppStore from './screens/HandleScreens';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
class App extends React.Component {
  render(){    
    return (
      <PaperProvider>
        <SafeAreaView style={{flex: 1}}>
          <AppStore/>
        </SafeAreaView>
      </PaperProvider>
    )};
};
export default App;