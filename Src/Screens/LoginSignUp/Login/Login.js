import { StyleSheet, Text, View, Image, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import logo from '../../../../assets/logo.png';
import { containerFull, logo1,hr80 } from '../../../CommonCss/PageCss';
import {formHead, formInput, formTextLinkRight, formbtn} from '../../../CommonCss/FormCss';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation}) => {


  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');

  const[loading,setLoading] = useState(false);

  const handleLogin = ()=>{
    if(email=='' || password==''){
      alert("Please Enter Email and Password");
    }
    else {
      setLoading(true);
      fetch('http://10.33.102.205:3000/signin', {

          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password})
      })
          .then(res => res.json()).then(
              async data => {
                  if(data.error){
                    setLoading(false);
                    alert(data.error);
                  }
                  else if(data.message == "Successfully Signed In"){
                    setLoading(false);
                    await AsyncStorage.setItem('user',JSON.stringify(data));
                    navigation.navigate('MainPage',{data})
                  }
              })
          .catch(err => {
              setLoading(false);
              alert(err)
          })
  }

    //navigation.navigate('MainPage') // delete this one
  }


  return (
    <View style={containerFull}>
      <Image source={logo} style={logo1}/>
      <Text style={formHead}>Login</Text>
      <TextInput placeholder="Enter Your Email" style={formInput} onChangeText={(text)=>setEmail(text)}/>
      <TextInput placeholder="Enter Your Password" style={formInput} secureTextEntry={true} onChangeText={(text)=>setPassword(text)}/>
      <Text style={formTextLinkRight} onPress={()=>navigation.navigate('ForgotPassword_EnterEmail')} >Forgot Password?</Text>
      {
        loading ? <ActivityIndicator size="large" color="white" /> : 
        <Text style={formbtn} onPress={()=>handleLogin()} >Submit</Text>
      }
      <View style={hr80} ></View>
      <Text>Don't have an account? <Text style={{color:'#1599FF'}} onPress={()=>navigation.navigate('SignUp_EnterEmail')
}> SignUp</Text></Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})


