import IQuillCursorsOptions from './i-quill-cursors-options';
import IQuillRange from './i-range';
export default class QuillCursors {
    private readonly _cursor;
    private readonly _quill;
    private readonly _container;
    private readonly _boundsContainer;
    private readonly _options;
    private _currentSelection;
    private _lastCaretStartIndex;
    private _lastCaretEndIndex;
    constructor(quill: any, options?: IQuillCursorsOptions);
    _moveCursor(range: IQuillRange): void;
    private _registerSelectionChangeListeners;
    private _registerTextChangeListener;
    private _registerDomListeners;
    private _updateCursor;
    private _indexWithinQuillBounds;
    private _leafIsValid;
    private _handleTextChange;
    private _emitSelection;
    private _setDefaults;
    private _transformCursors;
}
