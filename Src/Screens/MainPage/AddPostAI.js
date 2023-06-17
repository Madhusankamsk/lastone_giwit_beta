import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { containerFull, goback, hr80, logo1 } from '../../CommonCss/PageCss';
import logo from '../../../assets/logo.png';
import { formbtn, formHead, formHead2, formHead3, formInput, formTextLinkCenter, formTextLinkRight } from '../../CommonCss/FormCss';
import { MaterialIcons } from '@expo/vector-icons';
import openai from 'openai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OPENAI_API_KEY } from '../../Firebase/AiConfig';


const AddPost = ({ navigation }) => {

  const [postdescription, setpostdescription] = useState('');

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [post, setPost] = useState('');

  const pickImage = async () => {
    setLoading1(true);

    // Generate a photo using OpenAI API
    const prompt = 'Generate a photo';
    const response = await openai.complete({
      apiKey: OPENAI_API_KEY,
      engine: 'davinci',
      prompt,
      maxTokens: 50,
      temperature: 0.7,
      topP: 1,
      n: 1,
      stop: '\n',
    });

    if (response && response.choices && response.choices.length > 0) {
      const generatedPhoto = response.choices[0].text.trim();
      setPost(generatedPhoto);
      setLoading1(false);
    } else {
      setLoading1(false);
      setPost(null);
    }
  };

  const handleUpload = () => {
    if (post !== null) {
      AsyncStorage.getItem('user')
        .then((data) => {
          setLoading2(true);

          const generatedPost = post; // The generated photo URL
          const userDescription = postdescription; // The user-provided description

          fetch('http://10.33.102.205:3000/addpost', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              photoURL: generatedPost,
              description: userDescription,
              email: JSON.parse(data).user.email,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.message === 'Post added successfully') {
                alert('Post added successfully');
                setLoading2(false);
                navigation.navigate('My_UserProfile');
              } else {
                alert('Something went wrong, please try again');
                setLoading2(false);
              }
            })
            .catch((error) => {
              alert('Error adding the post');
              setLoading2(false);
              console.error(error);
            });
        })
        .catch((error) => {
          alert('Error retrieving user information');
          setLoading2(false);
          console.error(error);
        });
    } else {
      alert('Please select an image');
    }
  };

  return (
    <View style={containerFull}>
      <TouchableOpacity onPress={() => navigation.navigate('My_UserProfile')} style={goback}>
        <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
        <Text style={{ color: 'gray', fontSize: 16 }}>Go Back</Text>
      </TouchableOpacity>

      <Image source={logo} style={logo1} />
      {loading1 ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <>
          <Text style={formHead2}>Add New Post</Text>

          {post ? (
            <TouchableOpacity onPress={() => pickImage()}>
              <Image source={{ uri: post }} style={{ width: 200, height: 200, marginVertical: 10 }} />
            </TouchableOpacity>
          ) : (
            <Text
              style={styles.addpost}
              onPress={() => {
                pickImage();
              }}
            >
              Click here to generate a new post
            </Text>
          )}
        </>
      )}

      {/*  */}
      <Text style={formHead2}>Change Description</Text>
      <TextInput
        placeholder="Enter new description"
        style={formInput}
        onChangeText={(text) => setpostdescription(text)}
        multiline={true}
        numberOfLines={5}
      />

      {loading2 ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <Text style={formbtn} onPress={() => handleUpload()}>
          Upload
        </Text>
      )}
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  addpost: {
    fontSize: 20,
    fontWeight: '100',
    color: 'skyblue',
    borderColor: 'skyblue',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 30,
    width: '80%',
    textAlign: 'center',
    marginVertical: 20,
  },
});
