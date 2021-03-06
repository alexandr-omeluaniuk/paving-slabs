/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Konva from 'konva';
import { Toolbar } from './src/toolbar';
import { CADContext } from './src/context';

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
        const container = document.querySelector('#' + containerId);
        const canvasContent = container.querySelector('.konvajs-content');
        canvasContent.appendChild(new Toolbar());
        this._renderGrid();
        CADContext.setCAD(this);
    }
    
    // ===================================================== PUBLIC =======================================================================
    getStage() {
        return this.stage;
    }
    // ===================================================== PRIVATE ======================================================================
    
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
                stageScale = newScale >= 40 ? newScale : stageScale;
            } else {
                const newScale = stageScale + this.scaleStep;
                stageScale = newScale <= 1000 ? newScale : stageScale;
            }
            stageScale = Math.round(stageScale);
            //console.log(stageScale);
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
        const scaleRatio = 1 / stageScale;
        const stageSize = this.stage.size();
        const height = stageSize.height;
        const width = stageSize.width;
        const fontSize = 12 * scaleRatio;
        // draw horizontal lines
        const xStart = Math.ceil(centerY * scaleRatio);
        const xEnd = Math.ceil((height + centerY) * scaleRatio);
        const hLineStartX = Math.ceil(centerX * scaleRatio);
        const hLineEndX = Math.ceil((centerX + width) * scaleRatio);
        //console.log(stageScale + ": " + xStart + ' | ' + xEnd);
        for (let i = xStart; i < xEnd; i++) {
            if (i % STEP === 0) {
                this.grid.add(new Konva.Line({
                    points: [hLineStartX, i, hLineEndX, i],
                    stroke: 'blue',
                    strokeWidth: GRID_LINE_MAIN_WIDTH,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
                if (!(centerX === 0 && i === 0)) {
                    this.grid.add(new Konva.Text({
                        x: hLineStartX + 2,
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
                    points: [hLineStartX, i, hLineEndX, i],
                    stroke: 'green',
                    strokeWidth: GRID_LINE_AUX,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
            }
        }
        // draw vertical lines
        const yStart = Math.ceil(centerX * scaleRatio);
        const yEnd = Math.ceil((width + centerX) * scaleRatio);
        const vLineStartY = Math.ceil(centerY * scaleRatio);
        const vLineEndY = Math.ceil((centerY + height) * scaleRatio);
        //console.log(stageScale + ": " + yStart + ' | ' + yEnd);
        for (let i = yStart; i < yEnd; i++) {
            if (i % STEP === 0) {
                this.grid.add(new Konva.Line({
                    points: [i, vLineStartY, i, vLineEndY],
                    stroke: 'blue',
                    strokeWidth: GRID_LINE_MAIN_WIDTH,
                    lineCap: 'round',
                    lineJoin: 'round'
                }));
                if (!(centerY === 0 && i === 0)) {
                    this.grid.add(new Konva.Text({
                        x: i + 2,
                        y: vLineStartY + 2,
                        text: i / this.scale,
                        fontSize: fontSize,
                        fontFamily: 'Roboto,Calibri',
                        fill: 'blue'
                    }));
                }
            }
            if (i % STEP_AUX === 0 && i % STEP !== 0) {
                this.grid.add(new Konva.Line({
                    points: [i, vLineStartY, i, vLineEndY],
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
