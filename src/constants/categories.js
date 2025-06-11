// constants/categories.js
export const categories = [
  {
    id: 'cosmetics',
    name: '화장품',
    icon: '💄',        // 나중에 실제 아이콘 라이브러리 써도 돼 (예: react-native-vector-icons)
    color: '#FADADD',
  },
  {
    id: 'clothes',
    name: '옷',
    icon: '👕',
    color: '#CDE7FF',
  },
  {
    id: 'shoes',
    name: '신발',
    icon: '👟',
    color: '#D9D9D9',
  },
  {
    id: 'supplements',
    name: '영양제',
    icon: '💊',
    color: '#FFF2C2',
  }
];

export const getCategoryById = (id) =>
  categories.find((cat) => cat.id === id);
    