import React, { Component } from 'react';
import {Stylesheet, Text , View} from 'react-native';

import {Block} from './components';
import Market from './navigation/Market';
import * as constants from './constants';
import { createAppContainer } from 'react-navigation';

export default createAppContainer(Market);
