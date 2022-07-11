import React from 'react'
import { Page, Image, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';
import {Table, TableHeader, TableCell, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table';
import logo from '../../../assets/img/logo.png'

const styles = StyleSheet.create({
	page: {
	  //flexDirection: 'row',
	//   backgroundColor: '#E4E4E4',
	  padding: '25mm'
	},
	church: {
		fontSize: '24px',
		marginBottom: '15px',
		margin: '0 auto'
	},
	title: {
		fontSize: '36px',
		margin: '0 auto'
	},
	image: {
		width: '50px',
		margin: '0 auto'
	},
	subtitle: {
		fontSize: '24px',
		margin: '0 auto'
	},
	section: {
	  width: '100%',
	  marginBottom: '15px'
	}
  });
	// Create Document Component
	export const ReportsPDFTemplate = (props) => (
		<Document>
		  <Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Image
					src={logo}
					style={styles.image}
				/>
				<Text style={styles.church}>Bridgeport Manantial de Vida</Text>
				<Text style={styles.title}>{props.title}</Text>
				<Text style={styles.subtitle}>{format(props.dates[0], 'MM/dd/yyyy') + " - " + format(props.dates[1], 'MM/dd/yyyy')}</Text>
			</View>
			<Table data={props.data}>
                    <TableHeader textAlign={"center"}>
                        {props.data.length > 0 && props.data[0].date && <TableCell weighting={0.4}>Date</TableCell>}
						{props.data.length > 0 && props.data[0].dayOfWeek && <TableCell weighting={0.4}>Day</TableCell>}
                        {props.data.length > 0 && props.data[0].donor_name && <TableCell >Donor</TableCell>}
                        {props.data.length > 0 && props.data[0].donation_type && <TableCell>Type</TableCell>}
						{props.data.length > 0 && props.data[0].expense_type && <TableCell weighting={0.4}>Type</TableCell>}
						{props.isDistrictReport ? <TableCell weighting={0.3} >Income</TableCell> : props.data[0].amount && <TableCell weighting={0.3} >Amount</TableCell>}
						{props.isDistrictReport && <TableCell weighting={0.3} >Expenses</TableCell>}
						{props.isDistrictReport && <TableCell weighting={0.3} >Tithe</TableCell>}
					</TableHeader>
                    <TableBody>
                        <DataTableCell weighting={0.4} getContent={(r) => format(r.date.toDate(), 'MM/dd/yyyy')}/>
                        <DataTableCell getContent={(r) => r.donor_name}/>
                        <DataTableCell getContent={(r) => r.donation_type}/>
                        <DataTableCell weighting={0.3} getContent={(r) => `$${r.amount}`}/>
                    </TableBody>
                </Table>
			<View>
				<Text>Total: ${props.total}</Text>
			</View>
		  </Page>
		</Document>
	  );

	