import { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { categories } from '../constants/categories'; // 카테고리 목록 import

export default function CategoryPicker({ selected, onSelect }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Text style={styles.label}>카테고리</Text>
      <TouchableOpacity
        style={styles.selectorBox}
        onPress={() => setModalVisible(true)}
      >
        <Text>{selected || '카테고리를 선택하세요'}</Text>
        <Text style={{ fontSize: 16 }}>›</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.modalItem}
              onPress={() => {
                onSelect(cat.name);
                setModalVisible(false);
              }}
            >
              <Text style={{ fontSize: 16 }}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  selectorBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 12,
  },
});
