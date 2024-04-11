import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';
import {Icon} from '../components/Icons';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MainScreen = () => {
  const [currentRegion, setCurrentRegion] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.560214,
    longitude: 126.9775521,
  });

  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main" />
      </Header>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <Marker
        coordinate={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
        }}
      />
    </View>
  );
};

export default MainScreen;
