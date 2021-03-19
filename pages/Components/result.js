import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart,Line } from 'recharts';

// react pdf viewer
import ReactPDF, {Document, Font, Image, Page, PDFDownloadLink, StyleSheet, Text, View,pdf} from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Moment from 'moment';
import Router from "next/dist/client/router";
import Navbar from './nav';
import PdfDownload from './pdfDownload';
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

const styles = theme => ({
    root: {
        backgroundColor: '#fafafa',
        width: '87%',
    },

    roots: {
        backgroundColor: '#fafafa',
        width: '90%',
    },
    indicator: {
        backgroundColor: '#ef5350',
    },

});

class Result extends React.Component {

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

            maxX: JSON.parse(localStorage.getItem( "maxX")),
            minX: JSON.parse(localStorage.getItem( "minX")),
            maxY: JSON.parse(localStorage.getItem( "maxY")),
            minY: JSON.parse(localStorage.getItem( "minY")),
            maxZ: JSON.parse(localStorage.getItem( "maxZ")),
            minZ: JSON.parse(localStorage.getItem( "minZ")),



        };

        this.handleFirstName = this.handleFirstName.bind(this);

    }


    handleFirstName(event) {  this.setState({ firstName: event.target.value });    }

    // back

    backPage() {
        window.history.back()
    }


    componentDidMount() {
        console.log('componentDidMount colling ...',this.state.maxX);

    }

    handleForce = (data, fileInfo) =>{
        this.setState({csvData:data,csvDataShow:true})
        console.log(data, fileInfo)
    };

    async getProps() {
        return ({
            maxX: this.state.maxX,
            minX: this.state.minX,
            maxY: this.state.maxY,
            minY: this.state.minY,
            maxZ: this.state.maxZ,
            minZ: this.state.minZ,
        });
    }

    // If you use the async keyword before a function definition, you can then use await within the function. When you await a promise,
    // the function is paused in a non-blocking way until the promise settles. If the promise fulfills, you get the value back.
    // If the promise rejects, the rejected value is thrown.

    async pdfDownload() {
        const props = await this.getProps();
        console.log('async function calling..')
        const doc = <PdfDownload {...props} />;
        const asPdf = pdf([]); // {} is important, throws without an argument
        asPdf.updateContainer(doc);
        const blob = await asPdf.toBlob();
        saveAs(blob, 'input_result_pdf');
    }




    render () {

        return(
            <div>
                <Navbar resultTab={true} homeTab={false}/>
                <div>
                    <p style={{position:'absolute', top:'70px', left:'133px'}}>
                        <FontAwesomeIcon icon={faAngleLeft}
                                         style={{color: "#8a8888", marginRight: "7px", marginLeft: "7px", paddingTop: "2px", width:'12px'}}/>
                        <a onClick={this.backPage} href="#" style={{fontSize: "12px", textDecoration: "none", color: "#EF5350"}}>Back</a>

                    </p>


                    <div className="contentDiv">

                        <div className="formDiv">

                            {this.state.maxX === null?
                                <p style={{textAlign:'center', marginTop:'50px'}}>Upload a CSV file to show the result</p>
                                :

                            <Grid container spacing={24}>

                                {/*user 1st name*/}
                                <Grid style={{marginRight:'6px', width:'535px', paddingLeft:'0px', marginTop:'50px'}} item xs={12}>
                                    <img
                                        style={{height: '20px', position:'relative', top:'3px' ,marginRight:'6px'}}
                                        src={dwnld}
                                    />
                                    <span style={{color: "#424955", cursor:this.state.maxX === null?'no-drop':'pointer'}} onClick={()=>{this.state.maxX === null?null:this.pdfDownload()}}>  Download</span>
                                </Grid>

                                <Grid style={{marginRight:'6px', width:'535px', padding:'20px', background:'#fff', marginTop:'10px'}} item xs={12}>
                                    <div style={{}}>


                                        <table style={{border:'1px solid #ccc',borderCollapse: 'collapse', width:'100%'}}>

                                            <tr style={{background:'#004E7C', color:'#fff'}}>

                                                <th style={{ padding: '5px'}}>max_X</th>
                                                <th style={{bpadding: '5px'}}>min_X</th>

                                            </tr>

                                            <tr>

                                                <td style={{border: '1px solid #ccc', padding: '5px'}}>{this.state.maxX}</td>
                                                <td style={{border: '1px solid #ccc', padding: '5px'}}>{this.state.minX}</td>

                                            </tr>

                                            {/*sales lead history show hide*/}

                                            <tr style={{background:'#004E7C', color:'#fff'}}>

                                                <th style={{padding: '5px'}}>max_Y</th>
                                                <th style={{padding: '5px'}}>min_Y</th>

                                            </tr>
                                            <tr>

                                                <td style={{border: '1px solid #ccc', padding: '5px'}}>{this.state.maxY}</td>
                                                <td style={{border: '1px solid #ccc', padding: '5px'}}>{this.state.minY}</td>

                                            </tr>

                                            {/*sales lead history show hide*/}

                                            <tr style={{background:'#004E7C', color:'#fff'}}>

                                                <th style={{padding: '5px'}}>max_Z</th>
                                                <th style={{padding: '5px'}}>min_Z</th>

                                            </tr>
                                            <tr>

                                                <td style={{border: '1px solid #ccc', padding: '5px'}}>{this.state.maxZ}</td>
                                                <td style={{border: '1px solid #ccc', padding: '5px'}}>{this.state.minZ}</td>

                                            </tr>

                                        </table>

                                    </div>
                                </Grid>


                            </Grid>
                                }
                        </div>


                    </div>



                    <style jsx>
                        {`
                                
                             
                                input:checked + .slider {
                                  background-color: #ef5350;
                                }
                                
                                input:focus + .slider {
                                  box-shadow: 0 0 1px #2196F3;
                                }
                                
                                input:checked + .slider:before {
                                  -webkit-transform: translateX(20px);
                                  -ms-transform: translateX(20px);
                                  transform: translateX(20px);
                                }
                                
                                /* Rounded sliders */
                                .slider.round {
                                  border-radius: 34px;
                                }
                                
                                .slider.round:before {
                                  border-radius: 50%;
                                }
                    
                                  .tooltip {
                position: relative;
                display: inline-block;
               
            }

               
                    .contentDiv {
                        padding: 20px 0px;
                    }

                    .formDiv {
                        width: 600px;
                        margin: auto;
                        text-align: left;
                        padding: 25px 45px;
                        border-radius: 7px;
                       
                    }

                    h1 {
                        color: #ef5350;
                        margin-bottom: 35px;
                        font-weight: 300;
                        font-size: 27px;
                        font-family: "Roboto", "Helvetica", "Arial", "sans-serif";
                    }

                    p {
                        color: #9D9D9D;
                        font-size: 14px;
                        margin-bottom: 10px;
                        margin-top: 0px;
                        font-family: "Roboto", "Helvetica", "Arial", "sans-serif";
                    }

                    

                    .buttonDiv {
                        text-align: center;
                        margin-top: 23px;
                        margin-bottom: 35px;
                    }

                    button {
                        margin: auto;
                        background-color: #ef5350;
                        color: white;
                        border-radius: 5px;
                        outline: 0px;
                        border: 0px;
                        padding: 12px 60px;
                        font-size: 20px;
                        font-family: "Roboto", "Helvetica", "Arial", "sans-serif";
                    }

                    input:focus {
                        outline: 0px;
                    }

                    button:hover {
                        cursor: pointer;
                        background-color: #DC2723;
                    }

                    @media screen and (max-width: 600px) {
                        .contentDiv {
                            padding: 45px 30px;
                        }

                        .formDiv {
                            width: 100%;
                        }

                        button {
                            width: 100%;
                            padding: 8px 60px;
                        }
                    }

                    @media screen and (max-width: 430px) {
                        .contentDiv {
                            padding: 45px 20px;
                        }

                        .formDiv {
                            width: 100%;
                            padding: 25px 25px;
                        }
                    }

                    @media screen and (max-width: 330px) {
                        p {
                            font-size: 17px;
                        }

                        h1 {
                            font-size: 23px;
                        }
                    }
              `}
                    </style>
                </div>

            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Result);
