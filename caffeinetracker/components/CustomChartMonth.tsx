import { Heading, Text, VStack } from '@gluestack-ui/themed'
import React, { useState } from 'react'




const CustomChartMonth = (coffeeData: any) => {

    const currentdate = new Date()
    const [monthlyCoffeeCount, setMonthlyCoffeeCount] = useState(0)

    console.log(coffeeData)

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
            var coffeeDate = + i.timestamp.month + "/" + i.timestamp.year
            if (thisMonth == coffeeDate) {
                log = log + "at " + i.timestamp.time + " \n"
            }
        })
        return log
    }

    return (
        <VStack
            justifyContent="center"
            alignItems="center">
            <Heading size="lg" textAlign='center'>Cups of coffee had this month: {coffeeData ? (monthlyCoffeeCount == 0 ? coffeeCountMonth() : monthlyCoffeeCount) : 0} </Heading>
            <Text color='black'>{coffeeData ? (monthlyCoffeeCount == 0 ? coffeeLogMonth() : monthlyCoffeeCount) : "none"}</Text>
        </VStack>
    )
}

export default CustomChartMonth