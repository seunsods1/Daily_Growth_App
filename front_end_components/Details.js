import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

function Details(props) {
    const data_transfer = props.route.params.data;

    const deleteData = (data_transfer) => {
        fetch(`http://localhost:3000/delete/${data_transfer.diary_title}/`, {
            method:'DELETE',
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(data_transfer =>{
            props.navigation.navigate('Dashboard')
        })
        .catch(error=>console.log(error))
    }

    return (
        <ScrollView>
            <View style = {styles.detailStyle}> 
                <Text style = {{fontSize:25}}>{data_transfer.diary_title}</Text>
                <Text style = {{fontSize:20, marginTop:10}}>{data_transfer.diary_date}</Text>
                <Text style = {{fontSize:15, marginTop:10}}>{data_transfer.diary_entry}</Text>
                <View style = {styles.btnStyle}>
                    <Button
                        icon = "update"
                        mode = "contained"
                        onPress = {() => props.navigation.navigate("Edit", {data:data_transfer})}
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

export default Details