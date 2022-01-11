import React, {Component} from "react";
import FundDetails from "./FundDetails";

class MFDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            funds: []
        }
    }

    componentDidMount()
    {
        const apiLink = "https://api.mfapi.in/mf";
        fetch(apiLink)
        .then(response => response.json())
        .then(response => {
            response = response.filter(eachFund => eachFund.schemeName.toUpperCase().indexOf(this.props.mfName) === 0)
            .filter(eachFund => eachFund.schemeName.toUpperCase().indexOf("GROWTH") > -1)
            .filter(eachFund => eachFund.schemeName.toUpperCase().indexOf("DIRECT") > -1)
            .filter(eachFund => eachFund.schemeName.toUpperCase().indexOf("DEBT") === -1)
            .filter(eachFund => eachFund.schemeName.toUpperCase().indexOf("MATURITY") === -1)
            .filter(eachFund => eachFund.schemeName.toUpperCase().indexOf("SERIES") === -1);

            this.setState({funds : response})
        })
        .catch(err => console.log(err));
    }

    render() { 
        let content = "Loading...!!!";
        if((this.state.funds.length) > 0) 
        {
            content = this.state.funds.map(eachFund => <FundDetails key={eachFund.schemeName} fund={eachFund}/>);
            content = <table border="1" style={{borderCollapse:'collapse'}}>
                <thead>
                    <tr>
                        <th><nobr>Scheme Code</nobr></th>
                        <th><nobr>Scheme Name</nobr></th>
                        <th>1D</th>
                        <th>7D</th>
                        <th>15D</th>
                        <th>1M</th>
                        <th>2M</th>
                        <th>3M</th>
                        <th>6M</th>
                        <th>9M</th>
                        <th>1Y</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        }
        return <div>
            {content}
        </div>;
    }
}
 
export default MFDashboard;