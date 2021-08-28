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
    
    getInfo() {
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
            return this._getBindingLine();
        } else {
            return this._getLine();
        }
    }
    
    getInfo() {
        if (this.tempCoord && this.points.length > 0) {
            const startPoint = this.points[0];
            const deltaX = Math.abs(this.tempCoord.x - startPoint.x);
            const deltaY = Math.abs(this.tempCoord.y - startPoint.y);
            const length = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
            return `${parseFloat(length).toFixed(2)} м`;
        }
        return '';
    }
    
    _getBindingLine() {
        const startPoint = this.points[0];
        const endPoint = this.points[1];
        let deltaX = endPoint.x - startPoint.x;
        let deltaY = endPoint.y - startPoint.y;
        if (deltaX > deltaY) {
            return <Line points={[startPoint.x, startPoint.y, endPoint.x, startPoint.y]} key={new Date().getTime()} strokeWidth={1} stroke={'black'}/>;
        } else {
            return <Line points={[startPoint.x, startPoint.y, startPoint.x, endPoint.y]} key={new Date().getTime()} strokeWidth={1} stroke={'black'}/>;
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
                    binding = (
                            <React.Fragment>
                                <Line points={[0, startPoint.y, Number.MAX_SAFE_INTEGER, startPoint.y]} 
                                    key={11} strokeWidth={.2} stroke={'green'}/>
                                <Line points={[startPoint.x, Number.MIN_SAFE_INTEGER, startPoint.x, Number.MAX_SAFE_INTEGER]} 
                                    key={10} strokeWidth={.2} stroke={'blue'}/>
                            </React.Fragment>
                    );
                }
            } else {
                const tan = deltaX / deltaY;
                if (tan < 0.04 && tan > -0.04) {
                    binding = (
                            <React.Fragment>
                                <Line points={[0, startPoint.y, Number.MAX_SAFE_INTEGER, startPoint.y]} 
                                    key={20} strokeWidth={.2} stroke={'green'}/>
                                <Line points={[startPoint.x, Number.MIN_SAFE_INTEGER, startPoint.x, Number.MAX_SAFE_INTEGER]} 
                                    key={21} strokeWidth={.2} stroke={'blue'}/>
                            </React.Fragment>
                    );
                }
            }
        }
        return binding;
    }
    
    isCompleted() {
        return this.points.length === 2;
    }
}
