/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React, { useEffect } from 'react';
import { Stage } from 'react-konva';
import { LINE, LineState } from '../constants/Tools';
import PersistLayer from '../layer/PersistLayer';
import TempLayer from '../layer/TempLayer';

function DrawStage(props) {
    const { tool, stageWidth, stageHeight, setInfo } = props;
    
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
        if (toolState && tool && e.target && e.target.getPointerPosition) {
            const coords = e.target.getPointerPosition();
            if (tool === LINE) {
                toolState.tempCoord = coords;
                setToolState(toolState.clone());
                setInfo(toolState.getInfo());
            }
        }
    };
    
    useEffect(() => {
        if (tool === LINE) {
            setToolState(new LineState());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tool]);
    
    useEffect(() => {
        if (toolState && toolState.isCompleted()) {
            const newContent = [];
            content.forEach(el => {
                newContent.push(el);
            });
            newContent.push(toolState.getElement());
            setToolState(new LineState());
            setContent(newContent);
            setInfo('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toolState]);
    
    return (
            <Stage width={stageWidth} height={stageHeight} onMouseUp={onStageMouseUp} onMouseMove={onStageMouseMove}>
                <PersistLayer content={content}/>
                <TempLayer toolState={toolState}/>
            </Stage>
    );
}

export default DrawStage;
