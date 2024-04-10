import React from 'react';
import {View} from 'react-native';

export const Spacer: React.FC<{
  horizontal?: boolean;
  space: number;
}> = props => {
  // return props.horizontal ? (
  //     <View style={{marginLeft:props.space}}/>
  // ) : (
  //     <View style={{marginTop:props.space}}/>
  // )

  if (props.horizontal) {
    return <View style={{marginLeft: props.space}} />;
  }

  return <View style={{marginTop: props.space}} />;
};
