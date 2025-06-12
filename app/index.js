import { useRouter } from "expo-router";
import { useMemo } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { categories } from "../src/constants/categories";
import { palette } from "../src/constants/palette";
import { useItemStore } from "../src/store/useItemStore";
import { heightPercent, scaleFont, widthPercent } from '../src/utils/responsive';
const WIDTH = 500;
const HEIGHT = 1000;
const BOX_COLOR = palette[3];

export default function Index() {
  const router = useRouter();
  const allItems = useItemStore((state) => state.items);
  const totalPrice = useMemo(() => {
    return allItems
      .reduce((sum, item) => sum + item.price, 0);
  }, [allItems]);
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            내 기록
          </Text>
          <TouchableOpacity
            style={styles.headerAddButton}
            onPress={() => {
              router.push(`/category/add`);
            }}
          >
            <Text style={{ fontSize: 40, fontWeight: "bold" }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>
              총 자산 : {totalPrice}원
            </Text>
          </View>
          <View style={styles.categoryListContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryButton}
                onPress={() => {
                  router.push(`/category/${cat.id}`);
                }}

              >
                <Text>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.statisticsContainer}>

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background:{
    flex:1, 
    backgroundColor:"white",
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold"
  },
  headerAddButton: {
    backgroundColor: BOX_COLOR,
    width: widthPercent(10),
    height: widthPercent(10),
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  main: {
    margin: 30,
  },
  summaryBox: {
    width: widthPercent(80),
    height: heightPercent(7),
    backgroundColor: BOX_COLOR,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    paddingLeft: 20,
    marginBottom: 20
  },
  summaryTitle: {
    fontSize: scaleFont(30),
    fontWeight: "bold"
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryButton: {
    width: widthPercent(15),
    height: widthPercent(15),
    backgroundColor: BOX_COLOR,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statisticsContainer: {

  },
})