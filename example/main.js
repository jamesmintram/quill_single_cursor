Quill.register('modules/cursor', QuillCursor);
const CURSOR_LATENCY = 10;
const TEXT_LATENCY = 10;

const quillTwo = new Quill('#editor-two', {
  theme: 'snow',
  modules: {
    cursor: {
      transformOnTextChange: true,
    },
  },
});

quillTwo.getModule('cursor').setScale(1);

document.addEventListener('selectionchange', () => {
  quillTwo.getSelection();
});