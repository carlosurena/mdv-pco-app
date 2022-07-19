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
	  marginBottom: '15px',
	  display: 'flex'
	},
	signSection: {
		width: '100%',
		flexDirection: 'row',
		marginTop: '25px'
	},
	signature: {
		width: '50%'
	},
	signName: {
		width: '100%',
		textAlign: 'center'
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
                        {props.data.length > 0 && props.data[0].date && <TableCell weighting={0.45} >{t('date')}</TableCell>}
						{props.data.length > 0 && props.data[0].dayOfWeek && <TableCell >{t('day')}</TableCell>}
                        {props.data.length > 0 && props.data[0].donor_name && <TableCell >{t('donor')}</TableCell>}
                        {props.data.length > 0 && props.data[0].donation_type && <TableCell>{t('type')}</TableCell>}
						{props.data.length > 0 && props.data[0].expense_type && <TableCell >{t('type')}</TableCell>}
						{props.isDistrictReport ? <TableCell>{t('income')}</TableCell> : props.data[0].amount && <TableCell >{t('amount')}</TableCell>}
						{props.isDistrictReport && <TableCell>{t('expenses')}</TableCell>}
						{props.isDistrictReport && <TableCell>{t('tithes')}</TableCell>}
					</TableHeader>
                    <TableBody textAlign={"center"}>
						{props.isDistrictReport ? <DataTableCell weighting={0.45} getContent={(r) => format(r.date, 'MM/dd/yyyy')}/>: props.data[0].date && <DataTableCell weighting={0.45} getContent={(r) => format(r.date.toDate(), 'MM/dd/yyyy')}/>}
						{props.data.length > 0 && props.data[0].dayOfWeek && <DataTableCell getContent={(r) => r.dayOfWeek}/>}
						{props.data.length > 0 && props.data[0].donor_name && <DataTableCell getContent={(r) => r.donor_name}/>}
						{props.data.length > 0 && props.data[0].donation_type && <DataTableCell getContent={(r) => r.donation_type}/>}
						{props.data.length > 0 && props.data[0].expense_type && <DataTableCell getContent={(r) => r.expense_type}/>}
						{props.data[0].amount && <DataTableCell getContent={(r) => r.amount ? parseFloat(r.amount).toLocaleString('en-US', { style: 'currency', currency: 'USD'}) : '$0.00'}/>}
						{props.isDistrictReport && (props.data[0].income ? <DataTableCell getContent={(r) => r.income ? parseFloat(r.income).toLocaleString('en-US', { style: 'currency', currency: 'USD'}) : '$0.00'}/> : <DataTableCell getContent={() => '$0.00'}/>)}
						{props.isDistrictReport && (props.data[0].expenses ? <DataTableCell getContent={(r) => r.expenses ? parseFloat(r.expenses).toLocaleString('en-US', { style: 'currency', currency: 'USD'}) : '$0.00'}/> : <DataTableCell getContent={() => '$0.00'}/>)}
						{props.isDistrictReport && (props.data[0].income ? <DataTableCell getContent={(r) => r.income ? parseFloat(r.income).toLocaleString('en-US', { style: 'currency', currency: 'USD'}) : '$0.00'}/> : <DataTableCell getContent={() => '$0.00'}/>)}
                    </TableBody>
                </Table>
			<View>
				<Text>Total: {parseFloat(props.total).toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</Text>
				{ props.isDistrictReport && <Text>Total ({t('income')}): {parseFloat(props.totalDonations).toLocaleString('en-US', { style: 'currency', currency: 'USD'})} </Text>}
				{ props.isDistrictReport && <Text>Total ({t('expenses')}): {parseFloat(props.totalExpenses).toLocaleString('en-US', { style: 'currency', currency: 'USD'})} </Text>}
				{ props.isDistrictReport && <Text>Total ({t('tithes')}): {(parseFloat(props.totalDonations) * .1).toLocaleString('en-US', { style: 'currency', currency: 'USD'})} </Text>}
			</View>

			<View style={styles.signSection}>
				<View style={styles.signature}>
					<Text style={styles.signName}>__________________</Text>
					<Text style={styles.signName}>Pastor</Text>
				</View>
				<View style={styles.signature}>
					<Text style={styles.signName}>__________________</Text>
					<Text style={styles.signName}>{t('secretary')}</Text>
				</View>
			</View>
		  </Page>
		</Document>
	 )};

	