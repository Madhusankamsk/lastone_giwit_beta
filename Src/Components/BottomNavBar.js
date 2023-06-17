import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const BottomNavBar = ({ navigation, page }) => {
  const getIconStyle = (selected) => {
    return selected ? styles.activeIcon : styles.icon;
  };

  return (
    <View style={styles.container}>
      <View style={styles.blurView} />

      <View style={styles.iconsContainer}>
        <TouchableOpacity
          style={getIconStyle(page === 'MainPage')}
          onPress={() => navigation.navigate('MainPage')}
        >
          <MaterialCommunityIcons
            name="home-variant"
            size={24}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={getIconStyle(page === 'SearchUserPage')}
          onPress={() => navigation.navigate('SearchUserPage')}
        >
          <Fontisto name="search" size={24} color="black" />
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={getIconStyle(page === 'NotificationPage')}
          onPress={() => navigation.navigate('NotificationPage')}
        >
          <Ionicons name="ios-heart" size={24} color="black" />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={getIconStyle(page === 'My_UserProfile')}
          onPress={() => navigation.navigate('My_UserProfile')}
        >
          <FontAwesome name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNavBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
  },
  blurView: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: '#000000',
    opacity: 0.2,
    zIndex: -1,
  },
  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    padding: 10,
  },
  activeIcon: {
    padding: 10,
    backgroundColor: '#EEEEEE',
    borderRadius: 50,
  },
});
