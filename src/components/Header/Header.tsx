import { useNavigation } from '@react-navigation/native'
import { Button, Icon } from '@rneui/themed'
import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

const staticInfo = {
    name: "Jairo Urrego ",
    uri: "https://render.fineartamerica.com/images/rendered/default/greeting-card/images/artworkimages/medium/3/patrick-star-vs-majin-buu-funny-gym-motivation-matthew-chan-transparent.png?&targetx=47&targety=0&imagewidth=606&imageheight=500&modelwidth=700&modelheight=500&backgroundcolor=5abfe0&orientation=0"
}


const Header = () => {

    const { canGoBack, goBack } = useNavigation(); // canGoBack debuelve un boolean y goback me lleva a la ruta anterior

    return (

        <View style={styles.container}>
            {canGoBack() ? (
                <View style={styles.buttonGoBack}>
                    <Button radius={"lg"} type='clear' onPress={() => {
                        goBack()
                    }} >

                        <Icon name="arrow-back" color="#000" size={24} />

                    </Button>
                </View>
            ) : undefined}
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{`Hello ${staticInfo.name}`} </Text>
                <Text style={styles.subTitle} > Welcome back to your goal</Text>
            </View>
            <View style={styles.rightContainer}>
                <Image source={{ uri: staticInfo.uri }} style={styles.profileImage} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        flexDirection: 'row'
    },
    leftContainer: {

        flex: 1,
        justifyContent: 'center',
        // alignItems:'flex-start',
    },
    rightContainer: {

        flex: 1,
        alignItems: 'flex-end',
    },
    name: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 12,
        color: '#808080',

    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 24,
    },
    buttonGoBack: {
        marginLeft:-12
    },
})
export default Header