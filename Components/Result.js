import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList ,Linking, SafeAreaView , ScrollView } from 'react-native';
import axios from 'axios';

export default function Result({ route }) {

    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [irrigatedCrops, setIrrigatedCrops] = useState([]);
    const [rainfedCrops, setRainfedCrops] = useState([]);
    const { selectedBlock } = route.params;

    const [soilType, setSoilType] = useState(null);
    const [weather, setWeather] = useState(null);
    const [weatherDes, setweatherDes] = useState(null)
    const [date, setDate] = useState(null);

    useEffect(() => {
        // Define a function to fetch result data
        const fetchResultData = async () => {
            try {
                const response = await axios.get(`http://192.168.43.105:8080/getRes/${selectedBlock}`); // Assuming Vallam is the default block
                const data = response.data;

                setIrrigatedCrops(data.irrigated);
                setRainfedCrops(data.rainfed);
                // setSelectedBlock(data.blockName);
                setSoilType(data.soilType);
                
                const weatherParts = data.weather.split(', ')
                const weatherValue = weatherParts[0].split(': ')[1];
                const descriptionValue = weatherParts[1].split(': ')[1];
                setWeather( weatherValue);
                setweatherDes(descriptionValue)

                setDate(data.date);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching result:', error);
                setIsLoading(false);
            }
        };

        // Call the function to fetch data when component mounts
        fetchResultData();
    }, []);

    const renderCropCard = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardText}>{item.cropName}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <Text style={styles.cardMoreDetails}>For detailed guidance : <Text style={styles.link}  onPress={() => onPressMoreDetails(item.moreDetails)}>Tap Here</Text> </Text>
        </View>
    );

    const onPressMoreDetails = (url) => {
        Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
      }

    return (

        
             <ScrollView>
            <View style={styles.container}>
            <Text style={styles.contR2}><Text style={styles.heading}>Location (Block):</Text> {selectedBlock}</Text>
            <Text style={styles.contR2}><Text style={styles.heading}>Soil type:</Text> {soilType}</Text>
            <Text style={styles.contR2}><Text style={styles.heading}>Weather:</Text> {weather}</Text>
            <Text style={styles.contR2}><Text style={styles.heading}>Weather Description:</Text> {weatherDes}</Text>
            <Text style={styles.contR2}><Text style={styles.heading}>Date:</Text> {date}</Text>
            <View style={styles.line}></View>
            <Text style={styles.sHeading}>Suggested Crops</Text>

            <View style={styles.section}>
                <Text style={styles.title}>Irrigated Crops</Text>
                <FlatList
                    data={irrigatedCrops}
                    renderItem={renderCropCard}
                    keyExtractor={item => item.cropName}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Rainfed Crops</Text>
                <FlatList
                    data={rainfedCrops}
                    renderItem={renderCropCard}
                    keyExtractor={item => item.cropName}
                />
            </View>
        </View>
        </ScrollView>
        
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    contR2: {
        fontSize: 19,
        marginBottom: 5
    },
    section: {
        marginTop: 15
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    card: {
        backgroundColor: '#78A5A3',
        padding: 20,
        marginVertical: 5,
        marginStart: 5,
        marginEnd: 5,
        borderRadius: 10
    },
    cardText: {
        fontSize: 18,
        color: 'white'
    },
    heading:{
        fontWeight: 'bold'
    },
    line: {
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
    sHeading:{
        textAlign:'center',
        fontWeight: 'bold',
        fontSize:25,
        color:'#78A5A3'

    },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cardDescription: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    marginTop:10
  },
  cardMoreDetails: {
    fontSize: 16,
    color: 'white',
  },
  link:{
    color:'red'
  }
}

    );


