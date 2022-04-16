import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import BSEStocks from './bse_stocks/BSEStocks';
import MFTabs from './sbimf/MFTabs';
import BSEIndices from './bse/BSEIndices';
import BSE_ETFs from './bse_etfs/BSE_ETFs';

const TabsList = () => (
  <Tabs>
    <TabList>
      <Tab><nobr>BSE Indices</nobr></Tab>
      <Tab><nobr>BSE Stocks</nobr></Tab>
      <Tab><nobr>BSE ETFs</nobr></Tab>
      <Tab><nobr>Mutual Fund Stats</nobr></Tab>
    </TabList>

    <TabPanel>
        <BSEIndices/>
    </TabPanel>
    <TabPanel>
        <BSEStocks/>
    </TabPanel>
    <TabPanel>
        <BSE_ETFs/>
    </TabPanel>
    <TabPanel>
        <MFTabs/>
    </TabPanel>
  </Tabs>
);

export default TabsList;