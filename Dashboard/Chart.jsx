import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";

const Chart = () => {
  const screenWidth = Dimensions.get("window").width;

  // Example data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Example months
    datasets: [
      {
        data: [45, 60, 80, 70, 100, 90], // Participation or impact data
        color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`, // Line color
      },
    ],
  };

  return (
    <View style={{ padding: 10 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Community Participation
      </Text>

      {/* Line Chart */}
      <LineChart
        data={data}
        width={screenWidth - 20} // Adjust width dynamically
        height={220} // Fixed height
        yAxisSuffix=" ppl" // Add a suffix for numbers (e.g., 'ppl' for people)
        chartConfig={{
          backgroundColor: "#022173",
          backgroundGradientFrom: "#1E2923",
          backgroundGradientTo: "#08130D",
          decimalPlaces: 0, // No decimals
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      {/* Bar Chart */}
      <BarChart
        data={data}
        width={screenWidth - 20}
        height={220}
        yAxisSuffix=" ppl"
        chartConfig={{
          backgroundColor: "#000",
          backgroundGradientFrom: "#3b3b3b",
          backgroundGradientTo: "#3b3b3b",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{
          marginTop: 20,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default Chart;
