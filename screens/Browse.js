import React, { Component } from 'react';
import {StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, Keyboard, TouchableOpacity, ScrollView, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {Button, Text, Block,Card ,Badge} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation';
import {theme, mocks} from '../constants';
import Product from './Product';
import axios from 'axios';
import Board from './Board';
import MyProduct from './MyProduct';
import Home from './Home';

const { width, height } = Dimensions.get("window");
var current_id='';


export default class Browse extends Component{
    
    static navigationOptions={
        headerShown: false,
    }
    
    state={
        active:'Home',
        categories: [],
        page: '',
    }

    componentDidMount = () => {
        
    }

    

    /*renderGoods = async() => {
        await axios.get('http://10.0.2.2:5000/api/goods')
        .then(res => {
            const goods = res.data;
            this.setState({ goods_info: goods});
            console.log(this.state.goods_info);
        })
    }*/

    renderAdd_goods = () => {
        const {navigation} = this.props;
        return(
            <Block style={styles.footer}>
                <Button
                    gradient style={{width: 50}}
                    onPress={() => navigation.navigate('AddGoods', {current_id: current_id})}
                 >
                    <Text bold white center>+</Text>
                </Button>
            </Block>
        )
    }

    renderAdd_Board = () => {
        const {navigation} = this.props;
        return(
            <Block style={[styles.footer,{ justifyContent:'center'}]}>
                <Button
                    gradient style={{width: 70,}}
                    onPress={() => navigation.navigate('AddBoard', {current_id: current_id})}
                 >
                    <FontAwesome name="pencil" color='white' style={{marginLeft:23}} size={30}/>
                </Button>
            </Block>
        )
    }

    handleTap = (tab) => {
        const { categories, navigation } = this.props;
        /*const filtered = categories.filter(
            category => category.tags.includes(tab)
        );*/
        
        this.setState({ active: tab, page: tab});
        
    }

    renderTab(tab){
        const {active} = this.state;
        const isActive = active === tab.title;
        return(
            <TouchableOpacity
                key={`tab-${tab.title}`}
                onPress={() => this.handleTap(tab.title)}
                style={[styles.tab, isActive ? styles.active : null]}    
            >
                <Ionicons color={theme.colors.gray} name={tab.icon} size={20} style={{textAlign: 'center'}}/>
                <Text title medium gray={!isActive} secondary={isActive} style={{fontSize:14, marginTop: 5}}>{tab.title}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        
        const {profile, navigation, categories} = this.props;
        const {page} = this.state;
        current_id = navigation.getParam('current_id');
        console.log('현재 접속된 아이디 : ' + current_id);
        const tabs = [
            {
                title: 'Home',
                icon:'home-outline',
            },
            {
                title: 'Board',
                icon:'document-text-outline',
            },
            {
                title: 'My',
                icon:'person-outline',
            }
        ];

        return(
            <Block style={{backgroundColor:'white'}}>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold>Visual Market</Text>
                    <Button onPress={() => navigation.navigate('Settings')}>
                        <Image 
                            source={profile.avatar}
                            style={styles.avatar}
                        />
                    </Button>
                </Block>
                <Block flex={false} row style={styles.tabs}>
                    {tabs.map(tab => this.renderTab(tab))}
                </Block>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{paddingVertical: theme.sizes.base * 2}}
                >
                    <Block flex={false} row space="between" style={styles.categories}>
                        {page==='Home' ? <Home navigation={navigation} current_id={current_id}/>
                        : page==='Board' ? <Board navigation={navigation} current_id={current_id}/>
                        : page==='My' ? <MyProduct navigation={navigation} current_id={current_id}/> : <Home navigation={navigation} current_id={current_id}/>}
                        
                    </Block>
                    
                </ScrollView>
                {page==='Home' ? this.renderAdd_goods()
                : page==='Board' ? this.renderAdd_Board()
                : page=== 'My' ? null
                : this.renderAdd_goods()}
            </Block>
        )
    }
}

Browse.defaultProps={
    profile: mocks.profile,
    categories: mocks.categories,
}

const styles = StyleSheet.create({
    header:{
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom: 10,
    },
    avatar: {
        height: theme.sizes.base * 2 ,
        width: theme.sizes.base * 2,
    },
    tab: {
        marginRight: theme.sizes.base * 3.5,
        paddingBottom : theme.sizes.base
    },
    tabs: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: theme.colors.gray2,
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 6,
    },
    active: {
        borderBottomColor: '#7577e4',
        borderBottomWidth: 3,
    },
    category: {
        width: 150,
        height: 150,
    },
    categories:{
        flexWrap: 'wrap',
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom : theme.sizes.base * 3.5,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.1,
        width,
        paddingBottom: theme.sizes.base * 3,
    },
})