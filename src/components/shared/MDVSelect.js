import React from 'react';
import { Select } from '@mantine/core';
import { getPersonByID } from '../../pco/requests';
import { useTranslation } from 'react-i18next';

function MDVSelect(props) {
	const { t } = useTranslation();

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
			creatable={!!props.createNewOption}
			getCreateLabel={(query) => props.labelLookupRequired ? t('create_pco', {query}) : t('create', {query})}
			onCreate={props.createNewOption ? (query) => props.createNewOption(query) : () => null}
			onChange={(query) => changeValue(query)}
			value={props.value}
			maxDropdownHeight={160}
		/>
	);
}

export default MDVSelect;