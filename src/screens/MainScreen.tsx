import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';
import {Icon} from '../components/Icons';

const MainScreen = () => {
  return (
    <View>
      <Header>
        <Header.Title title="Main" />
      </Header>
      <Icon name="close" size={24} color="black" />
    </View>
  );
};

export default MainScreen;
