import React, { useState } from "react";
import { View, Text } from "react-native";
import { SvgUri, Circle } from "react-native-svg";
import SvgPanZoom, { SvgPanZoomElement } from "react-native-svg-pan-zoom";

function MapScreen() {
  const [coordinate, setCoordinate] = useState([0, 0]);
  const [zoom, setZoom] = useState(0.7);
  return (
    <View className="flex-1 items-center justify-end bg-gray-200 py-3">
      <SvgPanZoom
        canvasHeight={1000}
        canvasWidth={500}
        minScale={0.7}
        initialZoom={0.7}
        maxScale={3}
        onZoom={(zoom) => {
          setZoom(zoom);
        }}
        canvasStyle={{
          backgroundColor: "white",
        }}
      >
        <SvgUri
          width="100%"
          height="100%"
          viewBox="0 0 1000 2100"
          uri="https://simplemaps.com/static/svg/vn/vn.svg"
        />
        <SvgPanZoomElement
          x={coordinate[0]}
          y={coordinate[1]}
          onClick={() => {
            console.log("onClick!");
            setCoordinate([Math.random() * 1000, Math.random() * 1000]);
          }}
          onClickCanceled={() => {
            console.log("onClickCanceled!");
          }}
          onClickRelease={() => {
            console.log("onClickRelease!");
          }}
        >
          <SvgUri
            width={(20 * 3 * 1) / zoom}
            height={(35 * 3 * 1) / zoom}
            viewBox="0 0 20 35"
            uri="https://upload.wikimedia.org/wikipedia/commons/d/d1/Google_Maps_pin.svg"
          />
        </SvgPanZoomElement>
      </SvgPanZoom>
    </View>
  );
}

export default MapScreen;
