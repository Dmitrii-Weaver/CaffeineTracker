import { Heading, Text, VStack } from '@gluestack-ui/themed'
import React, { useState } from 'react'




const CustomChartDay = (coffeeData: any) => {

    const currentdate = new Date()
    const [dailyCoffeeCount, setDailyCoffeeCount] = useState(0)

    console.log(coffeeData)

    const coffeeCountDay = () => {
        var today = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear()
        var coffeesToday = 0

        coffeeData.coffeeData.map((i: any) => {
            var coffeeDate = i.timestamp.day + "/" + i.timestamp.month + "/" + i.timestamp.year
            if (today == coffeeDate) {
                coffeesToday += 1
            }
        })
        return coffeesToday
    }

    const coffeeLogDay = () => {
        var today = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear()
        var log = ""

        coffeeData.coffeeData.map((i: any) => {
            var coffeeDate = i.timestamp.day + "/" + i.timestamp.month + "/" + i.timestamp.year
            if (today == coffeeDate) {
                log = log + "at " + i.timestamp.time + " \n"
            }
        })
        return log
    }

    return (
        <VStack
            justifyContent="center"
            alignItems="center">
            <Heading size="lg" textAlign='center'>Cups of coffee had today: {coffeeData ? (dailyCoffeeCount == 0 ? coffeeCountDay() : dailyCoffeeCount) : 0} </Heading>
            <Text color='black'>{coffeeData ? (dailyCoffeeCount == 0 ? coffeeLogDay() : dailyCoffeeCount) : "none"}</Text>

        </VStack>
    )
}

export default CustomChartDay