import React, { Component } from 'react';

class NetworkDetector extends Component {
        state = {
            isDisconnected: false
        }

        componentDidMount() {
            this.handleConnectionChange();
            window.addEventListener('online', this.handleConnectionChange);
            window.addEventListener('offline', this.handleConnectionChange);
        }

        componentWillUnmount() {
            window.removeEventListener('online', this.handleConnectionChange);
            window.removeEventListener('offline', this.handleConnectionChange);
        }


        handleConnectionChange = () => {
            const condition = navigator.onLine ? 'online' : 'offline';
            if (condition === 'online') {
                const webPing = setInterval(
                    () => {
                        fetch('//google.com', {
                            mode: 'no-cors',
                        })
                            .then(() => {
                                this.setState({ isDisconnected: false }, () => {
                                    return clearInterval(webPing)
                                });
                            }).catch(() => this.setState({ isDisconnected: true }) )
                    }, 2000);
                return;
            }

            return this.setState({ isDisconnected: true });
        }

        render() {
            const { isDisconnected } = this.state;
            return (
                <div>
                    { isDisconnected && (<div className="internet-error">
                        <p style={{background:'red', textAlign:'center', color:'#fff', padding:'5px', marginTop:'0',
                            position:'fixed', width:'100%', top:'0', zIndex:'1000'}}>Internet connection lost</p>
                    </div>)
                    }
                </div>
            );
        }
    }

 export default  NetworkDetector;
