import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';

export default class Index extends Component {
    render() {
        return (
            
            <AppContainer />
        );
    }
}

const AppSwitchNavigator = createSwitchNavigator({
    Home: { screen: Home },
    Edit: { screen: Edit },
    Add: { screen: Add },
});


const AppContainer = createAppContainer(AppSwitchNavigator);