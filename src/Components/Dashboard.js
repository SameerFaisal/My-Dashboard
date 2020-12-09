import React, { Component } from 'react';

//importing dependencies
import { Col, Row, Container } from 'react-bootstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
//importing stylesheet
import '../Styles/dashboard.css';

//components
import WidgetHeading from './Widgets/WidgetHeading';
import WidgetText from './Widgets/WidgetText'; 
import WidgetBar from './Widgets/WidgetBar';
import WidgetColumn from './Widgets/WidgetColumn';
import WidgetDoughnut from './Widgets/WidgetDoughnut';
import WidgetPie from './Widgets/WidgetPie';
//components end

//api credentials
//excel import
const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;


class Dashboard extends Component {

//sources : organic , direct , referral , social , email -> column
// users : users , newUsers -> doughnut
// pages: pages ,pages_per_session -> bar
// sessions: sessions , sessions_per-users , page-per-session , avg-session-time , bounce-rate -> pie

    constructor() {
        super();
        this.state = {
            items: [],
            dropdownOptions: [],
            selectedValue: null,
            organicSource: null,
            directSource: null,
            referralSource: null,
            socialSource: null,
            emailSource: null,
            pageViews: null,
            users: null,
            newUsers: null,
            sessions:null,
            sessionPerUser: null,
            pagePerSession: null,
            avgSessionTime:null,
            bounceRate:null,
            sourceArr : [],
            userArr : [],
            userPageSessArr : [],
            sessionArr : [],
        };
    }

    getData = arg =>{
        const arr = this.state.items;
        const arrLength = arr.length;
        let organicSource = 0;
        let directSource = 0;
        let referralSource = 0;
        let socialSource = 0;
        let emailSource = 0;
        let pageViews = 0;
        let users = 0;
        let newUsers = 0;
        let selectedValue = null;
        let sessions=0;
        let sessionPerUser= 0;
        let pagePerSession= 0;
        let avgSessionTime=0;
        let bounceRate = 0;
        let sourceArr = [];
        let userArr = [];
        let userPageSessArr = [];
        let sessionArr = [];

        for (let i = 0; i < arrLength; i++) {
            if( arg === arr[i].month){
                organicSource = arr[i].organic_source;
                directSource = arr[i].direct_source;
                referralSource = arr[i].referral_source;
                socialSource = arr[i].social_source;
                emailSource = arr[i].email_source;
                pageViews = arr[i].page_views;
                users = arr[i].users;
                newUsers = arr[i].new_users;
                sessions = arr[i].sessions;
                sessionPerUser = arr[i].number_of_sessions_per_users;
                pagePerSession = arr[i].page_per_session;
                avgSessionTime = arr[i].avg_session_time;
                bounceRate = arr[i].bounce_rate;
               
                //source data for column visualization
                sourceArr.push(
                    {
                        label: "Organic Source",
                        value:  arr[i].organic_source
                    },
                    {
                        label: "Direct Source",
                        value:  arr[i].direct_source
                    },
                    {
                        label: "Referral Source",
                        value:  arr[i].referral_source
                    },
                    {
                        label: "Social Source",
                        value:  arr[i].social_source
                    },
                    {
                        label: "Email Source",
                        value:  arr[i].email_source
                    }
                );
                //user data for doughnut visualization
                userArr.push(
                    {
                        label: "Users",
                        value:  arr[i].users
                    },
                    {
                        label: "New Users",
                        value:  arr[i].new_users
                    }
                );
                //session data for bar visualization
                sessionArr.push( 
                    {
                        label: "Session per User",
                        value:  arr[i].number_of_sessions_per_users
                    },
                    {
                        label: "Page per session",
                        value:  arr[i].page_per_session
                    },
                    {
                        label: "Avg Session Time",
                        value:  arr[i].avg_session_time
                    },
                    {
                        label: "Bounce Rate",
                        value:  arr[i].bounce_rate
                    }
                );
                 //page data for bar visualization
                userPageSessArr.push(
                    
                    {
                        label: "Sessions",
                        value:  (arr[i].sessions)
                    },
                    {
                        label: "Page Views",
                        value:  (arr[i].page_views )
                    }
                );
            }             
        }
        selectedValue = arg;

        // changing states
        this.setState({
            organicSource : organicSource,
            directSource : directSource,
            referralSource: referralSource,
            socialSource : socialSource,
            emailSource : emailSource,
            pageViews: pageViews,
            users: users,
            newUsers: newUsers,
            sourceArr: sourceArr,
            userArr: userArr,
            sessions:sessions,
            sessionPerUser:sessionPerUser,
            pagePerSession:pagePerSession,
            avgSessionTime:avgSessionTime,
            bounceRate : bounceRate,
            userPageSessArr: userPageSessArr,
            sessionArr: sessionArr,
        })
    };

    updateDashboard = event =>{
        this.getData(event.value);
        this.setState({
            selectedValue : event.value
        });
    }

    componentDidMount() {

         fetch(url)
            .then(response => response.json())
            .then(data => {

                let batchRowValues = data.valueRanges[0].values;

                const rows = [];

                for (let i = 1; i < batchRowValues.length; i++) {
                    let rowObject = {};
                    for (let j = 0; j < batchRowValues[i].length; j++) {
                        rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                    }
                    rows.push(rowObject);
                }
                 // dropdown options
                let dropdownOptions = [];

                for (let i = 0; i < rows.length; i++) {
                    dropdownOptions.push(rows[i].month);
                }

                dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
                this.setState({
                        items: rows,
                        dropdownOptions: dropdownOptions,
                        selectedValue: "Jan 2018"
                    },
                    () => this.getData("Jan 2018")
                );
            });      

    }
    

    render() {

        return (
            <div>
            <Container fluid>
                <Row className="TopHeader">
                    <Col>
                        Dashboard
                    </Col>
                    <Col>
                        <Dropdown   className="dropDown"
                                    options={this.state.dropdownOptions} 
                                    onChange={this.updateDashboard} 
                                    value={this.state.selectedValue} 
                                    placeholder="Select Month" />
                    </Col>
                </Row>
            </Container>

            <Container className="mainDaashboard">
                <Row>
                    <WidgetHeading heading="Sources"/>
                </Row>

                <Row>
                    <Col>
                        <WidgetText title="Organic Source" value={this.state.organicSource}/>
                    </Col>
                    <Col>
                        <WidgetText title="Direct Source" value={this.state.directSource}/>
                    </Col>
                    <Col>
                        <WidgetText title="Referral Source" value={this.state.referralSource}/>
                    </Col>
                    <Col>
                        <WidgetText title="Social Source" value={this.state.socialSource}/>
                    </Col>
                     
                </Row>
                <Row>
                    <Col>
                        <WidgetBar title="Source Comparison" data={this.state.sourceArr}/>
                    </Col>
                </Row>

                <Row>
                    <WidgetHeading heading="Users"/>
                </Row>

                <Row >
                    <Col>
                       <WidgetText title="Users" value={this.state.users}/>
                    
                        <WidgetText title="New Users" value={this.state.newUsers}/>
                    </Col>
                    <Col>
                        <WidgetDoughnut title="Users Comparison" data={this.state.userArr}/>
                    </Col>
                </Row>
                


                <Row>
                    <WidgetHeading heading="Sessions"/>
                </Row>
                 <Row>
                    <Col>
                        <WidgetText title="No of Sessions" value={this.state.sessions}/>
                    
                        <WidgetText title="Sessions per User" value={this.state.sessionPerUser}/>
                    
                        <WidgetText title="Page per Sessions" value={this.state.pagePerSession}/>
                   
                    </Col>
                    <Col>
                        <WidgetText title="Avg Sessions Time" value={this.state.avgSessionTime}/>
                        
                        <WidgetText title="Bounce Rate" value={this.state.bounceRate}/>
                
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <WidgetPie title="Sessions Comparison" data={this.state.sessionArr}/>
                    </Col>
                </Row>

                <Row>
                    <WidgetHeading heading="pages"/>
                </Row>

                <Row>
                    <Col>
                        <WidgetText title="Sessions" value={this.state.sessions}/>
                    </Col>
                    <Col>
                        <WidgetText title="Page Views" value={this.state.pageViews}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <WidgetColumn title="Source Comparison" data={this.state.userPageSessArr}/>
                    </Col>
                </Row>
            </Container>
            
            </div>
        )
    }
}

export default Dashboard;