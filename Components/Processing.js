import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,  ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';

export default function Processing({ route, navigation }) {
    const [cards, setCards] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { selectedBlock } = route.params;

    useEffect(() => {
        const addCardWithDelay = (text, delay) => {
            setTimeout(() => {
                setCards(prevCards => [...prevCards, text]);
            }, delay);
        };

        // Adding cards with delays
        addCardWithDelay("Fetching block’s soil details...", 0);
        addCardWithDelay("Analyzing weather....", 2000);
        addCardWithDelay("Almost done...", 4000);

          // Simulating loading time
          setTimeout(() => {
            setIsLoading(false);
            navigation.navigate('Result',{selectedBlock});
        }, 6000);

    }, []);

    return (
        <View style={styles.container}>
        <View style={styles.cardsContainer}>
            {cards.map((card, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.cardText}>{card}</Text>
                </View>
            ))}
        </View>
        {isLoading && (
            <View style={styles.spinnerContainer}>
                <ActivityIndicator size="100" color="#78A5A3" />
            </View>
        )}
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        backgroundColor: '#78A5A3',
        padding: 20,
        marginVertical: 5,
        marginStart:5,
        marginEnd:5,
        borderRadius: 10,
    },
    cardText: {
        fontSize: 20,
        color:'white'
    },
    spinnerContainer: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
    },
});
