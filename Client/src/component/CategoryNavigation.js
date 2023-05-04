import { View, FlatList, Text, StyleSheet } from "react-native"
import { useQuery } from '@apollo/client';
import { GET_CATEGORY } from '../queries/query';
import { useNavigation } from '@react-navigation/native'

export default function CategoryNavigation() {
    const { loading, error, data } = useQuery(GET_CATEGORY)
    const navigation = useNavigation()
    if (error) {
        return <ActivityIndicator size={'large'} color={'black'} />
    }
    if (loading) {
        return <Text>Loading....</Text>
    }
    return (
        <View>
            <FlatList
                horizontal={true}
                data={data.findCategory}
                renderItem={({ item }) => <Text onPress={() => {
                    navigation.navigate("Search", { category: item })
                }} style={styles.textCategory} >{item.name} </Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textCategory: {
        fontSize: 16,
        marginLeft: 10,
        alignItems: 'center',
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        borderStyle: "solid"
    }
})