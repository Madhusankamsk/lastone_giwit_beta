import { StyleSheet, Text, TouchableOpacity, View,Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { containerFull, goback,logo1 } from '../../../CommonCss/PageCss'
import {Ionicons} from '@expo/vector-icons'
import logo from '../../../../assets/logo.png';
import {formHead3, formInput,formbtn} from '../../../CommonCss/FormCss'


const SignUp_EnterVerification = ({navigation,route}) => {
  const {useremail,userVerificationCode} = route.params;
  const [verificationCode,setVerificationCode] = useState('');
  //console.log("1",verificationCode)
  //console.log("2",userVerificationCode)
  const handleVerificationCode = () =>{
    if(verificationCode != userVerificationCode){
      alert('Invalid Verification Code');
    }
    else if(verificationCode == userVerificationCode){
      alert('Verification Code Matched');
      navigation.navigate('SignUp_ChooseUserName',{email:useremail});
    }
    else{
      alert('Please Try Again');
    }
  }
  return (
    <View style={containerFull} >
      <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={goback}>
        <Ionicons name='arrow-back' size={24} color={'white'} />
        <Text style={{color:'white',fontSize:16,marginLeft: 10}} >Go Back</Text>
      </TouchableOpacity>
      <Image source={logo} style={logo1}/>
      <Text style={formHead3} >A verification code has been sent to your Email.</Text>
      <TextInput placeholder=" Enter 6-digit code " style={formInput}
        onChangeText={(text)=>setVerificationCode(text)}
      />
      <Text style={formbtn} onPress={()=>handleVerificationCode()} >Next</Text>
    </View>
  )
}

export default SignUp_EnterVerification

const styles = StyleSheet.create({})