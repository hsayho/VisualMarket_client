import Axios from 'axios';
import React, { Component } from 'react';
import {StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, Keyboard, Alert} from 'react-native';
import axios from 'axios';
import {Button, Text, Block, Input} from '../components';
import {theme} from '../constants';

export default class Signup extends Component{
    state={
        
        id: '',
        password: '',
        username: '',
        stu_id: '',
        errors: [],
        loading: false,
    }
    handleConfirm = async() => {
        var confirm_result='';
        const {id} = this.state;
        await axios.get('http://192.168.35.141:5000/api/members_id?id='+id)
        .then(function(res){
            console.log(res.data);
            
            if(res.data.length>0){ 
                confirm_result = res.data[0].mem_id;
                console.log(res.data[0].mem_id);
            }
        })
        if(confirm_result == id){ 
            alert('ID already in use');
            this.setState({id:''});
            console.log('리렌더링이 완료!');
        }
        else{
            alert('Available ID!');
        }
    }

    handleSignup = async() => {
        const {navigation} = this.props;
        const {id, username, password, stu_id} = this.state;
        
        const errors = [];
        this.setState({ loading: true})

        Keyboard.dismiss(); // 키보드 사라짐

        await axios.post('http://192.168.35.141:5000/api/members', {
            id: this.state.id,
            stu_id: this.state.stu_id,
            username: this.state.username,
            password: this.state.password,
        })
        .then(function (res) {
            if(res.data.status == 'error001'){
                $('#userID').focus();
            }
            else if(res.data.status == 'error002'){
                $('#userpassword').focus();
            }
            else if(res.data.status == 'error003'){
                $('#username').focus();
            }
            else if(res.data.status == 'error004'){
                $('#studnetID').focus();
            }
            else if(res.data.status == 'error005'){
                alert('Failed in Sign up');
            }

        })
        .catch(function (error) {
            console.log(error);
        });

        setTimeout(() => {
            if(!id){    // 임의의 아이디 seho100와 비교
                errors.push('id')
            }
            if(!stu_id){
                errors.push('stu_id')
            }
            if(!username){
                errors.push('username')
            }
            if(!password){
                errors.push('password')
            }

            

            this.setState({ errors, loading: false});
    
            if(!errors.length){ 
                Alert.alert(
                    'Completed!',
                    'Please log in with your new account!',
                    [
                        {
                            text: 'Ok', onPress:() => {
                                navigation.navigate('Login')
                            }
                        }
                    ],
                    {cancelable : false}
                )
                
            } else{
                Alert.alert(
                    'It does not match',
                    'There is no matching information',
                    [
                        {
                            text: 'try again', 
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
            <KeyboardAvoidingView style={styles.signup}>
                <Block style={{backgroundColor:'white'}} padding={[0, theme.sizes.base * 2]}>
                <Text h1 bold>Sign Up</Text>
                    <Block middle flex={0.88}>
                        <Block margin={[theme.sizes.base, 0]}>
                            <Input
                                error={hasErrors('id')}
                                label="ID"
                                style={[styles.input, hasErrors('id')]}
                                defaultValue={this.state.id}
                                onChangeText={text => this.setState({ id: text})}
                            />
                            <Button gradient style={styles.confirmBtn} onPress={() => this.handleConfirm()}>
                                <Text white center>confirm</Text>
                            </Button>
                        </Block>
                        <Input
                            secure
                            error={hasErrors('password')}
                            label="password"
                            style={[styles.input, hasErrors('password')]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text})}
                        />
                        <Input
                            error={hasErrors('username')}
                            label="username"
                            style={[styles.input, hasErrors('username')]}
                            defaultValue={this.state.username}
                            onChangeText={text => this.setState({ username: text})}
                        />
                        <Input
                            email
                            error={hasErrors('stu_id')}
                            label="Student ID"
                            style={[styles.input, hasErrors('stu_id')]}
                            defaultValue={this.state.stu_id}
                            onChangeText={text => this.setState({ stu_id: text})}
                        />
                        <Button gradient onPress={() => {this.handleSignup()}}>
                            {loading ? 
                                <ActivityIndicator size="small" color="white" />:
                            <Text bold white center>Sign Up</Text>
                        }   
                        </Button>
                        <Button onPress={() => {navigation.goBack()}}>
                            <Text center caption gray style={{textDecorationLine: 'underline'}}>back to page</Text>
                        </Button>
                    </Block>
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
      }
})