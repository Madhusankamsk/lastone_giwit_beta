import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'
import { containerFull, goback,logo1, row } from '../../../CommonCss/PageCss'
import {Ionicons} from '@expo/vector-icons'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import logo from '../../../../assets/logo.png';
import {formHead2,formbtn} from '../../../CommonCss/FormCss'



const ForgotPassword_AccountRecovered = ({navigation}) => {
  return (
    <View style={containerFull} >
      <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={goback}>
        <Ionicons name='arrow-back' size={24} color={'white'} />
        <Text style={{color:'white',fontSize:16,marginLeft: 10}} >Go Back</Text>
      </TouchableOpacity>
      <Image source={logo} style={logo1}/>
      <View style={row} >
        <MaterialCommunityIcons name="check-decagram" size={30} color="#99B8C3" />
        <Text style={formHead2} >Account Recovered Successfully</Text>
      </View>
      <Text style={formbtn} onPress={()=>navigation.navigate('Login')} >Let's Roll</Text>
    </View>
  )
}

export default ForgotPassword_AccountRecovered

const styles = StyleSheet.create({})