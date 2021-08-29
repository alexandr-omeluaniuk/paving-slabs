/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Konva from 'konva';
import { Toolbar } from './src/toolbar';

export class CAD {
    /**
     * Constructor.
     * @param {number} width canvas width
     * @param {number} height canvas height.
     * @param {string} containerId div ID.
     * @param {number} initialScale scale in pixels per meter.
     */
    constructor(width, height, containerId, initialScale) {
        this.scale = initialScale;
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
        const STEP = this.scale;
        const STEP_AUX = STEP / 10;
        const GRID_LINE_MAIN_WIDTH = .3;
        const GRID_LINE_AUX = .1;
        const SHIFT = 10;
        var grid = new Konva.Group({
            x: 0,
            y: 0
        });
        for (let i = SHIFT; i < this.height; i += STEP) {
            grid.add(new Konva.Line({
                points: [0, i, Number.MAX_SAFE_INTEGER, i],
                stroke: 'blue',
                strokeWidth: GRID_LINE_MAIN_WIDTH,
                lineCap: 'round',
                lineJoin: 'round'
            }));
            grid.add(new Konva.Text({
                x: 0,
                y: i + 2,
                text: (i - SHIFT) / 100,
                fontSize: 10,
                fontFamily: 'Calibri',
                fill: 'blue'
            }));
            for (let j = i; j < i + STEP; j += STEP_AUX) {
                grid.add(new Konva.Line({
                    points: [0, j, Number.MAX_SAFE_INTEGER, j],
                    stroke: 'green',
                    strokeWidth: GRID_LINE_AUX,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
            }
        }
        for (let i = SHIFT; i < this.width; i += STEP) {
            grid.add(new Konva.Line({
                points: [i, 0, i, Number.MAX_SAFE_INTEGER],
                stroke: 'blue',
                strokeWidth: GRID_LINE_MAIN_WIDTH,
                lineCap: 'round',
                lineJoin: 'round'
            }));
            grid.add(new Konva.Text({
                x: i + 2,
                y: 0,
                text: (i - SHIFT) / 100,
                fontSize: 10,
                fontFamily: 'Calibri',
                fill: 'blue'
            }));
            for (let j = i; j < i + STEP; j += STEP_AUX) {
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
