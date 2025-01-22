import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";

const Chart = () => {
  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], 
    datasets: [
      {
        data: [45, 60, 80, 70, 100, 90], 
        color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`, 
      },
    ],
  };

  return (
    <View style={{ padding: 10 }}>
      {/* Line Chart */}
      <LineChart
        data={data}
        width={screenWidth - 20} 
        height={270} 
        yAxisSuffix=" ppl" 

        
        chartConfig={{
          backgroundColor: "#022173",
          backgroundGradientFrom: "#1E2923",
          backgroundGradientTo: "#08130D",
          decimalPlaces: 0, 
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 20,
          borderRadius: 16,
          marginTop: -20
        }}
      />
    </View>
  );
};

export default Chart;
