import React from 'react';
import { Text, View, ScrollView, Alert, Linking } from 'react-native';
import { Header, Input, SearchBar, Button } from 'react-native-elements';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Spinner, ListItem, Separator } from 'native-base';
export default class Home extends React.Component {
    handleAdd() {
        this.props.navigation.navigate('Add');
    }
    handleEdit() {
        this.props.navigation.navigate('Edit');
    }
    render() {

        return (
            <View  >
                <Header
                    placement="left"
                    leftComponent={{ text: '                   Home', style: { color: '#fff', fontSize: 19 } }}
                    rightComponent={{ icon: 'edit', color: '#fff', onPress: () => this.handleEdit() }}
                    centerComponent={{ icon: 'add-circle', color: '#fff', onPress: () => this.handleAdd() }}
                    containerStyle={{ backgroundColor: '#2B2F33' }}
                    leftContainerStyle={{ marginLeft: 65 }}
                    rightContainerStyle={{ marginRight: 18 }}
                    centerContainerStyle={{ marginLeft: 86 }}
                />
                <Text> Home </Text>
            </View>
        );
    }
}
