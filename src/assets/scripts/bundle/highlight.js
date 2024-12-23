import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import rust from 'highlight.js/lib/languages/rust';
import shell from 'highlight.js/lib/languages/shell';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('shell', shell);

document.addEventListener('DOMContentLoaded', _ => {
  console.log('highlight.js is loaded and running');
  hljs.highlightAll();
});
