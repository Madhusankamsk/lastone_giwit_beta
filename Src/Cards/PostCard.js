import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import SwipeGestures from 'react-native-swipe-gestures';
import { icons3 } from '../CommonCss/PageCss';
import nopicture from '../../assets/nopic.png';

const PostCard = ({
  post,
  index,
  userData,
  tappedPostIndex,
  handleSingleTap,
  handleLongPress,
  handleSwipeRight,
  showCommentsBox,
  setShowCommentsBox,
  commentText,
  setCommentText,
  handleCommentSubmit,
}) => {
  const [liked, setLiked] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(post.like.length);

  const handleSwipeLeft = () => {
    // Handle swipe left action
  };

  const checkIsLiked = async () => {
    try {
      const postId = post._id;
      const userId = userData.user._id;

      const response = await fetch('http://10.33.102.205:3000/islike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId }),
      });

      const data = await response.json();
      setIsLike(data.isLiked);
      setLiked(data.isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIsLiked();
  }, []);

  const handleLikeToggle = async (postIdpass) => {
    const postId = postIdpass;
    const userId = userData.user._id;

    if (liked) {
      // Dislike the post
      await fetch('http://10.33.102.205:3000/dislikepost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId }),
      });
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      // Like the post
      await fetch('http://10.33.102.205:3000/likepost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, userId }),
      });
      setLikeCount((prevCount) => prevCount + 1);
    }

    setLiked(!liked);
  };

  return (
    <SwipeGestures
      onSwipeRight={() => handleSwipeRight(index)}
      key={index}
      onSwipeLeft={handleSwipeLeft}
      config={{
        velocityThreshold: 0.5,
        directionalOffsetThreshold: 200,
      }}
    >
      <TouchableOpacity
        style={styles.container}
        onLongPress={handleLongPress}
        onPress={() => handleSingleTap(index)}
      >
        <Image source={{ uri: post.posturl }} style={styles.image} />

        {tappedPostIndex === index && (
          <View style={styles.description}>
            <View style={styles.userInfo}>
              {post.profilepic ? (
                <Image source={{ uri: post.profilepic }} style={styles.profilePicture} />
              ) : (
                <Image source={nopicture} style={styles.profilePicture} />
              )}
              <Text style={styles.userName}>{post.username}</Text>
            </View>
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionText}>{post.postdescrip}</Text>
            </View>
          </View>
        )}

        <View style={styles.iconContainer}>
          <View style={styles.s21}>
            <AntDesign
              name={liked ? 'heart' : 'hearto'}
              size={24}
              color={liked ? 'black' : 'red'}
              style={liked  ? styles.iconLiked : icons3}
              onPress={() => handleLikeToggle(post._id)}
            />
            <Text style={styles.likeCount}>{likeCount}</Text>
          </View>

          <TouchableOpacity style={styles.s21} onPress={() => setShowCommentsBox(index)}>
            <FontAwesome5 name="comment-alt" size={24} color="white" />
            <Text style={styles.commentCount}>{post.comment.length}</Text>
          </TouchableOpacity>
        </View>

        {showCommentsBox === index && (
          <View style={styles.commentBox}>
            {/* Display existing comments */}
            {post.comment.map((comment, commentIndex) => (
              <Text key={commentIndex} style={styles.commentText}>
                * {comment}
              </Text>
            ))}

            {/* Comment input field */}
            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment..."
              value={commentText}
              onChangeText={setCommentText}
              multiline
              numberOfLines={3}
            />

            {/* Post button */}
            <TouchableOpacity style={styles.commentSubmitButton} onPress={() => handleCommentSubmit(index)}>
              <Text style={styles.commentSubmitButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </SwipeGestures>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 3,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 0,
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  description: {
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  descriptionBox: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  descriptionText: {
    fontSize: 15,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50, // Adjust the height as needed
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 120,
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 12,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  s21: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  likeCount: {
    color: 'white',
    marginLeft: 5,
    fontSize: 15,
  },
  commentCount: {
    color: 'white',
    marginLeft: 5,
    fontSize: 15,
  },
  iconLiked: {
    color: 'red',
  },
  commentBox: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  commentText: {
    color: 'white',
    marginBottom: 5,
  },
  commentInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  commentSubmitButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  commentSubmitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
