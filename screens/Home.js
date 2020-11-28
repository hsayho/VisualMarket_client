import React, { Component } from 'react';
import {Dimensions, StyleSheet, Image, KeyboardAvoidingView, Animated, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Text, Block,Card ,Badge, Input, Divider} from '../components';
import {theme, mocks} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const { width, height} = Dimensions.get('window')
var current_id='';

export default class Home extends Component{

    static navigationOptions = ({}) => {
        
    }
    state={
        goods: false,
        goods_info: '',
        gno: '',
    }

    componentDidMount(){
        this.loadGoodsInfo();
        //console.log('받아온 상품 데이터 : ' + this.state.goods_info);
    }

    loadGoodsInfo = async() => {
        await axios.get('http://10.0.2.2:5000/api/goods')
        .then(res => {
            const goods = res.data;
            this.setState({ goods_info: goods});
            console.log(this.state.goods_info);
        })
        .finally(() => {
            this.setState({goods: true})
        })
    }

    renderGoods = (goods) => {
        
        
        console.log(goods.Gno);
        return(
                <Block>
                    <TouchableOpacity
                        onPress= {() => {
                            this.props.navigation.navigate('Product', {number: goods, current_id:current_id})
                            console.log(goods.Gno);
                        }
                    }
                    >
                    <Card shadow middle style={{height:120, width:width,}}>
                        <Badge color="rgba(117,119,228,0.20" size={120} style={{}}>
                            <Block row center>
                                <Image style={{width:100, height:100,borderRadius: 10, marginLeft:50, marginRight:30}} source={{uri:'http://10.0.2.2:5000'+goods.image}}/>
                                <Block flex={false} col>
                                    <Text style={{fontSize:16}}>{goods.title}</Text>
                                    <Text caption gray style={{marginBottom:5}}>{goods.seller_id}</Text>
                                    <Text bold>{goods.price}원</Text>
                                </Block>
                            </Block>
                        
                        </Badge>
                    </Card>
                    </TouchableOpacity>
                </Block>
        )
    }

    render(){
        //const {navigation, Gno} = super.props;
        current_id = this.props;
        if(!this.state.goods){
            return(
                <Block center middle style={{marginTop: height/5}}>
                    <Text bold gray style={{fontSize:50, justifyContent:'center'}}>Loading...</Text>
                </Block>
            )
        }
        
        else{
           
            return(
                <Block style={{backgroundColor:'white'}}>
                    <ScrollView showsVerticalScrollIndicator = {false}>
                         
                        {this.state.goods_info.map(goods => (
                                
                                <Block>
                                    {/*<TouchableOpacity
                                        onPress= {() => this.props.navigation.navigate('Product', {gno:goods.Gno})}
                                    >
                                    <Card shadow middle style={{height:120, width:width}}>
                                        <Badge color="rgba(117,119,228,0.20" size={120} style={{}}>
                                            <Block row center>
                                                <Image style={{width:100, height:100,borderRadius: 10, marginLeft:50, marginRight:30}} source={{uri:'http://10.0.2.2:5000'+goods.image}}/>
                                                <Block flex={false} col style={{width:70}}>
                                                    <Text style={{fontSize:17}}>{goods.title}</Text>
                                                    <Text caption gray style={{}}>{goods.seller_id}</Text>
                                                    <Text h3 bold>{goods.price}원</Text>
                                                </Block>
                                            </Block>

                                        </Badge>
                                    </Card>
                                    
                                    </TouchableOpacity>*/}
                                    {this.renderGoods(goods)}
                                </Block>
                            
                        ))}
                        <Block style={{marginBottom:50}}></Block>

                    </ScrollView>
                </Block>
            )
        }
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
})