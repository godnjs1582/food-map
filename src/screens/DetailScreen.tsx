import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';

const DetailScreen = () => {
  const onPressBack = useCallback(() => {}, []);
  return (
    <View>
      <Header>
        <Header.Title title="Detail" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
    </View>
  );
};

export default DetailScreen;
