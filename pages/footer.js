import React, { Component } from "react";
import allset from './Components/allset.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone} from "@fortawesome/free-solid-svg-icons";


class Footer extends Component {
    state = {

    }
    componentDidMount () {


    }


    render() {
        return (
            <section className="foottitle">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <p className={allset.downfooterRes}   style={{
                                textAlign:'center',padding:'10px',color:'#fff',marginTop:'7px', background:'#464646', marginBottom:'0' }}>
                                Copyright © 2020

                                <a href="/pollHome" style={{color:'#EF5350', textDecoration:'none' , marginLeft:'5px' }}>
                                    eVote</a>.
                                All Rights Reserved.</p>

                        </div>
                    </div>

                </div>
            </section>


        );
    }
}

export default Footer;

