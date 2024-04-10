import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';

const AddScreen = () => {
  const onPressBack = useCallback(() => {}, []);
  return (
    <View>
      <Header>
        <Header.Title title="Add" />
        <Header.Icon iconName="close" onPress={onPressBack} />
      </Header>
    </View>
  );
};

export default AddScreen;
