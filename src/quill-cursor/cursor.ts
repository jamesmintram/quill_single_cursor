import IQuillCursorOptions from './i-quill-cursor-options';
import IQuillRange from './i-range';

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

  public range: IQuillRange;

  private _el: HTMLElement;
  private _caretEl: HTMLElement;
  private _scale = 1;

  public build(options: IQuillCursorOptions): HTMLElement {
    const element = document.createElement(Cursor.CONTAINER_ELEMENT_TAG);
    element.classList.add(Cursor.CURSOR_CLASS);
    element.id = `ql-cursor-caret`;
    element.innerHTML = options.template;

    const caretContainerElement = element.getElementsByClassName(Cursor.CARET_CONTAINER_CLASS)[0] as HTMLElement;
    const caretElement = caretContainerElement.getElementsByClassName(Cursor.CARET_CLASS)[0] as HTMLElement;

    caretElement.style.backgroundColor = 'black';

    this._el = element;
    this._caretEl = caretContainerElement;

    return this._el;
  }

  public setScale(scale: number): void {
    this._scale = scale;
  }

  public show(): void {
    this._el.classList.remove(Cursor.HIDDEN_CLASS);
  }

  public hide(): void {
    this._el.classList.add(Cursor.HIDDEN_CLASS);
  }

  public remove(): void {
    this._el.parentNode.removeChild(this._el);
  }


  public updateCaret(rectangle: ClientRect, _container: ClientRect): void {
    this._caretEl.style.top = `${rectangle.top * this._scale}px`;
    this._caretEl.style.left = `${rectangle.left * this._scale}px`;
    this._caretEl.style.height = `${rectangle.height * this._scale}px`;
  }
}
