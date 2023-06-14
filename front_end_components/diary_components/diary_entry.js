import {useState, useEffect} from 'react';
import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper'

function DiaryEntry(props){

    const [diary_title, set_diary_title] = useState("")
    const [diary_entry, set_diary_entry] = useState("")


    const inputData = () => {
        fetch('http://localhost:3000/diary/add', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({diary_title:diary_title,diary_entry:diary_entry})
        })
        .then(resp => resp.json())
        .then(output => {
            props.navigation.navigate('Diary')
        })
        .catch(error=>console.log(error))
    }

    return (
        <View>
            <TextInput style = {styles.inputStyle}
                label = "Diary Title"
                value = {diary_title}
                mode = "outlined"
                onChangeText = {text => set_diary_title(text)}
            />

            <TextInput style = {{padding:15, margin:10}}
                label = "Enter Note"
                value = {diary_entry}
                mode = "outlined"
                multiline
                numberOfLines={20}
                onChangeText = {text => set_diary_entry(text)}
            />

            <Button
                style = {{margin:10}}
                icon = "floppy"
                mode = "contained"
                onPress = {() => inputData()}
            >
                Save Note
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        padding: 10,
        marginTop: 30,
        margin: 10
    }

})

export default DiaryEntry