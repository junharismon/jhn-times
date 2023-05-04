import { useQuery } from '@apollo/client';
import * as React from 'react';
import { Avatar, Card, IconButton, Text, Button, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GET_NEWS } from '../queries/query';
import { FlatList, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();


export function Search({ route }) {

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const navigation = useNavigation()
    const { category } = route.params
    let { loading, error, data } = useQuery(GET_NEWS)
    if (error) {
        return <ActivityIndicator size={'large'} color={'black'} />
    }
    if (loading) {
        return <Text>Loading....</Text>
    }

    let dataFilter = data.findNews.filter((el) => {
        return el.Category.name === category.name
    })

    return (
        <>
            <SafeAreaView>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <FlatList
                    data={dataFilter}
                    renderItem={({ item }) =>
                        <>
                            <Card>
                                <Card.Content>
                                    <Text variant="titleLarge">{item.title}</Text>
                                    <Text variant="bodyMedium">{item.slug}</Text>
                                    <Text variant="bodyMedium">{item.Category.name}</Text>
                                    <Card.Actions >
                                        <Button onPress={() => {
                                            navigation.navigate("Detail", { slug: item.slug })
                                        }}>Read More</Button>
                                    </Card.Actions>
                                </Card.Content>
                            </Card>

                        </>
                    }
                />
            </SafeAreaView>

        </>
    )
}



