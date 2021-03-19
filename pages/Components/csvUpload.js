import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart,Line } from 'recharts';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Moment from 'moment';
import Router from "next/dist/client/router";
import Navbar from './nav';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Form from 'react-validation/build/form';
import CSVReader from "react-csv-reader";
import CustomNotifier, {openCustomNotifierSnackbar} from './CustomNotifier';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowRight, faStroopwafel} from '@fortawesome/free-solid-svg-icons'
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

class EditAccount extends React.Component {

    static getInitialProps ({ query: { userParamId,employeeParamId } }) {
        console.log('getInitialProps colling ...');
        return { userParamId: userParamId , employeeParamId: employeeParamId }
    }

    constructor(props) {
        super(props);
        this.state = {
            maxX :"",
            maxY :"",
            maxZ :"",
            minX:"",
            minY:"",
            minZ:"",
            enableSave:false,
            enableX:false,
            enableY:false,
            enableZ:false,
            enableX1:false,
            enableY1:false,
            enableZ1:false,
            passwordTab:false,
            accountTab:true,

            userParamId:this.props.userParamId,
            employeeParamId:this.props.employeeParamId,

            yAllValue:[],
            xAllValue:[],
            zAllValue:[],
            csvData: [],
            isLocked:'',
            projectName: JSON.parse(localStorage.getItem( "projectName")),
            projectDescription: JSON.parse(localStorage.getItem( "projectDescription")),
            client: JSON.parse(localStorage.getItem( "client")),
            contractor: JSON.parse(localStorage.getItem( "contractor")),
            // maxX: JSON.parse(localStorage.getItem( "maxX")),

        };

        this.handleMaxX = this.handleMaxX.bind(this);
        this.handleMaxY = this.handleMaxY.bind(this);
        this.handleMaxZ = this.handleMaxZ.bind(this);
        this.handleMinX = this.handleMinX.bind(this);
        this.handleMinY = this.handleMinY.bind(this);
        this.handleMinZ = this.handleMinZ.bind(this);

    }


    handleMaxX(event) {
        this.setState({maxX: event.target.value, enableX: true},(response)=>{
            this.checkEnableSave()
        })
        if(event.target.value.length < 1){
            this.setState({enableX: false},(response)=>{
                this.checkEnableSave()
            })
        }
    }
    handleMaxY(event) {
        this.setState({maxY: event.target.value, enableY: true},(response)=>{
            this.checkEnableSave()
        })
        if(event.target.value.length < 1){
            this.setState({enableY: false},(response)=>{
                this.checkEnableSave()
            })
        }
    }
    handleMaxZ(event) {
        this.setState({maxZ: event.target.value, enableZ: true},(response)=>{
            this.checkEnableSave()
        })
        if(event.target.value.length < 1){
            this.setState({enableZ: false},(response)=>{
                this.checkEnableSave()
            })
        }
    }

    handleMinX(event) {
        this.setState({minX: event.target.value, enableX1: true},(response)=>{
            this.checkEnableSave()
        })
        if(event.target.value.length < 1){
            this.setState({enableX1: false},(response)=>{
                this.checkEnableSave()
            })
        }
    }
    handleMinY(event) {
        this.setState({minY: event.target.value, enableY1: true},(response)=>{
            this.checkEnableSave()
        })
        if(event.target.value.length < 1){
            this.setState({enableY1 : false},(response)=>{
                this.checkEnableSave()
            })
        }
    }
    handleMinZ(event) {
        this.setState({minZ: event.target.value, enableZ1: true},(response)=>{
            this.checkEnableSave()
        })
        if(event.target.value.length < 1){
            this.setState({enableZ1: false},(response)=>{
                this.checkEnableSave()
            })
        }
    }

    checkEnableSave(){
        console.log('checkEnableSave')
        if(this.state.enableX===true && this.state.enableX1===true && this.state.enableY===true &&
            this.state.enableY1===true && this.state.enableZ===true && this.state.enableZ1===true ){
            this.setState({enableSave:true})
        }
        else{
            this.setState({enableSave:false})
        }
    }

    // back

    backPage() {
        window.history.back()
    }


    componentDidMount() {
        console.log('componentDidMount colling ...',this.state.csvData);

    }

    handleForce = (data, fileInfo) =>{
        this.setState({csvData:data,csvDataShow:true})
        console.log(data, fileInfo);
        console.log('jh');

        var xAllValue = [...this.state.xAllValue];
        var yAllValue = [...this.state.yAllValue];
        var zAllValue = [...this.state.zAllValue];

        data.map((item) =>{
            console.log('xAllValue',parseFloat(item.X));
            xAllValue.push(parseFloat(item.X))
            yAllValue.push(parseFloat(item.Y))
            zAllValue.push(parseFloat(item.Z))
        });
        // console.log('xAllValue',xAllValue)
        // console.log(Math.max(1, 3, 2));

        var maxX = this.maxValue(xAllValue);
        var minX = this.minValue(xAllValue);
        console.log('maxX',maxX)
        console.log('minX',minX)

        var maxY = this.maxValue(yAllValue);
        var minY = this.minValue(yAllValue);
        console.log('maxY',maxY)
        console.log('minY',minY)

        var maxZ = this.maxValue(zAllValue);
        var minZ = this.minValue(zAllValue);
        console.log('maxZ',maxZ)
        console.log('minZ',minZ)

        this.setState({maxX: maxX,minX: minX, maxY: maxY,minY: minY,maxZ: maxZ, minZ: minZ, enableSave:true})

    };

    maxValue = (data) =>{
        var max = data.reduce(function(a, b) {
            return Math.max(a, b);
        });
        return max
    }

    minValue = (data) =>{
        var min = data.reduce(function(a, b) {
            return Math.min(a, b);
        });
        return min
    }

    setLocalStorageData = () =>{
        localStorage.setItem( "maxX",  JSON.stringify(this.state.maxX));
        localStorage.setItem( "minX",  JSON.stringify(this.state.minX));
        localStorage.setItem( "maxY",  JSON.stringify(this.state.maxY));
        localStorage.setItem( "minY",  JSON.stringify(this.state.minY));
        localStorage.setItem( "maxZ",  JSON.stringify(this.state.maxZ));
        localStorage.setItem( "minZ",  JSON.stringify(this.state.minZ));
        openCustomNotifierSnackbar({message: 'Data successfully added', duration: 3000, notifyType: 'success'});
    }




    render () {

        return(
            <div>
                <CustomNotifier/>
                <div>
                    <p style={{position:'absolute', top:'70px', left:'133px'}}>
                        <FontAwesomeIcon icon={faAngleLeft}
                                         style={{color: "#8a8888", marginRight: "7px", marginLeft: "7px", paddingTop: "2px", width:'12px'}}/>
                        <a onClick={this.backPage} href="#" style={{fontSize: "12px", textDecoration: "none", color: "#EF5350"}}>Back</a>

                    </p>


                    <div className="contentDiv">

                            <div className="formDiv">

                                <Grid container spacing={24}>

                                    {/*user 1st name*/}
                                    <Grid style={{marginRight:'6px', width:'535px', padding:'20px', background:'#fff'}} item xs={12}>
                                        <div style={{}}>
                                            <table style={{border:'1px solid #ccc',borderCollapse: 'collapse', width:'100%'}}>

                                                <tr style={{background:'#004E7C', color:'#fff'}}>

                                                    <th style={{ padding: '5px'}}>Project name</th>
                                                    <th style={{bpadding: '5px'}}>Project Description</th>

                                                </tr>

                                                <tr>

                                                    <td style={{border: '1px solid #ccc', padding: '5px'}}>{this.state.projectName}</td>
                                                    <td style={{border: '1px solid #ccc', padding: '5px'}}>{this.state.projectDescription}</td>

                                                </tr>

                                                {/*sales lead history show hide*/}

                                                <tr style={{background:'#004E7C', color:'#fff'}}>

                                                    <th style={{padding: '5px'}}>Client</th>
                                                    <th style={{padding: '5px'}}>Contractor</th>

                                                </tr>
                                                <tr>

                                                    <td style={{border: '1px solid #ccc', padding: '5px'}}>{this.state.client}</td>
                                                    <td style={{border: '1px solid #ccc', padding: '5px'}}>{this.state.contractor}</td>

                                                </tr>

                                            </table>

                                        </div>
                                    </Grid>
                                    <Grid style={{marginRight:'6px', padding:'20px', background:'#fff', marginTop:'10px'}} item xs={12}>
                                        <p style={{color:'#000'}}>Select CSV file :</p>
                                        <div className="container">
                                            <CSVReader
                                                cssClass="react-csv-input"
                                                onFileLoaded={this.handleForce}
                                                parserOptions={papaparseOptions}
                                            />

                                            {/*{*/}
                                            {/*    this.state.csvData.map((company, key) =>*/}

                                            {/*        <div>*/}
                                            {/*            {company.X}*/}
                                            {/*            {company.Y}*/}
                                            {/*            {company.Z}*/}
                                            {/*        </div>*/}
                                            {/*    )*/}
                                            {/*}*/}
                                            {/*<p>and then open the console</p>*/}
                                        </div>
                                    </Grid>

                                    <Grid style={{marginTop:'10px', padding:'10px', background:'#fff',marginRight:'6px',marginLeft:'0'}} container spacing={24}>


                                        <Grid style={{paddingBottom:'0'}} item xs={6}>
                                            <p className="onlineText">max_X <span style={{color:'red'}}>*</span></p>
                                            <input className="inputCss" onChange={this.handleMaxX} value={this.state.maxX}
                                                   type="number" placeholder=""  />
                                        </Grid>

                                        <Grid style={{paddingBottom:'0'}}  item xs={6}>
                                            <p className="onlineText">min_X <span style={{color:'red'}}>*</span></p>
                                            <input className="inputCss" onChange={this.handleMinX} value={this.state.minX}
                                                   type="number" placeholder=""  />
                                        </Grid>

                                        <Grid style={{paddingBottom:'0',paddingTop:'0'}}  item xs={6}>
                                            <p className="onlineText">max_Y <span style={{color:'red'}}>*</span></p>
                                            <input className="inputCss" onChange={this.handleMaxY} value={this.state.maxY}
                                                   type="number" placeholder=""  />
                                        </Grid>

                                        <Grid style={{paddingBottom:'0',paddingTop:'0'}} item xs={6}>
                                            <p className="onlineText">min_Y  <span style={{color:'red'}}>*</span></p>
                                            <input className="inputCss" onChange={this.handleMinY} value={this.state.minY}
                                                   type="number" placeholder=""  />
                                        </Grid>

                                        <Grid style={{paddingBottom:'0',paddingTop:'0'}}  item xs={6}>
                                            <p className="onlineText">max_Z <span style={{color:'red'}}>*</span></p>
                                            <input className="inputCss" onChange={this.handleMaxZ} value={this.state.maxZ}
                                                   type="number" placeholder=""  />
                                        </Grid>

                                        <Grid style={{paddingBottom:'0',paddingTop:'0'}} item xs={6}>
                                            <p className="onlineText">min_Z  <span style={{color:'red'}}>*</span></p>
                                            <input className="inputCss" onChange={this.handleMinZ} value={this.state.minZ}
                                                   type="number" placeholder=""  />
                                        </Grid>

                                        <Grid item xs={12} style={{paddingTop:'22px'}} >
                                            <div style={{}} >

                                                {this.state.enableSave === true  ?
                                                    <button type="button"
                                                            onClick={()=>this.setLocalStorageData()}
                                                            style={{padding: '9px 0px',width:'100px',height:'33px', fontSize:'14px', borderRadius:'3px'}}>
                                                        Save
                                                    </button>:
                                                    <button title="Please fill up all mandatory fields" type="button"
                                                            style={{padding: '9px 0px',width:'100px',height:'33px', fontSize:'14px', borderRadius:'3px', cursor:'no-drop', background:'#f4a7ae'}}>
                                                        Save

                                                    </button>

                                                }

                                            </div>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </div>
                        <Grid style={{width:'95%', margin:'0 auto'}} container spacing={24}>
                            <Grid style={{marginRight:'6px', padding:'20px', background:'#fff', marginTop:'10px'}} item xs={12}>
                            <p style={{color:'#000'}}> {this.state.csvDataShow !== true?
                                <p style={{textAlign:'center', marginBottom:'0px', color:'#000'}}>A Bar chart will show after upload the CSV file:</p>:
                                <p style={{textAlign:'center', marginBottom:'20px', color:'#000'}}>Bar chart:</p>
                            }
                            </p>

                            {this.state.csvDataShow !== true?null:
                                <BarChart
                                    width={1300}
                                    height={300}
                                    data={this.state.csvData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="KP" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="X" fill="#004E7C" />
                                </BarChart>
                            }
                        </Grid>
                        </Grid>

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

export default withStyles(styles, { withTheme: true })(EditAccount);
