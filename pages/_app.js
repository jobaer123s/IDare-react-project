import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../src/getPageContext';
import symbol from "../static/images/symbol.png";
import fab from "../static/images/fab.png";
import logo from "./images/sheraspace_logo.jpg"
import allset from './Components/allset.css';
import msg from "../static/images/msg.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone} from "@fortawesome/free-solid-svg-icons";
import NetworkDetector from './internetError';

class MyApp extends App {

    state = {
        loading: true
      };

    constructor(props) {
        super(props);
        this.pageContext = getPageContext();
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 0);
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }

    }



    render() {
        const { loading } = this.state;

        if(loading) {
            <p style={{}}> Hold on, it's loading!</p> // if your component doesn't have to wait for an async action, remove this block
            return <div  style={{textAlign:'center', marginTop:'320px', color:'#fff'}}>
                loading ....
                {/*<img src={symbol} style={{ height:'150px'}} />*/}
            </div> // render null when app is not ready
        }
        const { Component, pageProps } = this.props;


       
        return (
            <div>
                <NetworkDetector/>

             <Head>
                    <title>Palette</title>
                     <meta
                         name="viewport"
                         content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                     />
                    <meta property="og:url" content="http://www.sheraspace.com" />
                    <meta property="og:description" content="sheraspace is its people. It's imperative
                     that we hire smart,innovative people who can work intelligently as we continuey we created. Come join us!" />
                    <link rel="icon" href="./static/images/palette6.png" />

                    <meta property="og:site_name" content="sheraspace" />
                    <meta property="og:image" content="./images/sheraspace_logo.jpg" />
                    <meta property="og:title" content="sheraspace" />
                     <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                     <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
                     <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/4.2.0/core/main.min.css" />

                  
                </Head>
               
         
            <Container>
              
                 
               
                {/* Wrap every page in Jss and Theme providers */}
                <JssProvider  registry={this.pageContext.sheetsRegistry}
                              generateClassName={this.pageContext.generateClassName} >
                
                    {/* MuiThemeProvider makes the theme available down the React tree thanks to React context. */}
                    <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager} >
                        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                        <CssBaseline />
                        {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
                        <Component pageContext={this.pageContext} {...pageProps} />
                    </MuiThemeProvider>
                </JssProvider>
            </Container>

            </div>
        );
    }
}
export default MyApp
