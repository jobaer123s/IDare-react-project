import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import green from "@material-ui/core/colors/green";

import Checkbox from "@material-ui/core/Checkbox";


import palette from "../../static/images/logo3.png";
import Avatar from 'react-avatar';
import styled from 'styled-components';
import ResponsiveMenu from 'react-responsive-navbar';

import allset from "./allset.css";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import card from './styles/settingCard.css';
import 'react-phone-number-input/style.css'
import 'react-responsive-ui/style.css'


import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faUnlockAlt } from "@fortawesome/free-solid-svg-icons";


import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';

import getConfig from 'next/config';
import axios from "axios";
import {openCustomNotifierSnackbar} from "./CustomNotifier";
import Router from "next/dist/client/router";



const config = getConfig();

library.add(fab,faTimes, faCoffee, faStroopwafel,faAlignJustify);



//todo why TabContainer,style?
// SwipeableViews function
function TabContainer(props) {
    const { children, dir } = props;
    return (  <Typography component="div" dir={dir}> {children} </Typography>   );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired
};
const style = {
    borderRadius: 10,
    border: 0,
    color: "white",
    marginTop: -20,
    padding: " 0 33px 1px",
    overflow: "hidden"
};



const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        width: 500,
        minHeight: 200,
        overflow: "hidden",

    },

    fab: {
        position: "absolute",
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500]
    },
    indicator: {
        backgroundColor: '#ef5350',
    }

});

// responsive

const SmallMenu = styled.div`
  display: none;
  text-align: right;
  @media (max-width: ${props => props.size}) {
    display: block;
  }
`;

const LargeMenu = styled.div`
  display: block;
  text-align: right;
  @media (max-width: ${props => props.size}) {
    display: none;
  }
`;

const MenuIcon = ({ onClick, icon }) => (
    <div role="button" onClick={onClick}>
        {icon}
    </div>
);

const checkBoxStyles = theme => ({
    root: {
        '&$checked': {
            color: '#ef5350',
        },
    },
    checked: {},
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

class Navbar extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            value: 0,
            open: false,
            isLoggedIn: false,
            companyId:this.props.companyParam,
            ioRegOrgName:"",
            firstName:"",
            lastName:"",

            aclUiComponentList:[],
            aclRoleList:[],
            userCompanyList:[],

        };


    }




    componentDidMount() {

    }


    render() {

        // responsive
        const {
            classes,
            theme,
            menu,
            largeMenuClassName,
            smallMenuClassName,
            changeMenuOn,
            menuOpenButton,
            menuCloseButton
        } = this.props;

        const { signUpPhoneNumber, open } = this.state;
        const transitionDuration = {
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen
        };

        const avatarName= this.state.firstName +" "+ this.state.lastName

        return (
            <div>
                <ResponsiveMenu
                    menuOpenButton={
                        <Grid container spacing={24} style={{ padding: '6px ', backgroundColor: '#fff', position:'fixed',top:'0', zIndex:'100' }}>
                            <Grid onClick={() => this.saveUserActivity('Home page')} item xs={3}>
                                <Link href="/setting/userManagement/userManage/multipleAccount"><a><img src={palette} style={{
                                    height: "33px", width: "120px",
                                    marginTop: "7px", marginLeft: "33%"
                                }} /></a></Link>
                            </Grid>
                            <Grid onClick={() => this.saveUserActivity('Home page')} item xs={9}>
                                <FontAwesomeIcon icon={faAlignJustify} style={{
                                    color: 'rgb(239, 83, 80)', fontSize: '21px', float: 'right', marginRight: '41px', cursor: 'pointer', marginTop: '10px'
                                }} />
                            </Grid>

                        </Grid>

                    }
                    menuCloseButton={ <Grid container spacing={24} style={{ padding:'6px ', backgroundColor:'#fff', position:'fixed',top:'0', zIndex:'100'}}>
                        <Grid item xs={3}>
                            <Link href="/setting/userManagement/userManage/multipleAccount"><a><img src={palette} style={{height: "33px", width: "120px",
                                marginTop: "7px", marginLeft: "33%"}} /></a></Link>
                        </Grid>
                        <Grid item xs={9}>
                            <FontAwesomeIcon icon={faTimes} style={{
                                color:'rgb(239, 83, 80)', fontSize:'21px', float:'right', marginRight:'41px', cursor:'pointer',marginTop:'10px'}} />
                        </Grid>

                    </Grid>}
                    changeMenuOn="700px"

                    largeMenuClassName="large-menu-classname"
                    smallMenuClassName="small-menu-classname"
                    menu={
                        <div>

                            <Grid container className={allset.navbarGrid}  style={{ backgroundColor: "#fff",position: "fixed", top: "0px", width: "100%", zIndex: "100",
                                boxShadow: "0 0 0 0",padding:'6px'}}>



                                <Grid onClick={() => this.saveUserActivity('Home page')} style={{textAlign:'left'}} item xs={3}  className={allset.shera} >
                                    <Link href="/setting/userManagement/userManage/multipleAccount"><a><img src={palette} style={{height: "44px",
                                        marginLeft: "24%"}} /></a></Link>
                                </Grid>


                                <Grid item xs={9}  style={{ backgroundColor: "#fff", color: "#222222", boxShadow: "0 0 0 0"}}>



                                    {/* navbar menu start */}
                                    <div title="Palette account" className={card.userAccount} style={{marginRight:'13%', float:'right', marginTop:'9px',
                                        display:'flex', padding:'11px 11px 0px', cursor:'pointer', borderRadius:'7px'}}>

                                        <span className="popup"  onClick={() => this.myFunction()}>

                                            <span className={card.userAccount} style={{position:'relative', top:'-5px'}}>Result</span>

                                            </span>

                                    </div>

                                </Grid>
                            </Grid>
                        </div>
                    }
                />

                <LargeMenu className={largeMenuClassName} size={changeMenuOn}>
                    {menu}
                </LargeMenu>
                <SmallMenu className={smallMenuClassName} size={changeMenuOn}>
                    {!this.state.showMenu ? (
                        <MenuIcon onClick={this.handleClick} icon={menuOpenButton} />
                    ) : (
                        <MenuIcon onClick={this.handleClick} icon={menuCloseButton} />
                    )}
                    {this.state.showMenu ? <div>{menu}</div> : null}
                </SmallMenu>

                <style jsx>
                    {`
                    
                     .popup {
                      position: relative;
                      display: inline-block;
                      cursor: pointer;
                      -webkit-user-select: none;
                      -moz-user-select: none;
                      -ms-user-select: none;
                      user-select: none;
                    }
                    
                    /* The actual popup */
                    .popup .popuptext {
                      visibility: hidden;
                      width: 300px;
                      background-color: #fff;
                      color: #000;
                      text-align: center;
                      border-radius: 3px;
                      padding: 8px 0;
                      position: absolute;
                      z-index: 1;
                      top: 58px;
                      left: -52%;
                      margin-left: -80px;
                    }
                    
                    /* Popup arrow */
                    .popup .popuptext::after {
                      content: "";
                      position: absolute;
                      top: -7%;
                      left: 50%;
                      margin-left: -5px;
                      border-width: 5px;
                      border-style: solid;
                      border-color: transparent  transparent #b3b3b3  transparent;
                    }
                    
                    /* Toggle this class - hide and show the popup */
                    .popup .show {
                      visibility: visible;
                      -webkit-animation: fadeIn 1s;
                      animation: fadeIn 1s;
                    }
                    
                    /* Add animation (fade in the popup) */
                    @-webkit-keyframes fadeIn {
                      from {opacity: 0;} 
                      to {opacity: 1;}
                    }
                    
                    @keyframes fadeIn {
                      from {opacity: 0;}
                      to {opacity:1 ;}
                    }
              `}
                </style>

            </div>

        );
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

Navbar.propTypes = {
    // menu: PropTypes.node.isRequired,
    largeMenuClassName: PropTypes.string,
    smallMenuClassName: PropTypes.string,
    // changeMenuOn: PropTypes.string.isRequired,
    // menuOpenButton: PropTypes.node.isRequired,
    // menuCloseButton: PropTypes.node.isRequired
};

Navbar.defaultProps = {
    largeMenuClassName: '',
    smallMenuClassName: ''
};

export default withStyles(styles, { withTheme: true })(Navbar);
