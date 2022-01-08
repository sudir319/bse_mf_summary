
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Dashboard from './Dashboard';

const BSEDayTabs = () => (
  <Tabs>
    <TabList>
      <Tab>1D</Tab>
      <Tab>1M</Tab>
      <Tab>3M</Tab>
      <Tab>6M</Tab>
      <Tab>1Y</Tab>
    </TabList>

    <TabPanel>
        <Dashboard duration="1D"/>
    </TabPanel>
    <TabPanel>
        <Dashboard duration="1M"/>
    </TabPanel>
    <TabPanel>
        <Dashboard duration="3M"/>
    </TabPanel>
    <TabPanel>
        <Dashboard duration="6M"/>
    </TabPanel>
    <TabPanel>
        <Dashboard duration="12M"/>
    </TabPanel>
  </Tabs>
);

export default BSEDayTabs;