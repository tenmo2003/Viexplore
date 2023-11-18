import React, { useRef, useState, useEffect } from 'react';
import { View, Image, Dimensions, ScrollView, StyleSheet } from 'react-native';

const ImageSlider = ({ data, caroselImageContainerStyle }) => {
  const scrollViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const containerWidth = Dimensions.get('window').width;
  const containerHeight = Dimensions.get('window').height * 0.5;

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollViewRef.current) {
        const nextPage = (currentPage + 1) % data.length;
        scrollViewRef.current.scrollTo({ x: nextPage * containerWidth, animated: true });
        setCurrentPage(nextPage);
      }
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, [currentPage, data.length, containerWidth]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.round(offsetX / containerWidth);
    setCurrentPage(newPage);
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        style={{ ...caroselImageContainerStyle, width: containerWidth, height: containerHeight }}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={200}
      >
        {data.map((item, index) => (
          <View key={index} style={{ width: containerWidth, height: containerHeight }}>
            <Image
              source={{ uri: item.img }}
              style={{ flex: 1, width: null, height: null }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.pageIndicatorContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.pageIndicator,
              { backgroundColor: index === currentPage ? 'black' : '#CCCCCC'},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  pageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default ImageSlider;
