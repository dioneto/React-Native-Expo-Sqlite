import React from 'react';
import { Text, View, ScrollView, Alert, Linking } from 'react-native';
import { Header, Input, SearchBar, Button } from 'react-native-elements';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Spinner, ListItem, Separator } from 'native-base';

export default class Edit extends React.Component {
    handleBack() {
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <View>
                <Header
                    placement="right"
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.handleBack() }}
                    centerComponent={{ text: 'Edit', style: { color: '#fff', fontSize: 18, fontWeight: 'bold' } }}
                    containerStyle={{ backgroundColor: '#2B2F33' }}
                    leftContainerStyle={{ marginLeft: 12 }}
                    centerContainerStyle={{ marginRight: 170 }}
                />
               <Input
                    placeholder='Name'
                    leftIconContainerStyle={{ marginRight: 15 }}
                    inputContainerStyle={{ marginTop: 45, width: 330, marginLeft: 30 }}
                />
                <Input
                    placeholder='Age'
                    leftIconContainerStyle={{ marginRight: 15 }}
                    inputContainerStyle={{ marginTop: 25, width: 330, marginLeft: 30 }}
                />
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: '#F8FBFD' }}>
                    <Button
                        title="   Save Information    "
                        titleStyle={{ color: "#fff", fontSize: 18, fontWeight: '100' }}
                        buttonStyle={{ backgroundColor: '#2B2F33', alignSelf: 'center', position: 'absolute', marginTop: 30, borderColor: '#2B2F33', borderWidth: 2 }}
                    />
                </View>
            </View>
        );
    }
}
