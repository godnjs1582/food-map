import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  getAddressFormCoords,
  getCoordsFromAddress,
  getCoordsFromKeyword,
} from '../utils/GeoUtils';
import {SingleLineInput} from '../components/SingleLineInput';

const MainScreen = () => {
  const [query, setQuery] = useState('');
  const [currentRegion, setCurrentRegion] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 37.560214,
    longitude: 126.9775521,
  });

  const [currentAddress, setCurrentAddress] = useState<string | null>(null);

  const onChangeLocation = useCallback<
    (item: {latitude: number; longitude: number}) => Promise<void>
  >(async item => {
    setCurrentRegion({
      latitude: item.latitude,
      longitude: item.longitude,
    });

    getAddressFormCoords(item.latitude, item.longitude).then(setCurrentAddress);
  }, []);

  const getMyLocation = useCallback(() => {
    Geolocation.getCurrentPosition(position => {
      onChangeLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }, [onChangeLocation]);

  const onFindAddress = useCallback<() => Promise<void>>(async () => {
    const keywordResult = await getCoordsFromKeyword(query);

    if (keywordResult !== null) {
      setCurrentAddress(keywordResult.address);

      setCurrentRegion({
        latitude: keywordResult.latitude,
        longitude: keywordResult.longitude,
      });
      return;
    }
    const addressResult = await getCoordsFromAddress(query);
    if (addressResult === null) {
      console.error('주소값을 찾지 못했습니다');
      return;
    }

    setCurrentAddress(addressResult.address);

    setCurrentRegion({
      latitude: addressResult.latitude,
      longitude: addressResult.longitude,
    });
  }, [query]);

  useEffect(() => {
    getMyLocation();
  }, [getMyLocation]);
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        onLongPress={event => {
          onChangeLocation(event.nativeEvent.coordinate);
        }}
        region={{
          latitude: currentRegion.latitude,
          longitude: currentRegion.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: parseFloat(currentRegion.latitude.toString()),
            longitude: parseFloat(currentRegion.longitude.toString()),
          }}
        />
      </MapView>
      <View style={{position: 'absolute', top: 24, left: 24, right: 24}}>
        <View style={{backgroundColor: 'white'}}>
          <SingleLineInput
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={onFindAddress}
            placeholder="주소를 입력해주세요"
          />
        </View>
      </View>
      {currentAddress !== null && (
        <View style={{position: 'absolute', left: 0, right: 0, botton: 24}}>
          <View
            style={{
              backgroundColor: 'gray',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>{currentAddress}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default MainScreen;
