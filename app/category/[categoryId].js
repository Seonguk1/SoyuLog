import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getCategoryById } from '../../src/constants/categories';
import { useItemStore } from "../../src/store/useItemStore";

export default function CategoryList() {
    const router = useRouter();
    const { categoryId } = useLocalSearchParams();
    const category = getCategoryById(categoryId);
    const allItems = useItemStore((state) => state.items);

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
                    <View
                        style={{
                            padding: 12,
                            borderBottomWidth: 1,
                            borderColor: '#ddd',
                        }}
                    >
                        <Text>{item.name}</Text>
                        <Text>{item.price}원</Text>
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

})