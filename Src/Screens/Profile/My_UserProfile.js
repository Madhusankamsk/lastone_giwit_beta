import { ScrollView, StatusBar, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { containerFull } from '../../CommonCss/PageCss'
import { formHead } from '../../CommonCss/FormCss'
import BottomNavBar from '../../Components/BottomNavBar'
import TopNavBar from '../../Components/TopNavBar'
import { Foundation } from '@expo/vector-icons';
import FollowersRandomPost from '../../Components/FollowersRandomPost'
import AsyncStorage from '@react-native-async-storage/async-storage';
import nopicture from '../../../assets/nopic.png';


const My_UserProfile = ({ navigation }) => {

  const [userdata, setUserData] = useState(null);
  //console.log(userdata)

  const loadata = async () =>{
    AsyncStorage.getItem('user')
      .then((value) => {
        //console.log('async userdata',data);
        //setUserData(JSON.parse(data));
        fetch('http://10.33.102.205:3000/userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(value).token
          },
          body: JSON.stringify({
            email: JSON.parse(value).user.email
          })
        }).then(res => res.json())
          .then(async data => {
            if (data.message == 'User Found') {
              setUserData(data.user)
            } else {
              alert('Login Again');
              navigation.navigate('Login');
            }
          })
          .catch(err => {
            navigation.navigate('Login');
          });
        })
        .catch(err => alert(err));
      }
      useEffect(() => {
        loadata();
      }, [])

      console.log(userdata)
      
      return (
        <View style={styles.container} >
      <StatusBar />
      <TopNavBar navigation={navigation} page="My_UserProfile" />
      <BottomNavBar navigation={navigation} page="My_UserProfile" />
      <Foundation name="refresh" size={24} color="black" style={styles.refresh} onPress={()=>loadata()}/>
      {
        userdata ?
          <ScrollView>
            <View style={styles.c1} >
              {
                userdata.profilepic.length > 0 
                ? 
                <Image style={styles.profilepic} source={{ uri: userdata.profilepic }} />
                :
                <Image style={styles.profilepic} source={nopicture} />
              }

              <Text style={styles.txt} >@{userdata.username}</Text>
              <View style={styles.c11} >
                <View style={styles.c111} >
                  <Text style={styles.txt1} >Followers</Text>
                  <Text style={styles.txt2} >{userdata.followers.length}</Text>
                </View>
                <View style={styles.vr1} ></View>
                <View style={styles.c111} >
                  <Text style={styles.txt1} >Following</Text>
                  <Text style={styles.txt2} >{userdata.following.length}</Text>
                </View>
                <View style={styles.vr1} ></View>
                <View style={styles.c111} >
                  <Text style={styles.txt1} >Posts</Text>
                  <Text style={styles.txt2} >{userdata.posts.length}</Text>
                </View>
              </View>
              {
                userdata.description.length > 0 &&
                <Text style={styles.description} >{userdata.description}</Text>
              }
            </View>
            {
               userdata.posts.length > 0 
              ?
              <View style={styles.c1} >
              <Text style={styles.txt} >Your Posts</Text>
              <View style={styles.c13} >
                {
                  userdata.posts.map(
                    (item) => {
                      return (
                        <Image key={item.post} style={styles.postpic} source={{ uri: item.post }} />
                      )
                    }
                  )
                }
              </View>
            </View>
            :
            <View style={styles.c2} >
              <Text style={styles.txt1}>
                You have not posted anything yet
              </Text>
            </View>
            }

          </ScrollView>
          :
          <ActivityIndicator size="large" color="black" />
      }

    </View>
  )
}

export default My_UserProfile

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingVertical: 50,
  },
  c1: {
    width: '100%',
    alignItems: 'center',
  },
  profilepic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10
  },
  txt: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20
  },
  txt1: {
    color: 'black',
    fontSize: 15,
  },
  txt2: {
    color: 'black',
    fontSize: 20,
  },
  c11: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  c111: {
    alignItems: 'center',
  },
  vr1: {
    width: 1,
    height: 50,
    backgroundColor: 'white'
  },
  description: {
    color: 'black',
    fontSize: 15,
    marginVertical: 10,
    width: '100%',
    padding: 10,
    paddingVertical: 20,
  },
  postpic: {
    width: '30%',
    height: 120,
    margin: 3
  },
  c13: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'center'
  },
  c2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200
  },
  refresh: {
    position: 'absolute',
    top: 50,
    right: 5,
    zIndex: 1,
    fontSize: 30,
    paddingVertical:10
  }
})