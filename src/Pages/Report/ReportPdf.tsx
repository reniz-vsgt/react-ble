import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
        fontFamily: 'Helvetica',
        lineHeight: 1.5,
        backgroundColor: '#f6f6f5',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottom: '2px solid #83BF8D',
        paddingBottom: 10,
    },
    logo: {
        width: 60,
        height: 60,
    },
    companyDetails: {
        textAlign: 'right',
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#83BF8D',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        marginTop: 20,
        textTransform: 'uppercase',
    },
    personalInfo: {
        marginBottom: 12,
    },
    fieldLabel: {
        fontWeight: 'bold',
        color: '#555',
    },
    fieldValue: {
        marginBottom: 4,
    },
    table: {
        width: 'auto',
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '50%',
        borderBottom: '1px solid #83BF8D',
        padding: 5,
        backgroundColor: '#83BF8D',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableCol: {
        width: '50%',
        borderBottom: '1px solid #ccc',
        padding: 5,
        textAlign: 'center',
    },
    chartSection: {
        marginTop: 20,
        textAlign: 'center',
    },
    chartTitle: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#83BF8D',
    },
    chartImage: {
        width: 250,
        height: 150,
        marginBottom: 10,
    },
    footer: {
        marginTop: 30,
        textAlign: 'center',
        color: '#777',
    },
    smallText: {
        fontSize: 10,
        color: '#555',
    },
});

export const MedicalReport = ({ data }: any) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.headerContainer}>
                <View style={styles.companyDetails}>
                    <Text style={styles.companyName}>Breath AI</Text>
                    <Text>Your Metabolic Profile Report </Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Personal Information</Text>
            <View style={styles.personalInfo}>
                <Text style={styles.fieldLabel}>Name/ID: <Text style={styles.fieldValue}>{data.name}</Text></Text>
                <Text style={styles.fieldLabel}>Age: <Text style={styles.fieldValue}>{data.age}</Text></Text>
                <Text style={styles.fieldLabel}>Diabetic: <Text style={styles.fieldValue}>{data.diabetic}</Text></Text>
                <Text style={styles.fieldLabel}>Gender: <Text style={styles.fieldValue}>{data.gender}</Text></Text>
                <Text style={styles.fieldLabel}>Height: <Text style={styles.fieldValue}>{data.height} cm</Text></Text>
                <Text style={styles.fieldLabel}>Weight: <Text style={styles.fieldValue}>{data.weight} kg</Text></Text>
            </View>

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>Parameter</Text>
                    <Text style={styles.tableColHeader}>Value</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>Estimated Blood Glucose Level</Text>
                    <View style={styles.tableCol}>
                        <Text>{data.bloodGlucose} mg/dL</Text>
                        <Text style={styles.smallText}>(Your estimated range: {data.glucoseRange.lower} - {data.glucoseRange.upper} mg/dL)</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>EE Cal per Minute</Text>
                    <Text style={styles.tableCol}>{data.eeCalPerMin} cal/min</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>Glucose Utilized</Text>
                    <Text style={styles.tableCol}>{data.glucoseUtilized} mg/min</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>Percentage Calories from Glucose</Text>
                    <Text style={styles.tableCol}>{data.percentCaloriesFromGlucose}%</Text>
                </View>
            </View>

            <Text style={styles.footer}>Generated on {data.startTime}</Text>
        </Page>
    </Document>
);

