import React, { Component } from 'react';
import {Dimensions, StyleSheet, Image, KeyboardAvoidingView, Animated, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Text, Block,Card ,Badge, Input, Divider} from '../components';
import {theme, mocks} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const { width, height} = Dimensions.get('window')

export default class Product extends Component{
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
                    {this.renderItem()}

                    <Block style={styles.product}>
                        <Text h2 bold>{product.name}</Text>
                        <Block flex={false} row margin={[theme.sizes.base, 0]}>
                            {product.tags.map(tag => (
                                <Text key = {`tag-${tag}`} caption style={styles.tag}>
                                    {tag}
                                </Text>
                            ))}
                        </Block>
                        <Text light height={22} align="justify" gray>{product.description}</Text>
                        <Divider margin={[theme.sizes.padding * 0.9, 0]} />
                    </Block>
                </ScrollView>
            </Block>
        )
    }
}

Product.defaultProps = {
    product: mocks.products[0],
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