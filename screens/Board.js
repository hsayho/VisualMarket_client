import React, { Component } from 'react';
import {Dimensions, StyleSheet, Image, KeyboardAvoidingView, Animated, Keyboard, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {Button, Text, Block,Card ,Badge, Input, Divider} from '../components';
import {theme, mocks} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const { width, height} = Dimensions.get('window')

export default class Board extends Component{
static navigationOptions = ({}) => {
    
}
    state={
        loading: false,
        board: '',
    }

    componentDidMount(){
        this.loadBoard();
    }

    loadBoard = async() => {
        await axios.get('http://10.0.2.2:5000/api/board')
        .then(res => {
            const board = res.data;
            this.setState({ board: board});
            console.log(this.state.board);
        })
        .finally(() => {
            this.setState({loading: true})
        })
    }


    render(){
        const { product } = this.props;
        console.log(this.state.board);
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
                            <TouchableOpacity>
                                <Card shadow style={{width: width}}>
                                <Text h3 style={{marginBottom:3}}>{board.btitle}</Text>
                                <Text numberOfLines={1} style={{marginBottom:3}}>{board.bcontent}</Text>
                                {board.anonymity ===0 ? <Text >{board.stu_id}</Text>
                                : <Text>익명</Text>}
                                </Card>
                        </TouchableOpacity>
                        ))}
                        
                    </ScrollView>
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