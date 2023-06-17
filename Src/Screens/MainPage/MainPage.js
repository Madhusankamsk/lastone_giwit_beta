import { StatusBar, StyleSheet, Text, View, ScrollView, RefreshControl, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostCard from '../../Cards/PostCard';
import BottomNavBar from '../../Components/BottomNavBar';
import TopNavBar from '../../Components/TopNavBar';
import nopicture from '../../../assets/nopic.png';

const MainPage = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [liked, setLiked] = useState([]);
  const [showCommentsBox, setShowCommentsBox] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [tappedPostIndex, setTappedPostIndex] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [userData, setUserData] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetch('http://10.33.102.205:3000/feedwall')
      .then((response) => response.json())
      .then((data) => data.reverse())
      .then((data) => {
        setPosts(data);
        setLiked(Array(data.length).fill(false));
      })
      .catch((error) => console.error(error))
      .finally(() => setRefreshing(false));
  }, []);

  const getUserDataFromAsyncStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData !== null) {
        const parsedData = JSON.parse(userData);
        setUserData(parsedData);
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  };

  useEffect(() => {
    onRefresh();
    getUserDataFromAsyncStorage();
  }, []);

  const handleSingleTap = (index) => {
    setTappedPostIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleLongPress = () => {
    navigation.navigate('PostView');
  };

  const handleSwipeLeft = (index) => {
    navigation.navigate('My_UserProfile');
  };

  const handleSwipeRight = (index) => {
    navigation.navigate('PostShare');
  };

  const handleCommentSubmit = (index) => {
    const comment = commentText.trim();
    if (comment) {
      setPosts((prevPosts) => {
        const updatedPosts = [...prevPosts];
        updatedPosts[index].comment.push(comment);
        return updatedPosts;
      });
      setCommentText('');
    }
  };

  const renderItem = ({ item, index }) => (
    <PostCard
      post={item}
      liked={liked}
      index={index}
      userData={userData}
      tappedPostIndex={tappedPostIndex}
      showCommentsBox={showCommentsBox}
      //toggleLike={toggleLike(index)}
      handleSingleTap={handleSingleTap}
      handleLongPress={handleLongPress}
      handleSwipeLeft={handleSwipeLeft}
      handleSwipeRight={handleSwipeRight}
      handleCommentSubmit={handleCommentSubmit}
      setTappedPostIndex={setTappedPostIndex}
      setShowCommentsBox={setShowCommentsBox}
      commentText={commentText}
      setCommentText={setCommentText}
      profilePictureDefault={nopicture}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavBar navigation={navigation} page="MainPage" />
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <BottomNavBar navigation={navigation} page="MainPage" />
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
});










// import { StatusBar, StyleSheet, Text, View, Image, ScrollView, RefreshControl, TouchableOpacity, TextInput } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { AntDesign } from '@expo/vector-icons';
// import { icons1, icons3 } from '../../CommonCss/PageCss';
// import { FontAwesome5 } from '@expo/vector-icons';
// import SwipeGestures from 'react-native-swipe-gestures';
// import nopicture from '../../../assets/nopic.png';
// import BottomNavBar from '../../Components/BottomNavBar'
// import TopNavBar from '../../Components/TopNavBar'
// import AsyncStorage from '@react-native-async-storage/async-storage';



// const MainPage = ({ navigation }) => {

//   const [posts, setPosts] = useState([]);
//   const [liked, setLiked] = useState([]);
//   const [showCommentsBox, setShowCommentsBox] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [tappedPostIndex, setTappedPostIndex] = useState(null);
//   const [commentText, setCommentText] = useState('');
//   const [userData,setUserData] = useState('');

//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     fetch('http://10.33.102.205:3000/feedwall')
//       .then((response) => response.json())
//       .then((data) => data.reverse())
//       .then((data) => {
//         setPosts(data);
//         setLiked(Array(data.length).fill(false));
//       })
//       .catch((error) => console.error(error))
//       .finally(() => setRefreshing(false));
//   }, []);



//   const getUserDataFromAsyncStorage = async () => {
//     try {
//       const userData = await AsyncStorage.getItem('user');
//       if (userData !== null) {
//         const parsedData = JSON.parse(userData);
//         setUserData(parsedData);
//       }
//     } catch (error) {
//       console.log('Error retrieving user data:', error);
//     }
//   };
  


//   useEffect(() => {
//     onRefresh();
//     getUserDataFromAsyncStorage();
//   }, []);

//   const toggleLike = (index) => {
//     setLiked((prevState) => {
//       const newState = [...prevState];
//       newState[index] = !newState[index];

//       console.log(newState);
//       return newState;
//     });
//   };

  

//   //console.log(toggleLike(1));

//   const handleSingleTap = (index) => {
//     setTappedPostIndex((prevIndex) => (prevIndex === index ? null : index));
//   };

//   const handleLongPress = () => {
//     navigation.navigate('PostView');
//   };

//   const handleSwipeLeft = (index) => {
//     navigation.navigate('My_UserProfile');
//   };

//   const handleSwipeRight = (index) => {
//     navigation.navigate('PostShare');
//   };

//   const handleCommentSubmit = (index) => {
//     // Handle the submission of comment for the post at the given index
//     // You can access the comment text from the `commentText` state
//     const comment = commentText.trim();
//     if (comment) {
//       // Update the comment array for the specific post
//       setPosts((prevPosts) => {
//         const updatedPosts = [...prevPosts];
//         updatedPosts[index].comment.push(comment);
//         return updatedPosts;
//       });
//       // Clear the comment input field
//       setCommentText('');
//     }
//   };

//   return (
//     <View style={styles.containerz} >
//       <StatusBar />
//       <TopNavBar navigation={navigation} page="MainPage" />

//       <ScrollView
//         style={styles.container2}
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       >
//         {posts &&
//           posts.map((post, index) => (
//             <SwipeGestures
//               key={index}
//               onSwipeRight={() => handleSwipeRight(index)}
//               config={{
//                 velocityThreshold: 0.5,
//                 directionalOffsetThreshold: 200,
//               }}
//             >
//               <TouchableOpacity
//                 style={styles.container}
//                 onLongPress={handleLongPress}
//                 onPress={() => handleSingleTap(index)}
//               >


//                 <Image source={{ uri: post.posturl }} style={styles.image} />
//                 {tappedPostIndex === index && (
//                   <View style={styles.description}>
//                     <View style={styles.userInfo}>
//                       {
//                         post.profilepic ?
//                         <Image source={{ uri: post.profilepic }} style={styles.profilePicture} />
//                         :
//                         <Image source={nopicture} style={styles.profilePicture} />
//                       }
//                       <Text style={styles.userName}>{post.username}</Text>
//                     </View>
//                     <View style={styles.descriptionBox}>
//                       <Text style={styles.descriptionText}>{post.postdescrip}</Text>
//                     </View>
//                   </View>
//                 )}

//                 <View style={styles.iconContainer}>
//                   <View style={styles.s21}>
//                     {liked[index] ? (
//                       <AntDesign
//                         name="heart"
//                         size={24}
//                         color="black"
//                         style={styles.iconliked}
//                         onPress={() => {
//                           toggleLike(index);
//                         }}
//                       />
//                     ) : (
//                       <AntDesign
//                         name="hearto"
//                         size={24}
//                         color="red"
//                         style={icons3}
//                         onPress={() => {
//                           toggleLike(index);
//                         }}
//                       />
//                     )}
//                     <Text style={styles.likeCount}>{liked[index] ? post.like.length + 1 : post.like.length}</Text>
//                   </View>

//                   <TouchableOpacity
//                     style={styles.s21}
//                     onPress={() => setShowCommentsBox(index)}
//                   >
//                     <FontAwesome5 name="comment-alt" size={24} color="white" />
//                     <Text style={styles.commentCount}>{post.comment.length}</Text>
//                   </TouchableOpacity>
//                 </View>

//                 {showCommentsBox === index && (
//                   <View style={styles.commentBox}>
//                     {/* Display existing comments */}
//                     {post.comment.map((comment, commentIndex) => (
//                       <Text key={commentIndex} style={styles.commentText}> *  {comment}</Text>
//                     ))}

//                     {/* Comment input field */}
//                     <TextInput
//                       style={styles.commentInput}
//                       placeholder="Write a comment..."
//                       value={commentText}
//                       onChangeText={setCommentText}
//                       multiline
//                       numberOfLines={3}
//                     />

//                     {/* Post button */}
//                     <TouchableOpacity
//                       style={styles.commentSubmitButton}
//                       onPress={() => handleCommentSubmit(index)}
//                     >
//                       <Text style={styles.commentSubmitButtonText}>Post</Text>
//                     </TouchableOpacity>
//                   </View>
//                 )}
//               </TouchableOpacity>
//             </SwipeGestures>
//           ))}
//       </ScrollView>

//       <BottomNavBar navigation={navigation} page="MainPage" />
//     </View>
//   );
// };

// export default MainPage;

// const styles = StyleSheet.create({
//   containerz: {
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#EEEEEE',
//   },
//   container2: {
//     width: '100%',
//     flexDirection: 'column',
//   },
//   container: {
//     backgroundColor: 'white',
//     width: '100%',
//     marginBottom: 3,
//     overflow: 'hidden',
//     borderColor: 'black',
//     borderWidth: 0,
//     position: 'relative',
//   },
//   image: {
//     width: '100%',
//     aspectRatio: 2 / 3,
//   },
//   description: {
//     alignItems: 'center',
//     position: 'absolute',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   descriptionBox: {
//     justifyContent: 'center',
//     height: '100%',
//     width: '100%',
//   },
//   descriptionText: {
//     fontSize: 15,
//     color: 'white',
//     //backgroundColor: 'rgba(0, 0, 0, 0.3)',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 5,
//     textAlign: 'center',
//   },
//   iconContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 50, // Adjust the height as needed
//     backgroundColor: 'rgba(0, 0, 0, 0.02)',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 120,
//     alignItems: 'center',
//   },
//   userInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,

//   },
//   profilePicture: {
//     width: 30,
//     height: 30,
//     borderRadius: 12,
//     marginRight: 10,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//   },
  
//   s21: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   likeCount: {
//     color: 'white',
//     marginLeft: 5,
//     fontSize: 15,
//   },
//   commentCount: {
//     color: 'white',
//     marginLeft: 5,
//     fontSize: 15,
//   },
//   iconliked: {
//     color: '#DC143C',
//     marginRight: 5,

//     fontSize: 30,
//     textShadowColor: 'black',
//     textShadowOffset: { width: 0, height: 0 },
//     textShadowRadius: 5
//   },
//   commentBox: {
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 10,
//     width: "80%",
//     top: 300,
//     left: 37
//     ,
//     position: 'absolute'

//   },
//   commentText: {
//     fontSize: 14,
//     marginVertical: 15,
//     marginLeft: 20,
//     color: 'white',

//   },
//   commentInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 8,
//     marginBottom: 8,
//     color: 'white'
//   },
//   commentSubmitButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//     alignItems: 'center',
//   },
//   commentSubmitButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });
