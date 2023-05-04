import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, ScrollView, Button, Pressable } from 'react-native';
import { Octicons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import CardNews from '../component/Card';
import CategoryNavigation from '../component/CategoryNavigation';
import HeadersNavigation from '../component/HeadersNavigation';


export default function HomeScreen() {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <HeadersNavigation />
            <View style={styles.category}>
                <CategoryNavigation />
            </View>
            <CardNews />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        color: '#fff'
    },
    text: {
        color: 'black',
        fontSize: 18
    },

    category: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8E8E8',
        flex: 0.2,
    }

});