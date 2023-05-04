import { useQuery } from "@apollo/client";
import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { GET_NewsBySlug } from "../queries/query";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


export default function DetailNews({ route }) {
    const navigation = useNavigation()
    const { slug } = route.params
    const { loading, error, data } = useQuery(GET_NewsBySlug, { variables: { slug } })
    console.log(error, ">>>>");
    if (loading) {
        return <ActivityIndicator size={'large'} color={'black'} />
    }
    if (error) {
        return <Text>Error....</Text>
    }

    console.log(data.User, '<<<<<');
    const item = data.findNewsBySlug
    return (
        <>
            <View style={styles.container}>
                <View style={{ marginTop: 100 }}>
                    <Image style={{ width: 350, height: 200, borderRadius: 25 }} source={{ uri: item.imgUrl }} />
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.content}>
                    <Text style={{ marginBottom: 10 }}>{item.content}</Text>
                    <Text>{item.createdAt.split('T')[0]}</Text>
                    <Text>Updated By {item.User.username}</Text>
                </View>
                <Ionicons style={{ marginTop: 50 }} name="arrow-back-circle-outline" size={50} color="black" onPress={() => {
                    navigation.navigate("Home")
                }} />
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    title: {
        fontSize: 30,
        margin: 20
    },
    content: {
        gap: 2,
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
        width: 350
    }
})