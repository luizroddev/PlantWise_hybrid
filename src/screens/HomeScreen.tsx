import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../@types/RootStackParamList';
import { ScrollView } from 'react-native-gesture-handler';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/imgs/PlantWise.png')}></Image>
                    <Text
                        style={styles.description}
                        variant="titleLarge">{`Preservando a Agricultura com Precisão e Tecnologia`}</Text>
                </View>

                <View style={styles.inputs}>
                    <Button
                        buttonColor="white"
                        textColor='#22B04A'
                        contentStyle={{ padding: 8, width: '100%' }}
                        mode="contained"
                        onPress={() => navigation.navigate('Login')}>
                        Acessar minha conta
                    </Button>
                    <Button
                        style={styles.registerButton}
                        textColor="white"
                        contentStyle={{ padding: 8, width: '100%' }}
                        mode="outlined"
                        onPress={() => navigation.navigate('Register')}>
                        Criar minha conta
                    </Button>
                </View>
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
        backgroundColor: '#22B04A',
    },
    header: {
        alignItems: 'center',
    },
    description: {
        marginTop: 8,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },
    registerButton: {
        borderColor: 'white',
        borderWidth: 2
    },
    inputs: {
        rowGap: 10,
    },
});
