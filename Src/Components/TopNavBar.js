import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import logo22 from '../../assets/logo2.png';
import { icons1, logo2 } from '../CommonCss/PageCss';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const TopNavBar = ({ navigation, page }) => {
  return (
    <View style={styles.container}>
      {/* <Ionicons name="chatbubble" size={24} color="Black" style={icons1} onPress={()=>navigation.navigate('All_Chats')} /> */}
      <View style={styles.logoaa}>
        <Image source={logo22} style={logo2} />
      </View>
      {/* {
        page === 'MainPage' && 
        <MaterialIcons name="library-add" size={24} color="Black" onPress={()=>navigation.navigate('AddPostAI')}  style={icons1}/>
      } */}
      {
        page === 'MainPage' &&
        <MaterialIcons name="library-add" size={24} color="Black" onPress={()=>navigation.navigate('AddPost')}  style={[icons1,{ paddingRight: 12 }]}/>
      }
      {
        page === 'My_UserProfile' &&
        <Ionicons name="settings" size={24} color="Black" style={icons1} onPress={()=>navigation.navigate('Setting1')} />
      }
    </View>
  );
};

export default TopNavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    position: 'absolute',
    top: 0,
    zIndex: 100,
    backgroundColor: 'transparent', // Set background color as transparent
  },
  logoaa: {
    paddingLeft: 5,
  }
});
