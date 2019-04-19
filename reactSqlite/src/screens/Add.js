import React from 'react';
import { Text, View, ScrollView, Alert, Linking,Button } from 'react-native';
import { Header, Input, SearchBar,  } from 'react-native-elements';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Spinner, ListItem, Separator } from 'native-base';
import { Font, SQLite } from 'expo';

const db = SQLite.openDatabase('Milagro.db')

export default class Add extends React.Component {

    state = { loading: true }
    state = { loading: true, name: '' }
    state = { loading: true, age: '' }

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });

        this.setState({ loading: false })
    }
    insert(name, age) {
        var query = "INSERT INTO tbl_milagro (id,name,age) VALUES (null,?,?)";
        var params = [name, age];
        db.transaction((tx) => {
            tx.executeSql(query, params, (tx, results) => {
                console.log(results);
                Alert.alert("Success", "Ha sido Guardado Correctamente");
            }, function (tx, err) {
                Alert.alert("Warning", "Vefique que los campos esten llenos");
                return;
            });
        });
    }
    handleSave() {
        const { name } = this.state;
        const { age } = this.state;

        if (name != "" && age != "") {
            this.insert(name, age);
            Alert.alert("Warning", "LOGRADOOOO!");
        }
        else {
            Alert.alert("Warning", "Vefique que los campos esten llenos");
        }
    }
    drama() {
        Alert.alert("Warning", "Funciona el boton");
    }

    handleBack() {
        this.props.navigation.navigate('Home');
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color="green" />
                </View>
            );
        }
        return (
            <View>
                <Header
                    placement="right"
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.handleBack() }}
                    centerComponent={{ text: 'Add', style: { color: '#fff', fontSize: 18, fontWeight: 'bold' } }}
                    containerStyle={{ backgroundColor: '#2B2F33' }}
                    leftContainerStyle={{ marginLeft: 12 }}
                    centerContainerStyle={{ marginRight: 170 }}
                />
                <Input
                    onChangeText={(val) => this.setState({ name: val })} value={this.state.name}
                    placeholder='Name'
                    leftIconContainerStyle={{ marginRight: 15 }}
                    inputContainerStyle={{ marginTop: 45, width: 330, marginLeft: 30 }}
                />
                <Input
                    onChangeText={(val) => this.setState({ age: val })} value={this.state.age}
                    placeholder='Age'
                    leftIconContainerStyle={{ marginRight: 15 }}
                    inputContainerStyle={{ marginTop: 25, width: 330, marginLeft: 30 }}
                />
                <Button
                    onPress={() => {
                     this.handleSave();
                    }}
                    title="Press Me"
                />
            </View>
        );
    }
}
