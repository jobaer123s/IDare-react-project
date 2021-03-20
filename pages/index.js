/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';



import Home from './Components/project';
import {faEyeSlash, faStroopwafel} from '@fortawesome/free-solid-svg-icons'
import NetworkDetector from './internetError';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import ReactGA from 'react-ga';
import axios from "axios";
import getConfig from 'next/config';

import {openCustomNotifierSnackbar} from "./Components/CustomNotifier";
import Router from "next/router";
import card from "./Components/styles/settingCard.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"; // https://github.com/react-ga/react-ga

const config = getConfig();

library.add(faTimes,fab, faPhone,faStroopwafel,faComment);


class App extends React.Component {

    constructor(props){
        super(props);
        // phone button open  state
        this.state = {
            isHidden: true,

            aclRoleList:[],
            accessToken : [],

        };


        // Add your tracking ID created from https://analytics.google.com/analytics/web/#home/
        ReactGA.initialize('UA-135526598-1');
        // This just needs to be called once since we have no routes in this case.
        ReactGA.pageview(window.location.pathname);
        //ReactGA.pageview(window.location.pathname + window.location.search);

    }


    // phone toggole function

    toggleHidden () {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    handleClickOutside () {
        this.setState({
            isHidden: !this.state.isHidden
        })


    };



    render() {

        return(

            <div >
                <NetworkDetector/>
                <Home/>

                <div className={card.loaderForLoginPge}></div>


            </div>
        );
    }
}
export default App
