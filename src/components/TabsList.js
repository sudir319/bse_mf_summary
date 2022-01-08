import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BSEDayTabs from './bse/BSEDayTabs';
import MFDashboard from './sbimf/MFDashboard';

const TabsList = () => (
  <Tabs>
    <TabList>
      <Tab>BSE</Tab>
      <Tab><nobr>SBI MF</nobr></Tab>
    </TabList>

    <TabPanel>
        <BSEDayTabs/>
    </TabPanel>
    <TabPanel>
        <MFDashboard/>
    </TabPanel>
  </Tabs>
);

export default TabsList;