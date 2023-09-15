import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

const Pomodoro = () => {
  const isCarousel = React.useRef(null);

  const data = [
    {
      title: 'Aenean leo',
      body: 'Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.',
      imgUrl: 'https://picsum.photos/id/11/200/300',
    },
    {
      title: 'In turpis',
      body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
      imgUrl: 'https://picsum.photos/id/10/200/300',
    },
    {
      title: 'In turpis',
      body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
      imgUrl: 'https://picsum.photos/id/10/200/300',
    },
    {
      title: 'In turpis',
      body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
      imgUrl: 'https://picsum.photos/id/10/200/300',
    },
    {
      title: 'In turpis',
      body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
      imgUrl: 'https://picsum.photos/id/10/200/300',
    },
    {
      title: 'In turpis',
      body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
      imgUrl: 'https://picsum.photos/id/10/200/300',
    },
    {
      title: 'In turpis',
      body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
      imgUrl: 'https://picsum.photos/id/10/200/300',
    },

    {
      title: 'In turpis',
      body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
      imgUrl: 'https://picsum.photos/id/10/200/300',
    },
    {
      title: 'In turpis',
      body: 'Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ',
      imgUrl: 'https://picsum.photos/id/10/200/300',
    },
    {
      title: 'Lorem Ipsum',
      body: 'Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.',
      imgUrl: 'https://picsum.photos/id/12/200/300',
    },
  ];

  const [index, setIndex] = React.useState(0);
  const [nextIndex, setnextIndex] = React.useState(index + 1);

  const SLIDER_WIDTH = Dimensions.get('window').width + 80;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

  const CarouselCardItem = ({item, index}) => {
    return (
      <View style={styles.container} key={index}>
        <Image source={{uri: item.imgUrl}} style={styles.image} />
        <Text style={styles.header}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    );
  };
  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      const nextIndex = (index + 1) % data.length;
      setIndex(nextIndex);
      isCarousel.current.snapToItem(nextIndex);
    }, 2000);

    return () => {
      clearInterval(autoScrollInterval);
    };
  }, [index]);

  return (
    <View>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => {
          setIndex(index);
          setnextIndex(index + 1);
        }}
        useScrollView={true}
      />
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDotContainer}>
          {index + 1 === 1 ? (
            <>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${index + 1}/${
                  data.length
                }`}</Text>
              </View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActive}></View>
            </>
          ) : index + 1 === 2 ? (
            <>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${index + 1}/${
                  data.length
                }`}</Text>
              </View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActive}></View>
            </>
          ) : index + 1 === 3 ? (
            <>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${index + 1}/${
                  data.length
                }`}</Text>
              </View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotInActive}></View>
            </>
          ) : index + 1 === 4 ? (
            <>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${index + 1}/${
                  data.length
                }`}</Text>
              </View>
              <View style={styles.dotInActiveNear}></View>
            </>
          ) : (
            <>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${index + 1}/${
                  data.length
                }`}</Text>
              </View>
            </>
          )}
        </View>
      </View>
      {/* <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'red',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        tappableDots={true}
      /> */}
    </View>
  );
};

export default Pomodoro;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 300,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: 300,
    height: 300,
  },
  header: {
    color: '#222',
    fontSize: 28,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingTop: 20,
  },
  body: {
    color: '#222',
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  paginationContainer: {
    width: '100%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDotContainer: {
    height: '100%',
    minWidth: 120,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotActive: {
    height: 20,
    width: 45,
    borderRadius: 50,
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationText: {color: '#ffffff', fontSize: 12, fontWeight: '600'},
  dotInActiveNear: {
    height: 10,
    width: 10,
    borderRadius: 50,
    marginHorizontal: 3,
    backgroundColor: '#a09d9d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInActive: {
    height: 5,
    width: 5,
    borderRadius: 50,
    marginHorizontal: 3,
    backgroundColor: '#cac4c4',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
