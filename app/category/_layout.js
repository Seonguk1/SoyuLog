import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getCategoryById } from '../../src/constants/categories';
export default function CategoryLayout() {
    const router = useRouter();
    const { categoryId } = useLocalSearchParams();
    const category = getCategoryById(categoryId);
    return (
        <SafeAreaView    style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => {
                        router.back();
                    }}
                >
                    <MaterialIcons name="arrow-back" size={40} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {category ? category.name : "추가"}
                </Text>
            </View>
            <Stack
                screenOptions={{
                    headerShown: false  // 헤더 숨기기
                }}
            />
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
        flexDirection: "row",
        alignItems:"center",
    },
    headerTitle: {
        fontSize: 40,
        fontWeight: "bold"
    },
})