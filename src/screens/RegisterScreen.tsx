import React, {useContext, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, TextInput, IconButton, Text} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../@types/RootStackParamList';
import {AuthContext} from '../context/AuthContext';
import {register} from '../service/UserService';
import {AxiosAPIClient} from '../client/AxiosAPIClient';
import {ScrollView} from 'react-native-gesture-handler';
import {validateEmail} from '../utils/validationUtils';

type Props = StackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const {setUser} = authContext;

  const handleRegister = () => {
    if (email === '' || name === '' || password === '') {
      setError('Você precisa preencher todos os campos');
      return;
    }

    if (!validateEmail(email)) {
      setError('Digite um email válido');
      return;
    }

    register(new AxiosAPIClient(), {nome: name, senha: password, email})
      .then(result => {
        navigation.navigate('Login', {email, senha: password});
        setUser(result.nome);
      })
      .catch(error => {
        console.error('Erro ao tentar fazer login:', error.message);
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={require('../assets/imgs/Mia.png')}></Image>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.description} variant="headlineLarge">
            Seja bem-vindo
          </Text>
          <Text
            style={[styles.description, styles.descriptionLight]}
            variant="bodyLarge">
            Estou ansiosa para te conhecer!
          </Text>
        </View>

        <Text style={{padding: 16, color: '#370A71'}} variant="bodyLarge">
          Só preciso de alguns dados antes de continuarmos!
        </Text>

        <View style={styles.inputs}>
          <TextInput
            outlineStyle={{borderWidth: 2, backgroundColor: 'white'}}
            textColor="#7519D1"
            mode="outlined"
            activeOutlineColor="#7519D1"
            outlineColor="#7519D1"
            label="Seu nome"
            value={name}
            onChangeText={setName}
            theme={{colors: {onSurfaceVariant: '#7519D1'}}}
            left={<TextInput.Icon icon="account" iconColor="#7519D1" />}
          />

          <TextInput
            outlineStyle={{borderWidth: 2, backgroundColor: 'white'}}
            textColor="#7519D1"
            mode="outlined"
            activeOutlineColor="#7519D1"
            outlineColor="#7519D1"
            label="Seu email"
            value={email}
            onChangeText={setEmail}
            theme={{colors: {onSurfaceVariant: '#7519D1'}}}
            left={<TextInput.Icon icon="email" iconColor="#7519D1" />}
          />

          <TextInput
            outlineStyle={{borderWidth: 2, backgroundColor: 'white'}}
            textColor="#7519D1"
            mode="outlined"
            activeOutlineColor="#7519D1"
            outlineColor="#7519D1"
            label="Sua senha"
            value={password}
            secureTextEntry={showPassword}
            onChangeText={setPassword}
            theme={{colors: {onSurfaceVariant: '#7519D1'}}}
            left={<TextInput.Icon icon="lock" iconColor="#7519D1" />}
            right={
              <TextInput.Icon
                iconColor="#7519D1"
                icon={showPassword ? 'eye' : 'eye-off'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          {error && (
            <Text style={{color: 'red'}} variant="labelMedium">
              Ocorreu o erro: {error}
            </Text>
          )}
          <Button
            style={{width: '100%', borderRadius: 16}}
            contentStyle={{height: 56}}
            mode="contained"
            buttonColor="#9153E1"
            textColor="white"
            onPress={handleRegister}>
            Criar minha conta
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    fontFamily: 'Sora-Bold',
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    marginTop: 56,
    justifyContent: 'flex-start',
    padding: 16,
  },
  description: {
    color: '#7519D1',
    fontFamily: 'Sora-SemiBold',
  },
  descriptionLight: {
    fontFamily: 'Sora-Light',
  },
  inputs: {
    padding: 16,
    rowGap: 32,
  },
});
