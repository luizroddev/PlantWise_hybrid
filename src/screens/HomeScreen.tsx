import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../@types/RootStackParamList';
import {ScrollView} from 'react-native-gesture-handler';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/imgs/Mia.png')}></Image>
          <Text
            style={styles.description}
            variant="titleLarge">{`Domine a tecnologia\ncom a Mia como\ncompanhia!`}</Text>
        </View>

        <View style={styles.inputs}>
          <Button
            buttonColor="#7751DB"
            textColor="white"
            contentStyle={{padding: 8, width: '100%'}}
            mode="contained"
            onPress={() => navigation.navigate('Login')}>
            Acessar minha conta
          </Button>
          <Button
            style={styles.registerButton}
            textColor="#7751DB"
            contentStyle={{padding: 8, width: '100%'}}
            mode="outlined"
            onPress={() => navigation.navigate('Register')}>
            Criar minha conta
          </Button>
        </View>
        <Button mode="text" onPress={() => navigation.navigate('Camera')}>
          <Text variant="labelLarge">
            Já possui uma conta?{' '}
            <Text variant="labelLarge" style={{color: '#040305'}}>
              Clique aqui
            </Text>
          </Text>
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    // flex: 1,
    alignItems: 'center',
    // textAlign: 'justify'
  },
  description: {
    marginTop: 8,
    textAlign: 'center',
    color: '#38188C',
  },
  registerButton: {
    borderColor: '#7751DB',
  },
  inputs: {
    rowGap: 10,
  },
});
