import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart,Line } from 'recharts';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// react pdf viewer
import ReactPDF, {Document, Font, Image, Page, PDFDownloadLink, StyleSheet, Text, View, Link,pdf} from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';

import Navbar from './nav';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Form from 'react-validation/build/form';
import CSVReader from "react-csv-reader";
import dwnld from "../../static/images/dwnld.png";
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
//
// const styles = theme => ({
//     root: {
//         backgroundColor: '#fafafa',
//         width: '87%',
//     },
//
//     roots: {
//         backgroundColor: '#fafafa',
//         width: '90%',
//     },
//     indicator: {
//         backgroundColor: '#ef5350',
//     },
//
// });

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


                    <View style={styles.table}>
                        <View style={styles.tableRowHead}>

                            <View style={styles.tableCol}>
                                <Text style={styles.tableCellHead}><Text
                                    style={{fontFamily: this.props.fontFamilyBold}}>Location</Text></Text>
                            </View>


                            <View style={styles.tableColService}>
                                <Text style={styles.tableCellHead}><Text
                                    style={{fontFamily: this.props.fontFamilyBold}}>Service</Text></Text>
                            </View>


                            <View style={styles.tableColService}>
                                <Text style={styles.tableCellHead}><Text
                                    style={{fontFamily: this.props.fontFamilyBold}}>Item</Text></Text>
                             </View>

                            <View style={styles.tableColService}>
                                <Text style={styles.tableCellHead}><Text
                                    style={{fontFamily: this.props.fontFamilyBold}}>Item</Text></Text>
                            </View>




                        </View>

                        {/*this.props.itemListByInvoice.map((item, key) =>*/}
                        {/*    <View style={styles.tableRow}>*/}

                        {/*        {this.props.checkLocation === false ?*/}
                        {/*            null :*/}
                        {/*            <View style={styles.tableCol}>*/}
                        {/*                {item.field1 === true ? null : <Text*/}
                        {/*                    style={styles.tableCell}>{item.visitLocation}</Text>}*/}
                        {/*            </View>*/}
                        {/*        }*/}

                        {/*        {this.props.checkService === true ?*/}
                        {/*            null :*/}
                        {/*            <View style={styles.tableColService}>*/}
                        {/*                <Text*/}
                        {/*                    style={styles.tableCell}>{item.parentdata}</Text>*/}
                        {/*            </View>*/}
                        {/*        }*/}

                        {/*        {this.props.checkItem === true ?*/}
                        {/*            null :*/}
                        {/*            <View style={styles.tableColService}>*/}
                        {/*                <Text*/}
                        {/*                    style={styles.tableCell}>{item.levelData}</Text>*/}
                        {/*                {item.field4 === true ? null :*/}
                        {/*                    item.description === null ? null :*/}
                        {/*                        <Text*/}
                        {/*                            style={styles.tableCellDetails}>Description: {item.description}</Text>*/}
                        {/*                }*/}
                        {/*            </View>*/}
                        {/*        }*/}


                        {/*        {this.props.checkPrice === true ?*/}
                        {/*            null :*/}
                        {/*            item.field6 === true ?*/}
                        {/*                <View style={styles.tableCol}>*/}

                        {/*                </View> :*/}
                        {/*                <View style={styles.tableCol}>*/}
                        {/*                    <Text style={styles.tableCellTotal}>*/}

                        {/*                        {currencySign === '৳'?*/}
                        {/*                            <Image*/}
                        {/*                                style={{*/}
                        {/*                                    height: '10px',*/}
                        {/*                                    marginLeft: '10px',*/}
                        {/*                                    marginTop: '0px'*/}
                        {/*                                }}*/}
                        {/*                                src={taka}*/}
                        {/*                                cache={false}*/}
                        {/*                                allowDangerousPaths={true}/> :*/}

                        {/*                            <Text style={{paddingRight:'10px'}}>{currencySign } </Text>*/}
                        {/*                        }*/}

                        {/*                        { item.price2}</Text>*/}
                        {/*                </View>*/}
                        {/*        }*/}

                        {/*        {this.props.checkQuantity === true ?*/}
                        {/*            null :*/}
                        {/*            item.field2 === true ?*/}
                        {/*                <View style={styles.tableColQuantity}>*/}

                        {/*                </View> :*/}
                        {/*                <View style={styles.tableColQuantity}>*/}

                        {/*                    <Text*/}
                        {/*                        style={styles.tableCell}>{item.quantity} </Text>*/}

                        {/*                </View>*/}
                        {/*        }*/}

                        {/*        {this.props.checkUom === true ?*/}
                        {/*            null :*/}
                        {/*            <View style={styles.tableColUnit}>*/}
                        {/*                <Text style={styles.tableCell}>*/}
                        {/*                    {item.field3 === true ? null : this.props.checkUom === true ? null : item.mouName}*/}
                        {/*                </Text>*/}
                        {/*            </View>*/}
                        {/*        }*/}

                        {/*        <View style={styles.tableCol}>*/}
                        {/*            <Text style={styles.tableCellTotal}>*/}
                        {/*                {currencySign === '৳'?*/}
                        {/*                    <Image*/}
                        {/*                        style={{*/}
                        {/*                            height: '10px',*/}
                        {/*                            marginLeft: '10px',*/}
                        {/*                            marginTop: '0px'*/}
                        {/*                        }}*/}
                        {/*                        src={taka}*/}
                        {/*                        cache={false}*/}
                        {/*                        allowDangerousPaths={true}/> :*/}

                        {/*                    <Text style={{paddingRight:'10px'}}>{currencySign } </Text>*/}
                        {/*                }{item.price3}</Text>*/}
                        {/*        </View>*/}

                        {/*    </View>*/}
                        {/*)*/}

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
    author: {
        fontSize: 12,
        textAlign: 'left',
        marginBottom: 15,
        borderBottom:'1 solid #ccc',
        padding:10,
        marginLeft:10
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },

    gridFlex: {
        padding: 10,
        flexDirection: 'row',
        marginLeft:25,
        border: '1 solid #ccc',
        marginTop:30,
        marginRight:25,
        fontWeight: 600,
        backgroundColor:'#f6f6f6',
        fontSize: 11,
    },

    gridFlexQuotation: {
        flexDirection: 'row',
    },

    gridFlexMap: {
        padding: 10,
        flexDirection: 'row',
        marginLeft:25,
        border: '1 solid #ccc',
        marginRight:25,
        borderTop: 0
    },


    gridFlexValue:{
        width:100,
        marginRight:20,
        fontSize: 11,
    },

    gridFlexValueQty:{
        width:100,
        marginRight:10,
        fontSize: 11,
    },

    gridFlexValueQtyVtTx:{
        width:58,
        marginRight:10,
        marginLeft:30,
        fontSize: 11,
        textAlign: 'left',
    },

    gridFlexValueVatTax2:{
        width:78,
        marginRight:10,
        fontSize: 11,
    },

    gridFlexValueVatTax:{
        width:78,
        marginRight:0,
        fontSize: 11,
    },

    gridFlexValueTotal:{
        width:68,
        marginRight:10,
        fontSize: 11,
    },

    gridFlexValueItem:{
        width:110,
        marginRight:10,
        fontSize: 11,
        textAlign: 'left',

    },
    gridFlexValueDes:{

        textAlign: 'justify',
        fontSize:10,
        color:'#858585'

    },

    description:{
        width:78,
        marginLeft:20,
        fontSize: 11,
    },

    gridFlexValuePrice:{
        width:50,
        marginRight:20,
        fontSize: 11,
        textAlign: 'left'
    },

    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        marginLeft:25
    },

    textNotesTitle: {
        margin: 12,
        fontSize: 12,
        textAlign: 'left',
        marginLeft:25,
        borderBottom: '1 solid #ccc',
    },
    paymentNotesTitle: {
        margin: 12,
        fontSize: 12,
        textAlign: 'left',
        marginLeft:25,
        borderBottom: '1 solid #ccc',
    },
    subtotal: {
        fontSize: 11,
        textAlign: 'justify',
        marginLeft:95,
        marginTop: 4
    },

    paidAmount: {
        fontSize: 12,
        marginLeft:474,
        marginTop: 10,

    },

    amountDue: {
        fontSize: 12,
        marginLeft:340,
        marginTop: 10,

    },

    amountDueFinal: {
        fontSize: 12,
        marginLeft:420,
        paddingRight:25,
        paddingTop:10,
    },

    inWordTexts: {
        fontSize: 12,
        textAlign: 'right',
        marginTop: 2
    },

    textSubtotalSpace: {
        fontSize: 12,
        textAlign: 'justify',
        marginLeft:25,
        width:300
    },

    inWordsSpace: {
        fontSize: 14,
        marginRight:30,
    },

    textNotes: {
        fontSize: 12,
        textAlign: 'justify',
        marginLeft:25,
        marginRight:25,
        lineHeight: .7

    },

    paymentLink: {
        fontSize: 11,
        color: 'blue',
        cursor:'pointer',
        marginLeft:25,
        width:'130px'
    },
    onlineInstruction: {
        fontSize: 12,
        marginLeft:25,
        marginTop:10,
    },
    paymentText: {
        fontSize: 12,
        marginLeft:25,
    },


    textQuotaion1: {
        margin: 12,
        fontSize: 11,
        textAlign: 'left',
        marginLeft:25,
        marginTop:15,
        marginBottom:0,
        width: '203px'
    },

    textQuotaion2: {
        margin: 12,
        fontSize: 11,
        marginBottom:0,
        marginLeft:0,
        fontWeight:600,
        width: '30px',
        textAlign: 'right',
        marginRight:33
    },

    textQuotaion3: {
        margin: 12,
        fontSize: 11,
        marginBottom:0,
        marginLeft:0,
        marginRight:5,
        width: '300px',
        textAlign: 'right',
    },

    textQuotaion4: {
        margin: 12,
        fontSize: 11,
        marginBottom:0,
        marginLeft:0,
        fontWeight:600,
        textAlign: 'right',
        width: '330px'
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

    footer: {
        position: 'absolute',
        fontSize: 9,
        bottom: 15,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: '#a4a4a4',
    },

    table: {
        display: "table",
        width: "auto",
        border: "1px solid #ccc",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginLeft:25,
        marginRight:25,
        marginTop: 20,

    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },

    tableRowHead: {
        margin: "auto",
        flexDirection: "row",
    },
    tableCol: {
        width: "25%",
        border: "1px solid #ccc",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
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
        display: 'inline-block'
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
