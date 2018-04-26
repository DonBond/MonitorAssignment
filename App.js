import React from 'react';
import {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { map } from 'lodash';
import axios from 'axios';

const URLList = ({data}) => {
    return (
        <ul>
            {
                map(data, dt => (
                    dt.status === "Up" ?
                        /*<li key={dt.key} style={{ backgroundColor: dt.color }}>{dt.url} - {dt.status} </li>:
                        <li key={dt.key} style={{ backgroundColor: dt.color }}>{dt.url} - {dt.status}</li>*/
                        <li key={dt.key} style={{ backgroundColor: dt.color }}>{dt.Description} - {dt.status} </li>:
                <li key={dt.key} style={{ backgroundColor: dt.color }}>{dt.Description} - {dt.status}</li>
                ))}
        </ul>
    );
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            listData: [],
        };

    }
    componentWillMount(){
        let myURLS = [{
            "key":1,
            "url": "https://cognition.dev.stackworx.cloud/api/status",
            "status": "",
            "color": "",
            "Description":"Test1",

        },
            {
                "key": 2,
                "url": "https://ord.dev.stackworx.io/health",
                "status": "",
                "color":"",
                "Description":"Test2",

            },
            {
                "key": 3,
                "url": "https://api.durf.dev.stackworx.io/health",
                "status": "",
                "color":"",
                "Description":"Test3",

            },
            {
                "key": 4,
                "url": "https://prima.run/health",
                "status": "",
                "color":"",
                "Description":"Test4",

            },
            {
                "key": 5,
                "url": "https://stackworx.io/",
                "status": "",
                "color":"",
                "Description":"Test5",

            },
            {
                "key": 6,
                "url": "https://stackworx.io/",
                "status": "",
                "color":"",
                "Description":"Test6",

            }
        ];
        myURLS.map((obj,i) => {
            //Do the check and update the status to Up or Down
            axios.get(obj.url).then((response) =>
                {
                    console.log(1);

                    if (response.status === 200) {
                        obj.status = "Up";
                        obj.color = "#0d6300";

                    }
                    else if (response.status > 300){
                        obj.status = "Down";
                        obj.color = "#0d6300";

                    }
                }
            ).catch((e)=>{
                //nothing
                obj.status = "Something Wrong";
                obj.color = "#BCBEA1";
            });
        });
        //Hack to give react some time
        setTimeout(() => {
            this.setState({ listData: myURLS });

        }, 2000);
    }

    render() {
        const {  listData } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Site Monitor</h1>
                </header>
                <div className="App-intro">
                    <URLList
                        data={listData}
                    />
                </div>
            </div>
        );
    }
}

export default App;






/*var request = require('request'),
    statusCodes = require('http').STATUS_CODES;

this.statusCode = statusCodes;
var endpoints=[
    {url: "https://cognition.dev.stackworx.cloud/api/status"},
    {url: "https://ord.dev.stackworx.io/health"},
    {url: "https://api.durf.dev.stackworx.io/health"}
]
function Ping() {
    var self = this, currentTime = Date.now();

    try {
        //send request
        request(endpoints.url, function (error,res) {
            //website is up
            if (!error && res.statusCode === 200){
                alert(endpoints + 'Working');
            }

            //No error but website not ok
            else{
                alert('not Working');
            }
        });
    }
    catch (err) {
        alert('not Working');
    }
}

var monitors = [];
 monitors = new Ping ({
    endpoints: endpoints.url
});
class App extends Component{
    render(){
        return(
            <ul>
                {endpoints.map(function(site, i) {
                    return <li key={i}>{site.url}</li>
                } )}

                {/!*{endpoints.map(function(site, i) {
                    return <li key={i}>{site.url}</li>
                } )}*!/}
            </ul>
        )
    }
}
export default App;*/

/*class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <p className="EndpointList"></p>
      </div>
    );
  }
}*/


//export default App;


/*"use strict"

var Monitor = require('./Ping');
var websites = require('./Websites');
var http = require('http');
var port = process.env.PORT || 3008;

var urls = [];
var monitors = [];


/!*
   Loop over all websites and create a Monitor instance for each one.
*!/
websites.forEach(function (website) {

    var monitor = new Monitor ({
        website: website.url,
        interval: website.interval
    });



    urls.push(website.url);
    monitors.push(monitor);
});*/



/*
   Server for responding to http requests
*/
/*http.createServer(function (req, res) {
    res.end(urls.join('\n'));
}).listen(port);

console.log('Listening to port %s', port);*/




