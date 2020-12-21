import Axios from 'axios';
import React, { Component } from 'react';
import {StyleSheet, Image, KeyboardAvoidingView, ActivityIndicator, Keyboard, Alert, ScrollView, Dimensions, TextInput} from 'react-native';
import axios from 'axios';
import {Button, Text, Block, Input} from '../components';
import {theme} from '../constants';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import imageCompression from 'browser-image-compression';

const {width, height} = Dimensions.get('window');
const options = {
    includeBase64: true,
}
var current_id = '';

export default class AddGoods extends Component{

    

    state={
        
        id: '',
        password: '',
        username: '',
        
        errors: [],
        loading: false,

        title: '',
        contents: '',
        price: '',
        stu_id: '',
        imageSource: '',
        photo: '',
        
    }

    ImgCompress = async() => {

    }

    /*showImagePicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('showImagePicker Response = ' + JSON.stringify(response.data));
            console.log('용량 : '+ JSON.stringify(response))
            if(response.customButton){
                alert(response.customButton);
            }
            else this.setState({photo: response, imageSource: response.uri});
        })
    }*/

    showCameraRoll = () => {
        /*ImagePicker.launchImageLibrary(options, (response) => {
            if(response.error){
                console.timeLog('이미지 런치 에러: ' + response.error);
            }
            else{
                console.log('showCameraRoll response : '+ JSON.stringify(response.uri))
                this.setState({photo: response, imageSource: response.uri});
            }
        })*/
        ImagePicker.launchImageLibrary(
            {
                noData: true,
                includeBase64: true,
                maxHeight:200,
                maxWidth:200,
            },
            (response) => {
                this.setState({ photo: response, imageSource: response.uri});
                console.log('이미지 결과 : '+ JSON.stringify(response));
                console.log('바이너리 데이터 : ' + (response.base64));
            }
        )
    }

    handleConfirm = async() => {
        var confirm_result='';
        const {stu_id} = this.state;
        
        await axios.get('http://192.168.35.141:5000/api/members-studentID?id='+current_id)
        .then(function(res){
            console.log(res.data);
            
            if(res.data.length>0){ 
                confirm_result = res.data[0].stu_id;
                console.log('전달 받은 학번'+confirm_result);
                console.log('비교할 학번'+stu_id);
            }
        })
        if(parseInt(confirm_result) === parseInt(stu_id)){ 
            alert('Confirm completed!');
            
        }
        else{
            alert('It does not match.');
            this.setState({stu_id:''});
            console.log('리렌더링이 완료!');
        }
    }

    handleEnroll = async() => {
        const {navigation} = this.props;
        const {title, stu_id, contents, price, photo} = this.state;
        
        const errors = [];
        this.setState({ loading: true})

        Keyboard.dismiss(); // 키보드 사라짐
        const formData = new FormData();
        formData.append('img', {
            name: photo.fileName,
            type: photo.type,
            uri: photo.uri,
        });
        formData.append('title', this.state.title);
        formData.append('stu_id', this.state.stu_id);
        formData.append('contents', this.state.contents);
        formData.append('price', this.state.price);
        formData.append('state', true);

        axios({
            url: 'http://192.168.35.141:5000/api/upload',
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application.json',
                'Content-Type': 'multipart/form-data',
            }
        }).then(function (res){
            console.log(res);
        }).catch(function (err){
            console.log(err);
        })


        /*const config = {
            header:{
                'content-type': 'multipart/form-data'
            }
        }*/



        /*await axios.post('http://10.0.2.2:5000/api/upload',formData, config)
        .then(function (res) {
            console.log(res);

        })
        .catch(function (error) {
            console.log(error);
        });*/

        setTimeout(() => {
            if(!title){    // 임의의 아이디 seho100와 비교
                errors.push('title')
            }
            if(!stu_id){
                errors.push('stu_id')
            }
            if(!contents){
                errors.push('contents')
            }
            if(!price){
                errors.push('price')
            }

            

            this.setState({ errors, loading: false});
    
            if(!errors.length){ 
                Alert.alert(
                    'Completed!',
                    'Goods has been successfully registered!',
                    [
                        {
                            text: 'Ok', onPress:() => {
                                navigation.navigate('Browse')
                            }
                        }
                    ],
                    {cancelable : false}
                )
                
            } else{
                Alert.alert(
                    'Non-input',
                    'There are non-input items',
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
        const {loading, errors, photo, imageSource} = this.state;
        current_id = navigation.getParam('current_id');
        console.log('물품 등록에 접속된 아이디 : '+current_id);
        const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;
        

        return(
            <KeyboardAvoidingView style={styles.signup}>
                <Block style={{backgroundColor:'white',}} padding={[0, theme.sizes.base * 2]}>
                <Text h1 bold>Register Used Item</Text>
                    <ScrollView>
                        <Block middle style={{marginTop: 15}}>
                            <Block row>
                                <Button style={[styles.ImageButton, {borderWidth:0.5, width:60, height:60, alignItems:'center', marginRight:20}]} onPress={() => this.showCameraRoll()}>
                                    <Ionicons name="camera-outline" size={50} color={'#7577E4'}/>
                                    
                                </Button>
                                {imageSource ? <Image style={{width: 60, height: 60, marginTop:8, borderRadius:10}} source={{uri: photo.uri}}/> : null}
                            </Block>
                            <Input
                                error={hasErrors('title')}
                                label="Title"
                                style={[styles.input, hasErrors('title')]}
                                defaultValue={this.state.title}
                                onChangeText={text => this.setState({ title: text})}
                            />
                            <Block margin={[theme.sizes.base, 0]}>
                                <Input
                                    error={hasErrors('stu_id')}
                                    label="Student Number"
                                    style={[styles.input, hasErrors('stu_id')]}
                                    defaultValue={this.state.stu_id}
                                    onChangeText={text => this.setState({ stu_id: text})}
                                />
                                <Button gradient style={styles.confirmBtn} onPress={() => this.handleConfirm()}>
                                    <Text white center style={{fontSize:12}}>Confirm</Text>
                                </Button>
                            </Block>
                            <Text gray>Content</Text>
                            <TextInput 
                                error={hasErrors('contents')}
                                style={[styles.input, hasErrors('contents'),{height:height/3}]}
                                defaultValue={this.state.contents}
                                onChangeText={text => this.setState({ contents: text})}
                                multiline={true}
                            />
                            <Input
                                error={hasErrors('price')}
                                label="Price"
                                style={[styles.input, hasErrors('price')]}
                                defaultValue={this.state.price}
                                onChangeText={text => this.setState({ price: text})}
                            />
                            
                            
                            <Button gradient onPress={() => {this.handleEnroll()}}>
                                {loading ? 
                                    <ActivityIndicator size="small" color="white" />:
                                <Text bold white center>Register</Text>
                            }   
                            </Button>
                            <Button onPress={() => {navigation.goBack()}}>
                                <Text center caption gray style={{textDecorationLine: 'underline'}}>back to page</Text>
                            </Button>
                        </Block>
                    </ScrollView>
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
      },
      ImageButton:{
        width:50,
        height:50,
        color:'black',
        
        
      }
})