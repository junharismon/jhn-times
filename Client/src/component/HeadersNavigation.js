import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Octicons, FontAwesome } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

export default function HeadersNavigation() {
    const navigation = useNavigation()
    return (
        <View style={styles.containerTopBar}>
            <Pressable style={styles.topBar} onPress={() => {
                navigation.navigate("Home")
            }}>
                <Octicons name="checklist" size={24} color="black" />
                <Text>BERITA</Text>
            </Pressable>
            <Pressable style={styles.topBar} onPress={() => {
                navigation.navigate("Profil")
            }}>
                <Text style={styles.text}>JHN</Text>
                <FontAwesome name="comment" size={24} color="black" />
            </Pressable>
            <Pressable style={styles.topBar} onPress={() => {
                navigation.navigate("Notification")
            }}>
                <Octicons name="light-bulb" size={24} color="black" />
                <Text style={styles.text}>QUIZ</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTopBar: {
        flexDirection: 'row',
        justifyContent: "center",
        // backgroundColor: 'tomato',
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15


    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
})