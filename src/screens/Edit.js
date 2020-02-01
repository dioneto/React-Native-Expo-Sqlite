import React from 'react';
import { Text, View, ScrollView, Alert, Linking,Button } from 'react-native';
import { Header, Input, SearchBar,  } from 'react-native-elements';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import { Spinner, ListItem, Separator } from 'native-base';
import { Font, SQLite } from 'expo';

const db = SQLite.openDatabase('Milagro.db')

export default class Edit extends React.Component {
    state = {  name: '', age: '', id: 0 };

  componentDidMount() {
    const id = this.props.navigation.getParam("id");
    this.setState({ id });
    this.fetch(id);

  }

  fetch(id) {
    var query = "SELECT * FROM tbl_milagros WHERE id= ?";
    var params = [id];
    db.transaction((tx) => {
      tx.executeSql(query, params, (tx, results) => {
        console.log(results);
        if (results.rows._array.length > 0) {
          this.setState({
            name: results.rows._array[0]['name'],
            age: results.rows._array[0]['age'],
          });
        }

      }, function (tx, err) {
        Alert.alert("Warning", "Ha ocurrido un error en el servidor");
      });
    });
  }

  update(id, name, age) {
    var query = "UPDATE tbl_milagros SET name= ?, age= ? WHERE id= ?";
    var params = [name, age, id];
    db.transaction((tx) => {
      tx.executeSql(query, params, (tx, results) => {
        console.log(results);
        Alert.alert("Success", "Datos Actualizados correctamente");
      }, function (tx, err) {
        Alert.alert("Warning", "Vefique que los campos esten totalmente llenos por favor");
        return;
      });
    });
  }

  handleSave() {
    const { name, age, id } = this.state;
    if (name != 'Name' && age != 'Age') {
      this.update(id, name, age);
    } else {
      Alert.alert("Warning", "Todos los campos deben estar llenos para actualizar el registro");
    }
  }
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
                     onChangeText={(val) => this.setState({ name: val })} value={this.state.name}
                    placeholder='Name'
                    leftIconContainerStyle={{ marginRight: 15 }}
                    inputContainerStyle={{ marginTop: 45, width: 330, marginLeft: 30 }}
                />
                <Input
                      onChangeText={(val) => this.setState({ age: val })} value={this.state.age}
                    placeholder='Age'
                    leftIconContainerStyle={{ marginRight: 15 }}
                    inputContainerStyle={{ marginTop: 25, width: 330, marginLeft: 30 , marginBottom:20}}
                />
               
                <Button
                    onPress={() => {
                     this.handleSave();
                    }}
                    title="Save Information"
                />
                
            </View>
        );
    }
}
