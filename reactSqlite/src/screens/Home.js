import React from 'react';
import { Text, View, ScrollView, Alert, Linking } from 'react-native';
import { Header, Input, SearchBar, Button } from 'react-native-elements';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Spinner, ListItem, Separator } from 'native-base';
import IconF from 'react-native-vector-icons/FontAwesome';
const AlertMsg = 'Estas seguro que deseas eliminar la informacion';
const AlertCancel = 'Ha cancelado la eliminacion';
import { Font, SQLite } from 'expo';

const db = SQLite.openDatabase('Milagro.db')

export default class Home extends React.Component {

    state = { loading: true, dataTodo: [], search: '' };

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists tbl_milagro (id integer primary key not null, name text,age text);'
            );
        });
        this.setState({ loading: false });
    }
    async componentDidMount() {
        const { search } = this.state;
        await this.fetchData(search);
    }

    async handleSearch(val) {
        this.setState({ search: val });
        await this.fetchData(val);
    }

    fetchData(search) {
        var query = "SELECT * FROM tbl_milagro WHERE name LIKE '%" + search + "%'";
        var params = [];
        db.transaction((tx) => {
            tx.executeSql(query, params, (tx, results) => {
                console.log(results);
                if (results.rows._array.length > 0) {
                    this.setState({
                        dataTodo: results.rows._array
                    });
                }
            }, function (tx, err) {
                Alert.alert("Welcome");
            });
        });
    }

    deleteData(id) {
        var query = "DELETE FROM tbl_milagro WHERE id = ?";
        var params = [id];
        db.transaction((tx) => {
            tx.executeSql(query, params, (tx, results) => {
                Alert.alert("Success", "Ha sido eliminado correctamente");

            }, function (tx, err) {
                Alert.alert("Warning", "No se ha eliminado" + err);
            });
        });
    }


    async handleDelete(id) {
        const { search } = this.state;
        await this.deleteData(id);
        this.fetchData(search);
    }

    handleAdd() {
        this.props.navigation.navigate('Add');
    }
    handleEdit() {
        this.props.navigation.navigate('Edit');
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color="green" />
                </View>
            );
        }
        const listItem = this.state.dataTodo.map((item) =>
            <View key={item.id}>
                <Collapse style={{ marginBottom: 10, marginTop: 10 }}>
                    <CollapseHeader>
                        <Separator bordered>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14, color: '#000000' }}>{item.name}</Text>
                                <Button
                                    onPress={() => this.handleEdit(item.id)}
                                    icon={<IconF name='eye' color='#2B2F33' size={21} />}
                                    iconContainerStyle={{ marginRight: 20 }}
                                    buttonStyle={{ height: 20, width: 80, backgroundColor: '#F0EEF4', marginLeft: 100 }}
                                    titleStyle={{ fontSize: 11, color: '#000000' }}
                                    title='  Actualizar'
                                />
                                <Button
                                    onPress={() =>
                                        Alert.alert('AVISO', AlertMsg, [
                                            { text: 'Cancel', onPress: () => Alert.alert(AlertCancel) },
                                            { text: 'ok', onPress: () => this.handleDelete(item.id) },

                                        ])
                                    }
                                    icon={<IconF name='trash' color='#2B2F33' size={21} />}
                                    buttonStyle={{ height: 20, width: 80, backgroundColor: '#F0EEF4', marginLeft: 15 }}
                                    titleStyle={{ fontSize: 12, color: '#000000' }}
                                    title='  Borrar' />
                            </View>
                        </Separator>
                    </CollapseHeader>
                    <CollapseBody>
                        <ListItem style={{ marginBottom: 3, marginTop: 3 }}>
                            <Text><Text> Name : </Text>{item.name}</Text>
                        </ListItem>
                        <ListItem style={{ marginBottom: 3, marginTop: 3 }}>
                            <Text><Text> Age : </Text>{item.age}</Text>
                        </ListItem>
                    </CollapseBody>
                </Collapse>
            </View>
        );

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
                <SearchBar
                    platform={"ios"}
                    placeholder="Search by name"
                    onChangeText={(val) => this.handleSearch(val)} value={this.state.search} value={this.state.search}
                    containerStyle={{ backgroundColor: '#F8FBFD', borderColor: '#fff', borderWidth: 2, marginTop: 10 }}
                    placeholderTextColor={'#2B2F33'}
                />
                <ScrollView>

                    <View>
                        {listItem}
                    </View>
                </ScrollView>

            </View>
        );
    }
}
