import {useState, useEffect} from 'react';
import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Provider, Card, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import "./quotes.css";

function QuotesMain(props){   
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")

    const apiQuotes = async () => {
        let quotesArray = [];
        try{
            const data = await axios.get("https://api.quotable.io/random");
            quotesArray = data.data;
            console.log(quotesArray);
      //      console.log(typeof(quotesArray));
        }catch (error) {
            console.log(error);
        }

        try{
            setQuote(quotesArray.content);
            setAuthor(quotesArray.author);
        }catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        apiQuotes();
    }, []);
    
    return (
        <div className='App'>
            <div className='quoteBox'>
                <div className='container'>
                    <div className='quote'><h1>{quote}</h1></div>
                    <div className='author'>{author}</div>
                    <div className='quoteButton'><button onClick={apiQuotes}>Get Daily Quote</button></div>
                </div>
            </div>
        </div>
        /*
        <div style= {styles.quotesContainerStyle}>
                <div>{quote}</div>
                <div>{author}</div>
                <div><button onClick={apiQuotes}>Get Daily Quote</button></div>
            
        </div>
        */
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
            flex:1,
            marginTop:40          
        },
        cardStyle: {
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
            flex: 1,
            margin: 1
        }

    }
)

export default QuotesMain;