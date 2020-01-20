/// <reference path="../../interface/object.ts"/>

class Mark implements Object {

    public mark(mark : HTMLObjectElement) : void {
        let data : HTMLObjectElement = mark.parentNode.parentNode.querySelector('input[type=hidden]');
        if (this._isCheckBox(data))
            this._markCheckBox(data, mark);
        else
            this._markRadio(data, mark);
    }

    private _markCheckBox(data : HTMLObjectElement, mark : HTMLObjectElement) : void {
        this._markElement(mark);
        if (this._isCheckBoxMultiple(mark)) {
            this._markCheckBoxMultiple(data, mark);
        } else {
            if (this._isMarked(mark))
                data.value = mark.dataset.marked;
            else
                data.value = mark.dataset.unmarked;
        }
    }

    private _markCheckBoxMultiple(data : HTMLObjectElement, mark : HTMLObjectElement) : void {
        let regEx = new RegExp(`[${mark.dataset.marked}]`, 'gi');
        if (regEx.test(data.value))
            data.value = data.value.replace(regEx, '');
        else
            data.value += mark.dataset.marked;
    }

    private _markRadio(data : HTMLObjectElement, mark : HTMLObjectElement) : void {
        this._unmarkElement(mark);
        this._markElement(mark);
        data.value = mark.dataset.marked;
    }

    private _unmarkElement(mark : HTMLObjectElement) : void {
        let marks = mark.parentNode.parentNode.querySelectorAll('.o-mark__element');
        marks.forEach(mark => mark.classList.remove('is-marked'));
    }

    private _markElement(mark : HTMLObjectElement) : void {
        mark.classList.toggle('is-marked');
    }

    private _isCheckBox(data : HTMLObjectElement) : boolean {
        return data.classList.contains('o-mark__data--checkbox');
    }

    private _isCheckBoxMultiple(mark : HTMLObjectElement) : boolean {
        return mark.classList.contains('is-multiple');
    }

    private _isMarked(mark : HTMLObjectElement) : void {
        return mark.classList.contains('is-marked');
    }

}