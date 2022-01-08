import React, {Component} from "react";
import FundDetails from "./FundDetails";

class FundSummary extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        return this.props.funds.map(eachFund => <FundDetails fund={eachFund}/>);
    }
}
 
export default FundSummary;