import IQuillCursorOptions from './i-quill-cursor-options';
import Cursor from './cursor';
import IQuillRange from './i-range';
import template from './template';
import ResizeObserver from 'resize-observer-polyfill';
import Delta = require('quill-delta');
export default class QuillCursor {
  private readonly _cursor: Cursor;
  private readonly _quill: any;
  private readonly _container: HTMLElement;
  private readonly _boundsContainer: HTMLElement;
  private readonly _options: IQuillCursorOptions;
  private _currentSelection: IQuillRange;
  private _lastCaretStartIndex: number;
  private _lastCaretEndIndex: number;

  public constructor(quill: any, options: IQuillCursorOptions = {}) {
    this._quill = quill;
    this._options = this._setDefaults(options);
    this._container = this._quill.addContainer(this._options.containerClass);
    this._boundsContainer = this._options.boundsContainer || this._quill.container;
    this._currentSelection = this._quill.getSelection();

    this._lastCaretStartIndex = 0;
    this._lastCaretEndIndex = 0;

    this._registerSelectionChangeListeners();
    this._registerTextChangeListener();
    this._registerDomListeners();

    this._cursor = new Cursor();
    const element = this._cursor.build(this._options);
    this._container.appendChild(element);
  }

  public setScale(scale: number): void {
    this._cursor.setScale(scale);
  }

  public _moveCursor(range: IQuillRange): void {
    this._cursor.range = range;
    this._updateCursor(this._cursor);
  }

  private _registerSelectionChangeListeners(): void {
    this._quill.on(
      this._quill.constructor.events.SELECTION_CHANGE,
      (selection: IQuillRange) => {
        this._currentSelection = selection;
        this._moveCursor(selection);
      },
    );
  }

  private _registerTextChangeListener(): void {
    this._quill.on(
      this._quill.constructor.events.TEXT_CHANGE,
      (delta: any) => this._handleTextChange(delta),
    );
  }

  private _registerDomListeners(): void {
    const editor = this._quill.container.getElementsByClassName('ql-editor')[0];
    editor.addEventListener('scroll', () => this._updateCursor(this._cursor));
    const resizeObserver = new ResizeObserver(() => this._updateCursor(this._cursor));
    resizeObserver.observe(editor);
  }

  private _updateCursor(cursor: Cursor): void {
    if (!cursor.range) {
      return;
    }

    const startIndex = this._indexWithinQuillBounds(cursor.range.index);
    const endIndex = this._indexWithinQuillBounds(cursor.range.index + cursor.range.length);

    const startLeaf = this._quill.getLeaf(startIndex);
    const endLeaf = this._quill.getLeaf(endIndex);

    if (!this._leafIsValid(startLeaf) || !this._leafIsValid(endLeaf)) {
      return cursor.hide();
    }

    cursor.show();

    const containerRectangle = this._boundsContainer.getBoundingClientRect();
    let endBounds = null;

    if (this._lastCaretStartIndex != startIndex) {
      endBounds = this._quill.getBounds(startIndex);
    }
    if (this._lastCaretEndIndex != endIndex) {
      endBounds = this._quill.getBounds(endIndex);
    }

    this._lastCaretStartIndex = startIndex;
    this._lastCaretEndIndex = endIndex;

    if (endBounds != null) {
      cursor.updateCaret(endBounds, containerRectangle);
    }
  }

  private _indexWithinQuillBounds(index: number): number {
    const quillLength = this._quill.getLength();
    const maxQuillIndex = quillLength ? quillLength - 1 : 0;
    index = Math.max(index, 0);
    index = Math.min(index, maxQuillIndex);
    return index;
  }

  private _leafIsValid(leaf: any): boolean {
    return leaf && leaf[0] && leaf[0].domNode && leaf[1] >= 0;
  }

  private _handleTextChange(delta: any): void {
    // Wrap in a timeout to give the text change an opportunity to finish
    // before checking for the current selection
    window.setTimeout(() => {
      if (this._options.transformOnTextChange) {
        this._transformCursor(delta);
      }

      if (this._options.selectionChangeSource) {
        this._emitSelection();
        this._updateCursor(this._cursor);
      }
    });
  }

  private _emitSelection(): void {
    this._quill.emitter.emit(
      this._quill.constructor.events.SELECTION_CHANGE,
      this._quill.getSelection(),
      this._currentSelection,
      this._options.selectionChangeSource,
    );
  }

  private _setDefaults(options: IQuillCursorOptions): IQuillCursorOptions {
    options = Object.assign({}, options);

    options.template = options.template || template;
    options.containerClass = options.containerClass || 'ql-cursor';

    if (options.selectionChangeSource !== null) {
      options.selectionChangeSource = options.selectionChangeSource || this._quill.constructor.sources.API;
    }

    options.hideDelayMs = Number.isInteger(options.hideDelayMs) ? options.hideDelayMs : 3000;
    options.hideSpeedMs = Number.isInteger(options.hideSpeedMs) ? options.hideSpeedMs : 400;
    options.transformOnTextChange = !!options.transformOnTextChange;

    return options;
  }

  private _transformCursor(delta: any): void {
    delta = new Delta(delta);

    if (this._cursor.range) {
      this._cursor.range.index = delta.transformPosition(this._cursor.range.index);
      this._updateCursor(this._cursor);
    }
  }
}
