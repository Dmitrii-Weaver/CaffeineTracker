import React, { useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { firebase } from '../firebaseConfig';
import { Button } from '@gluestack-ui/themed';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const GoogleSignIn = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
        androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
        redirectUri: makeRedirectUri({
            useProxy: true,
        }),
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
            firebase.auth().signInWithCredential(credential)
                .then(userCredential => {
                    console.log('User signed in:', userCredential.user);
                })
                .catch(error => {
                    console.error('Error signing in:', error);
                });
        }
    }, [response]);

    return (
        < GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {
                promptAsync();
            }}
            disabled={!request}
        />


    );
};

export default GoogleSignIn;
