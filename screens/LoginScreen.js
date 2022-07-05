import React, { Component, useState, useContext } from 'react';
import {Pressable, StyleSheet, Text, View, Image, TextInput, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-web';
import { AuthContext } from '../contexts/AuthContext';

const styles = StyleSheet.create({
    input: {
      height: 50,
      width:300,
      margin: 5,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"white"
    },
    container: {
        alignSelf:"center",
        justifyContent:"center",
        flex:1
    },
    button:{
        width:135,
        height:50,
        margin: 5,
        padding: 10,
        borderRadius:10,
        backgroundColor:"#ff4455",
        justifyContent:"center",
        alignItems:"center",
        elevation:4
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:"center"
    },
    buttonText:{
        color:"white",
        fontSize:18
        
    }
  });       

class LoginScreen extends Component{
    constructor(){
        super();
        this.state={
            username:"",
            password:""

        };
    }

    static contextType = AuthContext;


    render(){
        
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    autoCapitalize={"none"}
                    onChangeText={(text)=>{this.setState({username:text})}}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    autoCapitalize={"none"}
                    onChangeText={(text)=>{this.setState({password:text})}}
                />
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.button}
                        onPress={() => this.context.signIn(this.state)}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={() => Alert.alert('Simple Button pressed')}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </Pressable>
                </View>
                
            </View>
        );
    }
}

export default LoginScreen;