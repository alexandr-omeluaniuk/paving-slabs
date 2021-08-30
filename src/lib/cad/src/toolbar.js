/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export class Toolbar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
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
                <button class="btn btn-sm btn-outline-secondary" title="Линия">
                    <i class="bi bi-slash-lg"></i>
                </button>
            </div>
        `;
        shadow.appendChild(toolbar);
    }
}

customElements.define('cad-toolbar', Toolbar);
