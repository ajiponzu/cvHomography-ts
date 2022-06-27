import { slide as Menu } from 'react-burger-menu';
import './css/Sidebar.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import SrcInputBox from './SrcInputBox';
import DstInputBox from './DstInputBox';

const Sidebar = (props: { pageWrapId: any, outerContainerId: any }) => {

    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {

    };

    const inputElems: JSX.Element[] = [];
    for (let i = 4; i < 8; i++) {
        inputElems.push(<SrcInputBox idx={i} key={i} />);
    }

    const srcElems: JSX.Element[] = [];
    for (let i = 0; i < 4; i++) {
        srcElems.push(<SrcInputBox idx={i} key={i} />);
    }

    const dstElems: JSX.Element[] = [];
    for (let i = 0; i < 4; i++) {
        dstElems.push(<DstInputBox idx={i} key={i} />);
    }

    return (
        <div className='Sidebar'>
            <Menu>
                <button id='runHmg' onClick={onButtonClick} >Run Hmg</button>
                <div className='TabView'>
                    <Tabs forceRenderTabPanel defaultIndex={1}>
                        <TabList>
                            <Tab>SrcPoints</Tab>
                            <Tab>DstPoints</Tab>
                        </TabList>

                        <TabPanel>
                            <Tabs>
                                <TabList>
                                    <Tab>srcPoints</Tab>
                                    <Tab>InputRect</Tab>
                                </TabList>

                                <TabPanel>
                                    <div className='srcElems'>
                                        {srcElems}
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className='inputElems'>
                                        {inputElems}
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </TabPanel>

                        <TabPanel>
                            <div className='dstElems'>
                                {dstElems}
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </Menu>
        </div >
    );
};

export default Sidebar;