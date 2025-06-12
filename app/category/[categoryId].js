import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getCategoryById } from '../../src/constants/categories';
import { useItemStore } from "../../src/store/useItemStore";

export default function CategoryList() {
    const router = useRouter();
    const { categoryId } = useLocalSearchParams();
    const category = getCategoryById(categoryId);
    const allItems = useItemStore((state) => state.items);
    const removeItem = useItemStore((state) => state.removeItem);

    // 실제 필터링은 useMemo로 최적화
    const items = useMemo(() => {
        return allItems.filter((item) => item.categoryId === category.name);
    }, [allItems, categoryId]);

    return (

        <View style={styles.main}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <Text style={styles.itemText}>{item.price}원</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => removeItem(item.id)}
                        >
                            <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        margin: 30,
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },
    itemText:{
        fontSize:20,
        fontWeight:"bold"
    },


})