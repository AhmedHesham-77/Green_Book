import { Tabs } from 'expo-router';
export default function TabsLayout () {
    return (
        <Tabs>
            <Tabs.Screen name = 'index' options = {{
                headerTitle: 'Home Page',
                title: 'Home',
                headerStyle: {
                    backgroundColor: 'red'
                }
            }} />
            <Tabs.Screen name = 'about' options = {{
                headerTitle: 'About Page',
                title: 'About',
            }} />
            <Tabs.Screen name = 'usersPage' options = {{
                headerTitle: 'Users Page',
                title: 'Users'
            }} />
        </Tabs>
    );
};