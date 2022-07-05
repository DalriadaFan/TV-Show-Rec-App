import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import Rec from '../components/Medium/Rec';



const stylesTextInput = StyleSheet.create({
    input: {
      height: 40,
      margin: 5,
      borderWidth: 1,
      padding: 10,
      borderRadius:10,
      backgroundColor:"white"
    },
  });       

class SearchScreen extends Component{
    _isMounted= false;

    constructor(){
        super();
        this.state={
            searchTerm:"",
            database: []
        };
    }

    componentDidMount(){
        this._isMounted=true;

        return fetch('http://192.168.100.164:3000/tvshows/all')
        .then((response)=>response.json())
        .then(resJson=>{
            this.setState({database: resJson})
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
      }


    handleListAndSearch(){
        let listToRender = this.state.database.filter((Show)=>{
            return (
                Show.TVShowTitle.includes(this.state.searchTerm)
                || Show.TVShowActors.join(" ").includes(this.state.searchTerm)
            );
        });

        return this.handleList(listToRender);
    }

    handleList(finalList){
        return finalList.map((Show) =>{
            return (
                <Rec
                    mode="search"
                    key={Show.TVShowTitle}
                    name={Show.TVShowTitle}
                    titleImage={Show.TVShowImage}
                    releaseYear={Show.TVReleaseYear}
                    actors={Show.TVShowActors}
                />
            )
        })
    }

    render(){
        
        return (
            <ScrollView 
                style={{flex:1}} 
                contentContainerStyle={{flexGrow: 1}} 
                stickyHeaderIndices={[0]} 
                showsVerticalScrollIndicator={false}
            >
                <TextInput
                    style={stylesTextInput.input}
                    placeholder='Search by title or actor'
                    onChangeText={(text) => {this.setState({searchTerm: text})}}
                />

                {this.handleListAndSearch()}
            </ScrollView>
        );
    }
}

export default SearchScreen;