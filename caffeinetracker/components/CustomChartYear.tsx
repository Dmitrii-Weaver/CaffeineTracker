import { Heading, Text, VStack } from '@gluestack-ui/themed'
import React, { useState } from 'react'




const CustomChartYear = (coffeeData: any) => {

    const currentdate = new Date()
    const [yearlyCoffeeCount, setyearlyCoffeeCount] = useState(0)

    console.log(coffeeData)

    const coffeeCountYear = () => {
        var thisYear = currentdate.getFullYear()
        var coffeesthisYear = 0

        coffeeData.coffeeData.map((i: any) => {
            var coffeeYear = i.timestamp.year
            if (thisYear == coffeeYear) {
                coffeesthisYear += 1
            }
        })
        return coffeesthisYear
    }

    const coffeeLogYear = () => {
        var thisYear = currentdate.getFullYear()
        var months = [
            {
                name: "January",
                code: "01"
            },
            {
                name: "February",
                code: "02"
            },
            {
                name: "March",
                code: "03"
            },
            {
                name: "April",
                code: "04"
            },
            {
                name: "May",
                code: "05"
            },
            {
                name: "June",
                code: "06"
            },
            {
                name: "July",
                code: "07"
            },
            {
                name: "August",
                code: "08"
            },
            {
                name: "September",
                code: "09"
            },
            {
                name: "October",
                code: "10"
            },
            {
                name: "November",
                code: "11"
            },
            {
                name: "December",
                code: "12"
            }
        ]
        var log = ""

        months.forEach( function(l){
            var count = 0
            var coffeeYearMonth = thisYear + "/" + l.code

            coffeeData.coffeeData.map((i: any) => {
                if (coffeeYearMonth == ( i.timestamp.year + "/" +  i.timestamp.month)) {
                    count += 1
                }
            })
            log = log + count + " cups in " + l.name + " \n"

        } )

        
        return log
    }

    return (
        <VStack
            justifyContent="center"
            alignItems="center">
            <Heading size="lg" textAlign='center'>Cups of coffee had this year: {coffeeData ? (yearlyCoffeeCount == 0 ? coffeeCountYear() : yearlyCoffeeCount) : 0} </Heading>
            <Text color='black'>{coffeeData ? (yearlyCoffeeCount == 0 ? coffeeLogYear() : yearlyCoffeeCount) : "none"}</Text>
        </VStack>
    )
}

export default CustomChartYear