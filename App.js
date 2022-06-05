import React from 'react';
import AppStore from './screens/HandleScreens';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import store from './reducers';
class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <SafeAreaView style={{flex: 1}}>
          <Provider store={store}>
            <AppStore />
          </Provider>
        </SafeAreaView>
      </PaperProvider>
    );
  }
}
export default App;
