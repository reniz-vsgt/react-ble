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
    disclaimer:{
        fontSize: 10,
    }
});

export const MedicalReport = ({ data, parameters, bgl }: any) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.headerContainer}>
                <View style={styles.companyDetails}>
                    <Text style={styles.companyName}>Breath AI</Text>
                    <Text>Your {data.title} Profile Report </Text>
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
                <Text style={styles.fieldLabel}>Date and Time: <Text style={styles.fieldValue}>{data.startTime}</Text></Text>
            </View>

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>Parameter</Text>
                    <Text style={styles.tableColHeader}>Value</Text>
                </View>
                {bgl && (
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>{bgl.name}</Text>
                        <View style={styles.tableCol}>
                            <Text>{bgl.bgl} {bgl.unit}</Text>
                            <Text style={styles.smallText}>(Your estimated range: {bgl.range1} - {bgl.range2} {bgl.unit})</Text>
                        </View>
                    </View>
                )}

                {parameters.map((parameter: any) => (
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCol}>{parameter.name}</Text>
                        <Text style={styles.tableCol}>{parameter.value} {parameter.unit}</Text>
                    </View>
                ))}
            {/* <Text style={styles.footer}>Generated on {data.startTime}</Text> */}
            </View>
            <View>
                <Text style={styles.smallText}>
                Breath Band is designed and being developed to be useful as self monitoring and grossly tracking the metabolic and other given vital parameters for relative progress. However, the Breath Band is not a medical device and not recommended for professional medical judgment. Also note that it is not designed or intended for use in the diagnosis of disease or other conditions, or in the cure, mitigation, treatment, or prevention of any condition or disease. Please consult your healthcare provider prior to making any decisions related to your health.
                </Text>
            </View>
        </Page>
    </Document>
);

