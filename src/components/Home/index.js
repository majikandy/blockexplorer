import React, { Component } from 'react';
import './style.css';
import Block from './../Block';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Home extends Component {

    constructor() {
        super();
        this.state={latestBlock:{}};
    }

    componentDidMount() {
        fetch(`http://localhost:9000/api/query/block/latest`,{mode: 'cors'})
            .then(result=>result.json())
            .then(latestBlock=>this.setState({latestBlock}));
    }
    
    render() {
        return (
            <div className="Home">
                <h2>Home page</h2>
                
                    <div>
                        Current height: <Link to={"/block/" +  this.state.latestBlock.blockIndex }> {this.state.latestBlock.blockIndex}</Link>
                        <Route path="/block/:blockIndex"  component={Block}/>

                        
                    </div>
       
               
         
            </div>
        );
    }
}

export default Home;