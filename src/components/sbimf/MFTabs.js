
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MFDashboard from './MFDashboard';

const BSEDayTabs = () => (
  <Tabs>
    <TabList>
      <Tab>SBI</Tab>
      <Tab>HDFC</Tab>
      <Tab>ICICI</Tab>
      <Tab>KOTAK</Tab>
      <Tab>AXIS</Tab>
    </TabList>

    <TabPanel>
        <MFDashboard mfName="SBI"/>
    </TabPanel>
    <TabPanel>
      <MFDashboard mfName="HDFC"/>
    </TabPanel>
    <TabPanel>
      <MFDashboard mfName="ICICI"/>
    </TabPanel>
    <TabPanel>
      <MFDashboard mfName="KOTAK"/>
    </TabPanel>
    <TabPanel>
      <MFDashboard mfName="AXIS"/>
    </TabPanel>
  </Tabs>
);

export default BSEDayTabs;