import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { formHead } from '../../CommonCss/FormCss';



const Settings1 = ({navigation}) => {
    return (
        <View style={styles.container} >
            <View style={styles.bbbb}>
            <Ionicons name="chevron-back-circle" size={24} color="white" style={styles.gohomeicon}
                onPress={() => navigation.navigate('My_UserProfile')}
            />
            </View>

            <Text style={formHead} >Settings</Text>
            <View style={styles.mmm}>
                <Text style={styles.txt1} onPress={()=>navigation.navigate('EditProfile')}>Edit Profile</Text>
                <Text style={styles.txt1} onPress={()=>navigation.navigate('ChangePassword')}>Change Password</Text>
                <Text style={styles.txt1} >Custom Support</Text>
                <Text style={styles.txt1} onPress={()=>navigation.navigate('Login')} >Log Out</Text>
            </View>

        </View>
    )
}

export default Settings1

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    txt1: {
        marginTop: 20,
        color: 'black',
        fontSize: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    mmm:{
        paddingLeft:10
    },
    gohomeicon:{
        color:'gray'
        
    },
    bbbb:{
        paddingVertical:20,
        paddingHorizontal:20
    }
})