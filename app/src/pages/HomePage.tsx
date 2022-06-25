import Sidebar from '../Sidebar'

import icon from '../assets/homeImage.png'

const HomePage = () => {
    return (
        <div className='HomePage'>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div>
                <img src={icon} />
            </div>
        </div>
    );
};

export default HomePage;