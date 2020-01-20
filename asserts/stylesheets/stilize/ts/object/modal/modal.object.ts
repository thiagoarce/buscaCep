/// <reference path="../../interface/object.ts"/>
/// <reference path="../../interface/factory.ts"/>
/// <reference path="./modalbackground.object.ts"/>
/// <reference path="./modalframe.object.ts"/>

class Modal implements Object, Factory {

    private _modalBackground : ModalBackground = new ModalBackground();

    public hide() : void {
        this._destroy();
        this._removeBackground();
    }

    public show(target : HTMLObjectElement) : void {
        document.body.appendChild(this.create(target.dataset.modalType, (target.href || target.formAction)));
        this._insertBackground();
    }

    public create(type : string, url : string) : HTMLObjectElement {
        let modal : HTMLObjectElement = document.createElement('DIALOG');
        modal.classList.add('js-o-modal', 'is-show', `o-modal--${type || 'large'}`);
        modal.setAttribute('role', 'dialog');
        modal.appendChild(new ModalFrame(url).create());
        return modal;
    }

    private _destroy() : void {
        let modal : HTMLObjectElement = document.querySelector('.js-o-modal');
        modal.parentNode.removeChild(modal);
    }

    private _insertBackground() : void {
        document.body.appendChild(new ModalBackground().create());
    }

    private _removeBackground() : void {
        this._modalBackground.remove();
    }

}