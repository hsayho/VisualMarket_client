import React, { Component } from 'react';
import {StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, Keyboard, Alert} from 'react-native';

import {Button, Text, Block, Input} from '../components';
import {theme} from '../constants';

export default class Forgot extends Component{
    state={
        id: '',
        email: '',
        errors: [],
        loading: false,
    }

    handleFind = () => {
        const {navigation} = this.props;
        const {id, email} = this.state;
        const errors = [];
        this.setState({ loading: true})

        Keyboard.dismiss(); // 키보드 사라짐
        setTimeout(() => {
            if(id !=='seho100'){    // 임의의 아이디 seho100와 비교
                errors.push('id')
            }
            if(email !=='seho4815@naver.com'){
                errors.push('email')
            }
    
            this.setState({ errors, loading: false});
    
            if(!errors.length){
                Alert.alert(
                    '비밀번호 전송 완료!',
                    '회원님의 이메일로 비밀번호를 전송하였습니다.',
                    [
                        {
                            text: '확인', onPress:() => {
                                navigation.navigate('Login')
                            }
                        }
                    ],
                    {cancelable : false}
                )
                navigation.navigate('Browse');
            } else{
                Alert.alert(
                    '정보 불일치',
                    '일치하는 정보가 없습니다.',
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
        const {loading, errors} = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;


        return(
            <KeyboardAvoidingView style={styles.forgot}>
                <Block style={{backgroundColor:'white'}} padding={[0, theme.sizes.base * 2]}>
                <Text h1 bold>비밀번호 찾기</Text>
                    <Block middle>
                        <Input
                            error={hasErrors('id')}
                            label="ID"
                            style={[styles.input, hasErrors('id')]}
                            defaultValue={this.state.id}
                            onChangeText={text => this.setState({ id: text})}
                        />
                        <Input
                            error={hasErrors('email')}
                            label="email"
                            style={[styles.input, hasErrors('email')]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text})}
                        />
                        <Button gradient onPress={() => {this.handleFind()}}>
                            {loading ? 
                                <ActivityIndicator size="small" color="white" />:
                            <Text bold white center>비밀번호 찾기</Text>
                        }   
                        </Button>
                        <Button onPress={() => {navigation.goBack()}}>
                            <Text center caption gray style={{textDecorationLine: 'underline'}}>이전 화면으로 돌아가기</Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    forgot:{
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
    }
})