/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Konva from 'konva';
import { Toolbar } from './src/toolbar';

export class CAD {
    constructor(width, height, containerId) {
        this.width = width;
        this.height = height;
        this.stage = new Konva.Stage({
            container: containerId,
            width: width,
            height: height
        });
        this.mainLayer = new Konva.Layer();
        this.stage.add(this.mainLayer);
        this.toolbar = new Toolbar(containerId);
        this._initGrid();
    }

    _initGrid() {
        const STEP = 100;
        const GRID_LINE_MAIN_WIDTH = .3;
        const GRID_LINE_AUX = .1;
        var grid = new Konva.Group({
            x: 0,
            y: 0
        });
        for (let i = 10; i < this.height; i += STEP) {
            grid.add(new Konva.Line({
                points: [0, i, Number.MAX_SAFE_INTEGER, i],
                stroke: 'blue',
                strokeWidth: GRID_LINE_MAIN_WIDTH,
                lineCap: 'round',
                lineJoin: 'round'
            }));
            for (let j = i; j < i + STEP; j += 10) {
                grid.add(new Konva.Line({
                    points: [0, j, Number.MAX_SAFE_INTEGER, j],
                    stroke: 'green',
                    strokeWidth: GRID_LINE_AUX,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
            }
        }
        for (let i = 10; i < this.width; i += STEP) {
            grid.add(new Konva.Line({
                points: [i, 0, i, Number.MAX_SAFE_INTEGER],
                stroke: 'blue',
                strokeWidth: GRID_LINE_MAIN_WIDTH,
                lineCap: 'round',
                lineJoin: 'round'
            }));
            for (let j = i; j < i + STEP; j += 10) {
                grid.add(new Konva.Line({
                    points: [j, 0, j, Number.MAX_SAFE_INTEGER],
                    stroke: 'green',
                    strokeWidth: GRID_LINE_AUX,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
            }
        }
        this.mainLayer.add(grid);
    }
}
