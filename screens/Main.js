import React, { Component } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Account from './Account';
import Cart from './Cart';
import Feed from './Feed';
import Home from './Home';

class Main extends Component {

    constructor () {
        super();
        this.state = {
            index: 0,
            routes: [
                { key: 'home', title: 'Home', icon: 'home' },
                { key: 'feed', title: 'Feed', icon: 'newspaper-variant-outline' },
                { key: 'cart', title: 'Cart', icon: 'cart', badge : '3' },
                { key: 'account', title: 'Account', icon: 'account' }
            ],
            renderScene : BottomNavigation.SceneMap({
                "home": ()=><Home/>,
                "feed": ()=><Feed/>,
                "cart": ()=><Cart/>,
                "account": ()=><Account/>,
            })
        };
    }

    render() {
        return (
            <BottomNavigation
                navigationState={this.state}
                onIndexChange={(index) => { this.setState({index: index}) } }
                renderScene={this.state.renderScene}
            />
        );
    }
}

export default Main;