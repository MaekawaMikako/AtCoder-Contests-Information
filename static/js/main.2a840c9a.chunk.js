(this.webpackJsonpa=this.webpackJsonpa||[]).push([[0],{22:function(e,t,n){},24:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(2),s=n.n(r),a=n(14),o=n.n(a),l=(n(22),n(5)),i=n.n(l),j=n(15),u=n(3),d=(n(24),n(16)),h=n.n(d),b=function(){var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],s=t[1],a=Object(r.useState)([]),o=Object(u.a)(a,2),l=o[0],d=o[1],b=Object(r.useState)("all"),O=Object(u.a)(b,2),x=O[0],f=O[1],v=Object(r.useState)(""),p=Object(u.a)(v,2),g=p[0],m=p[1],_=Object(r.useState)(10),N=Object(u.a)(_,2),S=N[0],C=N[1],w=Object(r.useState)("newer"),k=Object(u.a)(w,2),A=k[0],L=k[1];Object(r.useEffect)((function(){T()}),[]);var T=function(){var e=Object(j.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.a.get("https://kenkoooo.com/atcoder/resources/contests.json");case 3:(t=e.sent).data.sort((function(e,t){return e.start_epoch_second>t.start_epoch_second?-1:1})),F(t.data),s(t.data),d(t.data),console.log(S,"first"),console.log("a"),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log("error!!");case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}(),F=function(e){return e.map((function(e){return e.start=new Date(1e3*e.start_epoch_second).toString(),e.start=e.start.replace(" GMT+0900 (\u65e5\u672c\u6a19\u6e96\u6642)",""),e.duration_second=e.duration_second/60+"min",e.url="https://atcoder.jp/contests/"+e.id,e}))},y=function(e){var t=n.filter((function(t){return t.id.toLowerCase().indexOf(e.target.value)>=0||t.start.toString().indexOf(e.target.value)>=0||t.duration_second.toString().indexOf(e.target.value)>=0||t.title.toLowerCase().indexOf(e.target.value)>=0}));d(t),console.log(e.target.value)},I=function(e){"newer"===e&&d((function(e){return e.sort((function(e,t){return e.start_epoch_second>t.start_epoch_second?-1:1}))})),"older"===e&&d((function(e){return e.sort((function(e,t){return e.start_epoch_second<t.start_epoch_second?-1:1}))})),"abcSort"===e&&d((function(e){return e.sort((function(e,t){return e.title<t.title?-1:1}))}))};return Object(c.jsxs)("div",{className:"App",children:[Object(c.jsxs)("div",{className:"header",children:[Object(c.jsx)("h1",{className:"headerLogo",children:"Atcoder Contests Information"}),Object(c.jsxs)("div",{className:"formats",children:[Object(c.jsx)("div",{className:"format select",children:Object(c.jsxs)("select",{onChange:function(e){f(e.target.value),d(n.filter((function(t){return-1!==t.id.indexOf(e.target.value)}))),console.log(e.target.value,A),I(A)},value:x,children:[Object(c.jsx)("option",{value:"",children:"ALL"}),Object(c.jsx)("option",{value:"abc",children:"ABC"}),Object(c.jsx)("option",{value:"arc",children:"ARC"}),Object(c.jsx)("option",{value:"agc",children:"AGC"}),Object(c.jsx)("option",{value:"past",children:"PAST"}),Object(c.jsx)("option",{value:"joi",children:"JOI"}),Object(c.jsx)("option",{value:"jag",children:"JAG"})]})}),Object(c.jsx)("div",{className:"format select",children:Object(c.jsxs)("select",{onChange:function(e){C(+e.target.value),console.log(S,"change")},value:S,children:[Object(c.jsx)("option",{value:"10",children:"10\u4ef6\u8868\u793a"}),Object(c.jsx)("option",{value:"50",children:"50\u4ef6\u8868\u793a"}),Object(c.jsx)("option",{value:"100",children:"100\u4ef6\u8868\u793a"}),Object(c.jsx)("option",{value:l.length,children:"\u5168\u4ef6\u8868\u793a"})]})}),Object(c.jsx)("div",{className:"format select",children:Object(c.jsxs)("select",{onChange:function(e){L(e.target.value),I(e.target.value),console.log(e.target.value)},value:A,className:"sortSelect",children:[Object(c.jsx)("option",{value:"newer",children:"\u65b0\u3057\u3044\u9806"}),Object(c.jsx)("option",{value:"older",children:"\u53e4\u3044\u9806"}),Object(c.jsx)("option",{value:"abcSort",children:"\u4e94\u5341\u97f3\u9806"})]})}),Object(c.jsxs)("div",{className:"format",children:[Object(c.jsx)("label",{class:"formatFocus",children:Object(c.jsx)("input",{className:"textFormat",type:"text",value:g,placeholder:"Keyword",onChange:function(e){!function(e){m(e.target.value),y(e)}(e)}})}),Object(c.jsx)("span",{class:"focus_line"})]})]})]}),Object(c.jsxs)("div",{className:"main",children:[Object(c.jsx)("div",{className:"title",children:Object(c.jsx)("h2",{children:"Information about the contests"})}),l.map((function(e,t){return t>=S?null:Object(c.jsxs)("div",{className:"contestsTable",children:[Object(c.jsx)("h3",{children:Object(c.jsx)("a",{href:"{contest.url}",className:"contestTitle",target:"_blank",rel:"noopener noreferrer",children:e.title})}),Object(c.jsx)("table",{children:Object(c.jsxs)("tbody",{children:[Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Start Time"}),Object(c.jsx)("td",{children:e.start})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Duration"}),Object(c.jsx)("td",{children:e.duration_second})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Rated Range"}),Object(c.jsx)("td",{children:e.rate_change})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"URL"}),Object(c.jsx)("td",{children:Object(c.jsx)("a",{href:"{contest.url}",target:"_blank",rel:"noopener noreferrer",children:e.url})})]})]})})]})})),S<l.length&&Object(c.jsx)("button",{className:"showMoreButton",onClick:function(){C((function(e){return e+10})),console.log(S,"more")},children:"More..."}),S>=l.length&&Object(c.jsx)("p",{className:"noMore",children:"No more"})]})]})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,44)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),s(e),a(e)}))};o.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(b,{})}),document.getElementById("root")),O()}},[[43,1,2]]]);
//# sourceMappingURL=main.2a840c9a.chunk.js.map