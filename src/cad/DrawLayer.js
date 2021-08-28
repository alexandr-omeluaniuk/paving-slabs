/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import { Layer, Rect, Circle, Line } from 'react-konva';

function DrawLayer() {
    
    const [content, setContent] = React.useState(null);
    
    return (
            <Layer>
                {content}
            </Layer>
    );
}

export default DrawLayer;
