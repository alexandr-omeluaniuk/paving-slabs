/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Line } from 'react-konva';

export const LINE = "LINE";

class State {
    clone() {
        console.log('OVERRIDE ME');
    }
    
    getELement() {
        console.log('OVERRIDE ME');
    }
    
    isCompleted() {
        console.log('OVERRIDE ME');
    }
}

export class LineState extends State {
    constructor() {
        super();
        this.points = [];
        this.tempCoord = null;
    }
    
    clone(lineState) {
        const clone = new LineState();
        clone.points = this.points;
        clone.tempCoord = this.tempCoord;
        return clone;
    }
    
    getElement() {
        if (this.points.length > 1 || (this.points.length === 1 && this.tempCoord)) {
            const linePoints = [];
            this.points.forEach(p => {
                linePoints.push(p.x);
                linePoints.push(p.y);
            });
            if (this.tempCoord) {
                linePoints.push(this.tempCoord.x);
                linePoints.push(this.tempCoord.y);
            }
            return (
                    <Line points={linePoints} key={new Date().getTime()} strokeWidth={1} stroke={'black'}/>
            );
        }
    }
    
    isCompleted() {
        return this.points.length === 2;
    }
}
