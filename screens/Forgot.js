import React, { Component } from 'react';
import {StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, Keyboard, Alert} from 'react-native';
import axios from 'axios';
import {Button, Text, Block, Input} from '../components';
import {theme} from '../constants';

export default class Forgot extends Component{
    state={
        student_id: '',
        id: '',
        errors: [],
        loading: false,
    }

    handleFind =async () => {
        const {navigation} = this.props;
        const {id, student_id} = this.state;
        const errors = [];
        var result= '';
        var result_stu_id = '';
        var result_id = '';
        this.setState({ loading: true})

        Keyboard.dismiss(); // 키보드 사라짐
        await axios.get('http://192.168.35.141:5000/api/members_password?stu_id='+student_id+'&id='+id)
        .then(function(res) {
            if(res.data.length>0){
                console.log(res.data);
                console.log(res.data[0].mem_id);
                result = res.data;
                result_stu_id = res.data[0].stu_id;
                result_id = res.data[0].mem_id;
            }
            
        });
        
    
        if(id !==result_id){    // 임의의 아이디 seho100와 비교
            errors.push('id')
        }
        if(student_id !==result_stu_id){
            errors.push('student_id')
        }

        this.setState({ errors, loading: false});

        if(result.length>0){
            await axios.put('http://192.168.35.141:5000/api/members/password?stu_id='+student_id)
            .then(function(res) {
            if(res.data.length>0){
                
            }
            
        });

            Alert.alert(
                'Initialization',
                'Your password has been reset to your student number.',
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
                'It does not match.',
                'There is no matching information..',
                [
                    {
                        text: 'try again', 
                    }
                ],
                {cancelable : false}
            )
        }
        
    }

    render(){
        const {navigation} = this.props;
        const {loading, errors} = this.state;
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;


        return(
            <KeyboardAvoidingView style={styles.forgot}>
                <Block style={{backgroundColor:'white'}} padding={[0, theme.sizes.base * 2]}>
                <Text h1 bold>Forgot Password</Text>
                    <Block middle>
                        <Input
                            error={hasErrors('student_id')}
                            label="Student ID"
                            style={[styles.input, hasErrors('student_id')]}
                            defaultValue={this.state.student_id}
                            onChangeText={text => this.setState({student_id: text})}
                        />
                        <Input
                            error={hasErrors('id')}
                            label="ID"
                            style={[styles.input, hasErrors('id')]}
                            defaultValue={this.state.id}
                            onChangeText={text => this.setState({ id: text})}
                        />
                        <Button gradient onPress={() => {this.handleFind()}}>
                            {loading ? 
                                <ActivityIndicator size="small" color="white" />:
                            <Text bold white center>Reset Password</Text>
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