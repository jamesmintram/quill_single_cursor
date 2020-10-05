import IQuillCursorsOptions from './i-quill-cursors-options';
import IQuillRange from './i-range';
export default class Cursor {
    static readonly CONTAINER_ELEMENT_TAG = "SPAN";
    static readonly SELECTION_ELEMENT_TAG = "SPAN";
    static readonly CURSOR_CLASS = "ql-cursor";
    static readonly SELECTION_CLASS = "ql-cursor-selections";
    static readonly SELECTION_BLOCK_CLASS = "ql-cursor-selection-block";
    static readonly CARET_CLASS = "ql-cursor-caret";
    static readonly CARET_CONTAINER_CLASS = "ql-cursor-caret-container";
    static readonly FLAG_CLASS = "ql-cursor-flag";
    static readonly SHOW_FLAG_CLASS = "show-flag";
    static readonly FLAG_FLIPPED_CLASS = "flag-flipped";
    static readonly NAME_CLASS = "ql-cursor-name";
    static readonly HIDDEN_CLASS = "hidden";
    static readonly NO_DELAY_CLASS = "no-delay";
    range: IQuillRange;
    private _el;
    private _caretEl;
    build(options: IQuillCursorsOptions): HTMLElement;
    show(): void;
    hide(): void;
    remove(): void;
    updateCaret(rectangle: ClientRect, _container: ClientRect): void;
}
