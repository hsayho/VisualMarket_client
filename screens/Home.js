import React, { Component } from 'react';
import {Dimensions, StyleSheet, Image, KeyboardAvoidingView, Animated, Keyboard, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {Button, Text, Block,Card ,Badge, Input, Divider} from '../components';
import {theme, mocks} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const { width, height} = Dimensions.get('window')
var current_id='';
var result = '';

export default class Home extends Component{

    static navigationOptions = ({}) => {
        
    }
    state={
        goods: false,
        goods_info: '',
        gno: '',
        members: '',
    }

    componentDidMount(){
        this.loadGoodsInfo();
        this.loadMemberInfo();
        //console.log('받아온 상품 데이터 : ' + this.state.goods_info);
    }

    loadMemberInfo = async() => {
        await axios.get('http://192.168.35.141:5000/api/members-studentID?id='+current_id)
        .then(res => {
            const members = res.data;
            this.setState({ members: members});
        })
    }

    loadGoodsInfo = async() => {
        await axios.get('http://192.168.35.141:5000/api/goods')
        .then(res => {
            const goods = res.data;
            this.setState({ goods_info: goods});
            console.log('홈 상품 정보 : '+this.state.goods_info);
        })
        .finally(() => {
            this.setState({goods: true})
        })
    }

    timeBefore = (info) => {
        var now = new Date(); 
        var writeDay = new Date(info);
        console.log(now);
        console.log(now.getFullYear());
        console.log(writeDay);
        console.log(writeDay.getFullYear());
        //글쓴 시간 
        
     	//또는 파라미터로 시간을 넘겨받아서 계산할 수도 있음..
        
         var minus;
         var hour, sec, min, day;
         
        //현재 년도랑 글쓴시간의 년도 비교 
        if(now.getFullYear() > writeDay.getFullYear()){
            minus= now.getFullYear()-writeDay.getFullYear();
            result = minus+'year before';
        }else if(now.getMonth() > writeDay.getMonth()){
        //년도가 같을 경우 달을 비교해서 출력
            minus= now.getMonth()-writeDay.getMonth();
            result = minus+'mon before';
        }else if(now.getDate() > writeDay.getDate()){
       	//같은 달일 경우 일을 계산
            minus= now.getDate()-writeDay.getDate();
            result = minus+'days before';
        }else if(now.getDate() == writeDay.getDate()){
        //당일인 경우에는 
            var nowTime = now.getTime();
            var writeTime = writeDay.getTime();
            if(nowTime>writeTime){
            //시간을 비교
                sec =parseInt(nowTime - writeTime) / 1000;
                day  = parseInt(sec/60/60/24);
                sec = (sec - (day * 60 * 60 * 24));
                hour = parseInt(sec/60/60);
                sec = (sec - (hour*60*60));
                min = parseInt(sec/60);
                sec = parseInt(sec-(min*60));
                if(hour>0){
                //몇시간전인지
                result = hour+'h before';
                }else if(min>0){
                //몇분전인지
                result = min+'min before';
                }else if(sec>0){
                //몇초전인지 계산
                result = sec+'sec before';
                }
            }
        }
    }

    renderGoods = (goods) => {
        this.timeBefore(goods.DateInserted);
        
        console.log(goods.Gno);
        return(
                <Block>
                    <TouchableOpacity
                        onPress= {() => {
                            this.props.navigation.navigate('Product', {number: goods, current_id: this.state.members})
                            console.log('보내기 전 goods 정보 : '+goods);
                            console.log(this.state.members);
                        }
                    }
                    >
                    <Card shadow middle style={{height:120, width:width*1.2,}}>
                        <Badge color="rgba(117,119,228,0.20" size={120} style={{}}>
                            <Block row center>
                                <Block flex={false} center>
                                <Image style={{width:100, height:100,borderRadius: 10, marginLeft:90, marginRight:30}} source={{uri:'http://192.168.35.141:5000'+goods.image}}/>
                                </Block>
                                <Block flex={false} col>
                                    <Text bold style={{fontSize:16}}>{goods.title}</Text>
                                    <Text caption gray style={{marginBottom:5}}>{goods.seller_id}</Text>
                                    <Text semibold style={{marginBottom:5}}>{goods.price}₩</Text>
                                    <Text caption gray>{result}</Text>
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
        current_id = this.props.current_id;
        console.log('current_id 는 지금 : '+current_id);
        if(!this.state.goods){
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
                        <Block style={{marginBottom:70}}></Block>

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