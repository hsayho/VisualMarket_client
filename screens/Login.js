import React, { Component } from 'react';
import {StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, Keyboard} from 'react-native';
import {Button, Text, Block, Input} from '../components';
import {theme} from '../constants';
import axios from 'axios';

export default class Login extends Component{
    state={
        users: "",
        id: '',
        password: '',
        errors: [],
        loading: false,
    }

    componentDidMount(){
        this.loadUserInfo();
    }

    loadUserInfo = async () => {
        await axios.get('http://10.0.2.2:5000/api/users')
        .then(res => {
            const users = res.data;
            this.setState({ users });
            console.log(users);
        })
    }


    handleLogin = async () => {
        const {navigation} = this.props;
        const {id, password} = this.state;
        const errors = [];
        this.setState({ loading: true})
        await axios.post('http://10.0.2.2:5000/api/members',{
            id: this.state.id,
            password: this.state.password
        })
        .then(function (res) {
            console.log('데이터 : '+res.data[0].mem_id);
            
        })
        .catch(function (err){
            console.log(err);
        });

        Keyboard.dismiss(); // 키보드 사라짐
        setTimeout(() => {
            if(id !=='seho100'){    // 임의의 아이디 seho100와 비교
                errors.push('id')
            }
            if(password !== 'jhkim8461'){ // 임의의 비밀번호 sop8377과 비교
                errors.push('password') 
            }
    
            this.setState({ errors, loading: false});
    
            if(!errors.length){
                navigation.navigate('Browse');
            }
        }, 2000);
        
        
    }

    render(){
        const {navigation} = this.props;
        const {loading, errors} = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

        return(
            <KeyboardAvoidingView style={styles.login}>
                <Block padding={[0, theme.sizes.base * 2]} style={{backgroundColor: 'white'}}>
                    <Text h1 bold>로그인</Text>
                    <Block middle>
                        <Input
                            error={hasErrors('id')}
                            label="ID"
                            style={[styles.input, hasErrors('id')]}
                            defaultValue={this.state.id}
                            onChangeText={text => this.setState({ id: text})}
                        />
                        <Input
                            
                            error={hasErrors('password')}
                            secure
                            label="Password"
                            style={[styles.input, hasErrors('password')]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text})}
                        />
                        <Button gradient onPress={() => {this.handleLogin()}}>
                            {loading ? 
                                <ActivityIndicator size="small" color="white" />:
                            <Text bold white center>로그인</Text>
                        }   
                        </Button>
                        <Button onPress={() => {navigation.navigate('Forgot')}}>
                            <Text center caption gray style={{textDecorationLine: 'underline'}}>비밀번호를 잊어버리셨습니까?</Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    input : {
        borderBottomColor: theme.colors.gray2,
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,

    },
    login: {
        flex:1,
        justifyContent: 'center',
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent,
        borderBottomWidth: 0.8,
    }
})