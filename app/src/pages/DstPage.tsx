import Sidebar from '../Sidebar'
import ImageCanvas from "../ImageCanvas";
import '../css/EditorPage.css'

const DstPage = (props: { canvasName: string }) => {
    return (
        <div className='DstPage'>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <ImageCanvas canvasName={props.canvasName} />
        </div>
    );
};

export default DstPage;