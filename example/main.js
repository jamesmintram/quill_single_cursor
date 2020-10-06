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

// const cursorsTwo = quillTwo.getModule('cursors');

quillTwo.getModule('cursor').setScale(3);

// cursorsTwo.createCursor('cursor', 'User 1', 'black');

// function selectionChangeHandler(cursors) {
//   return function(range, oldRange, source) {
//     cursors.moveCursor('cursor', range);
//   };
// }

// quillTwo.on('selection-change', selectionChangeHandler(cursorsTwo));

// TODO: This needs to be wired in better
// document.addEventListener('selectionchange', () => {
//   // Seems to have a side effect in which it recalulcates is
//   // selection + thus the caret is updated.
//   // quillTwo.getSelection();
// });