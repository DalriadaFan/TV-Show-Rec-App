import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { Component, useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Rec from './components/Medium/Rec.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/LoginScreen.js';
import TabNavigator from './navigation/TabNavigator.js';
import {SecureStore} from 'expo-secure-store';
import { AuthContext } from './contexts/AuthContext.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './components/Medium/DrawerContent.js';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


export default function App() {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token.accessToken,
            userInfo: action.token
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userInfo: "Coolman"
    }
  );

  React.useEffect(() => {
    console.log("new useEffect is working!")
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        let userDetails;

        await fetch('http://192.168.100.164:4000/login', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:');
          userDetails=data;
        })
        .catch((error) => {
          console.error('Error:', error);
        });

        //await SecureStore.setItemAsync(userDetails.username, userDetails)

        console.log(userDetails)

        dispatch({ type: 'SIGN_IN', token: userDetails });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      getUserInfo: ()=>{
        return state.userToken
      }
    }),
    []
  )
  


  



  return (
    <AuthContext.Provider value={authContext}>

      <NavigationContainer>
        {state.userToken == null
        ?
        <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor:"#ff4455"},
          headerTitleAlign:"center",
          headerTitleStyle:{color:"white"},
        }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            screenOptions={{animationTypeForReplace: state.isSignout ? 'pop' : 'push'}}
            />
        </Stack.Navigator>
        :
        <Drawer.Navigator drawerContent={(props)=><DrawerContent {...props}/>}>
          <Drawer.Screen name="home" component={TabNavigator}>
          </Drawer.Screen>
        </Drawer.Navigator>
      }
      </NavigationContainer>

    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
