import { View , Text, StyleSheet} from 'react-native';
import { StatusBar} from 'expo-status-bar';

export default function App(){
  return(
    <View style={styles.container} >
      <Text>Hello</Text>
      <Text>RN renders native views, no HTML</Text>
      
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: '#ea1717',
  },
});