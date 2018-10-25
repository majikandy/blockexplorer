import React, { Component } from 'react';
import './style.css';
import Block from './../Block';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Grid, Row, Col, Table } from 'react-bootstrap'
import Moment from 'react-moment';

class Home extends Component {

    constructor() {
        super();
        this.state={latestBlock:{}, blocks:[]};
    }

    componentDidMount() {
        fetch(`http://localhost:9000/api/query/block/latest`,{mode: 'cors'})
            .then(result=>result.json())
            .then(latestBlock=>this.setState({latestBlock}))
            .then(_ => {
                for (let index = 0; index < 50; index++) {
                    var currentTime = new Date().getTime();
                    while (currentTime + 1 >= new Date().getTime()) {
                        //stupid 1ms delay to help enforce order
                    }
                    let blockNum = this.state.latestBlock.blockIndex - index;
                    let url = `http://localhost:9000/api/query/block/Index/${blockNum}/transactions`;
                    fetch(url ,{mode: 'cors'})
                    .then(result=>result.json())
                    .then(block=>this.setState({blocks: this.state.blocks.concat(block)}));
                    
                }
            });
            //.then(_ => this.state.blocks.sort((b, a) => a.blockIndex > b.blockIndex));
    }
    
    render() {
        return (
            <Grid>
                <div className="Home">
                    
                        <div className="jumbotron">
                            <h1>{this.state.latestBlock.coinTag} Block explorer</h1>
                        </div>
                    
                        <div>
                            Current height: <Link to={"/block/" +  this.state.latestBlock.blockIndex }> {this.state.latestBlock.blockIndex}</Link>
                            <Route path="/block/:blockIndex"  component={Block}/>

                            
                        </div>
                        <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <td>Height</td>
                                <td>Age</td>
                                <td>Hash</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.blocks
                            .map(function(object, i){
                                return <tr>
                                    <td><Link to={"/block/" +  object.blockIndex }> {object.blockIndex}</Link></td>
                                    {/* <td>{object.transactionCount}</td> */}
                                    <td><Moment fromNow ago unix>{object.blockTime}</Moment></td>
                                    <td>{object.blockHash}</td>
                                </tr>
                             } )}
                        </tbody>
                        </table>
                    
                
            
                </div>
            </Grid>
        );
    }
}

export default Home;