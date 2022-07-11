import React from 'react'
import { Card, Text, Group, useMantineTheme } from '@mantine/core';
import { ChevronRight } from 'tabler-icons-react'

function ReportListCard(props) {

	const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];
	  
	return (
		<Card className='report-list-card' shadow="sm" p="md" onClick={() => props.setPage(props.linkTo)}>
			<Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
				<div>
					<Text weight={500}>{props.linkTo.seoName}</Text>
					<Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
						{props.linkTo.description}
					</Text>
				</div>
				<ChevronRight />
			</Group>
      </Card>
	)

}
export default ReportListCard
