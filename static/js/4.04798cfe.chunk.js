(this["webpackJsonpit-kama"]=this["webpackJsonpit-kama"]||[]).push([[4],{289:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__1LFbr",dialogs__items:"Dialogs_dialogs__items__1Cli6",dialog:"Dialogs_dialog__1-nO0",active:"Dialogs_active__30aPP",messages:"Dialogs_messages__1ShEK",message:"Dialogs_message__36Zkk"}},294:function(e,a,t){"use strict";t.r(a);var n=t(123),s=t(0),i=t.n(s),l=t(289),o=t.n(l),c=t(13),r=function(e){var a="/dialogs/"+e.id;return i.a.createElement("div",{className:o.a.dialog},i.a.createElement(c.b,{to:a,activeClassName:o.a.active},e.name))},m=function(e){return i.a.createElement("div",{className:o.a.message},e.message)},u=t(86),d=t(124),g=t(83),b=t(34),_=Object(g.a)(100),f=Object(d.a)({form:"dialogAddMessageForm"})((function(e){return i.a.createElement("form",{action:"",onSubmit:e.handleSubmit},i.a.createElement("div",null,i.a.createElement(u.a,{component:b.b,name:"newMessageBody",placeholder:"Enter yor message",validate:[g.b,_]})),i.a.createElement("div",null,i.a.createElement("button",null,"Send")))})),E=function(e){var a=e.dialogsPage,t=a.dialogs.map((function(e){return i.a.createElement(r,{name:e.name,key:e.id,id:e.id})})),n=a.messages.map((function(e){return i.a.createElement(m,{message:e.message,key:e.id})}));return i.a.createElement("div",{className:o.a.dialogs},i.a.createElement("div",{className:o.a.dialogs__items},t),i.a.createElement("div",{className:o.a.messages},i.a.createElement("div",null,n),i.a.createElement("div",null,i.a.createElement(f,{onSubmit:function(a){console.log(a.newMessageBody),e.sendMessage(a.newMessageBody)}}))))},v=t(18),p=t(36),h=t(37),O=t(39),j=t(38),k=t(40),y=t(30),D=function(e){return{isAuth:e.auth.isAuth}},M=t(7);a.default=Object(M.d)(Object(v.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{sendMessage:function(a){e(Object(n.b)(a))}}})),(function(e){var a=function(a){function t(){return Object(p.a)(this,t),Object(O.a)(this,Object(j.a)(t).apply(this,arguments))}return Object(k.a)(t,a),Object(h.a)(t,[{key:"render",value:function(){return this.props.isAuth?i.a.createElement(e,this.props):i.a.createElement(y.a,{to:"/login"})}}]),t}(i.a.Component);return Object(v.b)(D)(a)}))(E)}}]);
//# sourceMappingURL=4.04798cfe.chunk.js.map