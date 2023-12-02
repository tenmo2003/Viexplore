import React, { useState } from 'react';
import { View, Image, Dimensions, ScrollView, StyleSheet } from 'react-native';

class ImageSlider2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      containerWidth: Dimensions.get('window').width,
      containerHeight: Dimensions.get('window').height * 0.5,
      currentPage: 0,
    };
  }

  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({
      containerWidth: width,
      containerHeight: height,
    });
  };

  handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newPage = Math.round(offsetX / this.state.containerWidth);
    this.setState({
      currentPage: newPage,
    });
  };

  render() {
    const { data, caroselImageContainerStyle } = this.props;
    const { containerWidth, containerHeight, currentPage } = this.state;

    const snapOffsets = data.map((_, index) => index * containerWidth);

    if (data.length <= 1) {
      // If there's only one page, don't render indicators
      return (
        <ScrollView
          horizontal
          pagingEnabled
          style={{ ...caroselImageContainerStyle, width: containerWidth, height: containerHeight }}
          onLayout={this.onLayout}
          snapToOffsets={snapOffsets}
          onScroll={this.handleScroll}
        >
          {data.map((item, index) => (
            <View key={index} style={{ marginLeft:10,marginRight:10,width: containerWidth -42.25, height: containerHeight }}>
              <Image
                source={{ uri: item.img }}
                style={{ flex: 1, width: null, height: null,borderRadius:10 }}
                resizeMode="cover"

              />
            </View>
          ))}
        </ScrollView>
      );
    }

    return (
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          style={{ ...caroselImageContainerStyle, width: containerWidth, height: containerHeight }}
          onLayout={this.onLayout}
          snapToOffsets={snapOffsets}
          onScroll={this.handleScroll}
        >
          {data.map((item, index) => (
            <View key={index} style={{ marginLeft:10,width: containerWidth - 10 , height: containerHeight }}>
              <Image
                source={{ uri: item.img }}
                style={{ flex: 1, width: containerWidth -42, height: null,borderRadius:10}}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
        {data.length > 1 && (
          <View style={styles.indicatorContainer}>
            {data.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  { backgroundColor: index === currentPage ? '#007BFF' : '#CCCCCC' },
                ]}
              />
            ))}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default ImageSlider2;
