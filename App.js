import { StatusBar } from 'expo-status-bar';
import * as Location from "expo-location";
import React,{useEffect,useState} from 'react';
import { ScrollView, StyleSheet, Text, View,Dimensions } from 'react-native';

const {width:SCREEN_WIDTH ,height} = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("위치 탐색 중")
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  useEffect(() => {
    const ask = async () => {
      const {granted} = await Location.requestForegroundPermissionsAsync();
      // 위치 허가 받지 못한 경우
      if(!granted){
        setOk(false)
      }
      // 위치 경도 위도 가져오기
      const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
      // 위도 경도로 도시 알아내기
      const location = await Location.reverseGeocodeAsync({latitude,longitude}, {useGoogleMaps:false})
      setCity(location[0].city)
    }
    ask()
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>

      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView 
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true} 
        horizontal={true}
        contentContainerStyle={styles.weather}
      >

        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>  
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>  
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>  
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>  
        </View>

      </ScrollView>

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

  },
  day: {
    width:SCREEN_WIDTH,
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