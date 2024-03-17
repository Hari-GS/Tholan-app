import React from 'react';
import { View, Text, StyleSheet , TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';
import { useEffect } from 'react';

export default function Home({navigation}) {

    let [fontsLoaded] = useFonts({
        'Julius':require('../assets/fonts/JuliusSansOne-Regular.ttf')
      })
    
      useEffect(() => {
        if (!fontsLoaded) {
            return; // Exit early if fonts are not loaded yet
        }

        axios.get('http://192.168.128.216:8080/test') 
          .then(response => {
              // Handle the response here
          })
          .catch(error => {
            console.error('test error', error);
          });
    }, [fontsLoaded]); // Make sure to include fontsLoaded in the dependency array

    if (!fontsLoaded) {
        return null; // Or render a loading indicator
    }

    const pressHandler=()=>{
        navigation.navigate('ConductResearch')
    }


    return (
        <View style={styles.cont1}>
            <Text style={styles.heading}>
                THOLAN
            </Text>
            <Text style={styles.subHead}>
                Farmers' friend
            </Text>
            <Text style={styles.greetings}>
                Welcome back User
            </Text>
            <TouchableOpacity style={styles.button1} onPress={pressHandler}>
                <Text style={styles.buttonText1}>Conduct Research</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2}>
                <Text style={styles.buttonText2}>Saved Results</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    cont1:{
        flex: 1,
        top:160,
        alignItems:'center'
        
    },

    heading: {
        top:0,
        fontFamily: 'Julius',
        fontSize:45,
        color:'#78A5A3'
    },
    subHead:{
        left:60,
        color:'#757575'
    },
    greetings:{
        marginTop:100
    },
    button1:{
        backgroundColor:'#78A5A3',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft:40,
        paddingRight:40,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:165,
        borderWidth: 2,
        borderColor:'#78A5A3'        
    },
    button2:{
        borderColor: '#78A5A3',
        borderWidth: 2,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft:55,
        paddingRight:55,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:30
    },
    buttonText1:{
        fontSize:20,
        color:'white'
    },
    buttonText2:{
        fontSize:20,
        color:'#78A5A3'
    }
});


