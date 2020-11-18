import React, {Component} from 'react';
import {Animated, Dimensions, StyleSheet, View, FlatList, Image} from 'react-native';

import { Button, Block, Text} from '../components';
import {theme} from '../constants';

const {width, height} = Dimensions.get('window');

export default class Welcome extends Component{
    static navigationOptions = {
        headerShown: false,
    }

    scrollX = new Animated.Value(0);

    state={

    }

    renderIllustrations = () => {
        const { illustrations } = this.props;
        return(
            <FlatList
                horizontal
                paddingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                snapToAlignment="center"
                data={illustrations}
                extraDate={this.state}   
                keyExtractor={(item, index) => `${item.id}`}
                renderItem={({item}) => (
                    <Image source={item.source} resizeMode="contain"
                    style={{width, height: height / 2, overflow:'visible'}}/>
                )}
                onScroll={
                    Animated.event([
                        {
                            nativeEvent : {contentOffset: {x: this.scrollX}}
                        }
                    ])
                }
            >

            </FlatList>
        )
    }

    renderSteps = () => {
        const {illustrations} = this.props;
        const stepPosition = Animated.divide(this.scrollX, width);
        return(
            <Block row center middle style={styles.stesContainer}>
                {illustrations.map((item, index) => {
                    const opacity = stepPosition.interpolate({
                        inputRange: [index -1, index, index+1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp',
                    })
                    return(
                        <Block animated flex={false} key={`step-${index}`} color="gray" style={[styles.steps, {opacity}]}></Block>
                    )
                })}
                
            </Block>
        )
    }

    render(){
        const {navigation} = this.props;
        return(
            <Block>
                <Block center middle flex={0.4}>
                    <Text h2 center bold>For Cbnu SW students.
                        <Text h2 color="#7577E4">Visual Market!</Text>
                    </Text>
                    <Text h4 gray style={{marginTop : theme.sizes.padding / 2}}>소프트웨어학과 학생들을 위한 쇼핑 플랫폼</Text>
                </Block>
                <Block center middle>
                    {this.renderIllustrations()}
                    {this.renderSteps()}
                </Block>
                <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
                    <Button gradient onPress={() => navigation.navigate('Login')}>
                        <Text center semibold white>이용하기</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('Signup')}>
                        <Text center semibold>회원가입</Text>
                    </Button>
                    <Text center caption gray>Created by Drawable Data</Text>
                </Block>
            </Block>
            
        )
    }
}

Welcome.defaultProps = {
    illustrations: [
        {id : 1, source : require('../assets/images/illustration_1.png')},
        {id : 2, source : require('../assets/images/illustration_2.png')},
        {id : 3, source : require('../assets/images/illustration_3.png')},
    ]
}

const styles = StyleSheet.create({
    stesContainer:{
        position: 'absolute',
        bottom: theme.sizes.base * 3,
        right: 0,
        left: 0,
    },
    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5,
    }
})