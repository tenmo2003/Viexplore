import React, { useState } from "react";
import { View } from "react-native";
import MapView, { Geojson } from "react-native-maps";
import { vietnam, mapStyle } from "../../assets/vietnam";

function MapScreen() {
  const [coordinate, setCoordinate] = useState([0, 0]);
  const [zoom, setZoom] = useState(0.7);
  return (
    <View className="flex-1 items-center justify-end bg-gray-200">
      <MapView className="w-full h-full" customMapStyle={mapStyle}>
        <Geojson
          geojson={vietnam}
          strokeColor="gray"
          fillColor="gray"
          strokeWidth={1}
        />
      </MapView>
    </View>
  );
}

export default MapScreen;
