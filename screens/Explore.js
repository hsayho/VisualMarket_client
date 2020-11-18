import React, { Component } from 'react';
import {Dimensions, StyleSheet, Image, KeyboardAvoidingView, Animated, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Text, Block,Card ,Badge, Input} from '../components';
import {theme, mocks} from '../constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get("window");

export default class Explore extends Component{

    state= {
        searchString : '',
        searchFocus: new Animated.Value(0.6),
    }

    handleSearchFocus = (status) => {
        Animated.timing(
            this.state.searchFocus,
            {
                toValue: status ? 0.8 : 0.6,
                duration: 150,
            }
        ).start();
    }

    renderImage = (img, index) => {
        const { navigation } = this.props;
        const sizes = Image.resolveAssetSource(img);
        const fullWidth = width - (theme.sizes.padding * 2.5);
        const resize = (sizes.width * 100) / fullWidth;
        const imgWidth = resize > 75? fullWidth : sizes.width * 1;

        return(
            <TouchableOpacity
                key={`img-${index}`}
                style={[styles.image, styles.mainImage]}
                onPress = {() => navigation.navigate('Product')}
            >
                <Image 
                    source={img} style={[styles.image, {minWidth: imgWidth, maxWidth: imgWidth}]}/>
            </TouchableOpacity>
        )
    }

    renderExplore = () => {
        const { images, navigation } = this.props;
        const mainImage = images[0];
        return(
            <Block style={{marginBottom: height / 3 }}>
                <TouchableOpacity
                    style={[styles.image, styles.mainImage]}
                    onPress = {() => navigation.navigate('Product')}
                >
                    <Image source={mainImage} style={[styles.image, styles.mainImage]}/>
                </TouchableOpacity>
                <Block row space="between" wrap>
                    {images.slice(1).map((img, index) => this.renderImage(img, index))}
                </Block>
            </Block>
        )
    }

    renderFooter = () => {
        return(
            <LinearGradient
                style={styles.footer}
                start={{x:0, y:0}}
                end={{x:0, y:1}}
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 80)']}
            >
                <Button gradient style={{width: width/ 2.5}}>
                    <Text bold white center>Filter</Text>
                </Button>
            </LinearGradient>
        )
    }

    renderSearch(){
        const { searchString, searchFocus } = this.state;
        const isEditing = searchFocus && searchString;

        return(
            <Block animated middle flex={searchFocus} style={styles.search}>
                <Input placeholder="검색"
                    placeholderTextColor={theme.colors.gray}
                    style={styles.searchInput}
                    onFocus={() => this.handleSearchFocus(true)}
                    onBlur={() => this.handleSearchFocus(false)}
                    onChangeText = {text => this.setState({ searchString : text})}
                    value={searchString}
                    onRightPress={() => isEditing ? this.setState({ searchString: null}) : null}
                    rightStyle={styles.searchRight}
                    rightLabel={
                        <FontAwesome
                            name={isEditing ? 'close' : 'search'}
                            size={theme.sizes.base / 1.6}
                            color={theme.colors.gray}
                            style={styles.searchIcon}
                        >

                        </FontAwesome>
                    }
                ></Input>
            </Block>
        )
    }

    render(){
        return(
            <Block style={{backgroundColor:'white'}}>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold>쇼핑</Text>
                    {this.renderSearch()}
                </Block>

                <ScrollView showsVerticalScrollIndicator = {false} style={styles.explore}>
                    {this.renderExplore()}
                </ScrollView>

                {this.renderFooter()}
            </Block>
        )
    }
}

Explore.defaultProps = {
    images: mocks.explore,
};

const styles = StyleSheet.create({
    header:{
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 2,
    },
    search: {
        height: theme.sizes.base * 2,
        width: width - theme.sizes.base * 2,
    },
    searchInput: {
        fontSize: theme.sizes.caption,
        height: theme.sizes.base * 2.2,
        backgroundColor: "rgba(142, 142, 147, 0.06)",
        borderColor: "rgba(142, 142, 147, 0.06)",
        paddingLeft: theme.sizes.base / 1.333,
        paddingRight: theme.sizes.base * 1.5,
    },
    searchRight: {
        top: 0,
        marginVertical: 0,
        backgroundColor: 'transparent',
    },
    searchIcon: {
        position: 'absolute',
        right: theme.sizes.base / 1.333,
        top: theme.sizes.base / 1.6,
    },
    searchString: {

    },
    explore: {
        marginHorizontal: theme.sizes.base * 1.25,
    },  
    footer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.1,
        width,
        paddingBottom: theme.sizes.base * 4,
    },
    image: {
        minHeight: 100,
        maxHeight: 130,
        maxWidth: width - (theme.sizes.padding * 2.5),
        marginBottom: theme.sizes.base, 
        borderRadius: 4,
    },
    mainImage: {
        minWidth: width - (theme.sizes.padding * 2.5),
        maxHeight: width - (theme.sizes.padding * 2.5),
    }
})