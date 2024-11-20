// @ts-nocheck
/* eslint-disable */
import { htmlLanguage, javascriptLanguage, } from './chunk-WY5XFK64.js';
import './chunk-RD5SFWJ7.js';
import { LanguageSupport, LocalTokenGroup, LRLanguage, LRParser, parseMixed, styleTags, tags, } from './chunk-QHDV5QG3.js';
import './chunk-RUAN5HWR.js';

// https :https://framerusercontent.com/modules/zxOuMCcDOAkYkK9doUT1/6kqevs4DXgJyXyFc94KJ/codemirror_lang_vue.js
var parser = /* @__PURE__ */ LRParser.deserialize({
  version: 14,
  states:
    '%pOVOWOOObQPOOOpOSO\'#C_OOOO\'#Cp\'#CpQVOWOOQxQPOOO!TQQOOQ!YQPOOOOOO,58y,58yO!_OSO,58yOOOO-E6n-E6nO!dQQO\'#CqQ{QPOOO!iQPOOQ{QPOOO!qQPOOOOOO1G.e1G.eOOQO,59],59]OOQO-E6o-E6oO!yOpO\'#CiO#RO`O\'#CiQOQPOOO#ZO#tO\'#CmO#fO!bO\'#CmOOQO,59T,59TO#qOpO,59TO#vO`O,59TOOOO\'#Cr\'#CrO#{O#tO,59XOOQO,59X,59XOOOO\'#Cs\'#CsO$WO!bO,59XOOQO1G.o1G.oOOOO-E6p-E6pOOQO1G.s1G.sOOOO-E6q-E6q',
  stateData:
    '$g~OjOS~OQROUROkQO~OWTOXUOZUO`VO~OSXOTWO~OXUO[]OlZO~OY^O~O[_O~OT`O~OYaO~OmcOodO~OmfOogO~O^iOnhO~O_jOphO~ObkOqkOrmO~OcnOsnOtmO~OnpO~OppO~ObkOqkOrrO~OcnOsnOtrO~OWX`~',
  goto: '!^hPPPiPPPPPPPPPmPPPpPPsy!Q!WTROSRe]Re_QSORYSS[T^Rb[QlfRqlQogRso',
  nodeNames:
    '\u26A0 Content Text Interpolation InterpolationContent }} Entity Attribute VueAttributeName : Identifier @ Is ScriptAttributeValue AttributeScript AttributeScript AttributeName AttributeValue Entity Entity',
  maxTerm: 36,
  skippedNodes: [0,],
  repeatNodeCount: 4,
  tokenData:
    '\'y~RdXY!aYZ!a]^!apq!ars!rwx!w}!O!|!O!P#t!Q![#y![!]$s!_!`%g!b!c%l!c!}#y#R#S#y#T#j#y#j#k%q#k#o#y%W;\'S#y;\'S;:j$m<%lO#y~!fSj~XY!aYZ!a]^!apq!a~!wOm~~!|Oo~!b#RX`!b}!O!|!Q![!|![!]!|!c!}!|#R#S!|#T#o!|%W;\'S!|;\'S;:j#n<%lO!|!b#qP;=`<%l!|~#yOl~%W$QXY#t`!b}!O!|!Q![#y![!]!|!c!}#y#R#S#y#T#o#y%W;\'S#y;\'S;:j$m<%lO#y%W$pP;=`<%l#y~$zXX~`!b}!O!|!Q![!|![!]!|!c!}!|#R#S!|#T#o!|%W;\'S!|;\'S;:j#n<%lO!|~%lO[~~%qOZ~%W%xXY#t`!b}!O&e!Q![#y![!]!|!c!}#y#R#S#y#T#o#y%W;\'S#y;\'S;:j$m<%lO#y!b&jX`!b}!O!|!Q![!|![!]!|!c!}\'V#R#S!|#T#o\'V%W;\'S!|;\'S;:j#n<%lO!|!b\'^XW!b`!b}!O!|!Q![!|![!]!|!c!}\'V#R#S!|#T#o\'V%W;\'S!|;\'S;:j#n<%lO!|',
  tokenizers: [
    6,
    7,
    /* @__PURE__ */ new LocalTokenGroup('b~RP#q#rU~XP#q#r[~aOT~~', 17, 4,),
    /* @__PURE__ */ new LocalTokenGroup(
      '!k~RQvwX#o#p!_~^TU~Opmq!]m!^;\'Sm;\'S;=`!X<%lOm~pUOpmq!]m!]!^!S!^;\'Sm;\'S;=`!X<%lOm~!XOU~~![P;=`<%lm~!bP#o#p!e~!jOk~~',
      72,
      2,
    ),
    /* @__PURE__ */ new LocalTokenGroup('[~RPwxU~ZOp~~', 11, 15,),
    /* @__PURE__ */ new LocalTokenGroup('[~RPrsU~ZOn~~', 11, 14,),
    /* @__PURE__ */ new LocalTokenGroup(
      '!e~RQvwXwx!_~^Tc~Opmq!]m!^;\'Sm;\'S;=`!X<%lOm~pUOpmq!]m!]!^!S!^;\'Sm;\'S;=`!X<%lOm~!XOc~~![P;=`<%lm~!dOt~~',
      66,
      35,
    ),
    /* @__PURE__ */ new LocalTokenGroup(
      '!e~RQrsXvw^~^Or~~cTb~Oprq!]r!^;\'Sr;\'S;=`!^<%lOr~uUOprq!]r!]!^!X!^;\'Sr;\'S;=`!^<%lOr~!^Ob~~!aP;=`<%lr~',
      66,
      33,
    ),
  ],
  topRules: { Content: [0, 1,], Attribute: [1, 7,], },
  tokenPrec: 157,
},);
var exprParser = /* @__PURE__ */ javascriptLanguage.parser.configure({ top: 'SingleExpression', },);
var baseParser = /* @__PURE__ */ parser.configure({
  props: [
    /* @__PURE__ */ styleTags({
      Text: tags.content,
      Is: tags.definitionOperator,
      AttributeName: tags.attributeName,
      VueAttributeName: tags.keyword,
      Identifier: tags.variableName,
      'AttributeValue ScriptAttributeValue': tags.attributeValue,
      Entity: tags.character,
      '{{ }}': tags.brace,
      '@ :': tags.punctuation,
    },),
  ],
},);
var exprMixed = { parser: exprParser, };
var textParser = /* @__PURE__ */ baseParser.configure({
  wrap: /* @__PURE__ */ parseMixed((node, input,) => node.name == 'InterpolationContent' ? exprMixed : null),
},);
var attrParser = /* @__PURE__ */ baseParser.configure({
  wrap: /* @__PURE__ */ parseMixed((node, input,) => node.name == 'AttributeScript' ? exprMixed : null),
  top: 'Attribute',
},);
var textMixed = { parser: textParser, };
var attrMixed = { parser: attrParser, };
var vueLanguage = /* @__PURE__ */ LRLanguage.define({
  name: 'vue',
  parser: /* @__PURE__ */ htmlLanguage.parser.configure({ dialect: 'selfClosing', wrap: /* @__PURE__ */ parseMixed(mixVue,), },),
  languageData: { closeBrackets: { brackets: ['{', '"',], }, },
},);
function mixVue(node, input,) {
  switch (node.name) {
    case 'Attribute':
      return /^(@|:|v-)/.test(input.read(node.from, node.from + 2,),) ? attrMixed : null;
    case 'Text':
      return textMixed;
  }
  return null;
}
function vue() {
  return new LanguageSupport(vueLanguage,);
}
var __FramerMetadata__ = {
  'exports': {
    'vueLanguage': { 'type': 'variable', 'annotations': { 'framerContractVersion': '1', }, },
    'vue': { 'type': 'function', 'annotations': { 'framerContractVersion': '1', }, },
    '__FramerMetadata__': { 'type': 'variable', },
  },
};
export { __FramerMetadata__, vue, vueLanguage, };
