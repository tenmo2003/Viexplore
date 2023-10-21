import React, { useRef, useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Geojson, Marker } from "react-native-maps";
import { vietnam, mapStyle, initialCamera } from "../helper/vietnam";
import Loading from "../components/Loading";

function MapScreen({ navigation }) {
  const mapViewRef = useRef(null);

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.0.101:8085/api/locations");
      const data = await response.json();
      setLocations(data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const returnToInitialCamera = () => {
    mapViewRef.current.animateCamera(initialCamera, 1000);
  };

  return (
    <View className="flex-1 items-center justify-end bg-gray-200">
      <MapView
        ref={mapViewRef}
        className="w-full h-full"
        customMapStyle={mapStyle}
        initialCamera={initialCamera}
        minZoomLevel={5.7}
        maxZoomLevel={8.5}
        pitchEnabled={false}
        rotateEnabled={false}
      >
        <Geojson
          geojson={vietnam}
          strokeColor="gray"
          fillColor="rgba(255, 255, 255, 0.5)"
          strokeWidth={1}
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            onPress={() => navigation.navigate("Post", { id: location.id })}
          />
        ))}
      </MapView>
      <TouchableOpacity
        className="absolute bottom-16 right-3 rounded-full bg-white p-3"
        onPress={returnToInitialCamera}
      >
        <Text>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MapScreen;
