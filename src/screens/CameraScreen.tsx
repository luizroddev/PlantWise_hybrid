import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button, Text} from 'react-native-paper';
import {RootStackParamList} from '../@types/RootStackParamList';
import {downloadImage} from '../service/ImageService';
import {AxiosAPIClient} from '../client/AxiosAPIClient';
import {AuthContext} from '../context/AuthContext';
import {IAnalysisResponse} from '../@types/IAnalysisResponse';
import {analyzeImage} from '../service/AnalysisService';

type Props = StackScreenProps<RootStackParamList, 'Camera'>;

export default function CameraScreen({navigation}: Props) {
  const [image, setImage] = useState({uri: '', base64: ''});
  const [result, setResult] = useState<IAnalysisResponse | null>(null);
  const [error, setError] = useState<String | null>(null);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const {user, token} = authContext;

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
            console.log(response.assets[0].uri);
          }
        }
      },
    );
    setResult(null);
    setError(null);
  };

  const handleAnalyzeImage = (base64Image: string) => {
    if (token && user) {
      const data = {
        image: base64Image,
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

    setImage({uri: '', base64: ''});
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <View style={styles.container}>
          {image.uri && (
            <Image
              source={{uri: image.uri}}
              resizeMode="contain"
              style={{
                height: '60%',
                width: '100%',
                backgroundColor: 'black',
              }}></Image>
          )}
          {result && (
            <ScrollView style={styles.textContainer}>
              <View style={styles.textStyle}>
                <Text variant="bodyLarge">
                  Identificamos a planta {result.analise.planta}
                </Text>
                {!result.analise.doencaEncontrada ? (
                  <Text>Não encontramos nada a planta está saudável.</Text>
                ) : (
                  <View>
                    <Text>Descrição sobre a {result.analise.doenca}</Text>
                    <Text>{result.description}</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}

          {error && (
            <View style={styles.textContainer}>
              <Text variant="bodyLarge">{error}</Text>
            </View>
          )}

          <View style={styles.buttonsContainer}>
            <Button
              style={styles.registerButton}
              compact
              textColor="#7751DB"
              contentStyle={{padding: 4}}
              mode="outlined"
              onPress={handleCamera}>
              Tirar foto da folha
            </Button>

            <Button
              style={styles.registerButton}
              textColor="#7751DB"
              compact
              contentStyle={{padding: 4}}
              mode="outlined"
              onPress={handleImageLibrary}>
              Selecionar foto da Galeria
            </Button>
          </View>

          {image.base64 && (
            <Button
              buttonColor="#7751DB"
              textColor="white"
              contentStyle={{padding: 8, width: '100%'}}
              mode="contained"
              onPress={() => handleAnalyzeImage(image.base64)}>
              Enviar para análise
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 8,
  },
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  buttonsContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    rowGap: 20,
  },
  textContainer: {
    padding: 8,
    paddingBottom: 16,
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
