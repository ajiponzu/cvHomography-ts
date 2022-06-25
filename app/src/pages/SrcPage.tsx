import Sidebar from '../Sidebar'
import ImageCanvas from "../ImageCanvas";
import '../css/EditorPage.css'

const SrcPage = (props: { canvasName: string }) => {
    return (
        <div className='SrcPage'>
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <ImageCanvas canvasName={props.canvasName} />
        </div>
    );
};

export default SrcPage;