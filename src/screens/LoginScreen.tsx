import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, TextInput, IconButton, Text } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../@types/RootStackParamList';

import { AuthContext } from '../context/AuthContext';
import { AxiosAPIClient } from '../client/AxiosAPIClient';
import { login } from '../service/UserService';
import { IUser } from '../@types/IUser';
import { ScrollView } from 'react-native-gesture-handler';
import { validateEmail } from '../utils/validationUtils';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation, route }) => {
    const [email, setEmail] = useState(route.params?.email || '');
    const [password, setPassword] = useState(route.params?.senha || '');
    const [showPassword, setShowPassword] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const { setUser, setToken } = authContext;

    const handleLogin = () => {
        if (email == '' || password == '') {
            setError('Preencha todos os campos');
            return;
        }

        if (!validateEmail(email)) {
            setError('Digite um email válido');
            return;
        }

        login(new AxiosAPIClient(), email, password)
            .then(result => {
                setToken(result.token);
                setUser({ email: result.email, id: result.id });
                navigation.navigate('Camera');
            })
            .catch(error => {
                console.error('Erro ao tentar fazer login:', error.message);
                setError(error.message);
            });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description} variant="headlineLarge">
                        Bem vindo de volta!
                    </Text>
                    <Text
                        style={[styles.description, styles.descriptionLight]}
                        variant="bodyLarge">
                        É um prazer ver você de novo.
                    </Text>
                </View>

                <View style={styles.inputs}>
                    <TextInput
                        style={{ backgroundColor: '#22B04A' }}
                        outlineStyle={{ borderWidth: 2, backgroundColor: '#22B04A' }}
                        textColor="white"
                        mode="outlined"
                        activeOutlineColor="white"
                        outlineColor="white"
                        label="Seu email"
                        value={email}
                        onChangeText={setEmail}
                        theme={{ colors: { onSurfaceVariant: 'white' } }}
                        left={<TextInput.Icon icon="email" iconColor="white" />}
                    />

                    <TextInput
                        style={{ backgroundColor: '#22B04A' }}
                        outlineStyle={{ borderWidth: 2, backgroundColor: '#22B04A' }}
                        textColor="white"
                        mode="outlined"
                        activeOutlineColor="white"
                        outlineColor="white"
                        label="Sua senha"
                        value={password}
                        secureTextEntry={showPassword}
                        onChangeText={setPassword}
                        theme={{ colors: { onSurfaceVariant: 'white' } }}
                        left={<TextInput.Icon icon="lock" iconColor="white" />}
                        right={
                            <TextInput.Icon
                                iconColor="white"
                                icon={showPassword ? 'eye' : 'eye-off'}
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        }
                    />
                    {error && (
                        <Text style={{ borderRadius: 4, backgroundColor: '#e64b4b', padding: 8, color: 'white' }} variant="labelMedium">
                            Ocorreu o erro: {error}
                        </Text>
                    )}
                    <Button
                        style={{ width: '100%', borderRadius: 16, backgroundColor: 'white' }}
                        contentStyle={{ height: 56 }}
                        mode="contained"
                        textColor="#22B04A"
                        onPress={handleLogin}>
                        Acessar minha conta
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        fontFamily: 'Sora-Bold',
        backgroundColor: '#22B04A',
    },
    header: {
        marginTop: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionContainer: {
        marginTop: 56,
        justifyContent: 'flex-start',
        padding: 16,
    },
    description: {
        color: 'white',
        fontWeight: '600'
    },
    descriptionLight: {
        fontWeight: '400'
    },
    inputs: {
        padding: 16,
        rowGap: 32,
    },
});
