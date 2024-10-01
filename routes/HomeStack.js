import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Components/Home';
import ConductResearch from '../Components/ConductResearch';
import Processing from '../Components/Processing';
import Result from '../Components/Result';
import { TouchableOpacity, Text } from 'react-native'; // Import TouchableOpacity and Text

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ConductResearch" component={ConductResearch} />
        <Stack.Screen name="Processing" component={Processing} />
        <Stack.Screen
          name="Result"
          component={Result}
          options={({ navigation }) => ({
            headerLeft: () => (
              <CustomBackButton navigation={navigation} />
            ),
            headerTitle: "",
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function CustomBackButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Home')} // Navigate to Home component
      style={{ marginLeft: 10 }} // Add some margin to align with default back button
    >
      <Text style={{ color: 'black', fontSize: 18 , fontWeight:'bold' }}>Back to Home</Text>
    </TouchableOpacity>
  );
}
