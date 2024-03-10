import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Components/Home.js';
import Navigator from './routes/HomeStack.js'

export default function App() {

  return (
    <View style={styles.container}>
       <Navigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F5F5F5'
  },
});
