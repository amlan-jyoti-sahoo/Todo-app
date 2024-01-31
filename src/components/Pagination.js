import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Pagination = ({index, dataLength}) => {
  return (
    <View style={styles.paginationContainer}>
      {dataLength > 5 ? (
        <View style={styles.paginationDotContainer}>
          {index + 1 === 1 ? (
            <>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${
                  index + 1
                }/${dataLength}`}</Text>
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
                <Text style={styles.paginationText}>{`${
                  index + 1
                }/${dataLength}`}</Text>
              </View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActive}></View>
            </>
          ) : index + 1 === dataLength - 1 ? (
            <>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${
                  index + 1
                }/${dataLength}`}</Text>
              </View>
              <View style={styles.dotInActiveNear}></View>
            </>
          ) : index + 1 === dataLength ? (
            <>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${
                  index + 1
                }/${dataLength}`}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.dotInActive}></View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${
                  index + 1
                }/${dataLength}`}</Text>
              </View>
              <View style={styles.dotInActiveNear}></View>
              <View style={styles.dotInActive}></View>
            </>
          )}
        </View>
      ) : //data less than 5
      dataLength > 2 && dataLength < 5 ? (
        <View
          style={[
            styles.paginationDotContainer,
            {minWidth: 85, marginTop: 20},
          ]}>
          {index + 1 === 1 ? (
            <>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${
                  index + 1
                }/${dataLength}`}</Text>
              </View>
              <View style={styles.dotInActiveLessThanFive}></View>
              <View style={styles.dotInActiveLessThanFive}></View>
            </>
          ) : index + 1 === dataLength ? (
            <>
              <View style={styles.dotInActiveLessThanFive}></View>
              <View style={styles.dotInActiveLessThanFive}></View>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${
                  index + 1
                }/${dataLength}`}</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.dotInActiveLessThanFive}></View>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${
                  index + 1
                }/${dataLength}`}</Text>
              </View>
              <View style={styles.dotInActiveLessThanFive}></View>
            </>
          )}
        </View>
      ) : //data less than 3
      dataLength < 3 ? (
        <View
          style={[
            styles.paginationDotContainer,
            {minWidth: 65, marginTop: 20},
          ]}>
          {index + 1 === 1 ? (
            <>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${
                  index + 1
                }/${dataLength}`}</Text>
              </View>
              <View style={styles.dotInActiveLessThanFive}></View>
            </>
          ) : (
            <>
              <View style={styles.dotInActiveLessThanFive}></View>
              <View style={styles.dotActive}>
                <Text style={styles.paginationText}>{`${
                  index + 1
                }/${dataLength}`}</Text>
              </View>
            </>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
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
    backgroundColor: '#aca8a8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInActiveLessThanFive: {
    height: 7,
    width: 7,
    borderRadius: 50,
    marginHorizontal: 3,
    backgroundColor: '#aca8a8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
