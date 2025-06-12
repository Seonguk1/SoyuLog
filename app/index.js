import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PieChart } from 'react-native-chart-kit';
import { categories } from "../src/constants/categories";
import { palette } from "../src/constants/palette";
import { useItemStore } from "../src/store/useItemStore";
import { heightPercent, scaleFont, widthPercent } from '../src/utils/responsive';
const BOX_COLOR = palette[3];

export default function Index() {
  const router = useRouter();
  const allItems = useItemStore((state) => state.items);
  const totalPrice = useMemo(() => {
    return allItems
      .reduce((sum, item) => sum + item.price, 0);
  }, [allItems]);

  const chartData = useMemo(() => {
    const result = [];

    categories.forEach((cat) => {
      const total = allItems
        .filter((item) => item.categoryId === cat.name) 
        .reduce((sum, item) => sum + item.price, 0);

      if (total > 0) {
        result.push({
          name: cat.name,
          population: total,   
          color: cat.color,    
          legendFontColor: "#333",
          legendFontSize: 14,
        });
      }
    });

    return result;
  }, [allItems]);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            내 기록
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push(`/category/add`);
            }}
          >
            <Ionicons name="add-circle-outline" size={40} color="black" />
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
              <View style={{flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <TouchableOpacity
                  key={cat.id}
                  style={styles.categoryButton}
                  onPress={() => {
                    router.push(`/category/${cat.id}`);
                  }}

                >
                  <Text>{cat.icon}</Text>
                </TouchableOpacity>
                <Text>{cat.name}</Text>
              </View>
            ))}
          </View>
          <View style={styles.statisticsContainer}>
            <PieChart
              data={chartData}
              width={widthPercent(100)}
              height={widthPercent(70)}
              chartConfig={{
                color: () => `rgba(0, 0, 0, 0.5)`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="30"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
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
    borderWidth: 0,
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
    borderWidth: 0,
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
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:10,
  },
  statisticsContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
})