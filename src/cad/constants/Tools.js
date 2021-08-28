/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import { Line } from 'react-konva';

export const LINE = "LINE";

class State {
    clone() {
        console.log('OVERRIDE ME');
    }
    
    render() {
        console.log('OVERRIDE ME');
    }
    
    getElement() {
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
    
    render() {
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
                    <React.Fragment>
                        {this._getLine()}
                        {this._getBinding()}
                    </React.Fragment>
            );
        }
    }
    
    getElement() {
        let binding = this._getBinding();
        if (binding) {
            
        } else {
            return this._getLine();
        }
    }
    
    _getLine() {
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
            return <Line points={linePoints} key={new Date().getTime()} strokeWidth={1} stroke={'black'}/>;
        }
    }
    
    _getBinding() {
        let binding = null;
        let secondCoord = null;
        if (this.tempCoord) {
            secondCoord = this.tempCoord;
        } else if (this.points.length > 1) {
            secondCoord = this.points[this.points.length - 1];
        }
        if (secondCoord) {
            const startPoint = this.points[0];
            let deltaX = secondCoord.x - startPoint.x;
            let deltaY = secondCoord.y - startPoint.y;
            if (deltaX > deltaY) {
                const tan = deltaY / deltaX;
                if (tan < 0.04 && tan > -0.04) {
                    binding = <Line points={[0, startPoint.y, Number.MAX_SAFE_INTEGER, startPoint.y]} 
                            key={2} strokeWidth={.2} stroke={'green'}/>;
                }
            } else {
                const tan = deltaX / deltaY;
                if (tan < 0.04 && tan > -0.04) {
                    binding = <Line points={[startPoint.x, Number.MIN_SAFE_INTEGER, startPoint.x, Number.MAX_SAFE_INTEGER]} 
                            key={3} strokeWidth={.2} stroke={'green'}/>;
                }
            }
        }
        return binding;
    }
    
    isCompleted() {
        return this.points.length === 2;
    }
}
