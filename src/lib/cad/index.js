/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Konva from 'konva';

export class CAD {
    constructor(width, height, containerId) {
        this.stage = new Konva.Stage({
            container: containerId,
            width: width,
            height: height
        });
    }
}
