import React, { Component } from 'react';
import {Dimensions, StyleSheet, Image, KeyboardAvoidingView, Animated, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Text, Block,Card ,Badge, Input, Divider} from '../components';
import {theme, mocks} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const { width, height} = Dimensions.get('window')

export default class Home extends Component{
static navigationOptions = ({}) => {
    
}

    renderItem = () => {
        const { product } = this.props;
        return(
            <Block>
                <Image 
                    source={product.images[0]}
                    style={{width, height : height / 2}}
                    resizeMode= 'contain'
                    
                />
            </Block>
        )
    }

    render(){
        const { product } = this.props;
        return(
            <Block style={{backgroundColor:'white'}}>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    <Card shadow center middle style={{height:100, width:width}}>
                        <Badge color="rgba(117,119,228,0.20" size={50} style={{marginRight: 50}}>
                            <Text>hi</Text>
                        </Badge>
                    </Card>
                </ScrollView>
            </Block>
        )
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