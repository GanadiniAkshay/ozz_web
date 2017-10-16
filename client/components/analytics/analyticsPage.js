import React from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';

import { getLogs } from '../../actions/analyticsActions';
import { browserHistory, Link} from 'react-router';

import Navbar from '../navbar/Navbar';
import PropTypes from 'prop-types';

class AnalyticsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            crosshairValues: [],
            hoveredSection: false,
            api_calls: 0,
            time: 0,
            success: 0,
            intent_count: [],
            intent_labels:[],
            times:[],
            data : [
                {x: '2017-10-07 14:40:25.334018', y: 8},
                {x: '2017-10-08 14:40:25.334018', y: 5},
                {x: '2017-10-09 14:40:25.334018', y: 4}
              ]
        };
    }

    componentDidMount(){
        var payload = {
            bot_guid:this.props.activeBot.activeBot.bot_guid
        };

        var that = this;
        this.props.getLogs(payload).then(()=>{
            var logs = that.props.logs;
            
            var intent_count = []
            var intent_labels = []

            var count = logs.intent_count;
            for (var key in count){
                intent_labels.push(key);
                intent_count.push(count[key]);
            }

            console.log(intent_labels);
            that.setState({api_calls:logs.calls,time:logs.avg_resp_time,intent_count:intent_count,intent_labels:intent_labels,success:logs.success_percentage, times: logs.times});


            var timestamp_data = [];
            var times = that.state.times;

            for (var i=0; i<times.length; i++){
                var time_obj = {}
                time_obj['x'] = new Date(times[i]);
                time_obj['y'] = 1
                timestamp_data.push(time_obj);
            }

            var data = {
                datasets: [{
                    label: 'No of API Requests',
                    data: timestamp_data,
                    borderColor: '#00008B',
                    backgroundColor: 'transparent'
                  },
      
                ]
            };

            var ctx = document.getElementById("timeChart");
            var myLineChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                  fill: 'origin',
                  responsive: true,
      
                  scales: {
                    xAxes: [{
                      type: 'time',
                      display: true,
                      scaleLabel: {
                        display: true,
                        labelString: "Date",
                      }
                    }],
      
                    yAxes: [{
                      display: true,
                      scaleLabel: {
                        display: true,
                        labelString: "Calls",
                      }
                    }]
                  }
                },
              });
    
            var ctx2 = document.getElementById("pieChart");
            var data = {
                datasets: [{
                    data: this.state.intent_count,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }],
            
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: this.state.intent_labels
            };
            var myDoughnutChart = new Chart(ctx2, {
                responsive:'true',
                type: 'doughnut',
                data: data
            });
        })
    }

    render(){
        const data = this.state.data;
        const intent_count = this.state.intent_count;

        return (
            <div className="full">
                <Navbar active="app_new"/>
                <main>
                    <div className="container">
                        <h4>Analytics</h4>
                        <div className="row" style={{"height":"100%"}}>
                            <div className="col s6" style={{"height":"100%"}}>
                                <div className="card" style={{"height":"100%"}}>
                                    <br/>
                                    <h6 style={{"textAlign":"center"}}>API Requests</h6>
                                    <div className="chart-container" style={{"position":"relative"}}>
                                        <canvas id="timeChart" width="300" height="300"></canvas>
                                    </div>
                                </div>
                                <br/>
                                <div className="card" style={{"height":"100%"}}>
                                    <br/>
                                    <h6 style={{"textAlign":"center"}}>Intent Usage</h6>
                                    <div className="chart-container" style={{"position":"relative"}}>
                                        <canvas id="pieChart" width="300" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div className="col s4 offset-s2">
                                <div style={{"height":"100%"}}>
                                    <div className="card" style={{"width":"inherit","textAlign":"center"}}>
                                        <h1>{this.state.api_calls}</h1> 
                                        <span style={{"marginTop":"-2%"}}>API Calls</span>
                                    </div>
                                    <br/>
                                    <div className="card" style={{"width":"inherit","textAlign":"center"}}>
                                        <h1>{this.state.time}</h1>
                                        <span style={{"marginTop":"-2%"}}>Average Response Time <br/> (seconds)</span>
                                    </div>
                                    <br/>
                                    <div className="card" style={{"width":"inherit","textAlign":"center"}}>
                                        <h1>{this.state.success}</h1>
                                        <span style={{"marginTop":"-2%"}}>Success Percentage</span>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

AnalyticsPage.PropTypes = {
    getLogs: PropTypes.func.isRequired
}

function mapStateToProps(state){
    return {
        logs:state.analytics.logs,
        activeBot: state.activeBot
    }
}


export default connect(mapStateToProps, { getLogs })(AnalyticsPage);