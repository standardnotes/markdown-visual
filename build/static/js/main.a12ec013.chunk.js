(this["webpackJsonpmarkdown-visual"]=this["webpackJsonpmarkdown-visual"]||[]).push([[0],{111:function(t,e,n){"use strict";n.d(e,"c",(function(){return p})),n.d(e,"b",(function(){return k}));var r=n(58),o=n(10),c=n(60),i=n(114),a=n(663),u=n(214),s=n(0),f=n(210),d=n(32),b=n(213),l=n(209),g=n(101),v=n(211),j=n(212),m=n(144),h=n(208),w=n(207),O=n(151),p=function(t){var e,n=t.editorRef,r=t.text,o=null===(e=n.current)||void 0===e?void 0:e.get();o&&o.action((function(t){var e=t.get(c.c),n=t.get(i.c)(r);if(n){var o=e.state;e.dispatch(o.tr.replace(0,o.doc.content.size,new s.j(n.content,0,0)).setMeta("addToHistory",!1))}}))},k=function(t){var e,n=t.editorRef,r=t.isEditable,o=null===(e=n.current)||void 0===e?void 0:e.get();o&&o.action((function(t){t.get(c.c).setProps({editable:function(){return r}})}))},x=function(t,e){var n=t.onChange,o=Object(u.b)((function(t){return a.a.make().config((function(e){e.set(c.d,t),e.set(O.b,{markdown:[function(t){var e=t();n(e)}]})})).use(f.a).use(d.b).use(b.a).use(l.a).use(g.a).use(v.a).use(O.a).use(m.a).use(j.a).use(h.a).use(w.a)}));return Object(r.jsx)(u.a,{ref:e,editor:o})};e.a=Object(o.forwardRef)(x)},197:function(t,e,n){"use strict";e.a=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,664)).then((function(e){var n=e.getCLS,r=e.getFID,o=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),r(t),o(t),c(t),i(t)}))}},215:function(t,e,n){"use strict";n.r(e),function(t){var e=n(58),r=(n(224),n(10)),o=n.n(r),c=n(102),i=n.n(c),a=n(197),u=n(198),s=n.n(u),f=n(111),d=function(){var n=Object(r.createRef)(),o=Object(r.useRef)(""),c=Object(r.useRef)();return Object(r.useEffect)((function(){var e={setEditorRawText:function(t){o.current=t,Object(f.c)({editorRef:n,text:t})},generateCustomPreview:function(e){var n,r=t.byteLength(e)/1024;return{html:"<span>~".concat((n=r,n.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}))," KB worth of text.</span>")+"<div><em>Created with Markdown Visual.</em></div>"}},onNoteLockToggle:function(t){var e=!t;Object(f.b)({editorRef:n,isEditable:e})},clearUndoHistory:function(){}};c.current=new s.a(e,{mode:"markdown",supportsFilesafe:!1})}),[n]),Object(e.jsx)(f.a,{ref:n,onChange:function(t){o.current!==t&&(o.current=t,c.current.onEditorValueChanged(t))}})};i.a.render(Object(e.jsx)(o.a.StrictMode,{children:Object(e.jsx)(d,{})}),document.getElementById("root")),Object(a.a)(console.log)}.call(this,n(218).Buffer)},224:function(t,e,n){}},[[215,1,2]]]);
//# sourceMappingURL=main.a12ec013.chunk.js.map