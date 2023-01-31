import React from 'react'
import {
    Card,
    AreaChart,
    Title,
    Text,
} from '@tremor/react';

const data = [
    {
        Month: 'Jan 21',
        Sales: 2890,
        Profit: 2400,
    },
    {
        Month: 'Feb 21',
        Sales: 1890,
        Profit: 1398,
    },
    // ...
    {
        Month: 'Jan 22',
        Sales: 3890,
        Profit: 2980,
    },
];

const valueFormatter = (number) => `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function DonationExpenseCardChart() {
    return (
        <Card>
            <Title>Performance</Title>
            <Text>Comparison between Sales and Profit</Text>
            <AreaChart
                marginTop="mt-4"
                data={ data }
                categories={ ['Sales', 'Profit'] }
                dataKey="Month"
                colors={ ['indigo', 'fuchsia'] }
                valueFormatter={ valueFormatter }
                height="h-80"
            />
        </Card>
    );
}