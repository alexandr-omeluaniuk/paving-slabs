/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { Layer } from 'react-konva';

function TempLayer(props) {
    const { toolState } = props;
    
    const toolContent = () => {
        return toolState && toolState.getElement();
    };
    return toolState ? (
            <Layer>
                {toolContent()}
            </Layer>
        ) : null;
}

export default TempLayer;
