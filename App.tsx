/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNLocation from 'react-native-location';

RNLocation.configure({
  distanceFilter: 0,
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [viewLocation, isViewLocation] = useState([]);

  const permissionHandle = async () => {
    console.warn('here');

    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse', // or 'fine'
      },
    });

    console.log('here2');
    console.warn(permission);

    let location;

    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });
      console.log(permission);
      location = await RNLocation.getLatestLocation({timeout: 100});
      console.warn(
        location,
        location.longitude,
        location.latitude,
        location.timestamp,
      );
      isViewLocation(location);
    } else {
      console.log('Here 7');
      location = await RNLocation.getLatestLocation({timeout: 100});
      console.warn(
        location,
        location.longitude,
        location.latitude,
        location.timestamp,
      );
      isViewLocation(location);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Button title="Get Location" onPress={permissionHandle} />
        <Text>Latitude: {viewLocation.latitude} </Text>
        <Text>Longitude: {viewLocation.longitude} </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
