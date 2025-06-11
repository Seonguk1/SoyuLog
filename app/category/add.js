import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import CategoryPicker from '../../src/components/CategoryPicker';
import { useItemStore } from "../../src/store/useItemStore";
import { heightPercent, widthPercent } from '../../src/utils/responsive';
const InputBox = ({ label, value, onChangeText, inputMode = "text" }) => {
    return (
        <TextInput
            style={styles.textInput}
            placeholder={label}
            placeholderTextColor={"gray"}
            value={value}
            onChangeText={onChangeText}
            inputMode={inputMode}
        />
    )
}


export default function CategoryAdd() {
    const router = useRouter();
    const addItem = useItemStore((state) => state.addItem);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const onSave = () => {
        if (!name || !price || !category) return;

        addItem({
            id: Date.now().toString(),
            name,
            price: parseInt(price),
            categoryId: category, // name이 아니라 id로 저장할 수도 있음
            createdAt: new Date().toISOString(),
        });

        router.back(); // 혹은 특정 페이지로 이동
    };

    return (
        <View style={styles.main}>
            <InputBox
                label="이름"
                value={name}
                onChangeText={setName}
            />
            <InputBox
                label="가격"
                value={price}
                onChangeText={setPrice}
                inputMode="numeric"
            />
            <CategoryPicker selected={category} onSelect={setCategory} />
            <Button title="저장" onPress={onSave} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        margin: 30,
    },
    textInput: {
        width: widthPercent(80),
        height: heightPercent(7),
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        marginBottom: 20,
    },
})