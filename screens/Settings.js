import React, { Component } from 'react';
import {StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, Keyboard, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {Button, Text, Block,Card ,Badge, Divider, Switch} from '../components';
import {theme, mocks} from '../constants';
import Slider from 'react-native-slider';

export default class Settings extends Component{
 
    state={
        budget: 500,
        Cap: 1000,
        advs: false,
        notifications: false,
        editing: false,
        profile: {},
    }

    componentDidMount(){
        this.setState({ profile: this.props.profile});
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
                    defaultValue={profile[name]}
                    onChangeText={text => this.handleEdit([name], text)}
                />

            )
        }
    }

    toggleEdit = () => {
        const { editing} = this.state;

        this.setState({ editing: !editing ? name : null});
    }

    render(){
        const {navigation} = this.props;
        const {profile, editing} = this.state;
        return(
            <Block style={{backgroundColor:'white'}}>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold>설정</Text>
                    <Button>
                        <Image 
                            source={profile.avatar}
                            style={styles.avatar}
                        />
                    </Button>
                </Block>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    <Block style={styles.inputs}>
                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                            <Block>
                                <Text gray2 style={{marginBottom: 10}}>사용자 이름</Text>
                                {this.renderEdit('username')}
                                
                            </Block>
                            <Text medium secondary onPress={() => this.toggleEdit('username')}>{editing === 'username' ? '저장' : '수정'}</Text>
                        </Block>
                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                            <Block>
                                <Text gray2 style={{marginBottom: 10}}>위치</Text>
                                {this.renderEdit('location')}
                            </Block>
                            <Text medium secondary onPress={() => this.toggleEdit('location')}>{editing === 'location' ? '저장' : '수정'}</Text>
                        </Block>
                        <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
                            <Block>
                                <Text gray2 style={{marginBottom: 10}}>E-mail</Text>
                                <Text bold>react</Text>
                            </Block>
                            <Text medium secondary>수정</Text>
                        </Block>
                    </Block>

                    <Divider margin={10}/>

                    <Block style={styles.sliders}>
                        <Block margin={[10, 0]}>
                            <Text gray style={{marginBottom : 10}}>Budget</Text>
                            <Slider 
                                minimumValue={0}
                                maximumValue={1000}
                                style={{height:19}}
                                thumbStyle={styles.thumb}
                                trackStyle={{height: 6, borderRadius: 6}}
                                minimumTrackTintColor={theme.colors.secondary}
                                maximumTrackTintColor={"rgba(157,163,180,0.10)"}
                                value={this.state.budget}
                                onValueChange={value => this.setState({ budget: value})}
                            />
                            <Text caption gray right>${this.state.budget.toFixed(0)}</Text>
                        </Block>
                        <Block margin={[10, 0]}>
                            <Text gray>Monthly Cap</Text>
                            <Slider 
                                minimumValue={0}
                                maximumValue={5000}
                                style={{height:19}}
                                thumbStyle={styles.thumb}
                                trackStyle={{height: 6, borderRadius: 6}}
                                minimumTrackTintColor={theme.colors.secondary}
                                maximumTrackTintColor={"rgba(157,163,180,0.10)"}
                                value={this.state.Cap}
                                onValueChange={value => this.setState({ Cap: value})}
                            />
                            <Text caption gray right>${this.state.Cap.toFixed(0)}</Text>
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

Settings.defaultProps= {
    profile: mocks.profile,
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