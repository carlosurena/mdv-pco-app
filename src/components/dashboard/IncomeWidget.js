import React from "react";
import { Card, Text, Group } from "@mantine/core";
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function IncomeWidget(props) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Group position="center" mt="md" mb="xs">
        <Text weight={500}>Income Distribution over Last 30 days</Text>
      </Group>
      <Card.Section>
        {/* <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
				<Pie
					data={data}
					cx={120}
					cy={200}
					innerRadius={60}
					outerRadius={80}
					fill="#8884d8"
					paddingAngle={5}
					dataKey="value"
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
			</PieChart> */}
      </Card.Section>
      <Card.Section>legend?</Card.Section>
    </Card>
  );
}

export default IncomeWidget;
