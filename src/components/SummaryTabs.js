import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DayTabs from './bse_summary/DayTabs';

export default () => (
  <Tabs>
    <TabList>
      <Tab>BSE Summary</Tab>
      <Tab>NSE Summary</Tab>
    </TabList>

    <TabPanel>
        <DayTabs/>
    </TabPanel>
    <TabPanel>
      <h2>Not Implemented</h2>
    </TabPanel>
  </Tabs>
);