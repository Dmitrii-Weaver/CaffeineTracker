import { Text, VStack } from '@gluestack-ui/themed'
import React from 'react'
import {
    LineChart
} from "react-native-chart-kit";

import { Dimensions } from "react-native";



const CustomLineChartWeek = (coffeeData: any) => {

    const currentdate = new Date()
    var dateText = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear()

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => "black",
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    //console.log("the data is ", coffeeData, typeof (coffeeData))
    //console.log("the data array is ", coffeeData.coffeeData, typeof (coffeeData.coffeeData))
    //console.log("the data cell is ", coffeeData.coffeeData[0])

    let startday = coffeeData.coffeeData.filter((i: any) => {
        let today = new Date().getDate()
        //console.log(new Date().getDate())
        //console.log(i.timestamp.day)
        return i.timestamp.day == today
    })
    let startdayMinus1 = coffeeData.coffeeData.filter((i: any) => {
        let today = new Date().getDay() - 1
        return i.timestamp.day == today
    })
    let startdayMinus2 = coffeeData.coffeeData.filter((i: any) => {
        let today = new Date().getDay() - 2
        return i.timestamp.day == today
    })
    let startdayMinus3 = coffeeData.coffeeData.filter((i: any) => {
        let today = new Date().getDay() - 3
        return i.timestamp.day == today
    })
    let startdayMinus4 = coffeeData.coffeeData.filter((i: any) => {
        let today = new Date().getDay() - 4
        return i.timestamp.day == today
    })
    let startdayMinus5 = coffeeData.coffeeData.filter((i: any) => {
        let today = new Date().getDay() - 5
        return i.timestamp.day == today
    })
    let startdayMinus6 = coffeeData.coffeeData.filter((i: any) => {
        let today = new Date().getDay() - 6
        return i.timestamp.day == today
    })

    const pastWeekDays = () => {
        let weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        const d = new Date();
        let day = weekdays[d.getDay()];
        let index1 = weekdays.indexOf(day)
        let index2 = 0
        let index3 = 0
        let index4 = 0
        let index5 = 0
        let index6 = 0
        let index7 = 0

        //DO NOT OPNE | DEAD INSIDE
        {
            if (index1 - 1 < 0) {
                index2 = 6
            }
            else {
                index2 = index1 - 1
            }

            if (index1 - 2 < 0) {
                index3 = 5
            }
            else {
                index3 = index1 - 2
            }

            if (index1 - 3 < 0) {
                index4 = 4
            }
            else {
                index4 = index1 - 3
            }

            if (index1 - 4 < 0) {
                index5 = 3
            }
            else {
                index5 = index1 - 4
            }

            if (index1 - 5 < 0) {
                index6 = 2
            }
            else {
                index6 = index1 - 5
            }

            if (index1 - 6 < 0) {
                index7 = 1
            }
            else {
                index7 = index1 - 6
            }
        }
        //

        let daysArray = [weekdays[index7], weekdays[index6], weekdays[index5], weekdays[index4], weekdays[index3], weekdays[index2], weekdays[index1],]
        return daysArray
    }

    const days = pastWeekDays()
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
                                
                                3,
                                4,
                                0,
                                2,
                                5,
                                7,
                                9
                            ]
                        }
                    ]
                }}
                width={(Dimensions.get("window").width > 1000 ? (Dimensions.get("window").width / 100 * 18) : (300))} // from react-native
                height={(Dimensions.get("window").width > 1000 ? (Dimensions.get("window").height / 100 * 20) : (220))}
                
                yAxisSuffix=" cups"
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

export default CustomLineChartWeek