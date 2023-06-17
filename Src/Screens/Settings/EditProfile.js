// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { Ionicons } from '@expo/vector-icons';
// import { formHead } from '../../CommonCss/FormCss';



// const EditProfile = ({navigation}) => {
//     return (
//         <View style={styles.container} >
//             <Ionicons name="chevron-back-circle" size={24} color="white" style={styles.gohomeicon} onPress={() => navigation.navigate('My_UserProfile')}/>
//             <Text style={formHead}>Edit Profile</Text>
//             <Text style={styles.txt1} onPress={()=>navigation.navigate('UploadProfilePicture')} >Change Profile Picture</Text>
//             <Text style={styles.txt1} onPress={()=>navigation.navigate('ChangeUserName')}>Change UserName</Text>
//             <Text style={styles.txt1} onPress={()=>navigation.navigate('ChangeDescription')}>Change Description</Text>
            
//         </View>
//     )
// }

// export default EditProfile

// const styles = StyleSheet.create({
//     container: {
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'skyblue'
//     },
//     txt1: {
//         marginTop: 20,
//         color: 'white',
//         fontSize: 20,
//         borderBottomColor: 'gray',
//         borderBottomWidth: 1,
//     }
// })

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
            <View style={styles.mmm}>
            <Text style={formHead}>Edit Profile</Text>
            <Text style={styles.txt1} onPress={()=>navigation.navigate('UploadProfilePicture')} >Change Profile Picture</Text>
            <Text style={styles.txt1} onPress={()=>navigation.navigate('ChangeUserName')}>Change UserName</Text>
            <Text style={styles.txt1} onPress={()=>navigation.navigate('ChangeDescription')}>Change Description</Text>
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