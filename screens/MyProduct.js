import React, { Component } from 'react';
import {Dimensions, StyleSheet, Image, KeyboardAvoidingView, Animated, Keyboard, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {Button, Text, Block,Card ,Badge, Input, Divider} from '../components';
import {theme, mocks} from '../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const { width, height} = Dimensions.get('window')
var current_id='';
var stu_id='';
var goods_len = 0;
var goods_spec='';
export default class MyProduct extends Component{
    current_id = this.props.current_id;

    state={
        jjims: '',
        members: '',
        goods_info: '',
        loading: false,
    }

    componentDidMount(){
        this.loadMemberInfo();
        //this.loadGoodsInfo();
        this.loadJjimList();
        //console.log('받아온 상품 데이터 : ' + this.state.goods_info);
    }

    loadMemberInfo = async() => {
        
        await axios.get('http://10.0.2.2:5000/api/members-studentID?id='+current_id)
        .then(res => {
            const members = res.data;
            this.setState({ members: members});
            stu_id = members[0].stu_id;
            console.log(stu_id);
            console.log('회원 정보 불러오기 완료');
        })
    }

    /*loadGoodsInfo = async() => {
        await axios.get('http://10.0.2.2:5000/api/goods')
        .then(res => {
            const goods = res.data;
            goods_len = res.data.length;
            this.setState({ goods_info: goods});
            console.log(this.state.goods_info);
            //console.log(this.state.goods_info[0].Gno);
        })
    }*/

    loadJjimList = async() => {
        var isJjims='';
        var len='';
        await axios.get('http://10.0.2.2:5000/api/JjimList?id='+stu_id)
        .then(res => {
            isJjims = res.data;
            console.log('찜 목록 불러오기 완료');
            console.log(isJjims);
            console.log(len);
            len = isJjims.length;
        })

        if(len>0){
            await axios.get('http://10.0.2.2:5000/api/Jjimgoods?gno='+isJjims[0].Gno)
            .then(res => {
                const jjims = res.data;
                this.setState({ jjims: jjims});
            })
            .finally(() => {
                this.setState({ loading:true });
            })
            
        }
        else{
            this.setState({ loading:true});
        }
    }

    renderJjims = (goods) => {
        const { goods_info } = this.state.goods_info;
        
        console.log('경계선')
        console.log(goods.Gno);
        console.log(goods_len);
        /*for(var i=0; i<goods_len; i++){
            if(this.state.goods_info[i].Gno === goods.Gno){
                goods_spec= this.state.goods_info[i];
                console.log(this.state.goods_info[0]);
            }
        }*/
        return(
            <Block>
                {/*<TouchableOpacity
                        onPress= {() => {
                            
                            this.props.navigation.navigate('Product', {number: this.state.goods_spec, current_id: this.state.members})
                            console.log(goods_spec);
                            //console.log('보내기 전 멤버 데이터 : '+this.state.members);
                        }
                    }
                >*/}
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
                {/*</TouchableOpacity>*/}
            </Block>
        )
    }

    render(){
        current_id = this.props.current_id;
        //const { product } = this.props;
        if(!this.state.loading){
            return(
                <Block center middle style={{marginTop: height/5}}>
                    <ActivityIndicator size="large" color="#7577E4" />
                </Block>
            )
        }
        
        else{
            return(
                <Block style={{backgroundColor:'white'}}>
                    <ScrollView showsVerticalScrollIndicator = {false}>
                        {this.state.jjims ? this.state.jjims.map(jjims => (    
                                <Block>
                                    {this.renderJjims(jjims)}
                                </Block>
                            
                        )) : <Block center>
                                <Text gray h3 style={{marginBottom:60}}>찜목록이 비어있습니다</Text>
                                <MaterialCommunityIcons name="emoticon-cry-outline" size={200} color='#c8c7c9'/>
                            </Block>}
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