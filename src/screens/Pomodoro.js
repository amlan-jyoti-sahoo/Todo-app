import React, { useState } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import ImageCacheHOC from 'react-native-image-cache-hoc';

const CachedImage = ImageCacheHOC(Image, { fileHostWhitelist: ['your-image-host.com'] });

const Pomodoro = () => {
  const [images, setImages] = useState([
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
    'https://example.com/image4.jpg',
    'https://example.com/image5.jpg',
    'https://example.com/image6.jpg',
    'https://example.com/image7.jpg',
    'https://example.com/image8.jpg',
  ]);

  const shuffleImages = () => {
    const shuffledImages = [...images];
    for (let i = shuffledImages.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
    }
    setImages(shuffledImages);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {images.slice(0, 3).map((image, index) => (
          <CachedImage key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </View>
      <View style={styles.row}>
        {images.slice(3, 6).map((image, index) => (
          <CachedImage key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </View>
      {/* <View style={styles.row}>
        {images.slice(6, 8).map((image, index) => (
          <CachedImage key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </View> */}
      <Button title="Shuffle Images" onPress={shuffleImages} />
    </View>
  );
};

export default Pomodoro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
});
