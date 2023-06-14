import {useState, useEffect, useSyncExternalStore} from 'react';
import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Provider, Card, FAB, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import Plot from 'react-plotly.js';

function FitnessMain(props){    
    //Variable for fitness goal gotten from appconfig
    const [goalArr, setGoalArr] = useState(null); 

    const goalWeightArr = [];
    const goalBpArr = [];
    const goalStepsArr = [];

    //Extracting the fitness data from database and appending to list items.
    const [fitArr, setFitArr] = useState(null);
    
    //x and y Array for weight
    const y_weight_arr = [];

    //x and y Array for BP
    const y_bp_arr = [];

    //x and y Array for No. of Steps
    const y_steps_arr = [];

    const x_date_arr = [];   

    const [loadingData, setLoading] = useState(true);

    //useEffect to get array of object from app_config table of db (i.e goal set)
    useEffect(() => {
        fetch('http://localhost:3000/appconfigure/get',{
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setGoalArr(data);
                setLoading(true);
            })
            .catch(error => console.log(error))
    }, []);    
    
    //useEffect to get array of object from fitness table of db
    useEffect(() => {
        fetch('http://localhost:3000/fitness/get',{
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                setFitArr(data);
                setLoading(true);
            })
            .catch(error => console.log(error))
    }, []);    

    const fitness_data = [null]

    const milestones_data = [
        {id: 'Weight',unit: 'lbs'},
        {id: 'B.P',unit: 'mm Hg'},
        {id: 'No. of Steps',unit: 'steps'},
    ]
    
    // extracting weight, bp and no_of_steps array values from fitArr and appending to corresponding
    // arrays

    let curr_weight = ""
    let curr_bp = ""
    let curr_steps = ""
    //sorting fitArr object according to fitness_id
   
    if (fitArr != null && fitArr.length != 0){
        console.log("This is fitArr 2", fitArr)
        fitArr.sort((a,b) => a.fitness_id - b.fitness_id)
        curr_weight = fitArr[fitArr.length-1].fitness_weight
        curr_bp = fitArr[fitArr.length-1].fitness_bp
        curr_steps = fitArr[fitArr.length-1].fitness_steps
    }
    
    if(fitArr){
        fitArr.map(elem=>{
            y_weight_arr.push(elem.fitness_weight),
            y_bp_arr.push(elem.fitness_bp),
            y_steps_arr.push(elem.fitness_steps),
            x_date_arr.push(elem.fitness_entry_date)
        })
    }

    // extracting goal weight, bp and no. of steps from goalArr
    if(goalArr){
        goalArr.map(elem=>{
            goalWeightArr.push(elem.appconfig_weight),
            goalBpArr.push(elem.appconfig_bp),
            goalStepsArr.push(elem.appconfig_steps)
        })
    }

    const renderData1 = (item) => {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <div style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>
                        {console.log("This is it:",x_date_arr[0],x_date_arr[x_date_arr.length-1])}
                        <Plot data={[{
                            x: x_date_arr,
                            y: y_weight_arr,
                            type: 'scatter',
                            name: 'Current',
                            mode:"lines+markers"
                        },
                        {
                            //Goal Threshold Line
                            x: [x_date_arr[0],x_date_arr[x_date_arr.length-1]], 
                            y: [goalWeightArr[0],goalWeightArr[0]],
                            type: 'scatter',name: 'Goal', line: {width: 4,dash: 'dot'}
                        },]}
                        layout={{width: 500,height: 370, title: 'Weight Goal Tracker', xaxis:{title: "Date"}, yaxis:{title: "Weight lbs"}}}
                        />                                              
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>
                        <Plot data={[{
                            x: x_date_arr,
                            y: y_bp_arr,
                            type: 'scatter',
                            name: 'Current',
                            mode:"lines+markers"
                        },
                        {
                            //Goal Threshold Line
                            x: [x_date_arr[0],x_date_arr[x_date_arr.length-1]], 
                            y: [goalBpArr[0],goalBpArr[0]],
                            type: 'scatter',name: 'Goal', line: {width: 4,dash: 'dot'}
                        },]}
                        layout={{width: 500,height: 370, title: 'B.P Goal Tracker', xaxis:{title: "Date"}, yaxis:{title: "BP mmHg"}}}
                        />                                              
                    </div>
                    <View style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>
                        <Plot data={[{
                            x: x_date_arr,
                            y: y_steps_arr,
                            type: 'scatter',
                            name: 'Current',
                            mode:"lines+markers"
                        },
                        {
                            //Goal Threshold Line
                            x: [x_date_arr[0],x_date_arr[x_date_arr.length-1]], 
                            y: [goalStepsArr[0],goalStepsArr[0]],
                            type: 'scatter',name: 'Goal', line: {width: 4,dash: 'dot'}
                        },]}
                        layout={{width: 500,height: 370, title: 'Steps Goal Tracker', xaxis:{title: "Date"}, yaxis:{title: "Steps"}}}
                        />                                              
                    </View>
                </View>
            )
        }

    //Compare goal fitness markers with current fitness markers
    let weightGoalMet = false
    let bpGoalMet = false
    let stepsGoalMet = false
    if(curr_weight && goalWeightArr[0]){weightGoalMet = curr_weight <= goalWeightArr[0];console.log("This is 22: ",weightGoalMet)}
    if(curr_bp && goalBpArr[0]){bpGoalMet = curr_bp <= goalBpArr[0];}
    if(curr_steps && goalStepsArr[0]){stepsGoalMet = curr_steps >= goalStepsArr[0];}  
    
    const renderData2 = (item) => {
        if (item.id === 'Weight'){
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 495, backgroundColor: 'lightyellow'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{item.id}</Text>
                    </View>
                    <View style={{ width: 495, backgroundColor: 'white'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{item.unit}</Text>
                    </View>
                    <div style={{ width: 495, backgroundColor: 'white'}}>                 
                        {weightGoalMet
                            ? <input type="checkbox" style= {{padding:15, margin:10, borderWidth: 1}} checked={true}/>  
                            : <input type="checkbox" style = {{padding:15, margin:10, borderWidth: 1}} checked={false}/>  
                        }                                          
                    </div>
                </View>
            )
        }

        if (item.id === 'B.P' && curr_bp && goalBpArr[0]){
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 495, backgroundColor: 'lightyellow'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{item.id}</Text>
                    </View>
                    <View style={{ width: 495, backgroundColor: 'white'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{item.unit}</Text>
                    </View>
                    <div style={{ width: 495, backgroundColor: 'white'}}>
                        {bpGoalMet
                            ? <input type="checkbox" style= {{padding:15, margin:10, borderWidth: 1}} checked={true}/>  
                            : <input type="checkbox" style = {{padding:15, margin:10, borderWidth: 1}} checked={false}/>  
                        }       
                    </div>
                </View>
            )
        }

        if (item.id === 'No. of Steps' && curr_steps && goalStepsArr[0]){
            return (
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: 495, backgroundColor: 'lightyellow'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{item.id}</Text>
                    </View>
                    <View style={{ width: 495, backgroundColor: 'white'}}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>{item.unit}</Text>
                    </View>
                    <div style={{ width: 495, backgroundColor: 'white'}}>
                        {stepsGoalMet
                            ? <input type="checkbox" style= {{padding:15, margin:10, borderWidth: 1}} checked={true}/>  
                            : <input type="checkbox" style = {{padding:15, margin:10, borderWidth: 1}} checked={false}/>  
                        }       
                    </div>
                </View>
            )
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left', marginTop: '0%', padding:15 }}>
            <Text style={styles.TextStyle}>Fitness Progress Tracker</Text>
            <FlatList 
                data={fitness_data} 
                renderItem = {(item) => {
                    return renderData1(item)
                }}
                onRefresh={()=>loadPage}
                refreshing={loadingData}
            />
            
            <Text style={styles.TextStyle2}>Milestones Reached</Text>
            <FlatList 
                data={milestones_data} 
              //  renderItem={item} 
                renderItem = {({item}) => {
                    return renderData2(item)
                }}
                keyExtractor={item => item.id.toString()} 
            />

            <FAB
            style = {styles.fab}
            small={false}
            icon="plus"
            theme={{colors:{accent:"green"}}}
            onPress={()=>props.navigation.navigate('Fitness Entry')}
            />

        </View>
    )
   
}



const styles = StyleSheet.create(
    {
        TextStyle: {
            padding: 3,
            fontWeight: 'bold',
            fontSize: 25,
            textAlign: 'center'
        },
        TextStyle2: {
            padding: 3,
            fontWeight: 'bold',
            fontSize: 25,
            textAlign: 'center',
         //   marginBottom: 20
        },
        cardStyle: {
            margin:10,
            padding:1
        },
        fab: {
            position:"absolute",
            margin:16,
            right:0,
            bottom:0,
        }

    }
)

export default FitnessMain;