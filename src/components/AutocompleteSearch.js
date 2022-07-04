import React, { forwardRef } from 'react'
import { Autocomplete, Group, Avatar, Text } from '@mantine/core'
import { useHistory } from 'react-router-dom'

const AutoCompleteItem = forwardRef(({ value, image, id, ...others }, ref) => {
	  return (<div ref={ref} {...others}>
		<Group noWrap>
		  <Avatar src={image} />
		  <div>
			<Text>{value}</Text>
		  </div>
		</Group>
	  </div>)
});

function AutocompleteSearch(props) {
	const history = useHistory();
	const handleClick = (item) => history.push('/people/' + item.id)
        return (
            <div>
                <Autocomplete 
					label="Search for a person"
					placeholder="Type a name here..."
					itemComponent={AutoCompleteItem}
					data={props.data}
					onItemSubmit={props.enableRedirect && handleClick}
				/>
            </div>
        )
};

export default AutocompleteSearch