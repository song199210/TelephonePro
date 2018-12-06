/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import FlatListCom from "./rn_web/component/FlatListCom";
import AddPhoneCom from "./rn_web/component/AddPhoneCom";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {storage} from "./rn_web/assets/store";

global.storage=storage;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

const AppNavigator = createStackNavigator({
  FlatList: {
    screen: FlatListCom
  },
  AddPhone: {
    screen: AddPhoneCom
  }
}, {
  initialRouteName: 'FlatList',
});
export default createAppContainer(AppNavigator);
// export default createAppContainer(AppNavigator);