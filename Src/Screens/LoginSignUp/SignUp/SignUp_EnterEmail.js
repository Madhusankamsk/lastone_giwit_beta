import { StyleSheet, Text, TouchableOpacity, View,Image, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { containerFull, goback,logo1 } from '../../../CommonCss/PageCss'
import {Ionicons} from '@expo/vector-icons'
import logo from '../../../../assets/logo.png';
import {formHead2, formInput,formbtn} from '../../../CommonCss/FormCss'


const SignUp_EnterEmail = ({navigation}) => {
  const [email,setEmail] = useState('');
  const [loading,setLoading] = useState(false);
  const handleEmail = ()=>{
    //setLoading(true);
    //navigation.navigate('SignUp_EnterVerification')
    if(email==""){
      alert("Please Enter Email");
    }
    else{
      setLoading(true);
      fetch('http://10.33.102.205:3000/verify',{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          email:email
        })
      })
      .then(res=>res.json())
      .then(
        data => {
          //console.log(data.VerificationCode);
          if(data.error === 'Invalid Credentials'){
            alert("Invalid Credentials")
            setLoading(false);
          }else if(data.message == "Verification Code Sent to your Email"){
            setLoading(false);
            alert(data.message);
            navigation.navigate('SignUp_EnterVerification',{useremail : data.email , userVerificationCode : data.VerificationCode})
            //console.log("mm",data.verificationCode)
          }
        }
      )
    }
  }
  return (
    <View style={containerFull} >
      <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={goback}>
        <Ionicons name='arrow-back' size={24} color={'white'} />
        <Text style={{color:'white',fontSize:16,marginLeft: 10}} >Go Back</Text>
      </TouchableOpacity>
      <Image source={logo} style={logo1}/>
      <Text style={formHead2} >Create a New Account</Text>
      <TextInput placeholder="Enter Your Email" style={formInput}
      onChangeText={(text)=>{
        setEmail(text);
      }}
      />

      {
        loading ?
        <ActivityIndicator size="large" color="white" />
        : <Text style={formbtn} onPress={()=>handleEmail()} >Next</Text>

      }

    </View>
  )
}

export default SignUp_EnterEmail

const styles = StyleSheet.create({})