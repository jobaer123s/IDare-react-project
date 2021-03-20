import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart,Line } from 'recharts';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// react pdf viewer
import ReactPDF, {Document, Font, Image, Page, PDFDownloadLink, StyleSheet, Text, View, Link,pdf} from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import getConfig from 'next/config'

import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'
import Avatar from 'react-avatar';
const config = getConfig();
library.add(faTimes,fab,faStroopwafel,faPlus,faAngleRight,faTrash);
// validation disable function


const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};



const email = (value) => {
    if (!isEmail(value)) {
        return <span className="form-error is-visible" style={{color:'#ff433f', display:'block', marginTop:'5px'}}>{value} is not a valid email!</span>;
    }
};


class PdfDownload extends React.Component {

    static getInitialProps ({ query: { userParamId,employeeParamId } }) {
        console.log('getInitialProps colling ...');
        return { userParamId: userParamId , employeeParamId: employeeParamId }
    }

    constructor(props) {
        super(props);
        this.state = {
            firstName :"",
            lastName :"",
            phone :"",
            emailId:"",
            userType:"",
            password:"",
            checkTwoFactor:false,
            passwordTab:false,
            accountTab:true,

            userParamId:this.props.userParamId,
            employeeParamId:this.props.employeeParamId,

            companyList:[],
            userTypeList:[],
            userCompanyList:[],
            csvData: [],
            isLocked:'',
            projectName: JSON.parse(localStorage.getItem( "projectName")),
            projectDescription: JSON.parse(localStorage.getItem( "projectDescription")),
            client: JSON.parse(localStorage.getItem( "client")),
            contractor: JSON.parse(localStorage.getItem( "contractor")),

        };

        this.handleFirstName = this.handleFirstName.bind(this);

    }


    handleFirstName(event) {  this.setState({ firstName: event.target.value });    }

    // back

    backPage() {
        window.history.back()
    }


    componentDidMount() {
        console.log('componentDidMount colling ...',this.state.csvData);

    }

    handleForce = (data, fileInfo) =>{
        this.setState({csvData:data,csvDataShow:true})
        console.log(data, fileInfo)
    };




    render () {

        return(
                <Document>
                    <Page wrap size="A4" style={this.props.fontFamily === '' ?
                        {paddingTop: '15px', paddingBottom: '65px'} :
                        {
                            paddingTop: '15px',
                            paddingBottom: '65px',
                            fontFamily: this.props.fontFamily
                        }}>

                        <View  style={styles.headText}>
                            <Text style={{textAligh: 'center'}}>Input data in PDF</Text>
                        </View>

                        <View >
                            <View style={styles.tableRowHead}>

                                <View  style={styles.tableColLeft}>
                                    <Text  style={styles.tableCellHead}><Text
                                        style={{fontFamily: this.props.fontFamilyBold}}>max_X</Text></Text>
                                </View>

                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCellHead}><Text
                                        style={{fontFamily: this.props.fontFamilyBold}}>min_X</Text></Text>
                                </View>

                                <View  style={styles.tableCol}>
                                    <Text style={styles.tableCellHead}><Text
                                        style={{fontFamily: this.props.fontFamilyBold}}>max_Y</Text></Text>
                                </View>

                                <View   style={styles.tableCol}>
                                    <Text  style={styles.tableCellHead}><Text
                                        style={{fontFamily: this.props.fontFamilyBold}}>min_Y</Text></Text>
                                </View>

                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCellHead}><Text
                                        style={{fontFamily: this.props.fontFamilyBold}}>max_Z</Text></Text>
                                </View>

                                <View  style={styles.tableCol}>
                                    <Text  style={styles.tableCellHead}><Text
                                        style={{fontFamily: this.props.fontFamilyBold}}>min_Z</Text></Text>
                                </View>

                            </View>

                            <View style={styles.tableRow}>

                                <View style={styles.tableColLeftBelow}>
                                    <Text style={styles.tableCell}>{this.props.maxX}</Text>
                                </View>

                                <View style={styles.tableColBelow}>
                                    <Text style={styles.tableCell}>{this.props.minX}</Text>
                                </View>

                                <View style={styles.tableColBelow}>
                                    <Text style={styles.tableCell}>{this.props.maxY}</Text>
                                </View>

                                <View style={styles.tableColBelow}>
                                    <Text style={styles.tableCell}>{this.props.minY}</Text>
                                </View>

                                <View style={styles.tableColBelow}>
                                    <Text style={styles.tableCell}>{this.props.maxZ}</Text>
                                </View>

                                <View style={styles.tableColBelow}>
                                    <Text style={styles.tableCell}>{this.props.minZ}</Text>
                                </View>

                            </View>

                        </View>


                    </Page>

                </Document>

        );
    }
}

Font.register({
    family: 'FiraSans',
    src: 'http://fonts.gstatic.com/s/firasans/v7/E cDxXwCLxiixG1c.ttf', fontStyle: 'italic'
});

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf', fontStyle: 'italic'
});

Font.register({
    family: 'Source Sans Pro',
    src: 'https://fonts.gstatic.com/s/sourcesanspro/v13/6xK3dSBYKcSV-LCoeQqfX1RYOo3qNK7lqDY.woff2', fontStyle: 'italic'
});



const styles = StyleSheet.create({
    body: {
        paddingTop: 15,
        paddingBottom: 65,

    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },

    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        marginLeft:25
    },

    headText: {
        margin: 12,
        marginBottom: 20,
        fontSize: 14,
        textAlign: 'center',
    },

    textNotesTitle: {
        margin: 12,
        fontSize: 12,
        textAlign: 'left',
        marginLeft:25,
        borderBottom: '1 solid #ccc',
    },

    textDate: {
        margin: 12,
        fontSize: 11,
        textAlign: 'left',
        marginLeft:25,
        marginBottom:0,
        width: '303px',
        marginTop: 7
    },

    dueDate: {
        margin: 12,
        fontSize: 11,
        marginBottom:0,
        marginLeft:0,
        fontWeight:600,
        textAlign: 'right',
        width: '230px',
        marginTop: 7
    },

    textAddress: {
        fontSize: 11,
        textAlign: 'justify',
        marginLeft:25,
        marginRight:25,
        borderBottom:'1 solid #ccc',
        paddingBottom: 15
    },

    textName: {
        fontSize: 14,
        textAlign: 'justify',
        marginLeft:25,
        paddingTop: 27,
        paddingBottom: 6,
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 9,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },


    table: {
        display: "table",
        width: "auto",
        border: "1px solid #ccc",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        // marginLeft:25,
        // marginRight:25,
        marginTop: 50,

    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },

    tableRowHead: {
        margin: "auto",
        flexDirection: "row",
        border: "1px solid #ccc",
    },

    tableCol: {
        width: "15%",
        border: "1px solid #ccc",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 1,
        padding: 5
    },

    tableColBelow: {
        width: "15%",
        border: "1px solid #ccc",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5
    },

    tableColLeft: {
        width: "15%",
        border: "1px solid #ccc",
        borderWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth:1,
        padding: 5
    },

    tableColLeftBelow: {
        width: "15%",
        border: "1px solid #ccc",
        borderWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth:0,
        padding: 5
    },

    tableColUnit: {
        width: "15%",
        border: "1px solid #ccc",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5
    },

    tableColService: {
        width: "38%",
        border: "1px solid #ccc",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        paddingRight:0,
        whiteSpace: 'pre-wrap'
    },

    tableColQty: {
        width: "15%",
        border: "1px solid #ccc",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        textAlign:'center'
    },


    tableColQuantity: {
        width: "15%",
        border: "1px solid #ccc",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        flexDirection: 'row',
        textAlign:'center'
    },
    tableCell: {
        margin: "auto",
        fontSize: 11,
        whiteSpace: 'pre-wrap'
    },

    tableCellHead: {
        margin: "auto",
        fontSize: 11,
        // display: 'inline-block'
    },

    leadName: {
        margin: "auto",
        fontSize: 11,
    },

    tableCellTotal: {
        margin: "auto",
        fontSize: 11,
        textAlign:'right',
    },

    tableCellTotalHead: {
        margin: "auto",
        fontSize: 11,
        textAlign:'right',
    },

    tableCellDetails: {
        margin: "auto",
        fontSize: 10,
        color:'#858585'
    }
});

export default withStyles(styles, { withTheme: true })(PdfDownload);
