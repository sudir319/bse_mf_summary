import React, {Component} from 'react';
import Summary from './Summary';
class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            categories : [1, 2, 3, 4, 5, 6]
        }
    }
    render() { 
        return <table border="1" style={{borderCollapse:'collapse'}}>
            <thead>
                <tr>
                    <th>Index</th>
                    <th><nobr>Prev Close</nobr></th>
                    <th><nobr>Current Value</nobr></th>
                    <th>Change</th>
                    <th><nobr>Change %</nobr></th>
                </tr>
            </thead>
            <tbody>
            {
            this.state.categories.map(eachCategory => <Summary key={eachCategory} category={eachCategory}/>)
            }
            </tbody>
        </table>;
    }
}
 
export default Dashboard;