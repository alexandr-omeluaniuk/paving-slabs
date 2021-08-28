/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { Layer } from 'react-konva';

function TempLayer(props) {
    const { toolState } = props;
    
    return toolState ? (
            <Layer>
                {toolState.render()}
            </Layer>
        ) : null;
}

export default TempLayer;
