import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity , } from 'react-native';
import { useFonts } from 'expo-font';
import axios from 'axios';
import { useEffect , useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function ConductResearch({navigation}) {
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [blocks, setBlocks] = useState([]);
    
    useEffect(() => {
        // Define an async function to fetch block names
        const fetchBlocks = async () => {
            try {
                // Make an HTTP GET request to your backend API
                const response = await axios.get('http://192.168.128.216:8080/getBlocks'); 
                
                const blocks = response.data.map(block => {
                    // Parse the JSON string to convert it into an object
                    const blockObj = JSON.parse(block);
                    // Extract the blockName field from the object
                    return blockObj.blockName;
                });
                
                // Now blocks array contains only the block names
                setBlocks(blocks);

            } catch (error) {
                console.error('Error fetching blocks:', error);
            }
        };

        // Call the fetchBlocks function when the component mounts
        fetchBlocks();

        // Cleanup function (optional)
        return () => {
            // You can perform cleanup here if needed
        };
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    const handleButtonPress = () => {
        // Handle button press action here
        console.log('Button pressed');
        navigation.navigate('Processing',{selectedBlock});
    };
 
 
    return (
        <View style={styles.container}>
            <Text style={styles.disText}>
                What is your BLOCK in the Thanjavur District?
            </Text>
            <View style={styles.pickerContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedBlock}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedBlock(itemValue)
                    }>
                    <Picker.Item label="Select a block" value={null} />
                    {blocks.map((block, index) => (
                        <Picker.Item key={index} label={block} value={block} />
                    ))}
                </Picker>
            </View>

            {/* Big circle button and Text box */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                    {/* Your button content goes here */}
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                {/* Box with text */}
                <View style={styles.textBox}>
                    <Text style={styles.textBoxText}>
                        What is block?{'\n'}{'\n'}The district is sub-divided into 14 community development blocks. Each block has its own Soil type, Elevation, Weather, Market linkages
                    </Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:20,
        width:'100%',
        alignItems:'center'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    bottomContainer: {
        marginTop:'70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disText: {
        fontSize: 17,
        marginBottom: 10,
        marginLeft:10
    },
    pickerContainer: {
        marginTop:5,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#78A5A3' ,
        overflow: 'hidden', // Ensure that the border radius is applied
    },
    picker: {
        width: 350,
        height: 40,
    },
    button: {
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#78A5A3', // Adjust the color as needed
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
    },
    textBox: {
        backgroundColor: '#D9D9D9',
        paddingTop:10,
        paddingBottom:20,
        paddingRight:10,
        paddingLeft:10,
        borderRadius:10,
        marginTop:80
    },
    textBoxText: {
        fontSize: 16,
    },
});

