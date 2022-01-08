import React, {Component} from "react";

class FundDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    getPastDates = () => {
        var today = new Date();
        today.setDate(today.getDate() - 7);
        var oneWeekBackDate = today;

        today = new Date();
        today.setMonth(today.getMonth() - 1);
        var oneMonthBackDate = today;

        today = new Date();
        today.setMonth(today.getMonth() - 3);
        var threeMonthsBackDate = today;

        today = new Date();
        today.setMonth(today.getMonth() - 6);
        var sixMonthsBackDate = today;

        today = new Date();
        today.setFullYear(today.getFullYear() - 1);
        var oneYearBackDate = today;

        today = new Date();
        return [
            1,
            this.getDateDifference(today, oneWeekBackDate),
            this.getDateDifference(today, oneMonthBackDate),
            this.getDateDifference(today, threeMonthsBackDate),
            this.getDateDifference(today, sixMonthsBackDate),
            this.getDateDifference(today, oneYearBackDate),
        ]
    }

    getDateDifference = (date1, date2) =>
    {
        return parseInt((date1 - date2) / (1000 * 60 * 60 * 24), 10);
    }

    componentDidMount() {
        const fund = this.props.fund;
        const dates = this.getPastDates();
        const apiLink = "https://api.mfapi.in/mf/" + fund.schemeCode;
        fetch(apiLink)
        .then(response => response.json())
        .then(response => response.data.slice(0, 365))
        .then(response => {
            var maxSize = response.length - 1;
            return [
                fund.schemeCode,
                fund.schemeName,
                ...(dates.map(eachDate =>
                    {
                        var currentNav = parseFloat(response[0].nav).toFixed(5);
                        var oldNav = parseFloat( eachDate > maxSize ? response[maxSize].nav : response[eachDate].nav).toFixed(5);
                        return (((currentNav - oldNav) / oldNav) * 100000).toFixed(0);
                    }
                ))
            ];
        })
        .then(response => this.setState({data: response}))
        .catch(err => console.log(err));
    }
    render() {
        let content = (<tr><td colSpan={8}>Loading...!!!</td></tr>);

        if(this.state.data && this.state.data.length > 0)
        {
            content = this.state.data.map((eachData, index) => 
                <td align={index === 1 ? "left" : "center"}>
                    {index > 1 ? <font color = {eachData < 0 ? "red" : "green"}>{eachData}</font> : index == 1 ?<nobr>{eachData}</nobr> : eachData}
                </td> 
            );
            content = <tr key={this.state.data[1]}>{content}</tr>
        }
        return (content);
    }
}
 
export default FundDetails;