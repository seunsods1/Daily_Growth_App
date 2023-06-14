import {useState, useEffect} from 'react';
import React from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper'

function ReminderDetails(props){
    const data_transfer = props.route.params.data;

    const deleteData = (data_transfer) => {
        fetch(`http://localhost:3000/delete/${data_transfer.reminder_title}/`, {
            method:'DELETE',
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(data_transfer =>{
            props.navigation.navigate('Reminder')
        })
        .catch(error=>console.log(error))
    }

    return (
        <ScrollView>
            <View style = {styles.detailStyle}> 
                <Text style = {{fontSize:30, fontWeight: "bold"}}>{data_transfer.reminder_title}</Text>
                <Text style = {{fontSize:15, marginTop:10}}>Entry Date: {data_transfer.reminder_entry_date.split("T")[0]} Entry Time: {data_transfer.reminder_entry_date.split("T")[1]}</Text>
                <br />
                <Text style = {{fontSize:25, marginTop:10}}><Text Style ={{fontWeight:"bold"}}>Note: </Text>{data_transfer.reminder_entry}</Text>
                <Text style = {{fontSize:20, marginTop:10}}>Due Date: {data_transfer.reminder_due_date} Due Time: {data_transfer.reminder_due_time}</Text>
                <View style = {styles.btnStyle}>
                    <Button
                        icon = "update"
                        mode = "contained"
                        onPress = {() => props.navigation.navigate("Diary Edit", {data:data_transfer})}
                    >
                    Edit
                    </Button>

                    <Button
                        icon = "delete"
                        mode = "contained"
                        onPress = {() => deleteData(data_transfer)}
                    >
                    Delete
                    </Button>
                </View>
            </View>
        </ScrollView>     
    )
}

const styles = StyleSheet.create({
    detailStyle: {
        padding:10,
        margin:10
    },
    btnStyle: {
        flexDirection:"row",
        justifyContent:"space-around",
        margin:15,
        padding:10
    }
})
    

export default ReminderDetails