
// import React from "react";
// import { View, Dimensions } from "react-native";
// import { LineChart } from "react-native-chart-kit";

// const Chart = () => {
//   const screenWidth = Dimensions.get("window").width;
//   const data = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//     datasets: [
//       {
//         data: [45, 60, 80, 70, 100, 90],
//         color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`, 
//       },
//     ],
//   };

//   return (
//     <View style={{ padding: 10 }}>
//       <LineChart
//         data={data}
//         width={screenWidth - 20} 
//         height={270} 
//         yAxisSuffix="" 
//         chartConfig={{
//           backgroundColor: "#00897B", 
//           backgroundGradientFrom: "#00897B", 
//           backgroundGradientTo: "#00897B",
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
//           labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={{
//           marginVertical: 20,
//           borderRadius: 16,
//           marginTop: -20,
//         }}
//       />
//     </View>
//   );
// };

// export default Chart;


import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const Chart = () => {
  const screenWidth = Dimensions.get("window").width;

  // Reduce the chart width - you can adjust this multiplier as needed
  const chartWidth = screenWidth * 0.85; // 85% of screen width instead of full width
  // Alternative options:
  // const chartWidth = screenWidth - 60; // Fixed padding from edges
  // const chartWidth = 300; // Fixed width

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [45, 60, 80, 70, 100, 90],
        color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`,
      },
    ],
  };

  return (
    <View
      style={{
        padding: 10,
        alignItems: "center", // Center the chart horizontally
      }}
    >
      <LineChart
        data={data}
        width={chartWidth} // Using reduced width
        height={270}
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#00897B",
          backgroundGradientFrom: "#00897B",
          backgroundGradientTo: "#00897B",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 20,
          borderRadius: 16,
          marginTop: -20,
        }}
      />
    </View>
  );
};

export default Chart;