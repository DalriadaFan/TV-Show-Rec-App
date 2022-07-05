import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

class Rec extends Component{

    constructor(){
        super();
        this.state={
            like:false
        }
    }

    getViewConditionalStyles(mode){
        if(mode==="search"){
            return (StyleSheet.create({
                borderTopLeftRadius:10,
                borderTopRightRadius:10,
            }));
        }
        return null;   
    }

    getMegaViewConditionalStyles(mode){
        switch(mode){
            case "search":
                return (StyleSheet.create({
                    height:107,
                }));
            case "feed":
                return (StyleSheet.create({
                    height:150,
                }));
        } 
    }

    getLikeButtonColor(){
        if(this.state.like==true){
            return {backgroundColor:"red"}
        }
        return {backgroundColor:"silver"}
    }

    toggleLike=()=>{
        this.setState({like: !this.state.like})
    }
    

    render(){

        return (

            <TouchableOpacity activeOpacity={0.75}>
                <View style={[styles.megaContainer,this.getMegaViewConditionalStyles(this.props.mode)]}>

                    {this.props.mode==="feed" &&
                        <View style={styles.containerUserDetails}>
                            <Image
                                source={{uri:this.props.recUserImage}}
                                style={styles.userImage}
                            />
                            <Text style={styles.userNameText}>{this.props.recUser}</Text>
                            <Text style={styles.userRecommendsText}>recommends</Text>
                        </View>
                    }


                    <View style={[styles.containerTVShow, this.getViewConditionalStyles(this.props.mode)]}>
                        <View style={styles.containerImage}>
                            <Image 
                                source={{uri:this.props.titleImage}}
                                style={styles.image}
                            />
                        </View>

                        <View style={styles.containerText}>
                            <Text style={styles.textTitle}>{this.props.name}</Text>
                            <Text style={styles.textRelease}>{this.props.releaseYear}</Text>
                            <Text style={styles.textActors}>{this.props.actors.join(", ")}</Text>
                        </View>

                        <TouchableOpacity style={[styles.likeButton, this.getLikeButtonColor()]} onPress={this.toggleLike}>
                            <Feather name="heart" style={{color:"white", alignSelf:"center"}} size={25}></Feather>     
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    megaContainer:{
        margin:5,
        flexDirection:"column",
    },
    containerUserDetails:{
        flex:3,
        backgroundColor:"#ff4455",
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderColor:"white",
        borderBottomWidth:2,
        flexDirection:"row"
    },
    containerTVShow:{
        flex:8,
        backgroundColor:"#ff4455",
        flexDirection:"row",
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10
    },
    containerImage:{
        marginHorizontal:5,
        height:100,
        width:66,
        flexDirection:"row",
        justifyContent:"center",
        alignSelf:"center",
    },
    image:{
        flex:1,
        resizeMode:"cover",
        borderRadius:5
    },
    containerText:{
        margin:1,
        flex:1,
        flexDirection:"column",
        margin:1
    },
    textTitle:{
        fontSize:25,
        color:"white",
        fontWeight:"bold"
    },
    textRelease:{
        fontStyle:"italic",
        color:"white"
    },
    textActors:{
        color:"white"
    },
    likeButton:{
        height:35,
        width:35,        
        borderRadius:10,
        marginRight:5,
        alignSelf:"center",
        borderWidth:2,
        borderColor:"white",
        justifyContent:"center"
    },
    userImage:{
        resizeMode:"cover",
        borderRadius:30,
        width:30,
        height:30,
        marginLeft:5,
        alignSelf:"center"
    },
    userNameText:{
        fontWeight:"bold",
        alignSelf:"center",
        margin:2
    },
    userRecommendsText:{
        alignSelf:"center",
        fontStyle:"italic",
        margin:2
    }

});

export default Rec;