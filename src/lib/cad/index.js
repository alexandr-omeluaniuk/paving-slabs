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
     * @param {number} options options.
     */
    constructor(width, height, containerId, options) {
        options = options ? options : {};
        this.scale = options.initialScale ? options.initialScale : 100; // px in 1 meter
        this.scaleStep = options.scaleStep ? options.scaleStep : 10;    // in percents
        this.stage = new Konva.Stage({
            container: containerId,
            width: width,
            height: height,
            draggable: true,
            scale: { x: 1, y: 1}
        });
        this.stage.x(this.scale / 2);
        this.stage.y(this.scale / 2);
        this._initStageListeners();
        this.mainLayer = new Konva.Layer();
        this.stage.add(this.mainLayer);
        this.toolbar = new Toolbar(containerId);
        this._renderGrid();
    }
    
    _initStageListeners() {
        this.stage.on('dragend', (e) => {
            this._renderGrid();
        });
        this.stage.on('wheel', (e) => {
            let stageScale = this.stage.scaleX() * 100;
            e.evt.preventDefault();
            const wheelDeltaX = e.evt.wheelDeltaX;
            const wheelDeltaY = e.evt.wheelDeltaY;
            if (wheelDeltaX > wheelDeltaY) {
                const newScale = stageScale - this.scaleStep;
                stageScale = newScale > 0 ? newScale : stageScale;
            } else {
                stageScale = stageScale + this.scaleStep;
            }
            stageScale = parseFloat(stageScale).toFixed(2);
            this.stage.scale({ x: stageScale / 100, y: stageScale / 100 });
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
        // init canvas dimensions
        const stageScale = this.stage.scaleX();
        const stageSize = this.stage.size();
        const height = stageSize.height;
        const width = stageSize.width;
        const fontSize = 10 * (1 / stageScale);
        // draw horizontal lines
        const xStart = centerY;
        const xEnd = (height + centerY);
        console.log(stageScale + ": " + xStart + ' | ' + xEnd);
        for (let i = xStart; i < xEnd; i++) {
            if (i % STEP === 0) {
                this.grid.add(new Konva.Line({
                    points: [centerX, i, centerX + width, i],
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
                        fontSize: fontSize,
                        fontFamily: 'Roboto,Calibri',
                        fill: 'blue'
                    }));
                }
            }
            if (i % STEP_AUX === 0 && i % STEP !== 0) {
                this.grid.add(new Konva.Line({
                    points: [centerX, i, centerX + width, i],
                    stroke: 'green',
                    strokeWidth: GRID_LINE_AUX,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
            }
        }
        // draw vertical lines
        const yStart = centerX;
        const yEnd = (width + centerX);
        //console.log(stageScale + ": " + yStart + ' | ' + yEnd);
        for (let i = yStart; i < yEnd; i++) {
            if (i % STEP === 0) {
                this.grid.add(new Konva.Line({
                    points: [i, centerY, i, centerY + height],
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
                        fontSize: fontSize,
                        fontFamily: 'Roboto,Calibri',
                        fill: 'blue'
                    }));
                }
            }
            if (i % STEP_AUX === 0 && i % STEP !== 0) {
                this.grid.add(new Konva.Line({
                    points: [i, centerY, i, centerY + height],
                    stroke: 'green',
                    strokeWidth: GRID_LINE_AUX,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
            }
        }
        // render coordinates origin
        if (xStart < 0 && xEnd > 0 && yStart < 0 && yEnd > 0) {
            this.grid.add(new Konva.Line({
                points: [0, 0, this.scale, 0],
                stroke: 'green',
                strokeWidth: 1,
                lineCap: 'round',
                lineJoin: 'round'
            }));
            this.grid.add(new Konva.Line({
                points: [0, 0, 0, this.scale],
                stroke: 'red',
                strokeWidth: 1,
                lineCap: 'round',
                lineJoin: 'round'
            }));
        }
    }
}
