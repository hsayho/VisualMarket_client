import React, { Component } from 'react';
import {Dimensions, StyleSheet, TextInput, KeyboardAvoidingView, Animated, Keyboard, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
//import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Text, Block,Card ,Badge, Input, Divider} from '../components';
import {theme, mocks} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const { width, height} = Dimensions.get('window')
var board = '';
var current_id = '';
var current_stu_id = '';
var current_bno = '';

export default class Writing extends Component{

static navigationOptions = ({}) => {
    
}
    state={
        goods_detail: '',
        jjim: false,
        stu_id: '',
        comment: '',
        loading: '',
        comments_info : '',
        rerender: '',
    }
    componentDidMount(){
        this.loadComment();
    }

    loadComment = async() => {
        await axios.get('http://10.0.2.2:5000/api/comments')
        .then(res => {
            const comments = res.data;
            this.setState({ comments_info: comments});
            console.log(this.state.comments_info);
        })
        .finally(() => {
            this.setState({loading: true})
        })
    }

    addComment = async() => {
        await axios.post('http://10.0.2.2:5000/api/comments', {
            comment: this.state.comment,
            stu_id: current_stu_id,
            bno: current_bno,
        })
        .then(function (res) {
            
        })
        .finally(() => {
            this.setState({ rerender: 1});
        })
    }

    renderWriteComment = () => {
        return(
            <Block  style={[styles.footer, {marginBottom:20, justifyContent:'center', borderRadius:10}]}>
                <Block style={{marginLeft:10}}>
                    <TextInput 
                        placeholder='댓글 입력하세요.'
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
                        <FontAwesome name="send-o" size={27} color='#9c2828'/>
                    </TouchableOpacity>
                </Block>
            </Block>
        )
    }

    renderComment = (info) => {
        return(
            <Block>
                <Block row center style={{marginBottom:3}}>
                    <FontAwesome name="user-circle-o" size={25} color='#ac9dc9' style={{marginRight:10}}/>
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

    render(){
        const { product, navigation } = this.props;
        board = navigation.getParam('board');
        current_bno = board.bno;
        current_id = navigation.getParam('current_id');
        current_stu_id = current_id[0].stu_id;
        console.log(current_id);
        console.log(current_stu_id);
        console.log(current_bno);

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
                        

                        <Block style={styles.product}>
                            <Block style={{marginBottom: 20, alignItems:'center'}} row >
                                <FontAwesome name="user-circle-o" size={40} color='#9b93ab' style={{marginRight:20}}/>
                                {board.anonymity === 1 ? <Text bold h3>익명</Text> : <Text bold h3>{board.stu_id}</Text>}
                                
                            </Block>
                            <Text h1 bold style={{marginBottom:10}}>{board.btitle}</Text>
                            <Block flex={false} row margin={[theme.sizes.base, 0]}>
                            <Text style={{fontSize:20}}>{board.bcontent}</Text>
                            </Block>
                            
                            <Divider margin={[theme.sizes.padding * 0.9, 0]} />

                            {this.state.comments_info.map(cinfo =>(
                                <Block style={{marginBottom:40}}>
                                    {this.renderComment(cinfo)}
                                </Block>

                            ))}
                        </Block>
                    </ScrollView>
                    {this.renderWriteComment()}
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
        backgroundColor: '#e0e0e0',
        position: 'absolute',
        bottom: 0,
        right:0,
        left:0,
        overflow: 'visible',
        
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
    input : {
        
        height:20,
        borderBottomColor: theme.colors.gray2,
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,

    },
})