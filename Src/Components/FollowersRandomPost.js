// import { StyleSheet, Text, View, Image, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { AntDesign } from '@expo/vector-icons';
// import { icons1, icons3 } from '../CommonCss/PageCss';
// import { FontAwesome } from '@expo/vector-icons';
// import SwipeGestures from 'react-native-swipe-gestures';
// import nopicture from '../../assets/nopic.png';

// const FollowersRandomPost = ({ navigation }) => {
//   const [posts, setPosts] = useState([]);
//   const [liked, setLiked] = useState([]);
//   const [showComments, setShowComments] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [showDescription, setShowDescription] = useState(false);
//   const [tappedPostIndex, setTappedPostIndex] = useState(null);

//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     fetch('http://10.33.102.205:3000/feedwall')
//       .then((response) => response.json())
//       .then((data) => data.sort((a, b) => b.timestamp - a.timestamp))
//       .then((data) => {
//         setPosts(data);
//         setLiked(Array(data.length).fill(false));
//       })
//       .catch((error) => console.error(error))
//       .finally(() => setRefreshing(false));
//   }, []);

//   useEffect(() => {
//     onRefresh();
//   }, []);

//   const toggleLike = (index) => {
//     setLiked((prevState) => {
//       const newState = [...prevState];
//       newState[index] = !newState[index];
//       return newState;
//     });
//   };

//   const handleTap = (post, index) => {
//     if (showDescription && tappedPostIndex === index) {
//       setShowDescription(false);
//       setTappedPostIndex(null);
//     } else {
//       toggleLike(index);
//     }
//   };

//   const handleLongTap = (index) => {
//     if (posts[index].postdescrip) {
//       setShowDescription(true);
//       setTappedPostIndex(index);
//     }
//   };

//   const handleSwipeRight = (index) => {
//     navigation.navigate('PostShare');
//     // toggleLike(index);
//   };

//   return (
//     <ScrollView
//       style={styles.container2}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       {posts &&
//         posts.map((post, index) => (
//           <SwipeGestures
//             key={index}
//             onSwipeRight={() => handleSwipeRight(index)}
//             config={{
//               velocityThreshold: 0.3,
//               directionalOffsetThreshold: 80,
//             }}
//           >
//             <TouchableOpacity
//               style={styles.container}
//               onPress={() => handleTap(post, index)}
//               onLongPress={() => handleLongTap(index)}
//               onLongPressDelay={300} // Adjust the delay value as desired (in milliseconds)
//             >
//               <Image source={{ uri: post.posturl }} style={styles.image} />
//               <View style={styles.c1}>
//                 {post.profilepic ? (
//                   <Image source={{ uri: post.profilepic }} style={styles.profilepic} />
//                 ) : (
//                   <Image source={nopicture} style={styles.profilepic} />
//                 )}

//                 {post.postdescrip ? (
//                   <Text style={styles.username}>{post.username} ...</Text>
//                 ) : (
//                   <Text style={styles.username}>{post.username}</Text>
//                 )}
//               </View>
//               {showDescription && tappedPostIndex === index && (
//                 <View style={styles.description}>
//                   <View style={styles.descriptionBox}>
//                     <Text style={styles.descriptionText}>{post.postdescrip}</Text>
//                   </View>
//                 </View>
//               )}
//               <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
//                 {liked[index] ? (
//                   <View style={styles.s21}>
//                     <AntDesign
//                       name="heart"
//                       size={24}
//                       color="black"
//                       style={styles.iconliked}
//                       onPress={() => {
//                         toggleLike(index);
//                       }}
//                     />
//                     <Text style={styles.liked}>{post.like.length + 1}</Text>
//                   </View>
//                 ) : (
//                   <View style={styles.s21}>
//                     <AntDesign
//                       name="hearto"
//                       size={24}
//                       color="red"
//                       style={icons3}
//                       onPress={() => {
//                         toggleLike(index);
//                       }}
//                     />
//                     <Text style={styles.notliked}>{post.like.length}</Text>
//                   </View>
//                 )}
//               </View>
//             </TouchableOpacity>
//           </SwipeGestures>
//         ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container2: {
//     width: '100%',
//     flexDirection: 'column',
//   },
//   container: {
//     backgroundColor: 'white',
//     width: '100%',
//     marginVertical: 0,
//     overflow: 'hidden',
//     borderColor: 'black',
//     borderWidth: 1,
//     position: 'relative',
//   },
//   c1: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
//   profilepic: {
//     width: 30,
//     height: 30,
//     borderRadius: 30,
//     borderColor: 'white',
//     borderWidth: 1,
//   },
//   username: {
//     color: 'white',
//     marginLeft: 10,
//     fontSize: 15,
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: 0, height: 0.5 },
//     textShadowRadius: 5,
//   },
//   image: {
//     width: '100%',
//     aspectRatio: 1,
//   },
//   description: {
//     alignItems: 'center',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   descriptionBox: {
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     height: '100%',
//     width: '100%',
//   },
//   descriptionText: {
//     fontSize: 10,
//     color: 'white',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 5,
//     textAlign: 'center',
//   },
//   s21: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     display: 'flex',
//     paddingRight: 10,
//   },
//   notliked: {
//     color: 'grey',
//     marginLeft: 5,
//     fontSize: 15,
//   },
//   liked: {
//     color: '#DC143C',
//     marginLeft: 5,
//     fontSize: 15,
//   },
//   iconliked: {
//     color: '#DC143C',
//     fontSize: 20,
//     marginRight: 5,
//   },
// });

// export default FollowersRandomPost;
