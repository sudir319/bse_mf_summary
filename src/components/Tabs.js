import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Dashboard from './bse_summary/Dashboard';

export default () => (
  <Tabs>
    <TabList>
      <Tab>BSE Summary</Tab>
      <Tab>NSE Summary</Tab>
    </TabList>

    <TabPanel>
        <Dashboard/>
    </TabPanel>
    <TabPanel>
      <h2>Not Implemented</h2>
    </TabPanel>
  </Tabs>
);