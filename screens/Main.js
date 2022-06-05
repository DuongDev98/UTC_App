import React, {Component, useState} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import Account from './Account';
import Cart from './Cart';
import Feed from './Feed';
import Home from './Home';

function Main({navigation}) {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'home', title: 'Home', icon: 'home'},
    {key: 'feed', title: 'Feed', icon: 'newspaper-variant-outline'},
    {key: 'cart', title: 'Cart', icon: 'cart'},
    {key: 'account', title: 'Account', icon: 'account'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <Home navigation={navigation} />,
    feed: () => <Feed navigation={navigation} />,
    cart: () => <Cart navigation={navigation} />,
    account: () => <Account navigation={navigation} />,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={index => {
        setIndex(index);
      }}
      renderScene={renderScene}
    />
  );
}

export default Main;
