import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Image} from 'react-native';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Forgot from '../screens/Forgot';
import Signup from '../screens/Signup';
import Explore from '../screens/Explore';
import Browse from '../screens/Browse';
import Product from '../screens/Product';
import Settings from '../screens/Settings';
import MyProduct from '../screens/MyProduct';
import AddGoods from '../screens/AddGoods';
import Home from '../screens/Home';
import Board from '../screens/Board';
import AddBoard from '../screens/AddBoard';

import {theme} from '../constants';

export default createStackNavigator({
    Welcome,
    Login,
    Forgot,
    Signup,
    Browse,
    Settings,
    Explore,
    Product,
    MyProduct,
    Home,
    AddGoods,
    Board,
    AddBoard,

}, {
    initialRouteName: 'Welcome',
    defaultNavigationOptions: {
        headerTitle:()=> null,
        headerBackImage:()=> <Image source={require('../assets/icons/back.png')}/>,
        headerStyle:{
            elevation: 0,
            height: theme.sizes.base * 4,
            backgroundColor: theme.colors.white,
            borderBottomColor: 'transparent',
            borderBottomWidth: 0,
            shadowColor: 'transparent',
            shadowOpacity: 0,
            shadowOffset:{
                height: 0,
                width: 0,
            },
        },
        headerHideShadow: true,
        headerLeftContainer:{
            alignItems: 'center',
            marginLeft: theme.sizes.base * 2,
            paddingRight: theme.sizes.base,
        },
        headerRightContainer:{
            alignItems: 'center',
            paddingRight: theme.sizes.base,
        },
        
    }
    
},

)

