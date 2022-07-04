import React from 'react';
import { NumberInput } from '@mantine/core';

function MDVNumberInput(props) {
 

	return (
		<NumberInput 
			label={props.label}
			parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
			precision={2}
			formatter={(value) =>
				!Number.isNaN(parseFloat(value))
				? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
				: '$ '
			}
			onChange={(query) => props.setAmount(query)}
			value={props.value}

		/>
	);
}

export default MDVNumberInput;