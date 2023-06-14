import 'react-native-gesture-handler';
//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Dashboard from './front_end_components/Dashboard.js';
import DiaryEdit from './front_end_components/diary_components/diary_edit.js';
import Constants from 'expo-constants';
//import diary components
import DiaryMain from './front_end_components/diary_components/diary_main.js'
import DiaryDetails from './front_end_components/diary_components/diary_details.js'
import DiaryEntry from './front_end_components/diary_components/diary_entry.js'
//import reminder components
import ReminderMain from './front_end_components/reminder_components/reminder_main.js'
import ReminderDetails from './front_end_components/reminder_components/reminder_details.js'
import ReminderEntry from './front_end_components/reminder_components/reminder_entry.js'
//import DailyQuotes components
import QuotesMain from './front_end_components/quotes_components/quotes_main.js'
//import AppConfig components
import AppConfigMain from './front_end_components/AppConfig_components/appConfig_main.js'
//import Fitness components
import FitnessMain from './front_end_components/fitness_components/fitness_main.js' 
import FitnessEntry from './front_end_components/fitness_components/fitness_entry.js'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <View style={styles.container}>
            <Stack.Navigator>
                
                <Stack.Screen name = "Dashboard" component = {Dashboard}/>

                <Stack.Screen name = "Diary" component = {DiaryMain}/>
                <Stack.Screen name = "Diary Entry" component = {DiaryEntry}/>
                <Stack.Screen name = "Diary Details" component = {DiaryDetails}/>
                <Stack.Screen name = "Diary Edit" component = {DiaryEdit}/>

                <Stack.Screen name = "Reminder" component = {ReminderMain}/>
                <Stack.Screen name = "Reminder Entry" component = {ReminderEntry}/>
                <Stack.Screen name = "Reminder Details" component = {ReminderDetails}/>

                <Stack.Screen name = "Daily Quote" component= {QuotesMain}/>

                <Stack.Screen name = "App Config" component= {AppConfigMain}/>

                <Stack.Screen name = "Fitness" component= {FitnessMain}/>
                <Stack.Screen name = "Fitness Entry" component= {FitnessEntry}/>
            </Stack.Navigator>
        </View>
        
    );
  }

  export default() => {
    return (
        <NavigationContainer>
            <App/>
        </NavigationContainer>
    )
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'peach',
        marginTop:Constants.statusBarHeight
    },
});


