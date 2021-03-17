import React, { Component } from "react";
import allset from './allset.css';
import phone from "../../static/images/phone.png";
import msg from "../../static/images/msg.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone} from "@fortawesome/free-solid-svg-icons";



class DownFooter extends Component {
    state = { 
       
     }

  
    render() { 
        return ( 
            <section className="foottitle">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">

                        <p className={allset.downfooterRes}   style={{
                        textAlign:'center',padding:'10px',color:'#888888',marginTop:'7px' }}>
                        Copyright © 2019

                         <a href="/" style={{color:'#EF5350', textDecoration:'none' , marginLeft:'5px' }}>
                         sheraspace.com</a>.
                          All Rights Reserved.</p>
                    </div>

                </div>


            </div>
        </section>

        
         );
    }
}
 
export default DownFooter;

