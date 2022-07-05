import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from "../screens/FeedScreen";
import SearchScreen from '../screens/SearchScreen.js';
import LoginScreen from '../screens/LoginScreen';
import FriendsScreen from '../screens/FriendsScreen';
import Rec from '../components/Medium/Rec.js';
import { Feather } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

class TabNavigator extends Component{

    render(){
        return (
            <Tab.Navigator 
            screenOptions={{
            headerStyle: {backgroundColor:"#ff4455"},
            headerTitleAlign:"center",
            headerTitleStyle:{color:"white"}, 
            }}
            >
                <Tab.Screen 
                name="Search" 
                component={SearchScreen}
                options={{
                    tabBarActiveTintColor:"red",
                    tabBarIcon:()=><Feather name="search" color="black" size={20} />
                }}
                />

                <Tab.Screen 
                name="Home"
                component={FeedScreen}
                options={{
                    tabBarActiveTintColor:"red",
                    tabBarIcon:({focused,color})=><Feather name="home" focused={focused} color="black" size={20}/>
                }}
                />

                <Tab.Screen 
                name="Favorites" 
                component={Rec}
                options={{
                    tabBarActiveTintColor:"red",
                    tabBarIcon:()=><Feather name="heart" color="black" size={20} />
                }}  
                />

                <Tab.Screen 
                name="Friends" 
                component={FriendsScreen}
                options={{
                    tabBarActiveTintColor:"red",
                    tabBarIcon:()=><Feather name="users" color="black" size={20} />
                }}  
                />

            </Tab.Navigator>
        );    
    }
}

export default TabNavigator;