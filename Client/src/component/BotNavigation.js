import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Constants from 'expo-constants';
import HomeScreen from '../screens/Home';
import { Ionicons, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profil } from './Profile';
import { Notification } from './Notification';
import { CardNewsByCategory, Search } from './Search';

const Tab = createBottomTabNavigator();

export function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" size={24} color="black" />
                    )
                }}
            />
            <Tab.Screen name="Search" component={Search}
                initialParams={{ category: {} }}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="md-search" size={24} color="black" />
                    )
                }}
            />
            <Tab.Screen name="AddNews" component={HomeScreen}
                screenOptions={() => {

                }}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle" size={37} color="black" />
                    ),
                }}
            />
            <Tab.Screen name="Notification" component={Notification} options={{
                tabBarBadge: 5,
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="notifications-outline" size={24} color="black" />
                )
            }}

            />
            <Tab.Screen name="Profil" component={Profil}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" size={24} color="black" />
                    )
                }}
            />
        </Tab.Navigator>
    );
}


// const Tab = createMaterialTopTabNavigator();

// export function MyTabs() {
//     console.log(Constants.statusBarHeight);
//     return (
//         <Tab.Navigator style={{ marginTop: Constants.statusBarHeight }}>
//             <Tab.Screen name="Home" component={HomeScreen} />
//             <Tab.Screen name="Setting" component={HomeScreen} />
//             <Tab.Screen name="Detail" component={HomeScreen} />
//         </Tab.Navigator>
//     );
// }