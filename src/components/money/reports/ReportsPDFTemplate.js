import React from 'react'
import { Page, Image, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';
import {Table, TableHeader, TableCell, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table';
import logo from '../../../assets/img/logo.png'
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
	page: {
	  //flexDirection: 'row',
	//   backgroundColor: '#E4E4E4',
	  padding: '20mm'
	},
	church: {
		fontSize: '16px',
		marginBottom: '15px',
		margin: '0 auto'
	},
	title: {
		fontSize: '20px',
		margin: '0 auto'
	},
	image: {
		width: '150px',
		margin: '0 auto'
	},
	subtitle: {
		fontSize: '16px',
		margin: '0 auto'
	},
	section: {
	  width: '100%',
	  marginBottom: '15px'
	}
  });

	// Create Document Component
	 export function ReportsPDFTemplate(props) {
		const { t } = useTranslation();
		return (
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
                        {props.data.length > 0 && props.data[0].date && <TableCell weighting={0.4}>{t('date')}</TableCell>}
						{props.data.length > 0 && props.data[0].dayOfWeek && <TableCell weighting={0.4}>{t('day')}</TableCell>}
                        {props.data.length > 0 && props.data[0].donor_name && <TableCell >{t('donor')}</TableCell>}
                        {props.data.length > 0 && props.data[0].donation_type && <TableCell>{t('type')}</TableCell>}
						{props.data.length > 0 && props.data[0].expense_type && <TableCell weighting={0.4}>{t('type')}</TableCell>}
						{props.isDistrictReport ? <TableCell weighting={0.3} >{t('income')}</TableCell> : props.data[0].amount && <TableCell weighting={0.3} >{t('amount')}</TableCell>}
						{props.isDistrictReport && <TableCell weighting={0.3} >{t('expenses')}</TableCell>}
						{props.isDistrictReport && <TableCell weighting={0.3} >{t('tithes')}</TableCell>}
					</TableHeader>
                    <TableBody>
						{props.isDistrictReport ? <DataTableCell weighting={0.4} getContent={(r) => format(r.date, 'MM/dd/yyyy')}/>: props.data[0].date && <DataTableCell weighting={0.4} getContent={(r) => format(r.date.toDate(), 'MM/dd/yyyy')}/>}
						{props.data.length > 0 && props.data[0].dayOfWeek && <DataTableCell weighting={0.4} getContent={(r) => r.dayOfWeek}/>}
						{props.data.length > 0 && props.data[0].donor_name && <DataTableCell getContent={(r) => r.donor_name}/>}
						{props.data.length > 0 && props.data[0].donation_type && <DataTableCell getContent={(r) => r.donation_type}/>}
						{props.data.length > 0 && props.data[0].expense_type && <DataTableCell getContent={(r) => r.expense_type}/>}
						{props.data[0].amount && <DataTableCell weighting={0.3} getContent={(r) => r.amount ? `$${r.amount}` : '$0'}/>}
						{props.isDistrictReport && (props.data[0].income ? <DataTableCell weighting={0.3} getContent={(r) => r.income ? `$${r.income}` : '$0'}/> : <DataTableCell getContent={() => '$0'}/>)}
						{props.isDistrictReport && (props.data[0].expenses ? <DataTableCell weighting={0.3} getContent={(r) => r.expenses ? `$${r.expenses}` : '$0'}/> : <DataTableCell getContent={() => '$0'}/>)}
						{props.isDistrictReport && (props.data[0].income ? <DataTableCell weighting={0.3} getContent={(r) => r.income ? `$${(parseFloat(r.income)*.1).toFixed(2)}` : '$0'}/> : <DataTableCell getContent={() => '$0'}/>)}
                    </TableBody>
                </Table>
			<View>
				<Text>Total: ${props.total}</Text>
				{ props.isDistrictReport && <Text>Total ({t('income')}): ${props.totalDonations} </Text>}
				{ props.isDistrictReport && <Text>Total ({t('expenses')}): ${props.totalExpenses} </Text>}
				{ props.isDistrictReport && <Text>Total ({t('tithes')}): ${(parseFloat(props.totalDonations)*.1).toFixed(2)} </Text>}
			</View>
		  </Page>
		</Document>
	 )};

	