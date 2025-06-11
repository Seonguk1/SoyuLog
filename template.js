import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function Template() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                
            </View>
            <View style={styles.main}>
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    headerContainer: {
        marginVertical: 10,
    },
    main: {
        margin: 30,
    },
})