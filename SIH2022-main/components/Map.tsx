import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions,Text, TouchableOpacity } from 'react-native';
import React, { useState,useEffect } from 'react';
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

// 3rd Party Imports
import { useTranslation } from 'react-i18next';

const {width,height}=Dimensions.get('window');

const ASPECT_RATIO=width/height;
const LATITUDE_DELTA=0.02;
const LONGITUDE_DELTA=LATITUDE_DELTA*ASPECT_RATIO;


  

type InputAutocompleteProps={
  label:string,
  placeholder:string,
  onPlaceSelected:(details:GooglePlaceDetail |null)=>void,
};
function InputAutocompelete({
  label,
  placeholder,
  onPlaceSelected,
}:InputAutocompleteProps){
  return(
    <>
    <Text>{label}</Text>
    <GooglePlacesAutocomplete
    styles={{textInput: styles.input}}
    placeholder={placeholder || "" }
    fetchDetails
    onPress={(data,details = null)=>{
      onPlaceSelected(details);
    }}
    query={{
      key:'AIzaSyApjdYiuTXmzZdNhzLWOc0fMGplLSjn2Qc',
      language:'pt-BR',
    }}
    />
    </>
  )
}


export default function App() {
  const [origin,setOrigin]=(React.useState)<LatLng | null>(null);
  const [destination,setDestination]=(React.useState)<LatLng | null>();

  const [showDirections, setShowDirections]= useState(false);

  const [distance,setDistance]=useState(0);
  const [duration,setDuration]=useState(0);

  const { t, i18n } = useTranslation();

  const initial={
    latitude: 28.7041,
   longitude: 77.1025,
     latitudeDelta: LATITUDE_DELTA,
     longitudeDelta: LONGITUDE_DELTA,
  }


  
  const mapRef=React.useRef<MapView>(null);



  const moveTo= async (position:LatLng)=>{
    const camera=await mapRef.current?.getCamera();
    if(camera){
      camera.center=position;
      mapRef.current?.animateCamera(camera,{duration:1000});
    }
  }


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status) {
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        console.log(location.coords.latitude,location.coords.longitude);
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      //   Geolocation.getCurrentPosition(
      //       (position) => {
      //         console.log(position.coords);
      //       },
      //       (error) => {
      //         // See error code charts below.
      //         console.log(error.code, error.message);
      //       },
      //       { enableHighAccuracy: true }
      //   );
      }
    })();
  }, []);
  

  const edgePaddingValue=30
  const edgePadding={
    top:edgePaddingValue,
    right:edgePaddingValue,
    left:edgePaddingValue,
    bottom:edgePaddingValue,
  }


  const traceRouteOnReady =(args:any)=>{
    if(args)
    {
      //args.distance
      //args.duration
      setDistance(args.distance)
      setDuration(args.duration)
    }
  }
  const traceRoute=()=>{
    if(origin&&destination)
    {
      setShowDirections(true)
      mapRef.current?.fitToCoordinates([origin,destination],{edgePadding})
    }
  }



  const onPlaceSelected=(
    details:GooglePlaceDetail |null,
    flag:"origin"|"destination"
    )=>{
      const set = flag==="origin"?setOrigin:setDestination
      const position={
        latitude:details?.geometry.location.lat||0,
        longitude:details?.geometry.location.lng||0,
      }
      set(position)

      moveTo(position)
  };
  return (
    <View style={styles.container}>
      <MapView 
      ref={mapRef}
      style={styles.map} 
      provider={PROVIDER_GOOGLE}
      initialRegion={initial}
      >
        {origin && <Marker coordinate={origin}/>}
        {destination && <Marker coordinate={destination}/>}
        {showDirections&&origin&&destination&&(
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey='AIzaSyApjdYiuTXmzZdNhzLWOc0fMGplLSjn2Qc'
          strokeColor='#6644ff'
          strokeWidth={4}
          onReady={traceRouteOnReady}
        />)}
        </MapView>

      <View style={styles.searchContainer}>
      {/* <InputAutocompelete 
      label="Origin" 
      placeholder="" 
      onPlaceSelected={(details)=>{
        onPlaceSelected(details,"origin");
      }}
      /> */}
      
      <InputAutocompelete 
      label={t("Destination")}
      placeholder="" 
      onPlaceSelected={(details)=>{
        onPlaceSelected(details,"destination");
      }}
      />
      <TouchableOpacity 
      style={styles.button} 
      onPress={traceRoute}
      >
        <Text 
        style={styles.buttonText}>
          {t("TraceRoute")}
          </Text>
      </TouchableOpacity>
      {distance&&duration?(
      <View>
        <Text>Distance: {distance.toFixed(2)} Km</Text>
        <Text>Duration: {Math.ceil(duration)} min</Text>
      </View>
      ):null}
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-500,
  },
  searchContainer:{
    position:'absolute',
    width:'90%',
    backgroundColor:'white',
    shadowColor:'black',
    shadowOffset:{width:2,height:2},
    shadowOpacity:0.5,
    shadowRadius:2,
    elevation:2,
    padding:10,
    borderRadius:10,
    top:Constants.statusBarHeight,
  },
  input:{
    borderColor:'grey',
    borderWidth:1,
  },
  button:{
    backgroundColor:'grey',
    paddingVertical:12,
    marginTop:16,
    borderRadius:4,

  },
  buttonText:{
    textAlign:'center',

  }
});
