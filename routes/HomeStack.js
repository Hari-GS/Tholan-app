import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Components/Home';
import ConductResearch from '../Components/ConductResearch';
import Processing from '../Components/Processing';
import Result from '../Components/Result'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ConductResearch" component={ConductResearch} />
        <Stack.Screen name="Processing" component={Processing} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
