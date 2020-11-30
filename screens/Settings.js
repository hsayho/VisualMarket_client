import React, { Component } from 'react';
import {StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator,Dimensions, Keyboard, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {Button, Text, Block,Card ,Badge, Divider, Switch} from '../components';
import {theme, mocks} from '../constants';
import Slider from 'react-native-slider';
import axios from 'axios';

var current_id='';
const {width, height} = Dimensions.get('window');

export default class Settings extends Component{
 
    state={
        budget: 500,
        Cap: 1000,
        advs: false,
        notifications: false,
        editing: false,
        profile: {},
        members: '',
        loading: false,
        new_Password: '',
    }

    componentDidMount(){
        this.loadmemberInfo();
        console.log('새 비밀번호 : ' +this.state.new_Password);
    }

    loadmemberInfo = async() => {
        await axios.get('http://10.0.2.2:5000/api/members_id?id='+current_id)
        .then(res => {
            const members = res.data;
            this.setState({ members: members});
        })
        .finally(()=>{
            this.setState({ loading: true})
        })
        console.log(this.state.members[0].mem_name);
    }

    handleEdit = (name,text) => {
        const { profile } = this.state;
        profile[name] = text;

        this.setState({profile});
    }

    renderEdit = (name) => {
        const { profile, editing } = this.state;

        if(editing === name){
            return(
                <TextInput 
                    placeholder='새 비밀번호를 입력하세요.'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({new_Password: text})}
                />

            )
        }
    }

    toggleEdit = (name) => {
        const { editing} = this.state;

        this.setState({ editing: !editing ? name : null});
    }

    changePassword = async() => {
        await axios.put('http://10.0.2.2:5000/api/newPassword?id='+current_id+'&password='+this.state.new_Password)
        .then(res => {
            
        })
        .finally(()=>{
            alert('비밀번호 변경이 완료되었습니다.');
        })
    }

    render(){
        const {navigation} = this.props;
        const {profile, editing} = this.state;
        current_id = navigation.getParam('current_id');
        console.log(current_id);

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
                    <Block flex={false} row center space="between" style={styles.header}>
                        <Text h1 bold>설정</Text>
                        <Button style={{}}>
                            <Text bold secondary onPress={() => this.changePassword()}>변경사항 저장</Text>
                        </Button>
                    </Block>
                    <ScrollView showsVerticalScrollIndicator = {false}>
                        <Block style={styles.inputs}>
                            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                <Block>
                                    <Text gray style={{marginBottom: 10}}>사용자 이름</Text>
                                    <Text>{this.state.members[0].mem_name}</Text>
                                    
                                </Block>
                                
                            </Block>
                            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                <Block>
                                    <Text gray style={{marginBottom: 10}}>비밀번호</Text>
                                    {this.renderEdit('password')}
                                </Block>
                                <Text medium secondary onPress={() => this.toggleEdit('password')}>{editing === 'password' ? '저장' : '수정'}</Text>
                            </Block>
                            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                                <Block>
                                    <Text gray style={{marginBottom: 10}}>학번</Text>
                                    <Text>{this.state.members[0].stu_id}</Text>
                                </Block>
                                
                            </Block>
                        </Block>

                        <Divider margin={10}/>

                        <Block style={styles.sliders}>
                            <Block margin={[10, 0]}>
                                <Text gray style={{marginBottom : 10}}>VS coin</Text>
                                <Slider 
                                    minimumValue={0}
                                    maximumValue={100000}
                                    style={{height:19}}
                                    thumbStyle={styles.thumb}
                                    trackStyle={{height: 6, borderRadius: 6}}
                                    minimumTrackTintColor={theme.colors.secondary}
                                    maximumTrackTintColor={"rgba(157,163,180,0.10)"}
                                    value={this.state.budget}
                                    onValueChange={value => this.setState({ budget: value})}
                                />
                                <Text caption gray right>{this.state.budget.toFixed(0)}원</Text>
                            </Block>
                            <Block margin={[10, 0]}>
                                <Text gray>Monthly Use</Text>
                                <Slider 
                                    minimumValue={0}
                                    maximumValue={50000}
                                    style={{height:19}}
                                    thumbStyle={styles.thumb}
                                    trackStyle={{height: 6, borderRadius: 6}}
                                    minimumTrackTintColor={theme.colors.secondary}
                                    maximumTrackTintColor={"rgba(157,163,180,0.10)"}
                                    value={this.state.Cap}
                                    onValueChange={value => this.setState({ Cap: value})}
                                />
                                <Text caption gray right>{this.state.Cap.toFixed(0)}원</Text>
                            </Block>
                        </Block>

                        <Divider margin={10}/>

                        <Block style={styles.toggles}>
                            <Block row center space="between" style={{marginBottom: 16}}>
                                <Text gray2>알림 설정</Text>
                                <Switch 
                                    value={this.state.notifications}
                                    onValueChange={value => this.setState({ notifications: value})}
                                />
                            </Block>

                            <Block row center space="between"  style={{marginBottom: 16}}>
                                <Text gray2>광고 수신</Text>
                                <Switch 
                                    value={this.state.advs}
                                    onValueChange={value => this.setState({ advs: value})}
                                />
                            </Block>
                        </Block>

                    </ScrollView>
                </Block>
            )
        }
    }
}

const styles = StyleSheet.create({
    header:{
        paddingHorizontal: theme.sizes.base * 2,
    },
    avatar: {
        height: theme.sizes.base * 2 ,
        width: theme.sizes.base * 2,
    },
    inputs: {
        paddingHorizontal: theme.sizes.base * 2,
        marginTop : theme.sizes.base * 0.6,
    },
    inputRow: {
        alignItems: 'flex-end',
    },
    sliders: {
        paddingHorizontal: theme.sizes.base * 2,
        marginTop : theme.sizes.base * 0.6,
    },
    thumb: {
        width: theme.sizes.base,
        height: theme.sizes.base,
        borderRadius: theme.sizes.base,
        borderColor: 'white',
        borderWidth: 3,
        backgroundColor: theme.colors.secondary,
    },
    toggles: {
        paddingHorizontal: theme.sizes.base * 2,
        
    }
})