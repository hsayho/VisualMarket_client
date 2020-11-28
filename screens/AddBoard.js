import Axios from 'axios';
import React, { Component } from 'react';
import {StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, Keyboard, Alert, ScrollView, Dimensions, TextInput} from 'react-native';
import axios from 'axios';
import {Button, Text, Block, Input} from '../components';
import {theme} from '../constants';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import imageCompression from 'browser-image-compression';
import CheckBox from '@react-native-community/checkbox';

const {width, height} = Dimensions.get('window');
const options = {
    includeBase64: true,
}
var current_id = '';

export default class AddBoard extends Component{

    state={
        errors: [],
        loading: false,
        title: '',
        contents: '',
        stu_id: '',
        isSelected: false,
    }

    setSelection = () => {
        this.setState({ isSelected: !this.state.isSelected})
    }

    handleEnroll = async() => {
        const {navigation} = this.props;
        const {title, stu_id, contents, price, photo} = this.state;
        
        const errors = [];
        this.setState({ loading: true})

        Keyboard.dismiss(); // 키보드 사라짐

        await axios.post('http://10.0.2.2:5000/api/board/upload',{
            title: this.state.title,
            stu_id: this.state.stu_id,
            contents: this.state.contents,
            anony: this.state.isSelected,
        })
        .then(function (res) {
            console.log(res);

        })
        .catch(function (error) {
            console.log(error);
        });

        setTimeout(() => {
            if(!title){    // 임의의 아이디 seho100와 비교
                errors.push('title')
            }
            if(!stu_id){
                errors.push('stu_id')
            }
            if(!contents){
                errors.push('contents')
            }
        
            this.setState({ errors, loading: false});
    
            if(!errors.length){ 
                Alert.alert(
                    '글 작성 완료!',
                    '성공적으로 글 작성이 완료되었습니다.',
                    [
                        {
                            text: '확인', onPress:() => {
                                navigation.navigate('Browse',{current_id: current_id});
                            }
                        }
                    ],
                    {cancelable : false}
                )
                
            } else{
                Alert.alert(
                    '미입력 사항',
                    '입력하지 않은 사항이 있습니다.',
                    [
                        {
                            text: '다시 시도', 
                        }
                    ],
                    {cancelable : false}
                )
            }
        }, 2000);
        
        
    }

    render(){
        const {navigation} = this.props;
        const {loading, errors, photo, imageSource} = this.state;
        current_id = navigation.getParam('current_id');
        console.log('물품 등록에 접속된 아이디 : '+current_id);
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
        

        return(
            <KeyboardAvoidingView style={styles.signup}>
                <Block style={{backgroundColor:'white',}} padding={[0, theme.sizes.base * 2]}>
                <Text h1 bold>자유 게시판 글쓰기</Text>
                    <ScrollView>
                        <Block middle style={{marginTop: 15}}>
                            
                            <Input
                                error={hasErrors('title')}
                                label="글 제목"
                                style={[styles.input, hasErrors('title')]}
                                defaultValue={this.state.title}
                                onChangeText={text => this.setState({ title: text})}
                            />
                            <Block margin={[theme.sizes.base, 0]}>
                                <Input
                                    error={hasErrors('stu_id')}
                                    label="학번"
                                    style={[styles.input, hasErrors('stu_id')]}
                                    defaultValue={this.state.stu_id}
                                    onChangeText={text => this.setState({ stu_id: text})}
                                />
                                
                            </Block>
                            <Text gray>내용</Text>
                            <TextInput 
                                error={hasErrors('contents')}
                                style={[styles.input, hasErrors('contents'),{height:height/3}]}
                                defaultValue={this.state.contents}
                                onChangeText={text => this.setState({ contents: text})}
                                multiline={true}
                            />
                            
                            <Button gradient onPress={() => {this.handleEnroll()}}>
                                {loading ? 
                                    <ActivityIndicator size="small" color="white" />:
                                <Text bold white center>작성 완료</Text>
                            }   
                            </Button>
                            <Block center middle row>
                                <CheckBox 
                                    value={this.state.isSelected}
                                    onValueChange = {this.setSelection}
                                    tintColors='#7577E4'
                                />
                                <Text>익명</Text>
                            </Block>
                            <Button onPress={() => {navigation.goBack()}}>
                                <Text center caption gray style={{textDecorationLine: 'underline'}}>이전 화면으로 돌아가기</Text>
                            </Button>
                            
                        </Block>
                    </ScrollView>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    signup:{
        flex:1,
        justifyContent: 'center',
    },
    input : {
        borderBottomColor: theme.colors.gray2,
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,

    },
    hasErrors: {
        borderBottomColor: theme.colors.accent,
        borderBottomWidth: 0.8,
    },
    confirmBtn: {
        position: "absolute",
        alignItems: "flex-end",
        width: theme.sizes.base * 4,
        height: theme.sizes.base * 2,
        marginTop: theme.sizes.base*3.1,
        marginRight:0,
        paddingRight:10,
        right: 0
      },
      ImageButton:{
        width:50,
        height:50,
        color:'black',
        
        
      }
})