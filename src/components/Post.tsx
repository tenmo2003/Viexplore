import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import service from "../helper/axiosService";
import Loading from "./Loading";
import locationsJson from "../../assets/tempDb/locations.json";

function Post({ route, navigation }) {
  const { location } = route.params;
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);
      // service.get(`/locations/${id}`).then(
      //   (response) => {
      //     const data = response.data;
      //     setData(data.results.detailedDescription);
      //     extractImageUrls(data.results.detailedDescription);
      //     setLoading(false);
      //   },
      //   () => setLoading(false)
      // );
      setData(location.detailedDescription);
      extractImageUrls(location.detailedDescription);
      setLoading(false);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
    </ScrollView>
  );
}

export default Post;
