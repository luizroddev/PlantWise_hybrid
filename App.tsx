import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
    configureFonts, MD3LightTheme,
    PaperProvider
} from 'react-native-paper';
import { RootStackParamList } from './src/@types/RootStackParamList';
import { AuthProvider } from './src/context/AuthContext';
import CameraScreen from './src/screens/CameraScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createStackNavigator<RootStackParamList>();

const fontConfig = {
    fontFamily: 'Sora-Medium',
};

export default function App() {
    const theme = {
        ...MD3LightTheme,
        fonts: configureFonts({ config: fontConfig }),
    };

    return (
        <PaperProvider theme={theme}>
            <AuthProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={HomeScreen} options={{
                            headerShown: false, headerTitle: '',
                            headerStyle: {
                                backgroundColor: '#22B04A',
                            },
                        }} />
                        <Stack.Screen name="Register" component={RegisterScreen} options={{
                            headerTitle: 'Crie sua conta', headerStyle: {
                                backgroundColor: 'white',
                                borderColor: 'white'
                            },
                            headerTintColor: '#22B04A',
                            headerTitleStyle: {
                                color: '#22B04A'
                            }
                        }} />
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            initialParams={{ email: '', senha: '' }}
                            options={{
                                headerTitle: 'Acessar sua conta', headerStyle: {
                                    backgroundColor: 'white',
                                    borderColor: 'white'
                                },
                                headerTintColor: '#22B04A',
                                headerTitleStyle: {
                                    color: '#22B04A'
                                }
                            }}
                        />
                        <Stack.Screen name="Camera" component={CameraScreen} options={{
                            headerTitle: 'Analise suas plantas', headerStyle: {
                                backgroundColor: 'white',
                                borderColor: 'white'
                            },
                            headerTintColor: '#22B04A',
                            headerTitleStyle: {
                                color: '#22B04A'
                            }
                        }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthProvider>
        </PaperProvider>
    );
}
