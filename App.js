import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>

      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>

      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>  
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:"#ebd8ad"
  },
  city :{
    flex:1,
    backgroundColor:"#274722",
    justifyContent:'center',
    alignItems:'center',
  },
  cityName:{
    color:"black",
    fontSize:68,
    fontWeight: "500",
  },
  weather:{
    flex:3,
  },
  day: {
    flex:1,
    alignItems:'center',
  },
  temp:{
    fontSize:150,
    marginTop:70,
  },
  description:{
    marginTop: -30,
    fontSize: 40,
  }
})