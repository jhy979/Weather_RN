import { StatusBar } from 'expo-status-bar';
import * as Location from "expo-location";
import React,{useEffect,useState} from 'react';
import { ScrollView, StyleSheet, Text, View,Dimensions, ActivityIndicatorBase, ActivityIndicator } from 'react-native';

const {width:SCREEN_WIDTH ,height} = Dimensions.get("window");
const API_KEY = "e95d66cc5d6371f1bb41a5f2366b31e8";

export default function App() {
  const [city, setCity] = useState("위치 탐색 중")
  const [location, setLocation] = useState();
  const [show, setShow] = useState(true);
  const [days,setDays] = useState([]);
  useEffect(() => {
    const ask = async () => {
      const {granted} = await Location.requestForegroundPermissionsAsync();
      // 위치 허가 받지 못한 경우
      if(!granted){
        setShow(false)
      }
      // 위치 경도 위도 가져오기
      const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
      
      // 위도 경도로 도시 알아내기
      const location = await Location.reverseGeocodeAsync({latitude,longitude}, {useGoogleMaps:false})
      setCity(location[0].city)

      // API 가져오기
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      )
      const json = await response.json();
      setDays(json.daily);
    }
    ask();
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
        {days.length===0 ?
          (
            <View style={styles.day}>
              <ActivityIndicator 
                color="white" 
                style={{marginTop:10}}
                size="large"
                />
            </View>
          ) 
          :
          (
            days.map((day,index)=>{
              return (
                <View key={index} style={styles.day}>
                  <Text style={styles.temp}>
                    {parseFloat(day.temp.day-273.15).toFixed(1)}
                  </Text>
                  
                  <Text style={styles.description}>{day.weather[0].main}</Text>  
                  <Text style={styles.tiny}>{day.weather[0].description}</Text>  
                </View>
              )
            })
          )
        }
       
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
    justifyContent:'center',
    alignItems:'center',
  },
  cityName:{
    color:"black",
    fontSize:68,
    fontWeight: "500",
    color:"#274722",
  },
  weather:{

  },
  day: {
    width:SCREEN_WIDTH,
    alignItems:'flex-start',
    marginLeft: 25,
  },
  temp:{
    fontSize:90,
    marginTop:70,
    color:"#274722",
  },
  description:{
    marginTop: -30,
    fontSize: 40,
    color:"#274722",
  },
  tiny:{
    fontSize: 20,
    color:"#274722",
  }
})