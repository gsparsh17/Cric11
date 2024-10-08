
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import NavigationPage from './NavigationPage';
import JoinLeaguePage from './JoinLeaguePage';
import MatchSchedulePage from './MatchSchedulePage';
import MyMatches from './MyMatches';
import NewsScreen from './NewsScreen';
import CreateTeamPage from './CreateTeamPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }}/>
        <Stack.Screen name="Navigation" component={NavigationPage} options={{ headerShown: false }}/>
        <Stack.Screen name="JoinLeague" component={JoinLeaguePage} options={{ headerShown: false }}/>
        <Stack.Screen name="MyMatches" component={MyMatches} options={{ headerShown: false }}/>
        <Stack.Screen name="Schedule" component={MatchSchedulePage} options={{ headerShown: false }}/>
        <Stack.Screen name="CreateTeam" component={CreateTeamPage} options={{ headerShown: false }}/>
        <Stack.Screen name="News" component={NewsScreen} options={{
    headerStyle: {
      backgroundColor: '#34495e', // Set your desired background color
    },
    headerTintColor: '#ffbc01', // Set text color for back button and title
    headerTitleStyle: {
      fontWeight: 'bold', // Style for the header title
    },
    headerShown: true, // Make sure the header is shown
    title: 'Latest News', // Set a custom title for the screen
  }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
