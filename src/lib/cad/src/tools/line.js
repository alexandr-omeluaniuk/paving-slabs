/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { CADContext } from '../context';

export class Line {
    constructor() {
        this._stage = CADContext.getCAD().getStage();
        this.points = [];
        this._stage.on('mouseup', (e) => {
            if (e.target && e.target.getPointerPosition) {
                const coords = e.target.getPointerPosition();
                this.points.push(coords);
                this._render();
            }
        });
        this._stage.on('mousemove', (e) => {
            if (e.target && e.target.getPointerPosition) {
                const coords = e.target.getPointerPosition();
                this.tempCoord = coords;
                this._render();
            }
        });
        
    }
    static getName() {
        return Line.name;
    }
    
    _render() {
        console.log('Render');
    }
}
