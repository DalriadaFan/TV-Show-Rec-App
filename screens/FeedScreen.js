import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import Rec from '../components/Medium/Rec';

let recommendationFeedList = [
    {
        RecommendationID:"1",
        TVShowTitle:"Breaking Bad",
        TVShowReleaseYear: "2008",
        TVShowImage: "https://m.media-amazon.com/images/M/MV5BOWNlMjBjZTUtNThiNy00OTkxLThiZTQtNTEyZDliZTM3N2Q0XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg",
        TVShowActors: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
        UserImage:"https://picsum.photos/seed/5picsum/500",
        UserName:"UserName315"
    },
    {
        RecommendationID:"2",
        TVShowTitle:"Stranger Things",
        TVShowReleaseYear: "2016",
        TVShowImage: "https://m.media-amazon.com/images/M/MV5BN2ZmYjg1YmItNWQ4OC00YWM0LWE0ZDktYThjOTZiZjhhN2Q2XkEyXkFqcGdeQXVyNjgxNTQ3Mjk@._V1_.jpg",
        TVShowActors: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
        UserImage:"https://picsum.photos/seed/4picsum/500",
        UserName:"Cool7Bruh"
    },
    {
        RecommendationID:"3",
        TVShowTitle:"The Queen's Gambit",
        TVShowReleaseYear: "2020",
        TVShowImage: "https://m.media-amazon.com/images/M/MV5BM2EwMmRhMmUtMzBmMS00ZDQ3LTg4OGEtNjlkODk3ZTMxMmJlXkEyXkFqcGdeQXVyMjM5ODk1NDU@._V1_.jpg",
        TVShowActors: ["Anya Taylor-Joy", "Chloe Pirrie", "Bill Camp"],
        UserImage:"https://picsum.photos/seed/3picsum/500",
        UserName:"FlixSnob210"
    },
    {
        RecommendationID:"4",
        TVShowTitle:"Ozark",
        TVShowReleaseYear: "2017",
        TVShowImage: "https://dnm.nflximg.net/api/v6/evlCitJPPCVCry0BZlEFb5-QjKc/AAAABfpzB8-17go5xa4ODtv0NBfyvmFgN_n2nxbC5Iw08_4bUUImX6C8x-Ke_ckFv2BxrdFWHCijBFDnTUE6qoXTCo1volY6dA3izJETTzXLapFfaAvjWNxCZVhzKKkF6w.jpg?r=07b",
        TVShowActors: ["Jason Bateman", "Laura Linney", "Sofia Hublitz"],
        UserImage:"https://picsum.photos/seed/3picsum/500",
        UserName:"FlixSnob210"
    },
    {
        RecommendationID:"5",
        TVShowTitle:"Line of Duty",
        TVShowReleaseYear: "2012",
        TVShowImage: "https://m.media-amazon.com/images/M/MV5BMTExZDZjNTMtNDVmNy00ZTk2LWFiMzUtZDlkZGRlOGU0ZWRmXkEyXkFqcGdeQXVyMjExMjk0ODk@._V1_.jpg",
        TVShowActors: ["Martin Compston", "Vicky McClure", "Adrian Dunbar"],
        UserImage:"https://picsum.photos/seed/2picsum/500",
        UserName:"Drag0nSlay3r"
    },
    {
        RecommendationID:"6",
        TVShowTitle:"Chernobyl",
        TVShowReleaseYear: "2019",
        TVShowImage: "https://upload.wikimedia.org/wikipedia/en/a/a7/Chernobyl_2019_Miniseries.jpg",
        TVShowActors: ["Jessie Buckley", "Jared Harris", "Stellan Skarsgård"],
        UserImage:"https://picsum.photos/seed/1picsum/500",
        UserName:"AOTfanboi"
    },
];

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

class FeedScreen extends Component{
    constructor(){
        super();
        this.state={
            searchTerm:""
        };
    }


    handleListAndSearch(){
        let listToRender = recommendationFeedList.filter((Show)=>{
            return (
                Show.TVShowTitle.includes(this.state.searchTerm)
                || Show.TVShowActors.join(" ").includes(this.state.searchTerm)
                || Show.UserName.includes(this.state.searchTerm)
            );
        });

        return this.handleList(listToRender);
    }

    handleList(finalList){
        return finalList.map((Show) =>{
            return (
                <Rec
                    mode="feed"
                    key={Show.RecommendationID}
                    name={Show.TVShowTitle}
                    titleImage={Show.TVShowImage}
                    releaseYear={Show.TVShowReleaseYear}
                    actors={Show.TVShowActors}
                    recUser={Show.UserName}
                    recUserImage={Show.UserImage}
                />
            )
        })
    }

    render(){
        
        return (
            <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow: 1}} stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
                <TextInput
                    style={stylesTextInput.input}
                    placeholder='Search by title, actor, or username'
                    onChangeText={(text) => {this.setState({searchTerm: text})}}
                />

                {this.handleListAndSearch()}
            </ScrollView>
        );
    }
}

export default FeedScreen;