import React, { Component } from 'react';
import {Dimensions, StyleSheet, Image, KeyboardAvoidingView, Animated, Keyboard, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {Button, Text, Block,Card ,Badge, Input, Divider} from '../components';
import {theme, mocks} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const { width, height} = Dimensions.get('window')
var current_id='';
var result='';
export default class Board extends Component{
static navigationOptions = ({}) => {
    
}
    state={
        loading: false,
        board: '',
        members: '',
    }

    componentDidMount(){
        this.loadBoard();
        this.loadMemberInfo();
    }

    loadMemberInfo = async() => {
        await axios.get('http://192.168.35.141:5000/api/members-studentID?id='+current_id)
        .then(res => {
            const members = res.data;
            this.setState({ members: members});
        })
    }

    loadBoard = async() => {
        await axios.get('http://192.168.35.141:5000/api/board')
        .then(res => {
            const board = res.data;
            this.setState({ board: board});
            console.log(this.state.board);
        })
        .finally(() => {
            this.setState({loading: true})
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

    renderWriting = (board) => {
        this.timeBefore(board.DateInserted);
        return(
            <Block>
                <TouchableOpacity
                        onPress= {() => {
                                this.props.navigation.navigate('Writing', {board: board, current_id: this.state.members});
                                
                            }
                        }
                    >
                        <Card shadow style={{width: width}}>
                        <Text h3 style={{marginBottom:3}}>{board.btitle}</Text>
                        <Text numberOfLines={1} style={{marginBottom:3}}>{board.bcontent}</Text>
                        {board.anonymity ===0 ? <Text caption>{board.stu_id}</Text>
                        : <Text caption>anonymous</Text>}
                        <Text caption gray>{result}</Text>
                        </Card>
                </TouchableOpacity>
            </Block>
        )
    }

    render(){
        
        current_id = this.props.current_id;
        if(!this.state.loading){
            return(
                <Block middle center style={{marginTop: height/5}}>
                    <ActivityIndicator size="large" color="#7577E4" />
                </Block>
            )
        }
        else{
            return(
                <Block style={{backgroundColor:'white'}}>
                    
                    <ScrollView showsVerticalScrollIndicator = {false}>
                        {this.state.board.map(board => (
                            this.renderWriting(board)
                        ))}
                        
                    </ScrollView>
                    <Block style={{marginBottom:70}}>

                    </Block>
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