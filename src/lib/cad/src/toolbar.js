/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import { Line } from './tools/line';

const TOOLS = {
    Line
};

export class Toolbar extends HTMLElement {
    constructor() {
        super();
        this._shadow = this.attachShadow({mode: 'open'});
        this._activeTool = null;
        const toolbar = document.createElement('div');
        toolbar.style.position = 'absolute';
        toolbar.style.bottom = '6px';
        toolbar.style.right = '6px';
        //toolbar.style.backgroundColor = 'white';
        //toolbar.style.boxShadow = '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)';
        toolbar.innerHTML = `
            <style>
                @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
                @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css");
                .cad-toolbar {
                    display: flex;
                    flex-direction: column;
                    background-color: white;
                }
            </style>
            <div class="cad-toolbar p-2 border shadow-sm">
                <button class="btn btn-sm btn-outline-secondary" title="Линия" tool-action="${Line.getName()}">
                    <i class="bi bi-slash-lg"></i>
                </button>
            </div>
        `;
        this._shadow.appendChild(toolbar);
    }
    
    connectedCallback() {
        const toolButtons = this._shadow.querySelectorAll('button');
        toolButtons.forEach(el => {
            el.addEventListener('click', () => {
                toolButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                el.classList.add('active');
                this._toolButtonClick(el.getAttribute('tool-action'));
            });
        });
    }
    
    _toolButtonClick(action) {
        this._activeTool = new TOOLS[action]();
    }
}

customElements.define('cad-toolbar', Toolbar);
