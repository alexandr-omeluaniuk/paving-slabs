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
        this.centerX = 0;
        this.centerY = 0;
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
        this.stage.on('dragstart', (e) => {
            const coords = e.target.getPointerPosition();
            this._dragStartCoords = coords;
        });
        this.stage.on('dragend', (e) => {
            const coordsEnd = e.target.getPointerPosition();
            const coordsStart = this._dragStartCoords;
            this.centerX = this.centerX + (coordsStart.x - coordsEnd.x);
            this.centerY = this.centerY + (coordsStart.y - coordsEnd.y);
            this._renderGrid();
        });
    }

    _renderGrid() {
        const STEP = this.scale;
        const STEP_AUX = STEP / 10;
        const GRID_LINE_MAIN_WIDTH = .2;
        const GRID_LINE_AUX = .1;
        const SHIFT = 10;   // in px
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
        const xStart = SHIFT;
        const xEnd = this.height;
        for (let i = xStart; i < xEnd; i += STEP) {
            this.grid.add(new Konva.Line({
                points: [this.centerX, i, this.centerX + this.width, i],
                stroke: 'blue',
                strokeWidth: GRID_LINE_MAIN_WIDTH,
                lineCap: 'round',
                lineJoin: 'round'
            }));
            this.grid.add(new Konva.Text({
                x: this.centerX,
                y: i + 2,
                text: (i - SHIFT) / 100,
                fontSize: 10,
                fontFamily: 'Roboto,Calibri',
                fill: 'blue'
            }));
            for (let j = i; j < i + STEP; j += STEP_AUX) {
                this.grid.add(new Konva.Line({
                    points: [this.centerX, j, this.centerX + this.width, j],
                    stroke: 'green',
                    strokeWidth: GRID_LINE_AUX,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
            }
        }
        // draw vertical lines
        const yStart = SHIFT;
        const yEnd = this.width;
        for (let i = yStart; i < yEnd; i += STEP) {
            this.grid.add(new Konva.Line({
                points: [i, this.centerY, i, this.centerY + this.height],
                stroke: 'blue',
                strokeWidth: GRID_LINE_MAIN_WIDTH,
                lineCap: 'round',
                lineJoin: 'round'
            }));
            this.grid.add(new Konva.Text({
                x: i + 2,
                y: this.centerY,
                text: (i - SHIFT) / 100,
                fontSize: 10,
                fontFamily: 'Roboto,Calibri',
                fill: 'blue'
            }));
            for (let j = i; j < i + STEP && j < this.width; j += STEP_AUX) {
                this.grid.add(new Konva.Line({
                    points: [j, this.centerY, j, this.centerY + this.height],
                    stroke: 'green',
                    strokeWidth: GRID_LINE_AUX,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
            }
        }
    }
}
