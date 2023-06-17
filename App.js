import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Src/Screens/LoginSignUp/Login/Login';
import SignUp_EnterEmail from './Src/Screens/LoginSignUp/SignUp/SignUp_EnterEmail';
import SignUp_AccountCreated from './Src/Screens/LoginSignUp/SignUp/SignUp_AccountCreated';
import SignUp_EnterVerification from './Src/Screens/LoginSignUp/SignUp/SignUp_EnterVerification';
import SignUp_ChooseUserName from './Src/Screens/LoginSignUp/SignUp/SignUp_ChooseUserName';
import SignUp_ChoosePassword from './Src/Screens/LoginSignUp/SignUp/SignUp_ChoosePassword';
import ForgotPassword_EnterEmail from './Src/Screens/LoginSignUp/ForgotPassword/ForgotPassword_EnterEmail';
import ForgotPassword_EnterVerificationCode from './Src/Screens/LoginSignUp/ForgotPassword/ForgotPassword_EnterVerificationCode';
import ForgotPassword_ChoosePassword from './Src/Screens/LoginSignUp/ForgotPassword/ForgotPassword_ChoosePassword';
import ForgotPassword_AccountRecovered from './Src/Screens/LoginSignUp/ForgotPassword/ForgotPassword_AccountRecovered';
import MainPage from './Src/Screens/MainPage/MainPage';
import All_Chats from './Src/Screens/ChatSection/All_Chats';
import MessagePage from './Src/Screens/ChatSection/MessagePage';
import SearchUserPage from './Src/Screens/MainPage/SearchUserPage'
import NotificationPage from './Src/Screens/MainPage/NotificationPage'
import My_UserProfile from './Src/Screens/Profile/My_UserProfile'
import Settings1 from './Src/Screens/Settings/Settings1';
import ChangePassword from './Src/Screens/Settings/ChangePassword';
import EditProfile from './Src/Screens/Settings/EditProfile';
import ChangeUserName from './Src/Screens/Settings/ChangeUserName';
import ChangeDescription from './Src/Screens/Settings/ChangeDescription';
import UploadProfilePicture from './Src/Screens/Settings/UploadProfilePicture';
import AddPost from './Src/Screens/MainPage/AddPost';
import AddPostAI from './Src/Screens/MainPage/AddPostAI';
import Other_UserProfile from './Src/Screens/Profile/Other_UserProfile';
import PostShare from './Src/Components/PostShare'
import PostView from './Src/Components/PostView'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false,animation:'slide_from_left'}}>
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="Login" component={Login} options={{}} />
        <Stack.Screen name="SignUp_EnterEmail" component={SignUp_EnterEmail} />
        <Stack.Screen name="SignUp_EnterVerification" component={SignUp_EnterVerification} />
        <Stack.Screen name="SignUp_AccountCreated" component={SignUp_AccountCreated} />
        <Stack.Screen name="SignUp_ChooseUserName" component={SignUp_ChooseUserName} />
        <Stack.Screen name="SignUp_ChoosePassword" component={SignUp_ChoosePassword} />
        <Stack.Screen name="ForgotPassword_EnterEmail" component={ForgotPassword_EnterEmail} />
        <Stack.Screen name="ForgotPassword_ChoosePassword" component={ForgotPassword_ChoosePassword} />
        <Stack.Screen name="ForgotPassword_EnterVerificationCode" component={ForgotPassword_EnterVerificationCode} />
        <Stack.Screen name="ForgotPassword_AccountRecovered" component={ForgotPassword_AccountRecovered}/>
        <Stack.Screen name="All_Chats" component={All_Chats} options={{animation:'slide_from_bottom'}}/>
        <Stack.Screen name="SearchUserPage" component={SearchUserPage} options={{animation:'slide_from_bottom'}}/>
        <Stack.Screen name="NotificationPage" component={NotificationPage} options={{animation:'slide_from_left'}}/>
        <Stack.Screen name="My_UserProfile" component={My_UserProfile} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="Setting1" component={Settings1} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="ChangeUserName" component={ChangeUserName} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="ChangeDescription" component={ChangeDescription} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="UploadProfilePicture" component={UploadProfilePicture} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="AddPost" component={AddPost} options={{animation:'slide_from_left'}}/>
        <Stack.Screen name="AddPostAI" component={AddPostAI} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="Other_UserProfile" component={Other_UserProfile} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="MessagePage" component={MessagePage} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="PostShare" component={PostShare} options={{animation:'slide_from_right'}}/>
        <Stack.Screen name="PostView" component={PostView} options={{animation:'slide_from_right'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
