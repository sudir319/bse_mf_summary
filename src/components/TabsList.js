import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BSEDayTabs from './bse/BSEDayTabs';
import BSEStocks from './bse_stocks/BSEStocks';
import MFTabs from './sbimf/MFTabs';

const TabsList = () => (
  <Tabs>
    <TabList>
      <Tab><nobr>BSE Indices</nobr></Tab>
      <Tab><nobr>BSE Stocks</nobr></Tab>
      <Tab><nobr>Mutual Fund Stats</nobr></Tab>
    </TabList>

    <TabPanel>
        <BSEDayTabs/>
    </TabPanel>
    <TabPanel>
        <BSEStocks/>
    </TabPanel>
    <TabPanel>
        <MFTabs/>
    </TabPanel>
  </Tabs>
);

export default TabsList;