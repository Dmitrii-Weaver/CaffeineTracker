import { Text, VStack } from '@gluestack-ui/themed'
import React from 'react'
import {
    LineChart
} from "react-native-chart-kit";

import { Dimensions } from "react-native";



const CustomLineChart = (coffeeData: any) => {

    const currentdate = new Date()
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `"white" , ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const daysInMonth = () => {
        let year = currentdate.getFullYear()
        let month = currentdate.getMonth() + 1
        let days = new Date(year, month, 0).getDate();
        let daysArray = []
        let i = 1
        while (i <= days) {
            daysArray.push(i)
            i += 1
        }
        return daysArray
    }

    const days = daysInMonth()
    console.log(days)

    return (
        <VStack
            justifyContent="center"
            alignItems="center">
            <Text>Cumgobbler's Line Chart</Text>
            <LineChart 
                data={{
                    labels: days,
                    datasets: [
                        {
                            data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]
                        }
                    ]
                }}
                width={Dimensions.get("window").width / 100 * 18} // from react-native
                height={Dimensions.get("window").height / 100 * 20}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </VStack>
    )
}

export default CustomLineChart