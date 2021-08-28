/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import { Layer, Rect, Circle, Line } from 'react-konva';

function DrawLayer(props) {
    const { toolState } = props;
    
    const [content, setContent] = React.useState([]);
    
    const createContent = () => {
        const result = [];
        content.forEach(c => {
            result.push(c);
        });
        if (toolState && toolState.getElement()) {
            result.push(toolState.getElement());
        }
        return result;
    };
    
    return (
            <Layer>
                {createContent()}
            </Layer>
    );
}

export default DrawLayer;
