import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Avatar, IconButton, Text } from 'react-native-paper';
import { IAnalysisResponse } from '../@types/IAnalysisResponse';
import { RootStackParamList } from '../@types/RootStackParamList';
import { AxiosAPIClient } from '../client/AxiosAPIClient';
import { AuthContext } from '../context/AuthContext';
import { analyzeImage } from '../service/AnalysisService';

type Props = StackScreenProps<RootStackParamList, 'Camera'>;

export default function CameraScreen({ navigation }: Props) {
    const [image, setImage] = useState({ uri: '', base64: '' });
    const [result, setResult] = useState<IAnalysisResponse | null>(null);
    const [error, setError] = useState<String | null>(null);

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const { user, token } = authContext;

    const handleCamera = () => {
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: true,
            },
            response => {
                if (!response.didCancel) {
                    if (response.assets && response.assets[0]) {
                        setImage({
                            uri: response.assets[0].uri!,
                            base64: response.assets[0].base64!,
                        });
                    }
                }
            },
        );
        setResult(null);
        setError(null);
    };

    const handleImageLibrary = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: true,
                selectionLimit: 1,
            },
            response => {
                if (!response.didCancel) {
                    if (response.assets && response.assets[0]) {
                        setImage({
                            uri: response.assets[0].uri!,
                            base64: response.assets[0].base64!,
                        });
                    }
                }
            },
        );
        setResult(null);
        setImage({ uri: '', base64: '' })
        setError(null);
    };

    const handleAnalyzeImage = () => {
        if (token && user && image && image.base64) {
            const data = {
                image: image.base64,
                userId: user.id,
            };

            analyzeImage(new AxiosAPIClient(), data, token)
                .then(result => {
                    console.log('Resultado da análise:', result);
                    setResult(result as IAnalysisResponse);
                })
                .catch(error => {
                    console.error('Erro ao analisar imagem:', error.message);
                    setError(error.message);
                });
        }
    };

    const handleExitPresentation = () => {
        setResult(null)
        setImage({ uri: '', base64: '' })
        setError(null)
    }

    return (
        <View style={styles.wrapper}>
            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.container}>
                    <ImageBackground source={require('../assets/imgs/background.jpeg')} resizeMode={'cover'} blurRadius={5} style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.3, zIndex: -1 }}>
                    </ImageBackground>
                    {!result && (
                        <View style={styles.selectionWrapper}>
                            <Text variant='headlineSmall' style={{ fontWeight: '600', color: 'white' }}>Faça a análise da sua</Text>
                            <Text variant='headlineSmall' style={{ fontWeight: '400', color: 'white' }}>Planta</Text>

                            <ImageBackground source={require('../assets/imgs/background.jpeg')} resizeMode={'cover'} blurRadius={5} style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.3, zIndex: -1 }}>
                            </ImageBackground>
                            <View style={styles.selectionImage}>
                                {image.uri ? (
                                    <Image
                                        source={{ uri: image.uri }}
                                        resizeMode="cover"
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            height: '80%',
                                            width: '100%',
                                            borderRadius: 16
                                        }}></Image>
                                ) :
                                    <View style={{
                                        backgroundColor: 'white', opacity: 0.9, paddingVertical: 32, paddingHorizontal: 8, alignItems: 'center', justifyContent: 'center',
                                        borderRadius: 16
                                    }}>
                                        <Image
                                            style={{ width: '100%', height: '80%' }}
                                            resizeMode='contain'
                                            source={{ uri: 'https://static.thenounproject.com/png/4428312-200.png' }}></Image>
                                    </View>
                                }
                            </View>
                            <View style={styles.selectionButtons}>
                                <IconButton
                                    icon="camera"
                                    size={32}
                                    iconColor='black'
                                    onPress={handleCamera}
                                />
                                <IconButton
                                    icon="send-circle"
                                    iconColor='green'
                                    size={56}
                                    disabled={!image.base64}
                                    onPress={handleAnalyzeImage}
                                />
                                <IconButton
                                    icon="image"
                                    iconColor='black'
                                    size={32}
                                    onPress={handleImageLibrary}
                                />
                            </View>
                        </View>
                    )}
                </View>
                {result && <View style={styles.presentationWrapper}>
                    <View style={styles.presentationContainer}>
                        <View style={styles.presentationHeader}>
                            <Avatar.Icon size={56} style={{ backgroundColor: result.analise.doencaEncontrada ? '#d24747' : '#37BB64' }} color="white" icon="leaf" />
                            <Text variant='headlineSmall'>{result.analise.planta}</Text>
                            <IconButton
                                icon="close"
                                size={34}
                                onPress={handleExitPresentation}
                            />
                        </View>
                        <Text variant='headlineMedium' style={styles.presentationTitle}>{result.analise.doenca}</Text>
                        <ScrollView style={styles.presentation}>

                            {result.analise.doencaEncontrada ?
                                <Text style={styles.presentationDescription}>{result.description}</Text>
                                :
                                <Text style={styles.presentationDescription}>Não encontramos nenhum problema com a planta {result.analise.planta}.</Text>

                            }
                        </ScrollView>
                    </View>

                </View>}
                {error && (
                    <View>
                        <Text style={{ borderRadius: 4, backgroundColor: '#e64b4b', padding: 8, color: 'white' }} variant="labelMedium">
                            Ocorreu o erro: {error}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        position: 'relative'
    },
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#0a5423',
    },
    selectionWrapper: {
        backgroundColor: '#0a5423',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        flexDirection: 'column',
    },
    selectionImage: {
        width: '100%',
        height: '50%',
        borderRadius: 0,
        marginTop: 32,
        paddingHorizontal: 8,
    },
    selectionButtons: {
        width: '100%',
        height: '15%',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'flex-end',
        position: 'absolute',
        bottom: 0
    },
    presentationWrapper: {
        width: '100%',
        height: '80%',
        position: 'absolute',
        bottom: 0,
    },
    presentationContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        flexDirection: 'column'
    },
    presentationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 16,
        marginBottom: 24
    },
    presentation: {
        rowGap: 32,
        position: 'relative'
    },
    presentationTitle: {
        fontWeight: '500',
        marginBottom: 32,
    },
    presentationDescription: {
        opacity: 0.5
    },
    buttonsWrapper: {
        width: '100%',
        flexDirection: 'column',
        rowGap: 20,
        padding: 8,
        position: 'absolute',
        bottom: 0
    },
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    textStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        fontFamily: 'Sora-Medium',
    },
    registerButton: {
        borderColor: '#7751DB',
        padding: 1,
        margin: 1,
    },
});
