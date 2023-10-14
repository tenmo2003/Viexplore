import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";

const Post = ({ id }) => {
  async function fetchData() {
    try {
      const response = await fetch(
        "http://192.168.0.101:8085/api/locations/" + id
      );
      const data = await response.json();
      setData(data.results.detailedDescription);
      extractImageUrls(data.results.detailedDescription);
    } catch (error) {
      console.error(error);
    }
  }

  // Parse the content and extract image URLs
  function extractImageUrls(data) {
    const regex = /{image:(.*?)}/g;
    const matches = data.match(regex);
    if (matches) {
      const urls = matches.map((match) =>
        match.replace("{image:", "").replace("}", "")
      );
      setImageUrls(urls);
    }
  }

  const [imageUrls, setImageUrls] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      {data.split(/\{image:.*?\}/).map((text, index) => (
        <View key={index}>
          <Text className="mb-3 mt-3">{text.trim()}</Text>
          {imageUrls[index] && (
            <View>
              <Image
                source={{ uri: imageUrls[index] }}
                style={{ width: 330, height: 200 }}
                resizeMode="cover"
                progressiveRenderingEnabled={true}
                className="self-center"
              />
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

export default Post;
