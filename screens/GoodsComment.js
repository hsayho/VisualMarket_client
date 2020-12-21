import React, { Component } from 'react';
import {Dimensions, StyleSheet, Image, KeyboardAvoidingView, Animated, Keyboard, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Alert} from 'react-native';
import {Button, Text, Block,Card ,Badge, Input, Divider} from '../components';
import {theme, mocks} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const { width, height} = Dimensions.get('window')
var goods ='';
var goods_num='';
var current_id='';
var current_stu_id='';

export default class GoodsComment extends Component{
static navigationOptions = ({navigation}) => ({
   
})
    state={
        loading: false,
        comments_info: '',
        state: true,
        comment: '',
    }
    componentDidMount(){
        this.loadGoodsComment();
        //this.loadStuID();
    }

    loadGoodsComment = async() => {
        await axios.get('http://192.168.35.141:5000/api/goods/comment?gno='+goods_num)
        .then(res => {
            const comments = res.data;
            this.setState({ comments_info: comments});
            console.log(this.state.comments_info);
        })
        .finally(() => {
            this.setState({loading: true})
        })
    }

    handleChange = () => {
        this.setState({ comment: '', loading:false});
        this.loadGoodsComment();
    }

    addComment = async() => {
        await axios.post('http://192.168.35.141:5000/api/goods/comment', {
            comment: this.state.comment,
            stu_id: current_stu_id,
            Gno: goods_num,
        })
        .then(function (res) {
            
        })
        .finally(() => {
            this.handleChange();
        })
    }

    

    renderComment = (info) => {
        return(
            <Block style={{marginLeft: 10}}>
                <Block row center style={{marginBottom:3}}>
                    <FontAwesome name="user-circle-o" size={25} color='#845df0' style={{marginRight:10}}/>
                    <Text bold>{info.stu_id}</Text>
                </Block>
                <Block flex={false} col>
                    <Text style={{fontSize:17, marginBottom:5}}>{info.c_content}</Text>
                    <Text caption gray>{info.DateInserted}</Text>
                </Block>
                <Divider style={{margin:10}}/>
            </Block>
                    
        )
    }

    renderWriteComment = () => {
        return(
            <Block  style={[styles.footer, {marginBottom:20, justifyContent:'center', borderRadius:10}]}>
                <Block style={{marginLeft:10}}>
                    <TextInput 
                        placeholder='Leave a goods comment,,,'
                        style={{height:50, marginBottom:10}}
                        defaultValue={this.state.comment}
                        onChangeText={text => this.setState({ comment: text})}
                        multiline={true}
                    />
                </Block>
                <Block style={styles.icon}>
                    <TouchableOpacity
                        onPress={() => this.addComment()}
                    >
                        <FontAwesome name="send-o" size={27} color='#845df0'/>
                    </TouchableOpacity>
                </Block>
            </Block>
        )
    }

    render(){
        const { product, navigation } = this.props;
        goods = navigation.getParam('goods');
        current_id = navigation.getParam('current_id');
        goods_num = goods.Gno;
        current_stu_id = current_id[0].stu_id;
        console.log(goods_num);
        console.log(current_stu_id);
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
                    
                        {this.state.comments_info ? this.state.comments_info.map(cinfo =>(
                            <Block>
                                {this.renderComment(cinfo)}
                            </Block>
                        )) : null}
                            
                    </ScrollView>
                    {this.renderWriteComment()}
                    <Block style={{marginBottom:60}}/>
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
    footer: {
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 0,
        right:0,
        left:0,
        overflow: 'visible',
        borderWidth: 1.5,
        borderColor: '#845df0',
        justifyContent: 'center',
        height: height * 0.04,
        width,
        paddingBottom: theme.sizes.base * 3,
    },
    icon: {
        position: 'absolute',
        justifyContent: 'center',
        bottom: 10,
        right:20,
    },
})