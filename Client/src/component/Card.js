import { useQuery } from '@apollo/client';
import { FlatList, Text, View, Image, StyleSheet, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import { GET_NEWS } from '../queries/query';
import { useNavigation }
    from '@react-navigation/native'


export default function CardNews() {
    const navigation = useNavigation()
    const { loading, error, data } = useQuery(GET_NEWS)
    console.log(loading, error, data, "<<<");
    if (error) {
        return <ActivityIndicator size={'large'} color={'black'} />
    }
    if (loading) {
        return <Text>Loading....</Text>
    }
    return (
        <View style={{ backgroundColor: '#E8E8E8', flex: 3, alignItems: 'center' }}>
            <FlatList
                data={data.findNews}
                ListHeaderComponent={
                    <View style={styles.card} >
                        <Image source={{ uri: 'https://images.unsplash.com/photo-1681412327205-af22c0849ee5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' }} style={{ width: 350, height: 250, borderRadius: 25 }} />
                    </View>}
                renderItem={({ item }) =>
                    <>
                        <TouchableOpacity onPress={() => {
                            navigation.push("Detail", {
                                slug: item.slug
                            })
                        }}>
                            <View style={styles.listCard} >
                                <View style={{ marginLeft: 20, width: '40%' }}>
                                    <Text style={{ fontSize: 22, fontStyle: 'italic' }}>{item.title}</Text>
                                    <Text style={{ fontSize: 16, fontStyle: 'italic' }}>{item.Category.name}</Text>
                                    <Text style={{ fontSize: 16, fontStyle: 'italic' }}>{item.createdAt.split('T')[0]}</Text>
                                </View>
                                <View style={{ marginRight: 20, }} >

                                    <Image style={{ width: 150, height: 100, borderRadius: 25 }} source={{ uri: item.imgUrl }} />

                                </View>
                            </View>
                        </TouchableOpacity>
                    </>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listCard: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    text: {
        color: 'black',
        fontSize: 18
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        flex: 2,
        paddingBottom: 15,
        paddingTop: 15
    },
});