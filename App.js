import { StatusBar } from 'expo-status-bar';
import * as Location from "expo-location";
import React,{useEffect,useState} from 'react';
import { ScrollView, StyleSheet, Text, View,Dimensions, ActivityIndicatorBase, ActivityIndicator } from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import { Fontisto } from '@expo/vector-icons';
const {width:SCREEN_WIDTH ,height} = Dimensions.get("window");
const API_KEY = "e95d66cc5d6371f1bb41a5f2366b31e8";
// 해시 맵으로 아이콘 매핑하기
const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};
const dateToday = {
  0 : "Mon",
  1 : "Tue",
  2 : "Wed",
  3 : "Thu",
  4 : "Fri",
  5 : "Sat",
  6 : "Sun"
}
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
              const date = new Date(day.sunrise * 1000); 
              const year = date.getFullYear(); 
              const month = date.getMonth() + 1; 
              const day1 = date.getDate(); 
              const day2 = date.getDay();
              const formattedTime = `${year}.${month >= 10 ? month : '0' + month}.${day1 >= 10 ? day1 : '0' + day1} ${dateToday[day2]}`;
              return (
                <View key={index} style={styles.day}>
                  <Text style={styles.date}>
                      {formattedTime}
                  </Text>
                  <View style={
                    {
                      flexDirection:"row",
                      alignItems:"center",
                      justifyContent:"space-between",
                      width:"100%"
                    }}>
                    <Text style={styles.temp}>
                      {parseFloat(day.temp.day-273.15).toFixed(1)}
                    </Text>

                    <Fontisto name={icons[day.weather[0].main]} size={50} color="#ebd8ad" />

                    
                  </View>
                  
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
    backgroundColor:"#274722"
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
    color:"#ebd8ad",
  },
  weather:{

  },
  day: {
    width:SCREEN_WIDTH,
    paddingHorizontal:50,
    alignItems:'flex-start',
  },
  temp:{
    fontSize:90,
    marginTop:70,
    color:"#ebd8ad",
  },
  description:{
    marginTop: -30,
    fontSize: 40,
    color:"#ebd8ad",
  },
  tiny:{
    fontSize: 20,
    color:"#ebd8ad",
  },
  date :{
    fontSize: 25,
    color:"#ebd8ad",
    marginBottom: -20,
    fontWeight: "700",
  }
})