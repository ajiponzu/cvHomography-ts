import { slide as Menu } from 'react-burger-menu';
import './css/Sidebar.css';

import SrcInputBox from './SrcInputBox';
import DstInputBox from './DstInputBox';

const Sidebar = (props: { pageWrapId: any, outerContainerId: any }) => {

    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {

    };

    const srcElems: JSX.Element[] = [];
    const dstElems: JSX.Element[] = [];
    for (let i = 0; i < 4; i++) {
        srcElems.push(<SrcInputBox idx={i} key={i} />);
        dstElems.push(<DstInputBox idx={i} key={i} />);
    }
    for (let i = 4; i < 8; i++) {
        srcElems.push(<SrcInputBox idx={i} key={i} />);
    }

    return (
        <div className='Sidebar'>
            <Menu>
                <button id='runHmg' onClick={onButtonClick} >Run Hmg</button>
                <div className='src'>
                    <h2>SrcPoints</h2>
                    {srcElems}
                </div>
                < div className='dst'>
                    <h2>DstPoints</h2>
                    {dstElems}
                </div>
            </Menu>
        </div >
    );
};

export default Sidebar;