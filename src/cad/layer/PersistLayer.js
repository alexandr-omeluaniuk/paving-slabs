/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { Layer } from 'react-konva';

function PersistLayer(props) {
    const { content } = props;
    
    return (
            <Layer>
                {content}
            </Layer>
    );
};

export default PersistLayer;