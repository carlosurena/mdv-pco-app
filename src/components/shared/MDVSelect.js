import React from 'react';
import { Select } from '@mantine/core';
import { getPersonByID } from '../../pco/requests';

function MDVSelect(props) {
 

	const changeValue = (val) => {

		if (props.labelLookupRequired){
			(val) ? getPersonByID(val).then( person => {
				// for Persons
				let name = (person.attributes.first_name ? person.attributes.first_name : '' ) + 
					(person.attributes.middle_name ? ' ' + person.attributes.middle_name : '') + 
					(person.attributes.last_name ? ' ' + person.attributes.last_name : '');
					props.updateLabelName(name)
			}).catch( err => {
				props.updateLabelName('')
			}) : props.updateLabelName('')	
		}
		console.log('setting val to ', val)
		props.setValue(val)
	}

	return (
		<Select 
			data={props.data} 
			label={props.label}
			searchable
			creatable
			getCreateLabel={(query) => `+ Create ${query}`}
			onCreate={(query) => props.createNewOption(query)}
			onChange={(query) => changeValue(query)}
			value={props.value}
			maxDropdownHeight={160}
		/>
	);
}

export default MDVSelect;