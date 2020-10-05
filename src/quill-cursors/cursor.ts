import IQuillCursorsOptions from './i-quill-cursors-options';
import IQuillRange from './i-range';
import tinycolor = require('tinycolor2');

export default class Cursor {
  public static readonly CONTAINER_ELEMENT_TAG = 'SPAN';
  public static readonly SELECTION_ELEMENT_TAG = 'SPAN';
  public static readonly CURSOR_CLASS = 'ql-cursor';
  public static readonly SELECTION_CLASS = 'ql-cursor-selections';
  public static readonly SELECTION_BLOCK_CLASS = 'ql-cursor-selection-block';
  public static readonly CARET_CLASS = 'ql-cursor-caret';
  public static readonly CARET_CONTAINER_CLASS = 'ql-cursor-caret-container';
  public static readonly FLAG_CLASS = 'ql-cursor-flag';
  public static readonly SHOW_FLAG_CLASS = 'show-flag';
  public static readonly FLAG_FLIPPED_CLASS = 'flag-flipped';
  public static readonly NAME_CLASS = 'ql-cursor-name';
  public static readonly HIDDEN_CLASS = 'hidden';
  public static readonly NO_DELAY_CLASS = 'no-delay';

  public readonly id: string;
  public readonly name: string;
  public readonly color: string;
  public range: IQuillRange;

  private _el: HTMLElement;
  private _caretEl: HTMLElement;

  public constructor(id: string, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  public build(options: IQuillCursorsOptions): HTMLElement {
    const element = document.createElement(Cursor.CONTAINER_ELEMENT_TAG);
    element.classList.add(Cursor.CURSOR_CLASS);
    element.id = `ql-cursor-${ this.id }`;
    element.innerHTML = options.template;
    const selectionElement = element.getElementsByClassName(Cursor.SELECTION_CLASS)[0] as HTMLElement;
    const caretContainerElement = element.getElementsByClassName(Cursor.CARET_CONTAINER_CLASS)[0] as HTMLElement;
    const caretElement = caretContainerElement.getElementsByClassName(Cursor.CARET_CLASS)[0] as HTMLElement;
    
    caretElement.style.backgroundColor = this.color;

    element.getElementsByClassName(Cursor.NAME_CLASS)[0].textContent = this.name;

    this._el = element;
    this._caretEl = caretContainerElement;

    return this._el;
  }

  public show(): void {
    this._el.classList.remove(Cursor.HIDDEN_CLASS);
  }

  public hide(): void {
    console.error("HIDING");    
    this._el.classList.add(Cursor.HIDDEN_CLASS);
  }

  public remove(): void {
    this._el.parentNode.removeChild(this._el);
  }


  public updateCaret(rectangle: ClientRect, container: ClientRect): void {
    this._caretEl.style.top = `${rectangle.top * 1}px`;
    this._caretEl.style.left = `${rectangle.left * 1}px`;
    this._caretEl.style.height = `${rectangle.height * 1}px`;
  }

}
