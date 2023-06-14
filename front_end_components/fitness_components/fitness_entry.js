import {useState, useEffect} from 'react';
import React from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Button} from 'react-native-paper'
import { TextInput } from 'react-native-gesture-handler';

function FitnessEntry(props){
    // variables for saving fitness data in database
    const [fitness_weight, set_fitness_weight] = useState("");
    const [fitness_bp, set_fitness_bp] = useState("");
    const [fitness_steps, set_fitness_steps] = useState("");

    //Updating Fitness data in daily-bread-db mysql database
    const inputData = () => {
        fetch('http://localhost:3000/fitness/add', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            //body: JSON.stringify({appconfig_weight:"123.4",appconfig_bp:"128.5",appconfig_steps:3000})
            body: JSON.stringify({fitness_weight:fitness_weight,fitness_bp:fitness_bp,fitness_steps:fitness_steps})
        })
        .then(resp => resp.json())
        .then(output => {
            props.navigation.navigate('Fitness')
        })
        .catch(error=>console.log(error))
    }

    const data = [
        {id: 'Weight',unit: 'lbs'},
        {id: 'B.P',unit: 'mm Hg'},
        {id: 'No. of Steps',unit: 'steps'},
    ]

    const renderData = (item) => {
        if (item.id === 'Weight'){
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 110, backgroundColor: 'lightyellow'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{item.id}</Text>
                    </View>
                    <View style={{ width: 400, backgroundColor: 'white'}}>
                        <TextInput style = {{padding:15, margin:10, borderWidth: 1}}
                            mode = "outlined"
                            onChangeText = {text => set_fitness_weight(text)}
                        />    
                    </View>
                    <View style={{ width: 75, backgroundColor: 'white'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{item.unit}</Text>
                    </View>
                </View>
            )
        }

        if (item.id === 'B.P'){
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 110, backgroundColor: 'lightyellow'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{item.id}</Text>
                    </View>
                    <View style={{ width: 400, backgroundColor: 'white'}}>
                        <TextInput style = {{padding:15, margin:10, borderWidth: 1}}
                            mode = "outlined"
                            onChangeText = {text => set_fitness_bp(text)}
                        />    
                    </View>
                    <View style={{ width: 75, backgroundColor: 'white'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{item.unit}</Text>
                    </View>
                </View>
            )
        }

        if (item.id === 'No. of Steps'){
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 110, backgroundColor: 'lightyellow'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{item.id}</Text>
                    </View>
                    <View style={{ width: 400, backgroundColor: 'white'}}>
                        <TextInput style = {{padding:15, margin:10, borderWidth: 1}}
                            mode = "outlined"
                            onChangeText = {text => set_fitness_steps(text)}
                        />    
                    </View>
                    <View style={{ width: 75, backgroundColor: 'white'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{item.unit}</Text>
                    </View>
                </View>
            )
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left', marginTop: '0%', padding:15 }}>
            <Text style={styles.TextStyle}>Fitness</Text>
            <View style={{ width: 585, backgroundColor: 'lightyellow',flexDirection: 'row'}}>
               <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: '275px',justifyContent: 'space-between'}}>Current</Text>
               <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: '200px',justifyContent: 'space-between'}}>Unit</Text>
            </View>
            <FlatList 
                data={data} 
              //  renderItem={item} 
                renderItem = {({item}) => {
                    return renderData(item)
                }}
                keyExtractor={item => item.id.toString()} 
            />

            <Button
                style = {{margin:10}}
                icon = "floppy"
                mode = "contained"
                onPress = {() => inputData()}
            >
                Save
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    TextStyle: {
        padding: 3,
        fontWeight: 'bold',
        fontSize: 25
    },
    fab: {
        position:"absolute",
        margin:16,
        right:0,
        bottom:0
    }

})

export default FitnessEntry