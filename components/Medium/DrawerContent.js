import React, { Component, useContext } from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem,
  } from '@react-navigation/drawer';
import{ Drawer } from 'react-native-paper';
import { AuthContext } from '../../contexts/AuthContext';

export function DrawerContent(props){

    const {signOut, getUserInfo} = useContext(AuthContext);

    console.log(getUserInfo())

    //render(){
        return(
            <View style={{flex:1}}>
                <DrawerContentScrollView>

                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        label="Sign Out"
                        onPress={()=>signOut()}
                    />
                </Drawer.Section>
            </View>
        )

    //};
}

const styles = StyleSheet.create({
    bottomDrawerSection:{
        marginBottom:15,
        borderTopColor:"#f4f4f4",
        borderTopWidth:1

    }
})