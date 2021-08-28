/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import { Stage, Layer } from 'react-konva';
import { LINE } from '../constants/Tools';

function DrawStage(props) {
    const { tool, stageWidth, stageHeight } = props;
    
    const [toolState, setToolState] = React.useState(null);
    const [content, setContent] = React.useState([]);
    
    const onStageMouseUp = (e) => {
        if (tool && e.target && e.target.getPointerPosition) {
            if (tool === LINE) {
                const coords = e.target.getPointerPosition();
                toolState.points.push(coords);
                setToolState(toolState.clone());
            }
        }
    };
    
    const onStageMouseMove = (e) => {
        if (tool && e.target && e.target.getPointerPosition) {
            const coords = e.target.getPointerPosition();
            if (tool === LINE) {
                toolState.tempCoord = coords;
                setToolState(toolState.clone());
            }
        }
    };
    
    return (
            <Stage width={stageWidth} height={stageHeight} onMouseUp={onStageMouseUp} onMouseMove={onStageMouseMove}>
            <Layer>
                {content}
            </Layer>
            </Stage>
    );
}

export default DrawStage;
