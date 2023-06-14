//import "https://cdn.syncfusion.com/ej2/material.css"
import {useState, useEffect, useRef} from 'react';
import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import DatePicker from "react-datepicker";
import DateTimePicker from 'react-datetime-picker';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Calendar} from 'react-date-range';
import format from 'date-fns/format';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function ReminderEntry(props){
    //Date and Time Picker
    const [calendar, setCalendar] = useState('');

    //open close
    const [open, setOpen] = useState(false)

    useEffect(() => {
        set_reminder_due_date(format(new Date(), 'MM/dd/yyyy'))
    },[])

    const handleSelect = (date) => {
        console.log(date);
        console.log(format(date,'yyyy-MM-dd'))
        set_reminder_due_date(format(date,'yyyy-MM-dd'))
    }
  
    const [reminder_title, set_reminder_title] = useState("");
    const [reminder_entry, set_reminder_entry] = useState("");
    const [reminder_due_time, set_reminder_due_time] = useState("");
    const [reminder_due_date, set_reminder_due_date] = useState("");

    const inputData = () => {
        fetch('http://localhost:3000/reminder/add', {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({reminder_title:reminder_title,reminder_entry:reminder_entry,reminder_due_time:reminder_due_time,reminder_due_date:reminder_due_date})
        })
        .then(resp => resp.json())
        .then(output => {
            props.navigation.navigate('Reminder')
        })
        .catch(error=>console.log(error))
    }

    return (
        <View>
            <TextInput style = {styles.inputStyle}
                label = "Reminder Title"
                value = {reminder_title}
                mode = "outlined"
                onChangeText = {text => set_reminder_title(text)}
            />

            <TextInput style = {{padding:15, margin:10}}
                label = "Description"
                value = {reminder_entry}
                mode = "outlined"
                multiline
                numberOfLines={20}
                onChangeText = {text => set_reminder_entry(text)}
            />
            
            <View style={{flexDirection:'row'}}>
                <View style = {{padding:15, margin:10, fontWeight:'bold'}}>Due Date: </View>
                <input
                    style = {{padding:15, margin:10, width:350}} 
                    value={reminder_due_date}
                    readOnly
                    className='inputBox'
                    onClick={()=>setOpen(open => !open)}
                />
                <View style = {{padding:15, margin:10, fontWeight:'bold'}}>Due Time: </View>
                <input
                    style = {{padding:15, margin:10, width:350}} 
                    value={calendar}
                    readOnly
                    className='inputBox'
                   // onClick={()=>setOpen(open => !open)}
                />  
            </View>
                                    
            {open && 
                <Calendar 
                    date = {new Date()}
                    onChange={ handleSelect }
                    className="calendarElement"
                />
            }
                    
            <Button
                style = {{margin:5}}
                icon = "floppy"
                mode = "contained"
                onPress = {() => inputData()}
            >
                Save Reminder
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

export default ReminderEntry