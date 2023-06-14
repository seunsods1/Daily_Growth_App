import React, {Component} from 'react';
//import axios from 'axios';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import {Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function Dashboard(props){   
    const dashboard_icons = [{key:'Diary', value:'notebook'},{key:'Reminder', value:'note-text'},{key:'Fitness', value:'run'},{key:'Daily Quote', value:'brain'}]
    const numColumns = 3;
    const navigation = useNavigation();
    //Initiallizing Dashboard Icons
    const renderData = (item) => {
        return (
        <View style  = {styles.cardStyle}> 
            <Button labelStyle={{ textAlign: 'center',  fontSize: 60, marginTop:125, position:'relative'}} style = {{ width: "450px", height: "150px", backgroundColor: 'grey', position: 'absolute'}} mode = "contained" icon = {item.value} onPress={()=>props.navigation.navigate(item.key)}/>
            <Text style = {{height:'250px',width:'78px'}}>{item.key}</Text>
        </View>  
        )
    }
   
    return(
        <View> 
            <View style = {styles.buttoncardStyle}>
                <Button labelStyle={{ textAlign: 'center', position:'relative', color:"grey",fontSize: 30}} style = {{  backgroundColor: 'transparent', position: 'absolute'}} mode = "contained" icon = "plus-circle-outline" onPress={()=>props.navigation.navigate("App Config")}/>
            </View>
            <Text style={{height:'1px',width:'80px'}}>App-config</Text>
                
            <View style={styles.gridStyle}> 
                <FlatList
                    data = {dashboard_icons}
                    renderItem = {({item}) => {
                        return renderData(item)
                    }}
                    keyExtractor={(item, index)=>index.toString()}
                    numColumns={numColumns}
                />
            </View>  
        </View>  
    )
}

const styles = StyleSheet.create(
    {
        textstyle: {
            color: 'white',
            padding: 10,
            margin: 20,
            fontSize: 50
        },
        gridStyle: {
            backgroundColor: 'transparent',
            flex:1,
            marginTop:100          
        },
        cardStyle: {
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
            flex: 1,
            margin: 1
        },
        buttoncardStyle: {
            backgroundColor: 'transparent',
            width: 100,
            height: 20,
            margin: 10
        },
        buttonStyle: {
            Color: 'pink',
            justifyContent: 'center'
        }

    }
)

export default Dashboard;