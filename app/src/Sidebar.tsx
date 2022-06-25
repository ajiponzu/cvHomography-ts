import { slide as Menu } from 'react-burger-menu';
import './css/Sidebar.css'

const Sidebar = (props: { pageWrapId: any, outerContainerId: any }) => {
    return (
        <div className='Sidebar'>
            <Menu>
                <a className='menu-item' href='/'>Home</a>
                <a className='menu-item' href='/src'>ソース画像</a>
                <a className='menu-item' href='/dst'>マッチング画像</a>
                <a className='menu-item' href='/hmg'>射影変換画像</a>
            </Menu>
        </div>
    );
};

export default Sidebar;