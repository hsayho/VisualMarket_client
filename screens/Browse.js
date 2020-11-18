import React, { Component } from 'react';
import {StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Text, Block,Card ,Badge} from '../components';
import {theme, mocks} from '../constants';

export default class Browse extends Component{
    
    state={
        active:'Products',
        categories: [],
    }

    componentDidMount = () => {
        
    }

    handleTap = (tab) => {
        const { categories } = this.props;
        const filtered = categories.filter(
            category => category.tags.includes(tab.toLowerCase())
        );

        this.setState({ active: tab, categories: filtered });
    }

    renderTab(tab){
        const {active} = this.state;
        const isActive = active === tab;
        return(
            <TouchableOpacity
                key={`tab-${tab}`}
                onPress={() => this.handleTap(tab)}
                style={[styles.tab, isActive ? styles.active : null]}    
            >
                <Text title medium gray={!isActive} secondary={isActive}>{tab}</Text>
            </TouchableOpacity>
        )
    }

    render(){
        const {profile, navigation, categories} = this.props;
        
        const tabs = ['Products', 'Inspirations', 'Shop'];

        return(
            <Block style={{backgroundColor:'white'}}>
                <Block flex={false} row center space="between" style={styles.header}>
                    <Text h1 bold>Visual Market</Text>
                    <Button onPress={() => navigation.navigate('Settings')}>
                        <Image 
                            source={profile.avatar}
                            style={styles.avatar}
                        />
                    </Button>
                </Block>
                <Block flex={false} row style={styles.tabs}>
                    {tabs.map(tab => this.renderTab(tab))}
                </Block>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{paddingVertical: theme.sizes.base * 2}}
                >
                    <Block flex={false} row space="between" style={styles.categories}>
                        {categories.map(category => (
                            <TouchableOpacity onPress={() => navigation.navigate('Explore', {category})}
                            key = {category.name}>
                            <Card center middle shadow style={styles.category}>
                                <Badge margin={[0, 0, 15]} size={50} color="rgba(117,119,228,0.20)">
                                    <Image source = {category.image} />
                                </Badge>
                                <Text medium>{category.name}</Text>
                                <Text gray caption>{category.count}</Text>
                            </Card>
                        </TouchableOpacity>
                        ))}
                    </Block>
                    
                </ScrollView>
            </Block>
        )
    }
}

Browse.defaultProps={
    profile: mocks.profile,
    categories: mocks.categories,
}

const styles = StyleSheet.create({
    header:{
        paddingHorizontal: theme.sizes.base * 2,
    },
    avatar: {
        height: theme.sizes.base * 2 ,
        width: theme.sizes.base * 2,
    },
    tab: {
        marginRight: theme.sizes.base * 3.5,
        paddingBottom : theme.sizes.base
    },
    tabs: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: theme.colors.gray2,
        marginVertical: theme.sizes.base,
        marginHorizontal: theme.sizes.base * 2,
    },
    active: {
        borderBottomColor: '#7577e4',
        borderBottomWidth: 3,
    },
    category: {
        width: 150,
        height: 150,
    },
    categories:{
        flexWrap: 'wrap',
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom : theme.sizes.base * 3.5,
    }
})