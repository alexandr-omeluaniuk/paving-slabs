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
            height: height,
            draggable: true
        });
        this._initDragStageListeners();
        this.mainLayer = new Konva.Layer();
        this.stage.add(this.mainLayer);
        this.toolbar = new Toolbar(containerId);
        this._renderGrid();
    }
    
    _initDragStageListeners() {
        this.stage.on('dragend', (e) => {
            this._renderGrid();
        });
    }

    _renderGrid() {
        const centerX = this.stage.x() * -1;
        const centerY = this.stage.y() * -1;
        const STEP = this.scale;
        const STEP_AUX = STEP / 10;
        const GRID_LINE_MAIN_WIDTH = .2;
        const GRID_LINE_AUX = .1;
        if (!this.grid) {
            this.grid = new Konva.Group({
                x: 0,
                y: 0
            });
            this.mainLayer.add(this.grid);
        } else {
            this.grid.removeChildren();
        }
        // draw horizontal lines
        const xStart = centerY;
        const xEnd = this.height + centerY;
        for (let i = xStart; i < xEnd; i++) {
            if (i % STEP === 0) {
                this.grid.add(new Konva.Line({
                    points: [centerX, i, centerX + this.width, i],
                    stroke: 'blue',
                    strokeWidth: GRID_LINE_MAIN_WIDTH,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
                if (!(centerX === 0 && i === 0)) {
                    this.grid.add(new Konva.Text({
                        x: centerX,
                        y: i + 2,
                        text: i / this.scale,
                        fontSize: 10,
                        fontFamily: 'Roboto,Calibri',
                        fill: 'blue'
                    }));
                }
            }
            if (i % STEP_AUX === 0 && i % STEP !== 0) {
                this.grid.add(new Konva.Line({
                    points: [centerX, i, centerX + this.width, i],
                    stroke: 'green',
                    strokeWidth: GRID_LINE_AUX,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
            }
        }
        // draw vertical lines
        const yStart = centerX;
        const yEnd = this.width + centerX;
        for (let i = yStart; i < yEnd; i++) {
            if (i % STEP === 0) {
                this.grid.add(new Konva.Line({
                    points: [i, centerY, i, centerY + this.height],
                    stroke: 'blue',
                    strokeWidth: GRID_LINE_MAIN_WIDTH,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
                if (!(centerY === 0 && i === 0)) {
                    this.grid.add(new Konva.Text({
                        x: i + 2,
                        y: centerY,
                        text: i / this.scale,
                        fontSize: 10,
                        fontFamily: 'Roboto,Calibri',
                        fill: 'blue'
                    }));
                }
            }
            if (i % STEP_AUX === 0 && i % STEP !== 0) {
                this.grid.add(new Konva.Line({
                    points: [i, centerY, i, centerY + this.height],
                    stroke: 'green',
                    strokeWidth: GRID_LINE_AUX,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
            }
        }
    }
}
