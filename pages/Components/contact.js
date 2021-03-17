
import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Moment from 'moment';
import Router from "next/dist/client/router";
import Navbar from './nav';
import CsvUpload from './csvUpload';
import axios from "axios";
import CSVReader from "react-csv-reader";
import Grid from '@material-ui/core/Grid';
import Form from 'react-validation/build/form';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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

class EditAccount extends React.Component {

    static getInitialProps ({ query: { userParamId,employeeParamId } }) {
        console.log('getInitialProps colling ...');
        return { userParamId: userParamId , employeeParamId: employeeParamId }
    }

    constructor(props) {
        super(props);
        this.state = {
            contractor :"",
            client :"",
            projectDescription :"",
            projectName:"",
            checkTwoFactor:false,
            enableProject:false,
            enableClient:false,
            csvTab:false,
            inputTab:true,

        };

        this.handleProjectName = this.handleProjectName.bind(this);
        this.handleProjectDescription = this.handleProjectDescription.bind(this);
        this.handleClient = this.handleClient.bind(this);
        this.handleContractor = this.handleContractor.bind(this);

    }

    handleProjectName(event) {
        this.setState({projectName: event.target.value, enableProject: true})
        if(event.target.value.length < 1){
            this.setState({enableProject: false})
        }
    }
    handleProjectDescription(event) {this.setState({projectDescription: event.target.value})}

    handleClient(event) {
        this.setState({client: event.target.value, enableClient: true})
        if(event.target.value.length < 1){
            this.setState({enableClient: false})
        }
    }
    handleContractor(event) {this.setState({contractor: event.target.value})}

    // back

    backPage() {
        window.history.back()
    }


    componentDidMount() {
        console.log('componentDidMount colling ...');

    }

    // data submit

    dataSetToLocalStorage() {
        console.log('data Set To LocalStorage')
        localStorage.setItem( "projectName",  JSON.stringify(this.state.projectName));
        localStorage.setItem( "projectDescription",  JSON.stringify(this.state.projectDescription));
        localStorage.setItem( "client",  JSON.stringify(this.state.client));
        localStorage.setItem( "contractor",  JSON.stringify(this.state.contractor));
        this.openCsvTab()
    }

    // onClick show input tab

    openInputTab() {
        console.log('test openReceivableTab')
        this.setState({
            inputTab: true, csvTab: false
        });
    }

    // onClick show csv part

    openCsvTab() {
        console.log('test openPasswordTab')
        this.setState({
            inputTab: false, csvTab: true
        });
        localStorage.setItem( "projectName",  JSON.stringify(this.state.projectName));
        localStorage.setItem( "projectDescription",  JSON.stringify(this.state.projectDescription));
        localStorage.setItem( "client",  JSON.stringify(this.state.client));
        localStorage.setItem( "contractor",  JSON.stringify(this.state.contractor));
    }


    render () {


        return(
            <div>
                <div>
                    <Navbar/>

                    <div className="contentDiv">

                        <div style={{ display:'flex', marginTop:'20px', marginBottom:'10px', width:'500px', margin:'0 auto'}} className="w3-bar w3-black">
                            <p onClick={this.openInputTab.bind(this)} style={{fontSize: '14px', marginTop: '6px',
                                fontWeight:'bold', cursor:'pointer', color: this.state.inputTab===true?'#004E7C':'#000',
                                padding:'4px 7px', borderBottom: this.state.inputTab===true?'2px solid #ef5350':null, width:'max-content'}}>
                                Step one</p>
                            {this.state.enableProject === true && this.state.enableClient === true ?
                            <p onClick={this.openCsvTab.bind(this)} style={{fontSize: '14px', marginTop: '6px',
                                fontWeight:'bold', cursor:'pointer', color: this.state.csvTab===true?'#004E7C':'#000',
                                padding:'4px 7px', borderBottom: this.state.csvTab===true?'2px solid #ef5350':null, width:'max-content'}}>Step two </p>:
                                <p style={{fontSize: '14px', marginTop: '6px',
                                    fontWeight:'bold', cursor:'no-drop', color: this.state.csvTab===true?'#004E7C':'#000',
                                    padding:'4px 7px', borderBottom: this.state.csvTab===true?'2px solid #ef5350':null, width:'max-content'}}>Step two </p>
                            }
                        </div>

                        {this.state.inputTab === true?
                            <div className="formDiv">


                                <Grid style={{marginTop:'0px'}} container spacing={24}>

                                    <Grid style={{paddingBottom:'0'}} item xs={12}>
                                        <p className="onlineText">Project name <span style={{color:'red'}}>*</span></p>
                                        <input className="inputCss" onChange={this.handleProjectName} value={this.state.projectName}
                                               type="text" placeholder=""  />
                                    </Grid>

                                    <Grid style={{paddingBottom:'0',paddingTop:'0'}} item xs={12}>
                                        <p className="onlineText">Project Description</p>
                                        <textarea className="inputCss" onChange={this.handleProjectDescription} value={this.state.projectDescription}/>
                                    </Grid>

                                    <Grid style={{paddingBottom:'0',paddingTop:'0'}}  item xs={12}>
                                        <p className="onlineText">Client <span style={{color:'red'}}>*</span></p>
                                        <input className="inputCss" onChange={this.handleClient} value={this.state.client}
                                               type="text" placeholder=""  />
                                    </Grid>

                                    <Grid style={{paddingBottom:'0',paddingTop:'0'}} item xs={12}>
                                        <p className="onlineText">Contractor</p>
                                        <input className="inputCss" onChange={this.handleContractor} value={this.state.contractor}
                                               type="text" placeholder=""  />
                                    </Grid>


                                    <Grid item xs={12} style={{paddingTop:'22px'}} >
                                        <div style={{}} >

                                            {this.state.enableProject === true && this.state.enableClient === true ?
                                                <button type="button"
                                                        onClick={()=>this.dataSetToLocalStorage()}
                                                        style={{padding: '9px 0px',width:'100px',height:'33px', fontSize:'14px', borderRadius:'3px'}}>
                                                    Next
                                                    <FontAwesomeIcon icon={faArrowRight}
                                                                     style={{color: "#fff", marginRight: "7px", marginLeft: "7px", paddingTop: "2px", width:'12px'}}/>

                                                </button>:
                                                <button type="button"
                                                        style={{padding: '9px 0px',width:'100px',height:'33px', fontSize:'14px', borderRadius:'3px', cursor:'no-drop', background:'#f4a7ae'}}>
                                                    Next
                                                    <FontAwesomeIcon icon={faArrowRight}
                                                                     style={{color: "#fff", marginRight: "7px", marginLeft: "7px", paddingTop: "2px", width:'12px'}}/>
                                                </button>

                                            }

                                        </div>
                                    </Grid>

                                </Grid>

                            </div>
                            :
                            <CsvUpload/>
                        }

                    </div>

                    <style jsx>
                        {`
                        
                        .onlineText{
                          margin: 7px 0px;
                          color: #000
                        }
                        
                        .inputCss{
                          border:1px solid #ccc;
                          width:100%;
                          padding:5px;
                          border-radius: 3px
                        }
                        
                          .switch {
                          position: relative;
                          display: inline-block;
                          width: 51px;
                          height: 25px;
                        }
                        
                        .switch input { 
                          opacity: 0;
                          width: 0;
                          height: 0;
                        }
                        
                        .slider {
                          position: absolute;
                          cursor: pointer;
                          top: 5px;
                          left: 0px;
                          right: 0;
                          bottom: 0;
                          background-color: #ccc;
                          -webkit-transition: .4s;
                          transition: .4s;
                          width: 38px;
                        }
                          
                          
                        .slider:before {
                          position: absolute;
                          content: "";
                          height: 18px;
                          width: 18px;
                          left: 0px;
                          bottom: 1px;
                          background-color: #fff;
                          -webkit-transition: .4s;
                          transition: .4s;
                        }
                        
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

        .tooltip .tooltiptext {
        visibility: hidden;
        width: 120px;
       
        color: #000;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;

        /* Position the tooltip */
        position: absolute;
        z-index: 1;
        top: 2px;
        right: 105%;
    }

        .tooltip:hover .tooltiptext {
        visibility: visible;
    }
            .contentDiv {
                margin-top: 60px;
                padding: 60px 0px;
            }

            .formDiv {
                background-color: white;
                width: 500px;
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

export default withStyles(styles, { withTheme: true })(EditAccount);
