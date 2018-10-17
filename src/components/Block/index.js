import React, { Component } from 'react';
import './style.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class Block extends Component {
  constructor(props) {
    super(props);

    this.state = {
      block: { transactions : []},
    };
  }

  componentDidMount() {
    let blockIndex = this.props.match.params.blockIndex;
   
    fetch(`http://localhost:9000/api/query/block/Index/${blockIndex}/transactions`,{mode: 'cors'})
            .then(result=>result.json())
            .then(block=>this.setState({block}));
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }
  
  render() {
    return (
      <div className="Block">
        <h2>Block Info: {this.state.block.blockIndex}</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Block height</td>
              <td>{this.state.block.blockIndex}</td>
            </tr>
            <tr>
              <td>Timestamp</td>
              <td>{this.state.block.blockTime}</td>
            </tr>
            <tr>
              <td>Blockhash</td>
              <td>{this.state.block.blockHash}</td>
            </tr>
            <tr>
              <td>Block size</td>
              <td>{this.state.block.blockSize}</td>
            </tr>
            <tr>
              <td>Previous Blockhash</td>
              <td><a href={"/block/" +  (this.state.block.blockIndex-1) }>{this.state.block.previousBlockHash}</a></td>
              {/* <td><Link to={"/block/" +  (this.state.block.blockIndex-1) }>{this.state.block.previousBlockHash}</Link></td> */}
            </tr>
            <tr>
              <td>Next Blockhash</td>
              <td><a href={"/block/" +  (this.state.block.blockIndex+1) }>nextBlockHash</a></td>
              {/* <Link to={"/block/" +  (this.state.block.blockIndex+1) }>nextBlockHashWithLink</Link> */}
            </tr>
            <tr>
              <td>Transactions</td>
              <td><ul>{this.state.block.transactions.map((transactionHash, index) => <li>
                <Link to={"/transaction/" +  transactionHash }>{transactionHash}</Link>}
                </li>)}</ul></td>
              {/* <td><Link to={"/block/" +  (this.state.block.blockIndex-1) }>{this.state.block.nextBlockHash}</Link></td> */}
            </tr>
          </tbody>
         
        </table>
      </div>

    );
  }
}
export default Block;