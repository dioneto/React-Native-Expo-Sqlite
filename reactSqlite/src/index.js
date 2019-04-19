import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Home from './screens/Home';
import Add from './screens/Add';
import Edit from './screens/Edit';
import { Font,SQLite } from 'expo';

const db = SQLite.openDatabase('Milagro.db')


export default class Index extends Component {
    async componentWillMount() {
        await Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        db.transaction(tx => {
          tx.executeSql(
            'create table if not exists tbl_milagro (id integer primary key not null AUTOINCREMENT,name text,age text);'
          );
        }); 
        this.setState({ loading: false });
      }
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