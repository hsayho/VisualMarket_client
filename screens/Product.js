import React, { Component } from 'react';
import {Dimensions, StyleSheet, Image, KeyboardAvoidingView, Animated, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Text, Block,Card ,Badge, Input, Divider} from '../components';
import {theme, mocks} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const { width, height} = Dimensions.get('window')
var goods ='';
var goods_num='';
var current_id='';

export default class Product extends Component{
static navigationOptions = ({}) => {
    
}
    state={
        goods_detail: '',
    }
    componentDidMount(){
        this.loadGoodsDetail();
    }

    loadGoodsDetail = async() => {
        await axios.get('http://10.0.2.2:5000/api/goods/detail?gno='+goods_num)
        .then(res => {
            const detail = res.data;
            this.setState({ goods_detail: detail});
            console.log(this.state.goods_detail);
            title=detail.title;
            console.log('타이틀 : ' + title);
        })
        .finally(() => {
            this.setState({goods: true})
        })
    }

    completePurchase = async() => {
        const {navigation} = this.props;
        await axios.put('http://10.0.2.2:5000/api/goods?gno='+goods_num)
        .then(res => {
            
        })
        .finally(() =>navigation.navigate('Browse', {current_id: current_id}));

    }

    renderItem = () => {
        const { goods_detail } = this.state;
        return(
            <Block>
                <Image 
                    source={{uri:'http://10.0.2.2:5000'+goods.image}}
                    style={{width, height : height / 2}}
                    resizeMode= 'contain'
                    
                />
            </Block>
        )
    }

    renderPurchase = () => {
        const {navigation} = this.props;
        return(
            <Block style={styles.footer}>
                <Button
                    gradient style={{width: 200}}
                    onPress={() => this.completePurchase()}
                 >
                    <Text bold white center>{goods.price}원 구매하기</Text>
                </Button>
            </Block>
        )
    }

    renderSoldout = () => {
        return(
            <Block style={styles.footer}>
                <Button
                    style={{width: 200}}
                    color="gray"
                 >
                    <Text bold white center>SOLD OUT</Text>
                </Button>
            </Block>
        )
    }

    render(){
        const { product, navigation } = this.props;
        goods = navigation.getParam('number');
        current_id = navigation.getParam('current_id');
        goods_num = goods.Gno; 
        console.log(goods_num);
        return(
            <Block style={{backgroundColor:'white'}}>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    {this.renderItem()}

                    <Block style={styles.product}>
                        <Text h2 bold>{goods.title}</Text>
                        <Block flex={false} row margin={[theme.sizes.base, 0]}>
                        <Text>판매자 {goods.seller_id}</Text>
                        </Block>
                        <Text light height={22} align="justify" gray>{goods.content}</Text>
                        <Divider margin={[theme.sizes.padding * 0.9, 0]} />
                    </Block>
                </ScrollView>
                {goods.state === 1 ? this.renderPurchase() : this.renderSoldout()}
                
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 2,
    },
    product: {
        paddingHorizontal: theme.sizes.base * 2,
        paddingVertical: theme.sizes.padding,
    },
    tag: {
        borderColor: theme.colors.gray,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: theme.sizes.base,
        paddingHorizontal: theme.sizes.base,
        paddingVertical: theme.sizes.padding / 2,
        marginRight: theme.sizes.base * 0.5,
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