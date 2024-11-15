import { Heading, Text, VStack } from '@gluestack-ui/themed'
import React, { useState } from 'react'
import { Dimensions } from 'react-native';
import { ContributionGraph } from 'react-native-chart-kit'




const CustomChartMonth = (coffeeData: any) => {

    const screenWidth = Dimensions.get("window").width;

    const currentdate = new Date()
    const [monthlyCoffeeCount, setMonthlyCoffeeCount] = useState(0)

    console.log(coffeeData)

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

    const coffeeCountMonth = () => {
        var thisMonth = (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear()
        var coffeesThisMonth = 0

        coffeeData.coffeeData.map((i: any) => {
            var coffeeDate = i.timestamp.month + "/" + i.timestamp.year
            if (thisMonth == coffeeDate) {
                coffeesThisMonth += 1
            }
        })
        return coffeesThisMonth
    }

    const coffeeLogMonth = () => {
        var thisMonth = (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear()
        var log = ""

        coffeeData.coffeeData.map((i: any) => {
            var coffeeDate =  i.timestamp.month + "/" + i.timestamp.year
            if (thisMonth == coffeeDate) {
                log = log + "at " + i.timestamp.time + " \n"
            }
        })
        return log
    }


    const commitsData = [
        { date: "2017-01-02", count: 1 },
        { date: "2017-01-03", count: 2 },
        { date: "2017-01-04", count: 3 },
        { date: "2017-01-05", count: 4 },
        { date: "2017-01-06", count: 5 },
        { date: "2017-01-30", count: 2 },
        { date: "2017-01-31", count: 3 },
        { date: "2017-01-01", count: 2 },
        { date: "2017-01-02", count: 4 },
        { date: "2017-01-05", count: 2 },
        { date: "2017-01-30", count: 4 }
    ];

    return (
        <VStack
            justifyContent="center"
            alignItems="center">
            <Heading size="lg" textAlign='center'>Cups of coffee had this month: {coffeeData ? (monthlyCoffeeCount == 0 ? coffeeCountMonth() : monthlyCoffeeCount) : 0} </Heading>
            <ContributionGraph
                values={commitsData}
                endDate={new Date(currentdate.getFullYear(), currentdate.getMonth() + 1)}
                numDays={31}
                width={(Dimensions.get("window").width > 1000 ? (Dimensions.get("window").width / 100 * 18) : (300))} // from react-native
                height={(Dimensions.get("window").width > 1000 ? (Dimensions.get("window").height / 100 * 20) : (220))}
                chartConfig={chartConfig}
            />
        </VStack>
    )
}

export default CustomChartMonth