import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import HomeView from "./HomeView";
import SrcEditView from "./SrcEditView";
import DstEditView from "./DstEditView";

/* タブによって表示コンポーネントの切り替えを行う */
const TabView = () => {
  return (
    <div className="TabView">
      <Tabs>
        <TabList>
          <Tab>HOME</Tab>
          <Tab>EditSrc</Tab>
          <Tab>EditDst</Tab>
          <Tab>Result</Tab>
          <Tab>ResultRect</Tab>
        </TabList>

        <TabPanel>
          <HomeView />
        </TabPanel>
        <TabPanel>
          <SrcEditView />
        </TabPanel>
        <TabPanel>
          <DstEditView />
        </TabPanel>
        <TabPanel>
          <h1>Result</h1>
        </TabPanel>
        <TabPanel>
          <h1>ResultRect</h1>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabView;
