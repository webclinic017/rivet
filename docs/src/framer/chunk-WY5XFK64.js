// @ts-nocheck
/* eslint-disable */
import { completeFromList, ifNotIn, snippetCompletion, } from './chunk-RD5SFWJ7.js';
import {
  bracketMatchingHandle,
  ContextTracker,
  continuedIndent,
  defineLanguageFacet,
  delimitedIndent,
  EditorSelection,
  EditorView,
  ExternalTokenizer,
  flatIndent,
  foldInside,
  foldNodeProp,
  indentNodeProp,
  IterMode,
  LanguageSupport,
  LocalTokenGroup,
  LRLanguage,
  LRParser,
  NodeWeakMap,
  parseMixed,
  styleTags,
  sublanguageProp,
  syntaxTree,
  tags,
} from './chunk-QHDV5QG3.js';

// https :https://framerusercontent.com/modules/2B1yVjX9TEUbuHzHLnih/cJ6ep86gpD35atdtaety/lezer_javascript.js
var noSemi = 302;
var incdec = 1;
var incdecPrefix = 2;
var insertSemi = 303;
var spaces = 305;
var newline = 306;
var LineComment = 3;
var BlockComment = 4;
var space = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288,
];
var braceR = 125;
var semicolon = 59;
var slash = 47;
var star = 42;
var plus = 43;
var minus = 45;
var trackNewline = new ContextTracker({
  start: false,
  shift(context, term,) {
    return term == LineComment || term == BlockComment || term == spaces ? context : term == newline;
  },
  strict: false,
},);
var insertSemicolon = new ExternalTokenizer((input, stack,) => {
  let { next, } = input;
  if ((next == braceR || next == -1 || stack.context) && stack.canShift(insertSemi,)) input.acceptToken(insertSemi,);
}, { contextual: true, fallback: true, },);
var noSemicolon = new ExternalTokenizer((input, stack,) => {
  let { next, } = input, after;
  if (space.indexOf(next,) > -1) return;
  if (next == slash && ((after = input.peek(1,)) == slash || after == star)) return;
  if (next != braceR && next != semicolon && next != -1 && !stack.context && stack.canShift(noSemi,)) input.acceptToken(noSemi,);
}, { contextual: true, },);
var incdecToken = new ExternalTokenizer((input, stack,) => {
  let { next, } = input;
  if (next == plus || next == minus) {
    input.advance();
    if (next == input.next) {
      input.advance();
      let mayPostfix = !stack.context && stack.canShift(incdec,);
      input.acceptToken(mayPostfix ? incdec : incdecPrefix,);
    }
  }
}, { contextual: true, },);
var jsHighlight = styleTags({
  'get set async static': tags.modifier,
  'for while do if else switch try catch finally return throw break continue default case': tags.controlKeyword,
  'in of await yield void typeof delete instanceof': tags.operatorKeyword,
  'let var const function class extends': tags.definitionKeyword,
  'import export from': tags.moduleKeyword,
  'with debugger as new': tags.keyword,
  TemplateString: tags.special(tags.string,),
  super: tags.atom,
  BooleanLiteral: tags.bool,
  this: tags.self,
  null: tags.null,
  Star: tags.modifier,
  VariableName: tags.variableName,
  'CallExpression/VariableName TaggedTemplateExpression/VariableName': tags.function(tags.variableName,),
  VariableDefinition: tags.definition(tags.variableName,),
  Label: tags.labelName,
  PropertyName: tags.propertyName,
  PrivatePropertyName: tags.special(tags.propertyName,),
  'CallExpression/MemberExpression/PropertyName': tags.function(tags.propertyName,),
  'FunctionDeclaration/VariableDefinition': tags.function(tags.definition(tags.variableName,),),
  'ClassDeclaration/VariableDefinition': tags.definition(tags.className,),
  PropertyDefinition: tags.definition(tags.propertyName,),
  PrivatePropertyDefinition: tags.definition(tags.special(tags.propertyName,),),
  UpdateOp: tags.updateOperator,
  LineComment: tags.lineComment,
  BlockComment: tags.blockComment,
  Number: tags.number,
  String: tags.string,
  Escape: tags.escape,
  ArithOp: tags.arithmeticOperator,
  LogicOp: tags.logicOperator,
  BitOp: tags.bitwiseOperator,
  CompareOp: tags.compareOperator,
  RegExp: tags.regexp,
  Equals: tags.definitionOperator,
  Arrow: tags.function(tags.punctuation,),
  ': Spread': tags.punctuation,
  '( )': tags.paren,
  '[ ]': tags.squareBracket,
  '{ }': tags.brace,
  'InterpolationStart InterpolationEnd': tags.special(tags.brace,),
  '.': tags.derefOperator,
  ', ;': tags.separator,
  '@': tags.meta,
  TypeName: tags.typeName,
  TypeDefinition: tags.definition(tags.typeName,),
  'type enum interface implements namespace module declare': tags.definitionKeyword,
  'abstract global Privacy readonly override': tags.modifier,
  'is keyof unique infer': tags.operatorKeyword,
  JSXAttributeValue: tags.attributeValue,
  JSXText: tags.content,
  'JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag': tags.angleBracket,
  'JSXIdentifier JSXNameSpacedName': tags.tagName,
  'JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName': tags.attributeName,
  'JSXBuiltin/JSXIdentifier': tags.standard(tags.tagName,),
},);
var spec_identifier = {
  __proto__: null,
  export: 14,
  as: 19,
  from: 27,
  default: 30,
  async: 35,
  function: 36,
  extends: 46,
  this: 50,
  true: 58,
  false: 58,
  null: 70,
  void: 74,
  typeof: 78,
  super: 96,
  new: 130,
  delete: 146,
  yield: 155,
  await: 159,
  class: 164,
  public: 221,
  private: 221,
  protected: 221,
  readonly: 223,
  instanceof: 242,
  satisfies: 245,
  in: 246,
  const: 248,
  import: 280,
  keyof: 335,
  unique: 339,
  infer: 345,
  is: 381,
  abstract: 401,
  implements: 403,
  type: 405,
  let: 408,
  var: 410,
  interface: 417,
  enum: 421,
  namespace: 427,
  module: 429,
  declare: 433,
  global: 437,
  for: 456,
  of: 465,
  while: 468,
  with: 472,
  do: 476,
  if: 480,
  else: 482,
  switch: 486,
  case: 492,
  try: 498,
  catch: 502,
  finally: 506,
  return: 510,
  throw: 514,
  break: 518,
  continue: 522,
  debugger: 526,
};
var spec_word = {
  __proto__: null,
  async: 117,
  get: 119,
  set: 121,
  declare: 181,
  public: 183,
  private: 183,
  protected: 183,
  static: 185,
  abstract: 187,
  override: 189,
  readonly: 195,
  accessor: 197,
  new: 385,
};
var spec_LessThan = { __proto__: null, '<': 137, };
var parser = LRParser.deserialize({
  version: 14,
  states:
    '$6[O`QUOOO%QQUOOO\'TQWOOP(bOSOOO*pQ(CjO\'#CfO*wOpO\'#CgO+VO!bO\'#CgO+eO07`O\'#DZO-vQUO\'#DaO.WQUO\'#DlO%QQUO\'#DvO0[QUO\'#EOOOQ(CY\'#EW\'#EWO0uQSO\'#ETOOQO\'#Ei\'#EiOOQO\'#Ib\'#IbO0}QSO\'#GkO1YQSO\'#EhO1_QSO\'#EhO3aQ(CjO\'#JcO6QQ(CjO\'#JdO6nQSO\'#FWO6sQ#tO\'#FoOOQ(CY\'#F`\'#F`O7OO&jO\'#F`O7^Q,UO\'#FvO8tQSO\'#FuOOQ(CY\'#Jd\'#JdOOQ(CW\'#Jc\'#JcOOQQ\'#KO\'#KOO8yQSO\'#IOO9OQ(C[O\'#IPOOQQ\'#JP\'#JPOOQQ\'#IT\'#ITQ`QUOOO%QQUO\'#DnO9WQUO\'#DzO%QQUO\'#D|O9_QSO\'#GkO9dQ,UO\'#ClO9rQSO\'#EgO9}QSO\'#ErO:SQ,UO\'#F_O:qQSO\'#GkO:vQSO\'#GoO;RQSO\'#GoO;aQSO\'#GrO;aQSO\'#GsO;aQSO\'#GuO9_QSO\'#GxO<QQSO\'#G{O=cQSO\'#CbO=sQSO\'#HXO={QSO\'#H_O={QSO\'#HaO`QUO\'#HcO={QSO\'#HeO={QSO\'#HhO>QQSO\'#HnO>VQ(C]O\'#HtO%QQUO\'#HvO>bQ(C]O\'#HxO>mQ(C]O\'#HzO9OQ(C[O\'#H|O>xQ(CjO\'#CfO?zQWO\'#DfQOQSOOO@bQSO\'#EPO9dQ,UO\'#EgO@mQSO\'#EgO@xQ`O\'#F_OOQQ\'#Cd\'#CdOOQ(CW\'#Dk\'#DkOOQ(CW\'#Jg\'#JgO%QQUO\'#JgOOQO\'#Jk\'#JkOOQO\'#I_\'#I_OAxQWO\'#E`OOQ(CW\'#E_\'#E_OBtQ(C`O\'#E`OCOQWO\'#ESOOQO\'#Jj\'#JjOCdQWO\'#JkODqQWO\'#ESOCOQWO\'#E`PEOO?MpO\'#C`POOO)CDn)CDnOOOO\'#IU\'#IUOEZOpO,59ROOQ(CY,59R,59ROOOO\'#IV\'#IVOEiO!bO,59RO%QQUO\'#D]OOOO\'#IX\'#IXOEwO07`O,59uOOQ(CY,59u,59uOFVQUO\'#IYOFjQSO\'#JeOHlQbO\'#JeO+sQUO\'#JeOHsQSO,59{OIZQSO\'#EiOIhQSO\'#JsOIsQSO\'#JrOIsQSO\'#JrOI{QSO,5;VOJQQSO\'#JqOOQ(CY,5:W,5:WOJXQUO,5:WOLYQ(CjO,5:bOLyQSO,5:jOMdQ(C[O\'#JpOMkQSO\'#JoO:vQSO\'#JoONPQSO\'#JoONXQSO,5;UON^QSO\'#JoO!!fQbO\'#JdOOQ(CY\'#Cf\'#CfO%QQUO\'#EOO!#UQ`O,5:oOOQO\'#Jl\'#JlOOQO-E<`-E<`O9_QSO,5=VO!#lQSO,5=VO!#qQUO,5;SO!%tQ,UO\'#EdO!\'XQSO,5;SO!(qQ,UO\'#DpO!(xQUO\'#DuO!)SQWO,5;]O!)[QWO,5;]O%QQUO,5;]OOQQ\'#FO\'#FOOOQQ\'#FQ\'#FQO%QQUO,5;^O%QQUO,5;^O%QQUO,5;^O%QQUO,5;^O%QQUO,5;^O%QQUO,5;^O%QQUO,5;^O%QQUO,5;^O%QQUO,5;^O%QQUO,5;^O%QQUO,5;^OOQQ\'#FU\'#FUO!)jQUO,5;oOOQ(CY,5;t,5;tOOQ(CY,5;u,5;uO!+mQSO,5;uOOQ(CY,5;v,5;vO%QQUO\'#IfO!+uQ(C[O,5<cO!%tQ,UO,5;^O!,dQ,UO,5;^O%QQUO,5;rO!,kQ#tO\'#FeO!-hQ#tO\'#JwO!-SQ#tO\'#JwO!-oQ#tO\'#JwOOQO\'#Jw\'#JwO!.TQ#tO,5;}OOOO,5<Z,5<ZO!.fQUO\'#FqOOOO\'#Ie\'#IeO7OO&jO,5;zO!.mQ#tO\'#FsOOQ(CY,5;z,5;zO!/^Q7[O\'#CrOOQ(CY\'#Cv\'#CvO!/qQSO\'#CvO!/vO07`O\'#CzO!0dQ,UO,5<`O!0kQSO,5<bO!2QQMhO\'#GQO!2_QSO\'#GRO!2dQSO\'#GRO!2iQMhO\'#GVO!3hQWO\'#GZO!4ZQ7[O\'#J^OOQ(CY\'#J^\'#J^O!4eQSO\'#J]O!4sQSO\'#J[O!4{QSO\'#CqOOQ(CY\'#Ct\'#CtOOQ(CY\'#DO\'#DOOOQ(CY\'#DQ\'#DQO0xQSO\'#DSO!\'^Q,UO\'#FxO!\'^Q,UO\'#FzO!5TQSO\'#F|O!5YQSO\'#F}O!2dQSO\'#GTO!\'^Q,UO\'#GYO!5_QSO\'#EjO!5|QSO,5<aO`QUO,5>jOOQQ\'#JX\'#JXOOQQ,5>k,5>kOOQQ-E<R-E<RO!7{Q(CjO,5:YO!:iQ(CjO,5:fO%QQUO,5:fO!=SQ(CjO,5:hOOQ(CW\'#Co\'#CoO!=sQ,UO,5=VO!>RQ(C[O\'#JYO8tQSO\'#JYO!>dQ(C[O,59WO!>oQWO,59WO!>wQ,UO,59WO9dQ,UO,59WO!?SQSO,5;SO!?[QSO\'#HWO!?mQSO\'#KSO%QQUO,5;wO!?uQWO,5;yO!?zQSO,5=qO!@PQSO,5=qO!@UQSO,5=qO9OQ(C[O,5=qO!@dQSO\'#EkO!A^QWO\'#ElOOQ(CW\'#Jq\'#JqO!AeQ(C[O\'#KPO9OQ(C[O,5=ZO;aQSO,5=aOOQO\'#Cr\'#CrO!ApQWO,5=^O!AxQ,UO,5=_O!BTQSO,5=aO!BYQ`O,5=dO>QQSO\'#G}O9_QSO\'#HPO!BbQSO\'#HPO9dQ,UO\'#HRO!BgQSO\'#HROOQQ,5=g,5=gO!BlQSO\'#HSO!BtQSO\'#ClO!ByQSO,58|O!CTQSO,58|O!E]QUO,58|OOQQ,58|,58|O!EjQ(C[O,58|O%QQUO,58|O!EuQUO\'#HZOOQQ\'#H[\'#H[OOQQ\'#H]\'#H]O`QUO,5=sO!FVQSO,5=sO`QUO,5=yO`QUO,5={O!F[QSO,5=}O`QUO,5>PO!FaQSO,5>SO!FfQUO,5>YOOQQ,5>`,5>`O%QQUO,5>`O9OQ(C[O,5>bOOQQ,5>d,5>dO!JmQSO,5>dOOQQ,5>f,5>fO!JmQSO,5>fOOQQ,5>h,5>hO!JrQWO\'#DXO%QQUO\'#JgO!KaQWO\'#JgO!LOQWO\'#DgO!LaQWO\'#DgO!NrQUO\'#DgO!NyQSO\'#JfO# RQSO,5:QO# WQSO\'#EmO# fQSO\'#JtO# nQSO,5;WO# sQWO\'#DgO#!QQWO\'#EROOQ(CY,5:k,5:kO%QQUO,5:kO#!XQSO,5:kO>QQSO,5;RO!>oQWO,5;RO!>wQ,UO,5;RO9dQ,UO,5;RO#!aQSO,5@RO#!fQ!LQO,5:oOOQO-E<]-E<]O##lQ(C`O,5:zOCOQWO,5:nO##vQWO,5:nOCOQWO,5:zO!>dQ(C[O,5:nOOQ(CW\'#Ec\'#EcOOQO,5:z,5:zO%QQUO,5:zO#$TQ(C[O,5:zO#$`Q(C[O,5:zO!>oQWO,5:nOOQO,5;Q,5;QO#$nQ(C[O,5:zPOOO\'#IS\'#ISP#%SO?MpO,58zPOOO,58z,58zOOOO-E<S-E<SOOQ(CY1G.m1G.mOOOO-E<T-E<TO#%_Q`O,59wOOOO-E<V-E<VOOQ(CY1G/a1G/aO#%dQbO,5>tO+sQUO,5>tOOQO,5>z,5>zO#%nQUO\'#IYOOQO-E<W-E<WO#%{QSO,5@PO#&TQbO,5@PO#&[QSO,5@^OOQ(CY1G/g1G/gO%QQUO,5@_O#&dQSO\'#I`OOQO-E<^-E<^O#&[QSO,5@^OOQ(CW1G0q1G0qOOQ(CY1G/r1G/rOOQ(CY1G0U1G0UO%QQUO,5@[O#&xQ(C[O,5@[O#\'ZQ(C[O,5@[O#\'bQSO,5@ZO:vQSO,5@ZO#\'jQSO,5@ZO#\'xQSO\'#IcO#\'bQSO,5@ZOOQ(CW1G0p1G0pO!)SQWO,5:qO!)_QWO,5:qOOQO,5:s,5:sO#(jQSO,5:sO#(rQ,UO1G2qO9_QSO1G2qOOQ(CY1G0n1G0nO#)QQ(CjO1G0nO#*VQ(ChO,5;OOOQ(CY\'#GP\'#GPO#*sQ(CjO\'#J^O!#qQUO1G0nO#,{Q,UO\'#JhO#-VQSO,5:[O#-[QbO\'#JiO%QQUO\'#JiO#-fQSO,5:aOOQ(CY\'#DX\'#DXOOQ(CY1G0w1G0wO%QQUO1G0wOOQ(CY1G1a1G1aO#-kQSO1G0wO#0SQ(CjO1G0xO#0ZQ(CjO1G0xO#2tQ(CjO1G0xO#2{Q(CjO1G0xO#5VQ(CjO1G0xO#5mQ(CjO1G0xO#8gQ(CjO1G0xO#8nQ(CjO1G0xO#;XQ(CjO1G0xO#;`Q(CjO1G0xO#=WQ(CjO1G0xO#@WQ$IUO\'#CfO#BUQ$IUO1G1ZO#B]Q$IUO\'#JdO!+pQSO1G1aO#BmQ(CjO,5?QOOQ(CW-E<d-E<dO#CaQ(CjO1G0xOOQ(CY1G0x1G0xO#ElQ(CjO1G1^O#F`Q#tO,5<RO#FhQ#tO,5<SO#FpQ#tO\'#FjO#GXQSO\'#FiOOQO\'#Jx\'#JxOOQO\'#Id\'#IdO#G^Q#tO1G1iOOQ(CY1G1i1G1iOOOO1G1t1G1tO#GoQ$IUO\'#JcO#GyQSO,5<]O!)jQUO,5<]OOOO-E<c-E<cOOQ(CY1G1f1G1fO#HOQWO\'#JwOOQ(CY,5<_,5<_O#HWQWO,5<_OOQ(CY,59b,59bO!%tQ,UO\'#C|OOOO\'#IW\'#IWO#H]O07`O,59fOOQ(CY,59f,59fO%QQUO1G1zO!5YQSO\'#IhO#HhQSO,5<sOOQ(CY,5<p,5<pOOQO\'#Gf\'#GfO!\'^Q,UO,5=POOQO\'#Gh\'#GhO!\'^Q,UO,5=RO!%tQ,UO,5=TOOQO1G1|1G1|O#HvQ`O\'#CoO#IZQ`O,5<lO#IbQSO\'#J{O9_QSO\'#J{O#IpQSO,5<nO!\'^Q,UO,5<mO#IuQSO\'#GSO#JQQSO,5<mO#JVQ`O\'#GPO#JdQ`O\'#J|O#JnQSO\'#J|O!%tQ,UO\'#J|O#JsQSO,5<qO#JxQWO\'#G[O!3cQWO\'#G[O#KZQSO\'#G^O#K`QSO\'#G`O!2dQSO\'#GcO#KeQ(C[O\'#IjO#KpQWO,5<uOOQ(CY,5<u,5<uO#KwQWO\'#G[O#LVQWO\'#G]O#L_QWO\'#G]OOQ(CY,5=U,5=UO!\'^Q,UO,5?wO!\'^Q,UO,5?wO#LdQSO\'#IkO#LoQSO,5?vO#LwQSO,59]O#MhQ,UO,59nOOQ(CY,59n,59nO#NZQ,UO,5<dO#N|Q,UO,5<fO?rQSO,5<hOOQ(CY,5<i,5<iO$ WQSO,5<oO$ ]Q,UO,5<tO$ mQSO\'#JoO!#qQUO1G1{O$ rQSO1G1{OOQQ1G4U1G4UOOQ(CY1G/t1G/tO!+mQSO1G/tO$#qQ(CjO1G0QOOQQ1G2q1G2qO!%tQ,UO1G2qO%QQUO1G2qO$$bQSO1G2qO$$mQ,UO\'#EdOOQ(CW,5?t,5?tO$$wQ(C[O,5?tOOQQ1G.r1G.rO!>dQ(C[O1G.rO!>oQWO1G.rO!>wQ,UO1G.rO$%YQSO1G0nO$%_QSO\'#CfO$%jQSO\'#KTO$%rQSO,5=rO$%wQSO\'#KTO$%|QSO\'#KTO$&XQSO\'#IsO$&gQSO,5@nO$&oQbO1G1cOOQ(CY1G1e1G1eO9_QSO1G3]O?rQSO1G3]O$&vQSO1G3]O$&{QSO1G3]OOQQ1G3]1G3]O:vQSO\'#JrO:vQSO\'#EmO%QQUO\'#EmO:vQSO\'#ImO$\'QQ(C[O,5@kOOQQ1G2u1G2uO!BTQSO1G2{O!%tQ,UO1G2xO$\']QSO1G2xOOQQ1G2y1G2yO!%tQ,UO1G2yO$\'bQSO1G2yO$\'jQWO\'#GwOOQQ1G2{1G2{O!3cQWO\'#IoO!BYQ`O1G3OOOQQ1G3O1G3OOOQQ,5=i,5=iO$\'rQ,UO,5=kO9_QSO,5=kO#K`QSO,5=mO8tQSO,5=mO!>oQWO,5=mO!>wQ,UO,5=mO9dQ,UO,5=mO$(QQSO\'#KRO$(]QSO,5=nOOQQ1G.h1G.hO$(bQ(C[O1G.hO?rQSO1G.hO$(mQSO1G.hO9OQ(C[O1G.hO$*rQbO,5@pO$+SQSO,5@pO$+_QUO,5=uO$+fQSO,5=uO:vQSO,5@pOOQQ1G3_1G3_O`QUO1G3_OOQQ1G3e1G3eOOQQ1G3g1G3gO={QSO1G3iO$+kQUO1G3kO$/lQUO\'#HjOOQQ1G3n1G3nO$/yQSO\'#HpO>QQSO\'#HrOOQQ1G3t1G3tO$0RQUO1G3tO9OQ(C[O1G3zOOQQ1G3|1G3|OOQ(CW\'#GW\'#GWO9OQ(C[O1G4OO9OQ(C[O1G4QO$4VQSO,5@RO!)jQUO,5;XO:vQSO,5;XO>QQSO,5:RO!)jQUO,5:RO!>oQWO,5:RO$4[Q$IUO,5:ROOQO,5;X,5;XO$4fQWO\'#IZO$4|QSO,5@QOOQ(CY1G/l1G/lO$5UQWO\'#IaO$5`QSO,5@`OOQ(CW1G0r1G0rO!LaQWO,5:ROOQO\'#I^\'#I^O$5hQWO,5:mOOQ(CY,5:m,5:mO#![QSO1G0VOOQ(CY1G0V1G0VO%QQUO1G0VOOQ(CY1G0m1G0mO>QQSO1G0mO!>oQWO1G0mO!>wQ,UO1G0mOOQ(CW1G5m1G5mO!>dQ(C[O1G0YOOQO1G0f1G0fO%QQUO1G0fO$5oQ(C[O1G0fO$5zQ(C[O1G0fO!>oQWO1G0YOCOQWO1G0YO$6YQ(C[O1G0fOOQO1G0Y1G0YO$6nQ(CjO1G0fPOOO-E<Q-E<QPOOO1G.f1G.fOOOO1G/c1G/cO$6xQ`O,5<cO$7QQbO1G4`OOQO1G4f1G4fO%QQUO,5>tO$7[QSO1G5kO$7dQSO1G5xO$7lQbO1G5yO:vQSO,5>zO$7vQ(CjO1G5vO%QQUO1G5vO$8WQ(C[O1G5vO$8iQSO1G5uO$8iQSO1G5uO:vQSO1G5uO$8qQSO,5>}O:vQSO,5>}OOQO,5>},5>}O$9VQSO,5>}O$ mQSO,5>}OOQO-E<a-E<aOOQO1G0]1G0]OOQO1G0_1G0_O!+pQSO1G0_OOQQ7+(]7+(]O!%tQ,UO7+(]O%QQUO7+(]O$9eQSO7+(]O$9pQ,UO7+(]O$:OQ(CjO,59nO$<WQ(CjO,5<dO$>cQ(CjO,5<fO$@nQ(CjO,5<tOOQ(CY7+&Y7+&YO$CPQ(CjO7+&YO$CsQ,UO\'#I[O$C}QSO,5@SOOQ(CY1G/v1G/vO$DVQUO\'#I]O$DdQSO,5@TO$DlQbO,5@TOOQ(CY1G/{1G/{O$DvQSO7+&cOOQ(CY7+&c7+&cO$D{Q$IUO,5:bO%QQUO7+&uO$EVQ$IUO,5:YO$EdQ$IUO,5:fO$EnQ$IUO,5:hOOQ(CY7+&{7+&{OOQO1G1m1G1mOOQO1G1n1G1nO$ExQ#tO,5<UO!)jQUO,5<TOOQO-E<b-E<bOOQ(CY7+\'T7+\'TOOOO7+\'`7+\'`OOOO1G1w1G1wO$FTQSO1G1wOOQ(CY1G1y1G1yO$FYQ`O,59hOOOO-E<U-E<UOOQ(CY1G/Q1G/QO$FaQ(CjO7+\'fOOQ(CY,5?S,5?SO$GTQSO,5?SOOQ(CY1G2_1G2_P$GYQSO\'#IhPOQ(CY-E<f-E<fO$G|Q,UO1G2kO$HoQ,UO1G2mO$HyQ`O1G2oOOQ(CY1G2W1G2WO$IQQSO\'#IgO$I`QSO,5@gO$I`QSO,5@gO$IhQSO,5@gO$IsQSO,5@gOOQO1G2Y1G2YO$JRQ,UO1G2XO!\'^Q,UO1G2XO$JcQMhO\'#IiO$JsQSO,5@hO!%tQ,UO,5@hO$J{Q`O,5@hOOQ(CY1G2]1G2]OOQ(CW,5<v,5<vOOQ(CW,5<w,5<wO$ mQSO,5<wOBoQSO,5<wO!>oQWO,5<vOOQO\'#G_\'#G_O$KVQSO,5<xOOQ(CW,5<z,5<zO$ mQSO,5<}OOQO,5?U,5?UOOQO-E<h-E<hOOQ(CY1G2a1G2aO!3cQWO,5<vO$K_QSO,5<wO#KZQSO,5<xO!3cQWO,5<wO$KjQ,UO1G5cO$KtQ,UO1G5cOOQO,5?V,5?VOOQO-E<i-E<iOOQO1G.w1G.wO!?uQWO,59pO%QQUO,59pO$LRQSO1G2SO!\'^Q,UO1G2ZO$LWQ(CjO7+\'gOOQ(CY7+\'g7+\'gO!#qQUO7+\'gOOQ(CY7+%`7+%`O$LzQ`O\'#J}O#![QSO7+(]O$MUQbO7+(]O$9hQSO7+(]O$M]Q(ChO\'#CfO$MpQ(ChO,5<{O$NbQSO,5<{OOQ(CW1G5`1G5`OOQQ7+$^7+$^O!>dQ(C[O7+$^O!>oQWO7+$^O!#qQUO7+&YO$NgQSO\'#IrO$N{QSO,5@oOOQO1G3^1G3^O9_QSO,5@oO$N{QSO,5@oO% TQSO,5@oOOQO,5?_,5?_OOQO-E<q-E<qOOQ(CY7+&}7+&}O% YQSO7+(wO9OQ(C[O7+(wO9_QSO7+(wO?rQSO7+(wO% _QSO,5;XOOQ(CW,5?X,5?XOOQ(CW-E<k-E<kOOQQ7+(g7+(gO% dQ(ChO7+(dO!%tQ,UO7+(dO% nQ`O7+(eOOQQ7+(e7+(eO!%tQ,UO7+(eO% uQSO\'#KQO%!QQSO,5=cOOQO,5?Z,5?ZOOQO-E<m-E<mOOQQ7+(j7+(jO%#aQWO\'#HQOOQQ1G3V1G3VO!%tQ,UO1G3VO%QQUO1G3VO%#hQSO1G3VO%#sQ,UO1G3VO9OQ(C[O1G3XO#K`QSO1G3XO8tQSO1G3XO!>oQWO1G3XO!>wQ,UO1G3XO%$RQSO\'#IqO%$^QSO,5@mO%$fQWO,5@mOOQ(CW1G3Y1G3YOOQQ7+$S7+$SO?rQSO7+$SO9OQ(C[O7+$SO%$qQSO7+$SO%QQUO1G6[O%QQUO1G6]O%$vQUO1G3aO%$}QSO1G3aO%%SQUO1G3aO%%ZQ(C[O1G6[OOQQ7+(y7+(yO9OQ(C[O7+)TO`QUO7+)VOOQQ\'#KW\'#KWOOQQ\'#It\'#ItO%%eQUO,5>UOOQQ,5>U,5>UO%QQUO\'#HkO%%rQSO\'#HmOOQQ,5>[,5>[O:vQSO,5>[OOQQ,5>^,5>^OOQQ7+)`7+)`OOQQ7+)f7+)fOOQQ7+)j7+)jOOQQ7+)l7+)lO%%wQWO1G5mO%&]Q$IUO1G0sO%&gQSO1G0sOOQO1G/m1G/mO%&rQ$IUO1G/mO>QQSO1G/mO!)jQUO\'#DgOOQO,5>u,5>uOOQO-E<X-E<XOOQO,5>{,5>{OOQO-E<_-E<_O!>oQWO1G/mOOQO-E<[-E<[OOQ(CY1G0X1G0XOOQ(CY7+%q7+%qO#![QSO7+%qOOQ(CY7+&X7+&XO>QQSO7+&XO!>oQWO7+&XOOQO7+%t7+%tO$6nQ(CjO7+&QOOQO7+&Q7+&QO%QQUO7+&QO%&|Q(C[O7+&QO!>dQ(C[O7+%tO!>oQWO7+%tO%\'XQ(C[O7+&QO%\'gQ(CjO7++bO%QQUO7++bO%\'wQSO7++aO%\'wQSO7++aOOQO1G4i1G4iO:vQSO1G4iO%(PQSO1G4iOOQO7+%y7+%yO#![QSO<<KwO$MUQbO<<KwO%(_QSO<<KwOOQQ<<Kw<<KwO!%tQ,UO<<KwO%QQUO<<KwO%(gQSO<<KwO%(rQ(CjO1G2kO%*}Q(CjO1G2mO%-YQ(CjO1G2XO%/kQ,UO,5>vOOQO-E<Y-E<YO%/uQbO,5>wO%QQUO,5>wOOQO-E<Z-E<ZO%0PQSO1G5oOOQ(CY<<I}<<I}O%0XQ$IUO1G0nO%2cQ$IUO1G0xO%2jQ$IUO1G0xO%4nQ$IUO1G0xO%4uQ$IUO1G0xO%6jQ$IUO1G0xO%7QQ$IUO1G0xO%9eQ$IUO1G0xO%9lQ$IUO1G0xO%;pQ$IUO1G0xO%;wQ$IUO1G0xO%=oQ$IUO1G0xO%>SQ(CjO<<JaO%?XQ$IUO1G0xO%@}Q$IUO\'#J^O%CQQ$IUO1G1^O%C_Q$IUO1G0QO!)jQUO\'#FlOOQO\'#Jy\'#JyOOQO1G1p1G1pO%CiQSO1G1oO%CnQ$IUO,5?QOOOO7+\'c7+\'cOOOO1G/S1G/SOOQ(CY1G4n1G4nO!\'^Q,UO7+(ZO%CxQSO,5?RO9_QSO,5?ROOQO-E<e-E<eO%DWQSO1G6RO%DWQSO1G6RO%D`QSO1G6RO%DkQ,UO7+\'sO%D{Q`O,5?TO%EVQSO,5?TO!%tQ,UO,5?TOOQO-E<g-E<gO%E[Q`O1G6SO%EfQSO1G6SOOQ(CW1G2c1G2cO$ mQSO1G2cOOQ(CW1G2b1G2bO%EnQSO1G2dO!%tQ,UO1G2dOOQ(CW1G2i1G2iO!>oQWO1G2bOBoQSO1G2cO%EsQSO1G2dO%E{QSO1G2cO!\'^Q,UO7+*}OOQ(CY1G/[1G/[O%FWQSO1G/[OOQ(CY7+\'n7+\'nO%F]Q,UO7+\'uO%FmQ(CjO<<KROOQ(CY<<KR<<KRO!%tQ,UO\'#IlO%GaQSO,5@iO!%tQ,UO1G2gOOQQ<<Gx<<GxO!>dQ(C[O<<GxO%GiQ(CjO<<ItOOQ(CY<<It<<ItOOQO,5?^,5?^O%H]QSO,5?^O$%|QSO,5?^OOQO-E<p-E<pO%HbQSO1G6ZO%HbQSO1G6ZO9_QSO1G6ZO?rQSO<<LcOOQQ<<Lc<<LcO%HjQSO<<LcO9OQ(C[O<<LcO%HoQSO1G0sOOQQ<<LO<<LOO% dQ(ChO<<LOOOQQ<<LP<<LPO% nQ`O<<LPO%HtQWO\'#InO%IPQSO,5@lO!)jQUO,5@lOOQQ1G2}1G2}O%IXQUO\'#JgOOQO\'#Ip\'#IpO9OQ(C[O\'#IpO%IcQWO,5=lOOQQ,5=l,5=lO%IjQWO\'#E`O%JOQSO7+(qO%JTQSO7+(qOOQQ7+(q7+(qO!%tQ,UO7+(qO%QQUO7+(qO%J]QSO7+(qOOQQ7+(s7+(sO9OQ(C[O7+(sO#K`QSO7+(sO8tQSO7+(sO!>oQWO7+(sO%JhQSO,5?]OOQO-E<o-E<oOOQO\'#HT\'#HTO%JsQSO1G6XO9OQ(C[O<<GnOOQQ<<Gn<<GnO?rQSO<<GnO%J{QSO7++vO%KQQSO7++wOOQQ7+({7+({O%KVQSO7+({O%K[QUO7+({O%KcQSO7+({O%QQUO7++vO%QQUO7++wOOQQ<<Lo<<LoOOQQ<<Lq<<LqOOQQ-E<r-E<rOOQQ1G3p1G3pO%KhQSO,5>VOOQQ,5>X,5>XO%KmQSO1G3vO:vQSO7+&_O!)jQUO7+&_OOQO7+%X7+%XO%KrQ$IUO1G5yO>QQSO7+%XOOQ(CY<<I]<<I]OOQ(CY<<Is<<IsO>QQSO<<IsOOQO<<Il<<IlO$6nQ(CjO<<IlO%QQUO<<IlOOQO<<I`<<I`O!>dQ(C[O<<I`O%K|Q(C[O<<IlO%LXQ(CjO<<N|O%LiQSO<<N{OOQO7+*T7+*TO:vQSO7+*TOOQQANAcANAcO%LqQSOANAcO!%tQ,UOANAcO#![QSOANAcO$MUQbOANAcO%QQUOANAcO%LyQ(CjO7+\'sO& [Q(CjO7+\'uO&#mQbO1G4cO&#wQ$IUO7+&YO&$UQ$IUO,59nO&&XQ$IUO,5<dO&([Q$IUO,5<fO&*_Q$IUO,5<tO&,TQ$IUO7+\'fO&,bQ$IUO7+\'gO&,oQSO,5<WOOQO7+\'Z7+\'ZO&,tQ,UO<<KuOOQO1G4m1G4mO&,{QSO1G4mO&-WQSO1G4mO&-fQSO7++mO&-fQSO7++mO!%tQ,UO1G4oO&-nQ`O1G4oO&-xQSO7++nOOQ(CW7+\'}7+\'}O$ mQSO7+(OO&.QQ`O7+(OOOQ(CW7+\'|7+\'|O$ mQSO7+\'}O&.XQSO7+(OO!%tQ,UO7+(OOBoQSO7+\'}O&.^Q,UO<<NiOOQ(CY7+$v7+$vO&.hQ`O,5?WOOQO-E<j-E<jO&.rQ(ChO7+(ROOQQAN=dAN=dO9_QSO1G4xOOQO1G4x1G4xO&/SQSO1G4xO&/XQSO7++uO&/XQSO7++uO9OQ(C[OANA}O?rQSOANA}OOQQANA}ANA}OOQQANAjANAjOOQQANAkANAkO&/aQSO,5?YOOQO-E<l-E<lO&/lQ$IUO1G6WO&1|QbO\'#CfOOQO,5?[,5?[OOQO-E<n-E<nOOQQ1G3W1G3WO%IXQUO,5<xOOQQ<<L]<<L]O!%tQ,UO<<L]O%JOQSO<<L]O&2WQSO<<L]O%QQUO<<L]OOQQ<<L_<<L_O9OQ(C[O<<L_O#K`QSO<<L_O8tQSO<<L_O&2`QWO1G4wO&2kQSO7++sOOQQAN=YAN=YO9OQ(C[OAN=YOOQQ<= b<= bOOQQ<= c<= cOOQQ<<Lg<<LgO&2sQSO<<LgO&2xQUO<<LgO&3PQSO<= bO&3UQSO<= cOOQQ1G3q1G3qO>QQSO7+)bO&3ZQSO<<IyO&3fQ$IUO<<IyOOQO<<Hs<<HsOOQ(CYAN?_AN?_OOQOAN?WAN?WO$6nQ(CjOAN?WOOQOAN>zAN>zO%QQUOAN?WOOQO<<Mo<<MoOOQQG26}G26}O!%tQ,UOG26}O#![QSOG26}O&3pQSOG26}O$MUQbOG26}O&3xQ$IUO<<JaO&4VQ$IUO1G2XO&5{Q$IUO1G2kO&8OQ$IUO1G2mO&:RQ$IUO<<KRO&:`Q$IUO<<ItOOQO1G1r1G1rO!\'^Q,UOANAaOOQO7+*X7+*XO&:mQSO7+*XO&:xQSO<= XO&;QQ`O7+*ZOOQ(CW<<Kj<<KjO$ mQSO<<KjOOQ(CW<<Ki<<KiO&;[Q`O<<KjO$ mQSO<<KiOOQO7+*d7+*dO9_QSO7+*dO&;cQSO<= aOOQQG27iG27iO9OQ(C[OG27iO!)jQUO1G4tO&;kQSO7++rO%JOQSOANAwOOQQANAwANAwO!%tQ,UOANAwO&;sQSOANAwOOQQANAyANAyO9OQ(C[OANAyO#K`QSOANAyOOQO\'#HU\'#HUOOQO7+*c7+*cOOQQG22tG22tOOQQANBRANBRO&;{QSOANBROOQQAND|AND|OOQQAND}AND}OOQQ<<L|<<L|O!)jQUOAN?eOOQOG24rG24rO$6nQ(CjOG24rO#![QSOLD,iOOQQLD,iLD,iO!%tQ,UOLD,iO&<QQSOLD,iO&<YQ$IUO7+\'sO&>OQ$IUO7+\'uO&?tQ,UOG26{OOQO<<Ms<<MsOOQ(CWANAUANAUO$ mQSOANAUOOQ(CWANATANATOOQO<<NO<<NOOOQQLD-TLD-TO&@UQ$IUO7+*`OOQQG27cG27cO%JOQSOG27cO!%tQ,UOG27cOOQQG27eG27eO9OQ(C[OG27eOOQQG27mG27mO&@`Q$IUOG25POOQOLD*^LD*^OOQQ!$(!T!$(!TO#![QSO!$(!TO!%tQ,UO!$(!TO&@jQ(CjOG26{OOQ(CWG26pG26pOOQQLD,}LD,}O%JOQSOLD,}OOQQLD-PLD-POOQQ!)9Eo!)9EoO#![QSO!)9EoOOQQ!$(!i!$(!iOOQQ!.K;Z!.K;ZO&B{Q$IUOG26{O!)jQUO\'#DvO0uQSO\'#ETO&DqQbO\'#JcO!)jQUO\'#DnO&DxQUO\'#DzO!)jQUO\'#D|O&EPQbO\'#CfO&GgQbO\'#CfO&GwQUO,5;SO!)jQUO,5;^O!)jQUO,5;^O!)jQUO,5;^O!)jQUO,5;^O!)jQUO,5;^O!)jQUO,5;^O!)jQUO,5;^O!)jQUO,5;^O!)jQUO,5;^O!)jQUO,5;^O!)jQUO,5;^O!)jQUO\'#IfO&IzQSO,5<cO&JSQ,UO,5;^O&KgQ,UO,5;^O!)jQUO,5;rO0xQSO\'#DSO0xQSO\'#DSO!%tQ,UO\'#FxO&JSQ,UO\'#FxO!%tQ,UO\'#FzO&JSQ,UO\'#FzO!%tQ,UO\'#GYO&JSQ,UO\'#GYO!)jQUO,5:fO!)jQUO,5@_O&GwQUO1G0nO&KnQ$IUO\'#CfO!)jQUO1G1zO!%tQ,UO,5=PO&JSQ,UO,5=PO!%tQ,UO,5=RO&JSQ,UO,5=RO!%tQ,UO,5<mO&JSQ,UO,5<mO&GwQUO1G1{O!)jQUO7+&uO!%tQ,UO1G2XO&JSQ,UO1G2XO!%tQ,UO1G2ZO&JSQ,UO1G2ZO&GwQUO7+\'gO&GwQUO7+&YO!%tQ,UOANAaO&JSQ,UOANAaO&KxQSO\'#EhO&K}QSO\'#EhO&LVQSO\'#FWO&L[QSO\'#ErO&LaQSO\'#JsO&LlQSO\'#JqO&LwQSO,5;SO&L|Q,UO,5<`O&MTQSO\'#GRO&MYQSO\'#GRO&M_QSO,5<aO&MgQSO,5;SO&MoQ$IUO1G1ZO&MvQSO,5<mO&M{QSO,5<mO&NQQSO,5<oO&NVQSO,5<oO&N[QSO1G1{O&NaQSO1G0nO&NfQ,UO<<KuO&NmQ,UO<<KuO7^Q,UO\'#FvO8tQSO\'#FuO@mQSO\'#EgO!)jQUO,5;oO!2dQSO\'#GRO!2dQSO\'#GRO!2dQSO\'#GTO!2dQSO\'#GTO!\'^Q,UO7+(ZO!\'^Q,UO7+(ZO$HyQ`O1G2oO$HyQ`O1G2oO!%tQ,UO,5=TO!%tQ,UO,5=T',
  stateData:
    '\' v~O\'mOS\'nOSROS\'oRQ~OPYOQYOV!TO^pOaxObwOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!XXO!csO!hZO!kYO!lYO!mYO!otO!quO!tvO!x]O#p}O$QzO$UfO%`{O%b!OO%d|O%e|O%h!PO%j!QO%m!RO%n!RO%p!SO%|!UO&S!VO&U!WO&W!XO&Y!YO&]!ZO&c![O&i!]O&k!^O&m!_O&o!`O&q!aO\'tSO\'vTO\'yUO(RVO(a[O(niO~OPYOQYOa!gOb!fOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!cO!csO!hZO!kYO!lYO!mYO!otO!quO!t!eO$Q!hO$UfO\'t!bO\'vTO\'yUO(RVO(a[O(niO~O^!sOl!kO|!lO![!uO!]!rO!^!rO!x9mO!|!mO!}!mO#O!tO#P!mO#Q!mO#T!vO#U!vO\'u!iO\'vTO\'yUO(U!jO(a!pO~O\'o!wO~OPYXXYX^YXkYXyYXzYX|YX!VYX!eYX!fYX!hYX!lYX#XYX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX\'kYX(RYX(bYX(iYX(jYX~O!a$zX~P(gO[!yO\'v!{O\'w!yO\'x!{O~O[!|O\'x!{O\'y!{O\'z!|O~Oq#OO!O#PO(S#PO(T#RO~OPYOQYOa!gOb!fOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!cO!csO!hZO!kYO!lYO!mYO!otO!quO!t!eO$Q!hO$UfO\'t9rO\'vTO\'yUO(RVO(a[O(niO~O!U#VO!V#SO!S(XP!S(fP~P+sO!W#_O~P`OPYOQYOa!gOb!fOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!X!cO!csO!hZO!kYO!lYO!mYO!otO!quO!t!eO$Q!hO$UfO\'vTO\'yUO(RVO(a[O(niO~Oi#iO!U#eO!x]O#b#hO#c#eO\'t9sO!g(cP~P._O!h#kO\'t#jO~O!t#oO!x]O%`#pO~O#d#qO~O!a#rO#d#qO~OP$YOX$aOk#}Oy#vOz#wO|#xO!V$^O!e$PO!f#tO!h#uO!l$YO#g#{O#h#|O#i#|O#j#|O#k$OO#l$PO#m$PO#n$`O#o$PO#q$QO#s$SO#u$UO#v$VO(RVO(b$WO(i#yO(j#zO~O^(VX\'k(VX\'i(VX!g(VX!S(VX!X(VX%a(VX!a(VX~P1gO#X$bO#{$bOP(WXX(WXk(WXy(WXz(WX|(WX!V(WX!e(WX!h(WX!l(WX#g(WX#h(WX#i(WX#j(WX#k(WX#l(WX#m(WX#n(WX#o(WX#q(WX#s(WX#u(WX#v(WX(R(WX(b(WX(i(WX(j(WX!X(WX%a(WX~O^(WX!f(WX\'k(WX\'i(WX!S(WX!g(WXo(WX!a(WX~P3}O#X$bO~O$W$dO$Y$cO$a$iO~O!X$jO$UfO$d$kO$f$mO~Oi%POk$qOl$pOm$pOs%QOu%ROw%SO|$xO!X$yO!c%XO!h$uO#c%YO$Q%VO$m%TO$o%UO$r%WO\'t$oO\'vTO\'yUO\'}%OO(R$rOd(OP~O!h%ZO~O!a%]O~O^%^O\'k%^O~O\'u!iO~P%QO\'t%eO~O!h%ZO\'t%eO\'u!iO\'}%OO~Ob%lO!h%ZO\'t%eO~O#o$PO~Oy%qO!X%nO!h%pO%b%tO\'t%eO\'u!iO\'vTO\'yUO](vP~O!t#oO~O|%vO!X%wO\'t%eO~O|%vO!X%wO%j%{O\'t%eO~O\'t%|O~O#p}O%b!OO%d|O%e|O%h!PO%j!QO%m!RO%n!RO~Oa&VOb&UO!t&SO%`&TO%r&RO~P;fOa&YObwO!X&XO!tvO!x]O#p}O%`{O%d|O%e|O%h!PO%j!QO%m!RO%n!RO%p!SO~O_&]O#X&`O%b&ZO\'u!iO~P<eO!h&aO!q&eO~O!h#kO~O!XXO~O^%^O\'j&mO\'k%^O~O^%^O\'j&pO\'k%^O~O^%^O\'j&rO\'k%^O~O\'iYX!SYXoYX!gYX&QYX!XYX%aYX!aYX~P(gO![\'PO!]&xO!^&xO\'u!iO\'vTO\'yUO~Ol&vO|&uO!U&yO(U&tO!W(YP!W(hP~P?fOg\'SO!X\'QO\'t%eO~Ob\'XO!h%ZO\'t%eO~Oy%qO!h%pO~Ol!kO|!lO!x9mO!|!mO!}!mO#P!mO#Q!mO\'u!iO\'vTO\'yUO(U!jO(a!pO~O![\'_O!]\'^O!^\'^O#O!mO#T\'`O#U\'`O~PAQO^%^O!a#rO!h%ZO\'k%^O\'}%OO(b\'bO~O!l\'fO#X\'dO~PB`Ol!kO|!lO\'vTO\'yUO(U!jO(a!pO~O!XXOl(_X|(_X![(_X!](_X!^(_X!x(_X!|(_X!}(_X#O(_X#P(_X#Q(_X#T(_X#U(_X\'u(_X\'v(_X\'y(_X(U(_X(a(_X~O!]\'^O!^\'^O\'u!iO~PCOO\'p\'jO\'q\'jO\'r\'lO~O[!yO\'v\'nO\'w!yO\'x\'nO~O[!|O\'x\'nO\'y\'nO\'z!|O~Oq#OO!O#PO(S#PO(T\'rO~O!U\'tO!S&|X!S\'SX!V&|X!V\'SX~P+sO!V\'vO!S(XX~OP$YOX$aOk#}Oy#vOz#wO|#xO!V\'vO!e$PO!f#tO!h#uO!l$YO#g#{O#h#|O#i#|O#j#|O#k$OO#l$PO#m$PO#n$`O#o$PO#q$QO#s$SO#u$UO#v$VO(RVO(b$WO(i#yO(j#zO~O!S(XX~PFrO!S\'{O~O!S(eX!V(eX!a(eX!g(eX(b(eX~O#X(eX#d#]X!W(eX~PHxO#X\'|O!S(gX!V(gX~O!V\'}O!S(fX~O!S(QO~O#X$bO~PHxO!W(RO~P`Oy#vOz#wO|#xO!f#tO!h#uO(RVOP!jaX!jak!ja!V!ja!e!ja!l!ja#g!ja#h!ja#i!ja#j!ja#k!ja#l!ja#m!ja#n!ja#o!ja#q!ja#s!ja#u!ja#v!ja(b!ja(i!ja(j!ja~O^!ja\'k!ja\'i!ja!S!ja!g!jao!ja!X!ja%a!ja!a!ja~PJ`O!g(SO~O!a#rO#X(TO(b\'bO!V(dX^(dX\'k(dX~O!g(dX~PMOO|%vO!X%wO!x]O#b(YO#c(XO\'t%eO~O!V(ZO!g(cX~O!g(]O~O|%vO!X%wO#c(XO\'t%eO~OP(WXX(WXk(WXy(WXz(WX|(WX!V(WX!e(WX!f(WX!h(WX!l(WX#g(WX#h(WX#i(WX#j(WX#k(WX#l(WX#m(WX#n(WX#o(WX#q(WX#s(WX#u(WX#v(WX(R(WX(b(WX(i(WX(j(WX~O!a#rO!g(WX~PNlOy(^Oz(_O!f#tO!h#uO!x!wa|!wa~O!t!wa%`!wa!X!wa#b!wa#c!wa\'t!wa~P!!pO!t(cO~OPYOQYOa!gOb!fOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!XXO!csO!hZO!kYO!lYO!mYO!otO!quO!t!eO$Q!hO$UfO\'t!bO\'vTO\'yUO(RVO(a[O(niO~Oi%POk$qOl$pOm$pOs%QOu%ROw:VO|$xO!X$yO!c;aO!h$uO#c:]O$Q%VO$m:XO$o:ZO$r%WO\'t(gO\'vTO\'yUO\'}%OO(R$rO~O#d(iO~Oi%POk$qOl$pOm$pOs%QOu%ROw%SO|$xO!X$yO!c%XO!h$uO#c%YO$Q%VO$m%TO$o%UO$r%WO\'t(gO\'vTO\'yUO\'}%OO(R$rO~Od([P~P!\'^O!U(mO!g(]P~P%QO(U(oO(a[O~O|(qO!h#uO(U(oO(a[O~OP9lOQ9lOa;]Ob!fOikOk9lOlkOmkOskOu9lOw9lO|WO!QkO!RkO!X!cO!c9oO!hZO!k9lO!l9lO!m9lO!o9pO!q9qO!t!eO$Q!hO$UfO\'t)PO\'vTO\'yUO(RVO(a[O(n;ZO~Oz)SO!h#uO~O!V$^O^$ka\'k$ka\'i$ka!g$ka!S$ka!X$ka%a$ka!a$ka~O#p)WO~P!%tOy)ZO!a)YO!X$XX$T$XX$W$XX$Y$XX$a$XX~O!a)YO!X(kX$T(kX$W(kX$Y(kX$a(kX~Oy)ZO~P!-SOy)ZO!X(kX$T(kX$W(kX$Y(kX$a(kX~O!X)]O$T)aO$W)[O$Y)[O$a)bO~O!U)eO~P!)jO$W$dO$Y$cO$a)iO~Og$sXy$sX|$sX!f$sX(i$sX(j$sX~OdfXd$sXgfX!VfX#XfX~P!.xOl)kO~Oq)lO(S)mO(T)oO~Og)xOy)qO|)rO(i)tO(j)vO~Od)pO~P!0ROd)yO~Oi%POk$qOl$pOm$pOs%QOu%ROw:VO|$xO!X$yO!c;aO!h$uO#c:]O$Q%VO$m:XO$o:ZO$r%WO\'vTO\'yUO\'}%OO(R$rO~O!U)}O\'t)zO!g(oP~P!0pO#d*PO~O!h*QO~O!U*VO\'t*SO!S(pP~P!0pOk*cO|*ZO![*aO!]*YO!^*YO!h*QO#T*bO%W*]O\'u!iO(U!jO~O!W*`O~P!2vO!f#tOg(QXy(QX|(QX(i(QX(j(QX!V(QX#X(QX~Od(QX#y(QX~P!3oOg*fO#X*eOd(PX!V(PX~O!V*gOd(OX~O\'t%|Od(OP~O!h*nO~O\'t(gO~Oi*rO|%vO!U#eO!X%wO!x]O#b#hO#c#eO\'t%eO!g(cP~O!a#rO#d*sO~OP$YOX$aOk#}Oy#vOz#wO|#xO!e$PO!f#tO!h#uO!l$YO#g#{O#h#|O#i#|O#j#|O#k$OO#l$PO#m$PO#n$`O#o$PO#q$QO#s$SO#u$UO#v$VO(RVO(b$WO(i#yO(j#zO~O^!ba!V!ba\'k!ba\'i!ba!S!ba!g!bao!ba!X!ba%a!ba!a!ba~P!6UOy#vOz#wO|#xO!f#tO!h#uO(RVOP!naX!nak!na!V!na!e!na!l!na#g!na#h!na#i!na#j!na#k!na#l!na#m!na#n!na#o!na#q!na#s!na#u!na#v!na(b!na(i!na(j!na~O^!na\'k!na\'i!na!S!na!g!nao!na!X!na%a!na!a!na~P!8oOy#vOz#wO|#xO!f#tO!h#uO(RVOP!paX!pak!pa!V!pa!e!pa!l!pa#g!pa#h!pa#i!pa#j!pa#k!pa#l!pa#m!pa#n!pa#o!pa#q!pa#s!pa#u!pa#v!pa(b!pa(i!pa(j!pa~O^!pa\'k!pa\'i!pa!S!pa!g!pao!pa!X!pa%a!pa!a!pa~P!;YOg*{O!X\'QO%a*zO\'}%OO~O!a*}O^\'|X!X\'|X\'k\'|X!V\'|X~O^%^O!XXO\'k%^O~O!h%ZO\'}%OO~O!h%ZO\'t%eO\'}%OO~O!a#rO#d(iO~O%b+ZO\'t+VO\'vTO\'yUO!W(wP~O!V+[O](vX~O(U(oO~OX+`O~O]+aO~O!X%nO\'t%eO\'u!iO](vP~O|%vO!U+eO!V\'}O!X%wO\'t%eO!S(fP~Ol&|O|+gO!U+fO\'vTO\'yUO(U(oO~O!W(hP~P!@xO!V+hO^(sX\'k(sX~O#X+lO\'}%OO~Og+oO!X$yO\'}%OO~O!X+qO~Oy+sO!XXO~O!t+xO~Ob+}O~O\'t#jO!W(uP~Ob%lO~O%b!OO\'t%|O~P<eOX,TO],SO~OPYOQYOaxObwOikOkYOlkOmkOskOuYOwYO|WO!QkO!RkO!csO!hZO!kYO!lYO!mYO!otO!quO!tvO!x]O$UfO%`{O\'vTO\'yUO(RVO(a[O(niO~O!X!cO$Q!hO\'t!bO~P!C]O],SO^%^O\'k%^O~O^,XO#p,ZO%d,ZO%e,ZO~P%QO!h&aO~O&S,`O~O!X,bO~O&e,dO&g,eOP&baQ&baV&ba^&baa&bab&bai&bak&bal&bam&bas&bau&baw&ba|&ba!Q&ba!R&ba!X&ba!c&ba!h&ba!k&ba!l&ba!m&ba!o&ba!q&ba!t&ba!x&ba#p&ba$Q&ba$U&ba%`&ba%b&ba%d&ba%e&ba%h&ba%j&ba%m&ba%n&ba%p&ba%|&ba&S&ba&U&ba&W&ba&Y&ba&]&ba&c&ba&i&ba&k&ba&m&ba&o&ba&q&ba\'i&ba\'t&ba\'v&ba\'y&ba(R&ba(a&ba(n&ba!W&ba&Z&ba_&ba&`&ba~O\'t,jO~O!V{X!V!_X!W{X!W!_X!a{X!a!_X!h!_X#X{X\'}!_X~O!a,oO#X,nO!V#aX!V(ZX!W#aX!W(ZX!a(ZX!h(ZX\'}(ZX~O!a,qO!h%ZO\'}%OO!V!ZX!W!ZX~Ol!kO|!lO\'vTO\'yUO(U!jO~OP9lOQ9lOa;]Ob!fOikOk9lOlkOmkOskOu9lOw9lO|WO!QkO!RkO!X!cO!c9oO!hZO!k9lO!l9lO!m9lO!o9pO!q9qO!t!eO$Q!hO$UfO\'vTO\'yUO(RVO(a[O(n;ZO~O\'t:bO~P!LrO!V,uO!W(YX~O!W,wO~O!a,oO#X,nO!V#aX!W#aX~O!V,xO!W(hX~O!W,zO~O!],{O!^,{O\'u!iO~P!LaO!W-OO~P\'TOg-RO!X\'QO~O!S-WO~Ol!wa![!wa!]!wa!^!wa!|!wa!}!wa#O!wa#P!wa#Q!wa#T!wa#U!wa\'u!wa\'v!wa\'y!wa(U!wa(a!wa~P!!pO!l-]O#X-ZO~PB`O!]-_O!^-_O\'u!iO~PCOO^%^O#X-ZO\'k%^O~O^%^O!a#rO#X-ZO\'k%^O~O^%^O!a#rO!l-]O#X-ZO\'k%^O(b\'bO~O\'p\'jO\'q\'jO\'r-dO~Oo-eO~O!S&|a!V&|a~P!6UO!U-iO!S&|X!V&|X~P%QO!V\'vO!S(Xa~O!S(Xa~PFrO!V\'}O!S(fa~O|%vO!U-mO!X%wO\'t%eO!S\'SX!V\'SX~O#X-oO!V(da!g(da^(da\'k(da~O!a#rO~P#&xO!V(ZO!g(ca~O|%vO!X%wO#c-sO\'t%eO~Oi-xO|%vO!U-uO!X%wO!x]O#b-wO#c-uO\'t%eO!V\'VX!g\'VX~Oz-|O!h#uO~Og.PO!X\'QO%a.OO\'}%OO~O^#[i!V#[i\'k#[i\'i#[i!S#[i!g#[io#[i!X#[i%a#[i!a#[i~P!6UOg;gOy)qO|)rO(i)tO(j)vO~O#d#Wa^#Wa#X#Wa\'k#Wa!V#Wa!g#Wa!X#Wa!S#Wa~P#)tO#d(QXP(QXX(QX^(QXk(QXz(QX!e(QX!h(QX!l(QX#g(QX#h(QX#i(QX#j(QX#k(QX#l(QX#m(QX#n(QX#o(QX#q(QX#s(QX#u(QX#v(QX\'k(QX(R(QX(b(QX!g(QX!S(QX\'i(QXo(QX!X(QX%a(QX!a(QX~P!3oO!V.YOd([X~P!0ROd.[O~O!V.]O!g(]X~P!6UO!g.`O~O!S.bO~OP$YOy#vOz#wO|#xO!f#tO!h#uO!l$YO(RVOX#fi^#fik#fi!V#fi!e#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi\'k#fi(b#fi(i#fi(j#fi\'i#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~O#g#fi~P#-pO#g#{O~P#-pOP$YOy#vOz#wO|#xO!f#tO!h#uO!l$YO#g#{O#h#|O#i#|O#j#|O(RVOX#fi^#fi!V#fi!e#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi\'k#fi(b#fi(i#fi(j#fi\'i#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~Ok#fi~P#0bOk#}O~P#0bOP$YOk#}Oy#vOz#wO|#xO!f#tO!h#uO!l$YO#g#{O#h#|O#i#|O#j#|O#k$OO(RVO^#fi!V#fi#q#fi#s#fi#u#fi#v#fi\'k#fi(b#fi(i#fi(j#fi\'i#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~OX#fi!e#fi#l#fi#m#fi#n#fi#o#fi~P#3SOX$aO!e$PO#l$PO#m$PO#n$`O#o$PO~P#3SOP$YOX$aOk#}Oy#vOz#wO|#xO!e$PO!f#tO!h#uO!l$YO#g#{O#h#|O#i#|O#j#|O#k$OO#l$PO#m$PO#n$`O#o$PO#q$QO(RVO^#fi!V#fi#s#fi#u#fi#v#fi\'k#fi(b#fi(j#fi\'i#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~O(i#fi~P#6TO(i#yO~P#6TOP$YOX$aOk#}Oy#vOz#wO|#xO!e$PO!f#tO!h#uO!l$YO#g#{O#h#|O#i#|O#j#|O#k$OO#l$PO#m$PO#n$`O#o$PO#q$QO#s$SO(RVO(i#yO^#fi!V#fi#u#fi#v#fi\'k#fi(b#fi\'i#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~O(j#fi~P#8uO(j#zO~P#8uOP$YOX$aOk#}Oy#vOz#wO|#xO!e$PO!f#tO!h#uO!l$YO#g#{O#h#|O#i#|O#j#|O#k$OO#l$PO#m$PO#n$`O#o$PO#q$QO#s$SO#u$UO(RVO(i#yO(j#zO~O^#fi!V#fi#v#fi\'k#fi(b#fi\'i#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~P#;gOPYXXYXkYXyYXzYX|YX!eYX!fYX!hYX!lYX#XYX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX(RYX(bYX(iYX(jYX!VYX!WYX~O#yYX~P#>QOP$YOX:TOk9wOy#vOz#wO|#xO!e9yO!f#tO!h#uO!l$YO#g9uO#h9vO#i9vO#j9vO#k9xO#l9yO#m9yO#n:SO#o9yO#q9zO#s9|O#u:OO#v:PO(RVO(b$WO(i#yO(j#zO~O#y.dO~P#@_O#X:UO#{:UO#y(WX!W(WX~PNlO^\'Ya!V\'Ya\'k\'Ya\'i\'Ya!g\'Ya!S\'Yao\'Ya!X\'Ya%a\'Ya!a\'Ya~P!6UOP#fiX#fi^#fik#fiz#fi!V#fi!e#fi!f#fi!h#fi!l#fi#g#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi\'k#fi(R#fi(b#fi\'i#fi!S#fi!g#fio#fi!X#fi%a#fi!a#fi~P#)tO^#zi!V#zi\'k#zi\'i#zi!S#zi!g#zio#zi!X#zi%a#zi!a#zi~P!6UO$W.iO$Y.iO~O$W.jO$Y.jO~O!a)YO#X.kO!X$^X$T$^X$W$^X$Y$^X$a$^X~O!U.lO~O!X)]O$T.nO$W)[O$Y)[O$a.oO~O!V:QO!W(VX~P#@_O!W.pO~O!a)YO$a(kX~O$a.rO~Oq)lO(S)mO(T.uO~Ol.xO!S.yO\'vTO\'yUO~O!VcX!acX!gcX!g$sX(bcX~P!.xO!g/PO~P#)tO!V/QO!a#rO(b\'bO!g(oX~O!g/VO~O!U)}O\'t%eO!g(oP~O#d/XO~O!S$sX!V$sX!a$zX~P!.xO!V/YO!S(pX~P#)tO!a/[O~O!S/^O~Ok/bO!a#rO!h%ZO\'}%OO(b\'bO~O\'t/dO~O!a*}O~O^%^O!V/hO\'k%^O~O!W/jO~P!2vO!]/kO!^/kO\'u!iO(U!jO~O|/mO(U!jO~O#T/nO~O\'t%|Od\'_X!V\'_X~O!V*gOd(Oa~Od/sO~Oy/tOz/tO|/uOgva(iva(jva!Vva#Xva~Odva#yva~P#L|Oy)qO|)rOg$la(i$la(j$la!V$la#X$la~Od$la#y$la~P#MrOy)qO|)rOg$na(i$na(j$na!V$na#X$na~Od$na#y$na~P#NeO#d/wO~Od$|a!V$|a#X$|a#y$|a~P!0RO!a#rO~O#d/zO~Oy#vOz#wO|#xO!f#tO!h#uO(RVOP!niX!nik!ni!V!ni!e!ni!l!ni#g!ni#h!ni#i!ni#j!ni#k!ni#l!ni#m!ni#n!ni#o!ni#q!ni#s!ni#u!ni#v!ni(b!ni(i!ni(j!ni~O^!ni\'k!ni\'i!ni!S!ni!g!nio!ni!X!ni%a!ni!a!ni~P$ wOg.PO!X\'QO%a.OO~Oi0RO\'t0QO~P!0sO!a*}O^\'|a!X\'|a\'k\'|a!V\'|a~O#d0XO~OXYX!VcX!WcX~O!V0YO!W(wX~O!W0[O~OX0]O~O\'t+VO\'vTO\'yUO~O!X%nO\'t%eO]\'gX!V\'gX~O!V+[O](va~O!g0bO~P!6UOX0eO~O]0fO~O!V+hO^(sa\'k(sa~O#X0lO~Og0oO!X$yO~O(U(oO!W(tP~Og0xO!X0uO%a0wO\'}%OO~OX1SO!V1QO!W(uX~O!W1TO~O]1VO^%^O\'k%^O~O\'t#jO\'vTO\'yUO~O#X$bO#{$bOP(WXX(WXk(WXy(WXz(WX|(WX!V(WX!e(WX!h(WX!l(WX#g(WX#h(WX#i(WX#j(WX#k(WX#l(WX#m(WX#n(WX#q(WX#s(WX#u(WX#v(WX(R(WX(b(WX(i(WX(j(WX~O#o1YO&Q1ZO^(WX!f(WX~P$(xO#X$bO#o1YO&Q1ZO~O^1[O~P%QO^1^O~O&Z1bOP&XiQ&XiV&Xi^&Xia&Xib&Xii&Xik&Xil&Xim&Xis&Xiu&Xiw&Xi|&Xi!Q&Xi!R&Xi!X&Xi!c&Xi!h&Xi!k&Xi!l&Xi!m&Xi!o&Xi!q&Xi!t&Xi!x&Xi#p&Xi$Q&Xi$U&Xi%`&Xi%b&Xi%d&Xi%e&Xi%h&Xi%j&Xi%m&Xi%n&Xi%p&Xi%|&Xi&S&Xi&U&Xi&W&Xi&Y&Xi&]&Xi&c&Xi&i&Xi&k&Xi&m&Xi&o&Xi&q&Xi\'i&Xi\'t&Xi\'v&Xi\'y&Xi(R&Xi(a&Xi(n&Xi!W&Xi_&Xi&`&Xi~O_1hO!W1fO&`1gO~P`O!XXO!h1jO~O&g,eOP&biQ&biV&bi^&bia&bib&bii&bik&bil&bim&bis&biu&biw&bi|&bi!Q&bi!R&bi!X&bi!c&bi!h&bi!k&bi!l&bi!m&bi!o&bi!q&bi!t&bi!x&bi#p&bi$Q&bi$U&bi%`&bi%b&bi%d&bi%e&bi%h&bi%j&bi%m&bi%n&bi%p&bi%|&bi&S&bi&U&bi&W&bi&Y&bi&]&bi&c&bi&i&bi&k&bi&m&bi&o&bi&q&bi\'i&bi\'t&bi\'v&bi\'y&bi(R&bi(a&bi(n&bi!W&bi&Z&bi_&bi&`&bi~O!S1pO~O!V!Za!W!Za~P#@_Ol!kO|!lO!U1vO(U!jO!V&}X!W&}X~P?fO!V,uO!W(Ya~O!V\'TX!W\'TX~P!@xO!V,xO!W(ha~O!W1}O~P\'TO^%^O#X2WO\'k%^O~O^%^O!a#rO#X2WO\'k%^O~O^%^O!a#rO!l2[O#X2WO\'k%^O(b\'bO~O^%^O\'k%^O~P!6UO!V$^Oo$ka~O!S&|i!V&|i~P!6UO!V\'vO!S(Xi~O!V\'}O!S(fi~O!S(gi!V(gi~P!6UO!V(di!g(di^(di\'k(di~P!6UO#X2^O!V(di!g(di^(di\'k(di~O!V(ZO!g(ci~O|%vO!X%wO!x]O#b2cO#c2bO\'t%eO~O|%vO!X%wO#c2bO\'t%eO~Og2jO!X\'QO%a2iO~Og2jO!X\'QO%a2iO\'}%OO~O#dvaPvaXva^vakva!eva!fva!hva!lva#gva#hva#iva#jva#kva#lva#mva#nva#ova#qva#sva#uva#vva\'kva(Rva(bva!gva!Sva\'ivaova!Xva%ava!ava~P#L|O#d$laP$laX$la^$lak$laz$la!e$la!f$la!h$la!l$la#g$la#h$la#i$la#j$la#k$la#l$la#m$la#n$la#o$la#q$la#s$la#u$la#v$la\'k$la(R$la(b$la!g$la!S$la\'i$lao$la!X$la%a$la!a$la~P#MrO#d$naP$naX$na^$nak$naz$na!e$na!f$na!h$na!l$na#g$na#h$na#i$na#j$na#k$na#l$na#m$na#n$na#o$na#q$na#s$na#u$na#v$na\'k$na(R$na(b$na!g$na!S$na\'i$nao$na!X$na%a$na!a$na~P#NeO#d$|aP$|aX$|a^$|ak$|az$|a!V$|a!e$|a!f$|a!h$|a!l$|a#g$|a#h$|a#i$|a#j$|a#k$|a#l$|a#m$|a#n$|a#o$|a#q$|a#s$|a#u$|a#v$|a\'k$|a(R$|a(b$|a!g$|a!S$|a\'i$|a#X$|ao$|a!X$|a%a$|a!a$|a~P#)tO^#[q!V#[q\'k#[q\'i#[q!S#[q!g#[qo#[q!X#[q%a#[q!a#[q~P!6UOd\'OX!V\'OX~P!\'^O!V.YOd([a~O!U2rO!V\'PX!g\'PX~P%QO!V.]O!g(]a~O!V.]O!g(]a~P!6UO!S2uO~O#y!ja!W!ja~PJ`O#y!ba!V!ba!W!ba~P#@_O#y!na!W!na~P!8oO#y!pa!W!pa~P!;YO!X3XO$UfO$_3YO~O!W3^O~Oo3_O~P#)tO^$hq!V$hq\'k$hq\'i$hq!S$hq!g$hqo$hq!X$hq%a$hq!a$hq~P!6UO!S3`O~Ol.xO\'vTO\'yUO~Oy)qO|)rO(j)vOg%Xi(i%Xi!V%Xi#X%Xi~Od%Xi#y%Xi~P$GeOy)qO|)rOg%Zi(i%Zi(j%Zi!V%Zi#X%Zi~Od%Zi#y%Zi~P$HWO(b$WO~P#)tO!U3cO\'t%eO!V\'ZX!g\'ZX~O!V/QO!g(oa~O!V/QO!a#rO!g(oa~O!V/QO!a#rO(b\'bO!g(oa~Od$ui!V$ui#X$ui#y$ui~P!0RO!U3kO\'t*SO!S\']X!V\']X~P!0pO!V/YO!S(pa~O!V/YO!S(pa~P#)tO!a#rO#o3sO~Ok3vO!a#rO(b\'bO~Od(Pi!V(Pi~P!0RO#X3yOd(Pi!V(Pi~P!0RO!g3|O~O^$iq!V$iq\'k$iq\'i$iq!S$iq!g$iqo$iq!X$iq%a$iq!a$iq~P!6UO!V4QO!X(qX~P#)tO!f#tO~P3}O^$sX!X$sX%UYX\'k$sX!V$sX~P!.xO%U4SO^hXghXyhX|hX!XhX\'khX(ihX(jhX!VhX~O%U4SO~O%b4ZO\'t+VO\'vTO\'yUO!V\'fX!W\'fX~O!V0YO!W(wa~OX4_O~O]4`O~O!S4dO~O^%^O\'k%^O~P#)tO!X$yO~P#)tO!V4iO#X4kO!W(tX~O!W4lO~Ol!kO|4mO![!uO!]!rO!^!rO!x9mO!|!mO!}!mO#O!mO#P!mO#Q!mO#T4rO#U!vO\'u!iO\'vTO\'yUO(U!jO(a!pO~O!W4qO~P%!VOg4wO!X0uO%a4vO~Og4wO!X0uO%a4vO\'}%OO~O\'t#jO!V\'eX!W\'eX~O!V1QO!W(ua~O\'vTO\'yUO(U5QO~O]5UO~O!g5XO~P%QO^5ZO~O^5ZO~P%QO#o5]O&Q5^O~PMOO_1hO!W5bO&`1gO~P`O!a5dO~O!a5fO!V(Zi!W(Zi!a(Zi!h(Zi\'}(Zi~O!V#ai!W#ai~P#@_O#X5gO!V#ai!W#ai~O!V!Zi!W!Zi~P#@_O^%^O#X5pO\'k%^O~O^%^O!a#rO#X5pO\'k%^O~O!V(dq!g(dq^(dq\'k(dq~P!6UO!V(ZO!g(cq~O|%vO!X%wO#c5wO\'t%eO~O!X\'QO%a5zO~Og5}O!X\'QO%a5zO~O#d%XiP%XiX%Xi^%Xik%Xiz%Xi!e%Xi!f%Xi!h%Xi!l%Xi#g%Xi#h%Xi#i%Xi#j%Xi#k%Xi#l%Xi#m%Xi#n%Xi#o%Xi#q%Xi#s%Xi#u%Xi#v%Xi\'k%Xi(R%Xi(b%Xi!g%Xi!S%Xi\'i%Xio%Xi!X%Xi%a%Xi!a%Xi~P$GeO#d%ZiP%ZiX%Zi^%Zik%Ziz%Zi!e%Zi!f%Zi!h%Zi!l%Zi#g%Zi#h%Zi#i%Zi#j%Zi#k%Zi#l%Zi#m%Zi#n%Zi#o%Zi#q%Zi#s%Zi#u%Zi#v%Zi\'k%Zi(R%Zi(b%Zi!g%Zi!S%Zi\'i%Zio%Zi!X%Zi%a%Zi!a%Zi~P$HWO#d$uiP$uiX$ui^$uik$uiz$ui!V$ui!e$ui!f$ui!h$ui!l$ui#g$ui#h$ui#i$ui#j$ui#k$ui#l$ui#m$ui#n$ui#o$ui#q$ui#s$ui#u$ui#v$ui\'k$ui(R$ui(b$ui!g$ui!S$ui\'i$ui#X$uio$ui!X$ui%a$ui!a$ui~P#)tOd\'Oa!V\'Oa~P!0RO!V\'Pa!g\'Pa~P!6UO!V.]O!g(]i~O#y#[i!V#[i!W#[i~P#@_OP$YOy#vOz#wO|#xO!f#tO!h#uO!l$YO(RVOX#fik#fi!e#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi#y#fi(b#fi(i#fi(j#fi!V#fi!W#fi~O#g#fi~P%0fO#g9uO~P%0fOP$YOy#vOz#wO|#xO!f#tO!h#uO!l$YO#g9uO#h9vO#i9vO#j9vO(RVOX#fi!e#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi#y#fi(b#fi(i#fi(j#fi!V#fi!W#fi~Ok#fi~P%2qOk9wO~P%2qOP$YOk9wOy#vOz#wO|#xO!f#tO!h#uO!l$YO#g9uO#h9vO#i9vO#j9vO#k9xO(RVO#q#fi#s#fi#u#fi#v#fi#y#fi(b#fi(i#fi(j#fi!V#fi!W#fi~OX#fi!e#fi#l#fi#m#fi#n#fi#o#fi~P%4|OX:TO!e9yO#l9yO#m9yO#n:SO#o9yO~P%4|OP$YOX:TOk9wOy#vOz#wO|#xO!e9yO!f#tO!h#uO!l$YO#g9uO#h9vO#i9vO#j9vO#k9xO#l9yO#m9yO#n:SO#o9yO#q9zO(RVO#s#fi#u#fi#v#fi#y#fi(b#fi(j#fi!V#fi!W#fi~O(i#fi~P%7hO(i#yO~P%7hOP$YOX:TOk9wOy#vOz#wO|#xO!e9yO!f#tO!h#uO!l$YO#g9uO#h9vO#i9vO#j9vO#k9xO#l9yO#m9yO#n:SO#o9yO#q9zO#s9|O(RVO(i#yO#u#fi#v#fi#y#fi(b#fi!V#fi!W#fi~O(j#fi~P%9sO(j#zO~P%9sOP$YOX:TOk9wOy#vOz#wO|#xO!e9yO!f#tO!h#uO!l$YO#g9uO#h9vO#i9vO#j9vO#k9xO#l9yO#m9yO#n:SO#o9yO#q9zO#s9|O#u:OO(RVO(i#yO(j#zO~O#v#fi#y#fi(b#fi!V#fi!W#fi~P%<OO^#wy!V#wy\'k#wy\'i#wy!S#wy!g#wyo#wy!X#wy%a#wy!a#wy~P!6UOg;hOy)qO|)rO(i)tO(j)vO~OP#fiX#fik#fiz#fi!e#fi!f#fi!h#fi!l#fi#g#fi#h#fi#i#fi#j#fi#k#fi#l#fi#m#fi#n#fi#o#fi#q#fi#s#fi#u#fi#v#fi#y#fi(R#fi(b#fi!V#fi!W#fi~P%>vO!f#tOP(QXX(QXg(QXk(QXy(QXz(QX|(QX!e(QX!h(QX!l(QX#g(QX#h(QX#i(QX#j(QX#k(QX#l(QX#m(QX#n(QX#o(QX#q(QX#s(QX#u(QX#v(QX#y(QX(R(QX(b(QX(i(QX(j(QX!V(QX!W(QX~O#y#zi!V#zi!W#zi~P#@_O#y!ni!W!ni~P$ wO!W6ZO~O!V\'Ya!W\'Ya~P#@_O!a#rO(b\'bO!V\'Za!g\'Za~O!V/QO!g(oi~O!V/QO!a#rO!g(oi~Od$uq!V$uq#X$uq#y$uq~P!0RO!S\']a!V\']a~P#)tO!a6bO~O!V/YO!S(pi~P#)tO!V/YO!S(pi~O!S6fO~O!a#rO#o6kO~Ok6lO!a#rO(b\'bO~O!S6nO~Od$wq!V$wq#X$wq#y$wq~P!0RO^$iy!V$iy\'k$iy\'i$iy!S$iy!g$iyo$iy!X$iy%a$iy!a$iy~P!6UO!V4QO!X(qa~O^#[y!V#[y\'k#[y\'i#[y!S#[y!g#[yo#[y!X#[y%a#[y!a#[y~P!6UOX6sO~O!V0YO!W(wi~O]6yO~O!a5fO~O(U(oO!V\'bX!W\'bX~O!V4iO!W(ta~OikO\'t7QO~P._O!W7TO~P%!VOl!kO|7UO\'vTO\'yUO(U!jO(a!pO~O!X0uO~O!X0uO%a7WO~Og7ZO!X0uO%a7WO~OX7`O!V\'ea!W\'ea~O!V1QO!W(ui~O!g7dO~O!g7eO~O!g7fO~O!g7fO~P%QO^7hO~O!a7kO~O!g7lO~O!V(gi!W(gi~P#@_O^%^O#X7tO\'k%^O~O!V(dy!g(dy^(dy\'k(dy~P!6UO!V(ZO!g(cy~O!X\'QO%a7wO~O#d$uqP$uqX$uq^$uqk$uqz$uq!V$uq!e$uq!f$uq!h$uq!l$uq#g$uq#h$uq#i$uq#j$uq#k$uq#l$uq#m$uq#n$uq#o$uq#q$uq#s$uq#u$uq#v$uq\'k$uq(R$uq(b$uq!g$uq!S$uq\'i$uq#X$uqo$uq!X$uq%a$uq!a$uq~P#)tO#d$wqP$wqX$wq^$wqk$wqz$wq!V$wq!e$wq!f$wq!h$wq!l$wq#g$wq#h$wq#i$wq#j$wq#k$wq#l$wq#m$wq#n$wq#o$wq#q$wq#s$wq#u$wq#v$wq\'k$wq(R$wq(b$wq!g$wq!S$wq\'i$wq#X$wqo$wq!X$wq%a$wq!a$wq~P#)tO!V\'Pi!g\'Pi~P!6UO#y#[q!V#[q!W#[q~P#@_Oy/tOz/tO|/uOPvaXvagvakva!eva!fva!hva!lva#gva#hva#iva#jva#kva#lva#mva#nva#ova#qva#sva#uva#vva#yva(Rva(bva(iva(jva!Vva!Wva~Oy)qO|)rOP$laX$lag$lak$laz$la!e$la!f$la!h$la!l$la#g$la#h$la#i$la#j$la#k$la#l$la#m$la#n$la#o$la#q$la#s$la#u$la#v$la#y$la(R$la(b$la(i$la(j$la!V$la!W$la~Oy)qO|)rOP$naX$nag$nak$naz$na!e$na!f$na!h$na!l$na#g$na#h$na#i$na#j$na#k$na#l$na#m$na#n$na#o$na#q$na#s$na#u$na#v$na#y$na(R$na(b$na(i$na(j$na!V$na!W$na~OP$|aX$|ak$|az$|a!e$|a!f$|a!h$|a!l$|a#g$|a#h$|a#i$|a#j$|a#k$|a#l$|a#m$|a#n$|a#o$|a#q$|a#s$|a#u$|a#v$|a#y$|a(R$|a(b$|a!V$|a!W$|a~P%>vO#y$hq!V$hq!W$hq~P#@_O#y$iq!V$iq!W$iq~P#@_O!W8RO~O#y8SO~P!0RO!a#rO!V\'Zi!g\'Zi~O!a#rO(b\'bO!V\'Zi!g\'Zi~O!V/QO!g(oq~O!S\']i!V\']i~P#)tO!V/YO!S(pq~O!S8YO~P#)tO!S8YO~Od(Py!V(Py~P!0RO!V\'`a!X\'`a~P#)tO^%Tq!X%Tq\'k%Tq!V%Tq~P#)tOX8_O~O!V0YO!W(wq~O#X8cO!V\'ba!W\'ba~O!V4iO!W(ti~P#@_OPYXXYXkYXyYXzYX|YX!SYX!VYX!eYX!fYX!hYX!lYX#XYX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX(RYX(bYX(iYX(jYX~O!a%RX#o%RX~P&/vO!X0uO%a8gO~O\'vTO\'yUO(U8lO~O!V1QO!W(uq~O!g8oO~O!g8oO~P%QO!g8qO~O!g8rO~O#X8tO!V#ay!W#ay~O!V#ay!W#ay~P#@_O!X\'QO%a8yO~O#y#wy!V#wy!W#wy~P#@_OP$uiX$uik$uiz$ui!e$ui!f$ui!h$ui!l$ui#g$ui#h$ui#i$ui#j$ui#k$ui#l$ui#m$ui#n$ui#o$ui#q$ui#s$ui#u$ui#v$ui#y$ui(R$ui(b$ui!V$ui!W$ui~P%>vOy)qO|)rO(j)vOP%XiX%Xig%Xik%Xiz%Xi!e%Xi!f%Xi!h%Xi!l%Xi#g%Xi#h%Xi#i%Xi#j%Xi#k%Xi#l%Xi#m%Xi#n%Xi#o%Xi#q%Xi#s%Xi#u%Xi#v%Xi#y%Xi(R%Xi(b%Xi(i%Xi!V%Xi!W%Xi~Oy)qO|)rOP%ZiX%Zig%Zik%Ziz%Zi!e%Zi!f%Zi!h%Zi!l%Zi#g%Zi#h%Zi#i%Zi#j%Zi#k%Zi#l%Zi#m%Zi#n%Zi#o%Zi#q%Zi#s%Zi#u%Zi#v%Zi#y%Zi(R%Zi(b%Zi(i%Zi(j%Zi!V%Zi!W%Zi~O#y$iy!V$iy!W$iy~P#@_O#y#[y!V#[y!W#[y~P#@_O!a#rO!V\'Zq!g\'Zq~O!V/QO!g(oy~O!S\']q!V\']q~P#)tO!S9QO~P#)tO!V0YO!W(wy~O!V4iO!W(tq~O!X0uO%a9XO~O!g9[O~O!X\'QO%a9aO~OP$uqX$uqk$uqz$uq!e$uq!f$uq!h$uq!l$uq#g$uq#h$uq#i$uq#j$uq#k$uq#l$uq#m$uq#n$uq#o$uq#q$uq#s$uq#u$uq#v$uq#y$uq(R$uq(b$uq!V$uq!W$uq~P%>vOP$wqX$wqk$wqz$wq!e$wq!f$wq!h$wq!l$wq#g$wq#h$wq#i$wq#j$wq#k$wq#l$wq#m$wq#n$wq#o$wq#q$wq#s$wq#u$wq#v$wq#y$wq(R$wq(b$wq!V$wq!W$wq~P%>vOd%]!Z!V%]!Z#X%]!Z#y%]!Z~P!0RO!V\'bq!W\'bq~P#@_O!V#a!Z!W#a!Z~P#@_O#d%]!ZP%]!ZX%]!Z^%]!Zk%]!Zz%]!Z!V%]!Z!e%]!Z!f%]!Z!h%]!Z!l%]!Z#g%]!Z#h%]!Z#i%]!Z#j%]!Z#k%]!Z#l%]!Z#m%]!Z#n%]!Z#o%]!Z#q%]!Z#s%]!Z#u%]!Z#v%]!Z\'k%]!Z(R%]!Z(b%]!Z!g%]!Z!S%]!Z\'i%]!Z#X%]!Zo%]!Z!X%]!Z%a%]!Z!a%]!Z~P#)tOP%]!ZX%]!Zk%]!Zz%]!Z!e%]!Z!f%]!Z!h%]!Z!l%]!Z#g%]!Z#h%]!Z#i%]!Z#j%]!Z#k%]!Z#l%]!Z#m%]!Z#n%]!Z#o%]!Z#q%]!Z#s%]!Z#u%]!Z#v%]!Z#y%]!Z(R%]!Z(b%]!Z!V%]!Z!W%]!Z~P%>vOo(VX~P1gO\'u!iO~P!)jO!ScX!VcX#XcX~P&/vOPYXXYXkYXyYXzYX|YX!VYX!VcX!eYX!fYX!hYX!lYX#XYX#XcX#dcX#gYX#hYX#iYX#jYX#kYX#lYX#mYX#nYX#oYX#qYX#sYX#uYX#vYX#{YX(RYX(bYX(iYX(jYX~O!acX!gYX!gcX(bcX~P&E^OP9lOQ9lOa;]Ob!fOikOk9lOlkOmkOskOu9lOw9lO|WO!QkO!RkO!XXO!c9oO!hZO!k9lO!l9lO!m9lO!o9pO!q9qO!t!eO$Q!hO$UfO\'t)PO\'vTO\'yUO(RVO(a[O(n;ZO~O!V:QO!W$ka~Oi%POk$qOl$pOm$pOs%QOu%ROw:WO|$xO!X$yO!c;bO!h$uO#c:^O$Q%VO$m:YO$o:[O$r%WO\'t(gO\'vTO\'yUO\'}%OO(R$rO~O#p)WO~P&JSO!WYX!WcX~P&E^O#d9tO~O!a#rO#d9tO~O#X:UO~O#o9yO~O#X:`O!V(gX!W(gX~O#X:UO!V(eX!W(eX~O#d:aO~Od:cO~P!0RO#d:hO~O#d:iO~O!a#rO#d:jO~O!a#rO#d:aO~O#y:kO~P#@_O#d:lO~O#d:mO~O#d:nO~O#d:oO~O#d:pO~O#d:qO~O#y:rO~P!0RO#y:sO~P!0RO$U~!f!|!}#P#Q#T#b#c#n(n$m$o$r%U%`%a%b%h%j%m%n%p%r~\'oR$U(n#h!R\'m\'u#il#g#jky\'n(U\'n\'t$W$Y$W~',
  goto:
    '$%Z({PPPP(|P)PP)aP*p.rPPPP5SPP5iP;d>iP>|P>|PPP>|P@lP>|P>|P>|P@pPP@uPA`PFUPPPFYPPPPFYIXPPPI_JYPFYPLgPPPPNuFYPPPFYPFYP!#TFYP!&g!\'i!\'rP!(e!(i!(ePPPPP!+r!\'iPP!,`!-YP!/|FYFY!0R!3Z!7n!7n!;cPPP!;jFYPPPPPPPPPPP!>uP!@WPPFY!AePFYPFYFYFYFYPFY!BwPP!E}P!IPP!IT!I_!Ic!IcP!EzP!Ig!IgP!LiP!LmFYFY!Ls# t>|P>|P>|>|P##O>|>|#$x>|#\'V>|#(y>|>|#)g#+c#+c#+g#+o#+c#+wP#+cP>|#,a>|#-i>|>|5SPPP#.tPP#/^#/^P#/^P#/s#/^PP#/yP#/pP#/p#0]#/p#0w#0}5P)P#1Q)PP#1X#1X#1XP)PP)PP)PP)PPP)PP#1_#1bP#1b)PP#1fP#1iP)PP)PP)PP)PP)PP)P)PPP#1o#1u#2P#2V#2]#2c#2i#2w#2}#3T#3_#3e#3o#4O#4U#4u#5X#5_#5e#5s#6Y#7j#7x#8O#8U#8[#8b#8l#8r#8x#9S#9f#9lPPPPPPPPPP#9rPPPPPPP#:f#=mP#>|#?T#?]PPPP#Cg#F]#Lr#Lu#Lx#Mq#Mt#Mw#NO#NWPP#N^#Nb$ Z$!Z$!_$!sPP$!w$!}$#RP$#U$#Y$#]$$R$$i$$n$$q$$t$$z$$}$%R$%VR!xRmpOXr!X#`%]&d&f&g&i,],b1b1eY!rQ\'Q,}0u4pQ%ctQ%kwQ%rzQ&[!TS&x!c,uQ\'W!fS\'^!o!uS*Y$y*_Q+T%lQ+b%tQ+|&UQ,{\'PQ-V\'XQ-_\'_Q/k*aQ1P+}R:_9p$zdOPWXYZrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$^$b%]%c%p&]&`&d&f&g&i&m&u\'S\'d\'t\'v\'|(T(i(m(q)p*s+g,X,],b-R-Z-i-o.].d/u/z0X0x1Y1Z1[1^1b1e1g2W2^2r4m4w5Z5]5^5p7U7Z7h7tS#m]9m!r)R$X$j&y)e,n,q.l1v3X4k5g8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^Q*j%SQ+Y%nQ,O&XQ,V&aQ.S:VQ0O*{Q0S*}Q0_+ZQ1X,TQ2f.PQ4Y0YQ5O1QQ5|2jQ6S:WQ6u4ZR7z5}&xkOPWXYZrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$X$^$b$j%]%c%p&]&`&a&d&f&g&i&m&u&y\'S\'d\'t\'v\'|(T(i(m(q)e)p*s*{+g,X,],b,n,q-R-Z-i-o.P.].d.l/u/z0X0x1Y1Z1[1^1b1e1g1v2W2^2j2r3X4k4m4w5Z5]5^5g5p5}7U7Z7h7t8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^t!kQ!o!r!u!v&x\'P\'Q\'^\'_\'`,u,{,}-_0u4p4r$Y$pi#r#t$`$a$u$x%T%U%Y)l)u)w)x*P*V*e*f*z*}+l+o.O.Y/X/Y/[/w0l0o0w2i3a3k3s3y4Q4S4v5z6b6k7W7w8S8g8y9X9a:S:T:X:Y:Z:[:]:^:d:e:f:g:h:i:l:m:n:o:r:s;Z;c;d;g;hQ%uzQ&v!cS&|%w,xQ+Y%nS.x)r.zQ/v*nQ0_+ZQ0d+aQ1W,SQ1X,TQ4Y0YQ4c0fQ5R1SQ5S1VQ6u4ZQ6x4`Q7c5UQ8b6yR8m7`pmOXr!T!X#`%]&Z&d&f&g&i,],b1b1eR,Q&]&r^OPXYrstux!X!^!g!l#O#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$X$^$b$j%]%c%p&]&`&a&d&f&g&i&m&u\'S\'d\'v\'|(T(i(m(q)e)p*s*{+g,X,],b,n,q-R-Z-i-o.P.].d.l/u/z0X0x1Y1Z1[1^1b1e1g1v2W2^2j2r3X4k4m4w5Z5]5^5g5p5}7U7Z7h7t8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;];^[#XWZ#S#V&y\'tQ%fvQ%jwS%oz%t!U%x|}#d#e#h%Z%v\'}(X(Y(Z+e+f+h,Z,o-m-s-t-u-w1j2b2c5f5wQ&Q!RQ\'T!eQ\'V!fQ(b#oS)|$u*QS+S%k%lQ+W%nQ+w&SQ+{&US-U\'W\'XQ.R(cQ/U)}Q0W+TQ0^+ZQ0`+[Q0c+`Q0z+xS1O+|+}Q2S-VQ3b/QQ4X0YQ4]0]Q4b0eQ4}1PQ6_3cQ6t4ZQ6w4_Q8^6sR9S8_v$wi#t%T%U%Y)u)w*P*e*f.Y/X/w3a3y8S;Z;c;d!S%hw!f!q%j%k%l&w\'V\'W\'X\']\'g*X+S+T,r-U-V-^/c0W1{2S2Z3uQ*|%fQ+m%}Q+p&OQ+z&UQ.Q(bQ0y+wU0}+{+|+}Q2k.RQ4x0zS4|1O1PQ7_4}!z;_#r$`$a$u$x)l)x*V*z*}+l+o.O/Y/[0l0o0w2i3k3s4Q4S4v5z6b6k7W7w8g8y9X9a:X:Z:]:d:f:h:l:n:r;g;hg;`:S:T:Y:[:^:e:g:i:m:o:sW$|i%O*g;ZS%}!O&ZQ&O!PQ&P!QR+k%{$Z${i#r#t$`$a$u$x%T%U%Y)l)u)w)x*P*V*e*f*z*}+l+o.O.Y/X/Y/[/w0l0o0w2i3a3k3s3y4Q4S4v5z6b6k7W7w8S8g8y9X9a:S:T:X:Y:Z:[:]:^:d:e:f:g:h:i:l:m:n:o:r:s;Z;c;d;g;hT)m$r)nV*k%S:V:WU&|!c%w,xS(p#v#wQ+_%qS-z(^(_Q0p+qQ3z/tR6}4i&xkOPWXYZrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$X$^$b$j%]%c%p&]&`&a&d&f&g&i&m&u&y\'S\'d\'t\'v\'|(T(i(m(q)e)p*s*{+g,X,],b,n,q-R-Z-i-o.P.].d.l/u/z0X0x1Y1Z1[1^1b1e1g1v2W2^2j2r3X4k4m4w5Z5]5^5g5p5}7U7Z7h7t8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^$i$]c#U#a%a%b%d\'s\'y(e(l(t(u(v(w(x(y(z({(|(})O)Q)T)X)c*x+^,s-b-g-l-n.X._.c.e.f.g.v/x1q1t2U2]2q2v2w2x2y2z2{2|2}3O3P3Q3R3S3V3W3]4O4V5i5o5t6Q6R6W6X7P7n7r7{8P8Q8v9U9]9n;QT#PV#Q&ykOPWXYZrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$X$^$b$j%]%c%p&]&`&a&d&f&g&i&m&u&y\'S\'d\'t\'v\'|(T(i(m(q)e)p*s*{+g,X,],b,n,q-R-Z-i-o.P.].d.l/u/z0X0x1Y1Z1[1^1b1e1g1v2W2^2j2r3X4k4m4w5Z5]5^5g5p5}7U7Z7h7t8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^Q&z!cR1w,uv!kQ!c!o!r!u!v&x\'P\'Q\'^\'_\'`,u,{,}-_0u4p4rS*X$y*_S/c*Y*aQ/l*bQ0r+sQ3u/kR3x/nlpOXr!X#`%]&d&f&g&i,],b1b1eQ&k![Q\'h!tS(d#q9tQ+Q%iQ+u&QQ+v&RQ-S\'UQ-a\'aS.W(i:aS/y*s:jQ0U+RQ0t+tQ1i,dQ1k,eQ1s,pQ2Q-TQ2T-XS4P/z:pQ4T0VS4W0X:qQ5h1uQ5l2RQ5q2YQ6r4UQ7o5jQ7p5mQ7s5rR8s7l$d$[c#U#a%b%d\'s\'y(e(l(t(u(v(w(x(y(z({(|(})O)Q)T)X)c*x+^,s-b-g-l-n.X._.c.f.g.v/x1q1t2U2]2q2v2w2x2y2z2{2|2}3O3P3Q3R3S3V3W3]4O4V5i5o5t6Q6R6W6X7P7n7r7{8P8Q8v9U9]9n;QS(a#l\'ZU*d$z(h3US*w%a.eQ2g0OQ5y2fQ7y5|R8z7z$d$Zc#U#a%b%d\'s\'y(e(l(t(u(v(w(x(y(z({(|(})O)Q)T)X)c*x+^,s-b-g-l-n.X._.c.f.g.v/x1q1t2U2]2q2v2w2x2y2z2{2|2}3O3P3Q3R3S3V3W3]4O4V5i5o5t6Q6R6W6X7P7n7r7{8P8Q8v9U9]9n;QS(`#l\'ZS(r#w$[S*v%a.eS-{(_(aQ.h)SQ/{*wR2d-|&xkOPWXYZrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$X$^$b$j%]%c%p&]&`&a&d&f&g&i&m&u&y\'S\'d\'t\'v\'|(T(i(m(q)e)p*s*{+g,X,],b,n,q-R-Z-i-o.P.].d.l/u/z0X0x1Y1Z1[1^1b1e1g1v2W2^2j2r3X4k4m4w5Z5]5^5g5p5}7U7Z7h7t8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^S#m]9mQ&f!VQ&g!WQ&i!YQ&j!ZR1a,`Q\'R!eQ*y%fQ-Q\'TS-}(b*|Q2O-PW2h.Q.R/}0PQ5k2PU5x2e2g2kS7v5y5{S8x7x7yS9_8w8zQ9g9`R9j9hU!sQ\'Q,}T4n0u4p!O_OXZ`r!T!X#`#d%Z%]&Z&]&d&f&g&i(Z,],b-t1b1e]!mQ!o\'Q,}0u4pT#m]9m%UyOPWXYZrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$^$b%]%c%p&]&`&a&d&f&g&i&m&u\'S\'d\'t\'v\'|(T(i(m(q)p*s*{+g,X,],b-R-Z-i-o.P.].d/u/z0X0x1Y1Z1[1^1b1e1g2W2^2j2r4m4w5Z5]5^5p5}7U7Z7h7tS(p#v#wS-z(^(_!s:w$X$j&y)e,n,q.l1v3X4k5g8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^Y!qQ\'Q,}0u4pQ\']!oS\'g!r!uS\'i!v4rS-^\'^\'_Q-`\'`R2Z-_Q\'f!qS(V#c1_S-]\']\'iQ/T)|Q/a*XQ2[-`Q3g/US3p/b/lQ6^3bS6i3v3xQ8U6_R8]6lQ#sbQ\'e!qS(U#c1_S(W#i*rQ*t%[Q+O%gQ+U%mU-[\']\'f\'iQ-p(VQ/S)|Q/`*XQ/f*[Q0T+PQ0{+yS2X-]-`Q2a-xS3f/T/US3o/a/lQ3r/eQ3t/gQ4z0|Q5s2[Q6]3bQ6a3gS6e3p3xQ6j3wQ7]4{S8T6^6_Q8X6fQ8Z6iQ8j7^Q9O8UQ9P8YQ9R8]Q9Z8kQ9c9QQ:z:uQ;V;OR;W;PV!sQ\'Q,}%UaOPWXYZrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$^$b%]%c%p&]&`&a&d&f&g&i&m&u\'S\'d\'t\'v\'|(T(i(m(q)p*s*{+g,X,],b-R-Z-i-o.P.].d/u/z0X0x1Y1Z1[1^1b1e1g2W2^2j2r4m4w5Z5]5^5p5}7U7Z7h7tS#sx!g!r:t$X$j&y)e,n,q.l1v3X4k5g8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^R:z;]%UbOPWXYZrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$^$b%]%c%p&]&`&a&d&f&g&i&m&u\'S\'d\'t\'v\'|(T(i(m(q)p*s*{+g,X,],b-R-Z-i-o.P.].d/u/z0X0x1Y1Z1[1^1b1e1g2W2^2j2r4m4w5Z5]5^5p5}7U7Z7h7tQ%[j!S%gw!f!q%j%k%l&w\'V\'W\'X\']\'g*X+S+T,r-U-V-^/c0W1{2S2Z3uS%mx!gQ+P%hQ+y&UW0|+z+{+|+}U4{0}1O1PS7^4|4}Q8k7_!r:u$X$j&y)e,n,q.l1v3X4k5g8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^Q;O;[R;P;]$xeOPXYrstu!X!^!l#O#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$^$b%]%c%p&]&`&d&f&g&i&m&u\'S\'d\'v\'|(T(i(m(q)p*s*{+g,X,],b-R-Z-i-o.P.].d/u/z0X0x1Y1Z1[1^1b1e1g2W2^2j2r4m4w5Z5]5^5p5}7U7Z7h7tY#^WZ#S#V\'t!U%x|}#d#e#h%Z%v\'}(X(Y(Z+e+f+h,Z,o-m-s-t-u-w1j2b2c5f5wQ,W&a!p:v$X$j)e,n,q.l1v3X4k5g8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^R:y&yS&}!c%wR1y,x$zdOPWXYZrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$^$b%]%c%p&]&`&d&f&g&i&m&u\'S\'d\'t\'v\'|(T(i(m(q)p*s+g,X,],b-R-Z-i-o.].d/u/z0X0x1Y1Z1[1^1b1e1g2W2^2r4m4w5Z5]5^5p7U7Z7h7t!r)R$X$j&y)e,n,q.l1v3X4k5g8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^Q,V&aQ0O*{Q2f.PQ5|2jR7z5}!f$Rc#U%a\'s\'y(e(l({(|(})O)T)X+^-b-g-l-n.X._.v/x2U2]2q3S4O4V5o5t6Q7r8v9n!T9{)Q)c,s.e1q1t2v3O3P3Q3R3V3]5i6R6W6X7P7n7{8P8Q9U9];Q!b$Tc#U%a\'s\'y(e(l(})O)T)X+^-b-g-l-n.X._.v/x2U2]2q3S4O4V5o5t6Q7r8v9n!P9})Q)c,s.e1q1t2v3Q3R3V3]5i6R6W6X7P7n7{8P8Q9U9];Q!^$Xc#U%a\'s\'y(e(l)T)X+^-b-g-l-n.X._.v/x2U2]2q3S4O4V5o5t6Q7r8v9nQ3a/Oz;^)Q)c,s.e1q1t2v3V3]5i6R6W6X7P7n7{8P8Q9U9];QQ;c;eR;d;f&xkOPWXYZrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$X$^$b$j%]%c%p&]&`&a&d&f&g&i&m&u&y\'S\'d\'t\'v\'|(T(i(m(q)e)p*s*{+g,X,],b,n,q-R-Z-i-o.P.].d.l/u/z0X0x1Y1Z1[1^1b1e1g1v2W2^2j2r3X4k4m4w5Z5]5^5g5p5}7U7Z7h7t8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^S$kh$lR3Y.k\'PgOPWXYZhrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$X$^$b$j$l%]%c%p&]&`&a&d&f&g&i&m&u&y\'S\'d\'t\'v\'|(T(i(m(q)e)p*s*{+g,X,],b,n,q-R-Z-i-o.P.].d.k.l/u/z0X0x1Y1Z1[1^1b1e1g1v2W2^2j2r3X4k4m4w5Z5]5^5g5p5}7U7Z7h7t8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^T$gf$mQ$efS)[$h)`R)h$mT$ff$mT)^$h)`\'PhOPWXYZhrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$X$^$b$j$l%]%c%p&]&`&a&d&f&g&i&m&u&y\'S\'d\'t\'v\'|(T(i(m(q)e)p*s*{+g,X,],b,n,q-R-Z-i-o.P.].d.k.l/u/z0X0x1Y1Z1[1^1b1e1g1v2W2^2j2r3X4k4m4w5Z5]5^5g5p5}7U7Z7h7t8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^T$kh$lQ$nhR)g$l%UjOPWXYZrstu!X!^!l#O#S#V#`#k#q#u#x#{#|#}$O$P$Q$R$S$T$U$V$^$b%]%c%p&]&`&a&d&f&g&i&m&u\'S\'d\'t\'v\'|(T(i(m(q)p*s*{+g,X,],b-R-Z-i-o.P.].d/u/z0X0x1Y1Z1[1^1b1e1g2W2^2j2r4m4w5Z5]5^5p5}7U7Z7h7t!s;[$X$j&y)e,n,q.l1v3X4k5g8c8t9l9o9p9q9t9u9v9w9x9y9z9{9|9}:O:P:Q:U:_:`:a:c:j:k:p:q;^#alOPXZr!X!^!l#O#`#k#x$j%]&]&`&a&d&f&g&i&m&u\'S(q)e*{+g,X,],b-R.P.l/u0x1Y1Z1[1^1b1e1g2j3X4m4w5Z5]5^5}7U7Z7hv$zi#t%T%U%Y)u)w*P*e*f.Y/X/w3a3y8S;Z;c;d!z(h#r$`$a$u$x)l)x*V*z*}+l+o.O/Y/[0l0o0w2i3k3s4Q4S4v5z6b6k7W7w8g8y9X9a:X:Z:]:d:f:h:l:n:r;g;hQ*o%WQ.w)qg3U:S:T:Y:[:^:e:g:i:m:o:sv$vi#t%T%U%Y)u)w*P*e*f.Y/X/w3a3y8S;Z;c;dQ*R$wS*[$y*_Q*p%XQ/g*]!z:|#r$`$a$u$x)l)x*V*z*}+l+o.O/Y/[0l0o0w2i3k3s4Q4S4v5z6b6k7W7w8g8y9X9a:X:Z:]:d:f:h:l:n:r;g;hf:}:S:T:Y:[:^:e:g:i:m:o:sQ;R;_Q;S;`Q;T;aR;U;bv$zi#t%T%U%Y)u)w*P*e*f.Y/X/w3a3y8S;Z;c;d!z(h#r$`$a$u$x)l)x*V*z*}+l+o.O/Y/[0l0o0w2i3k3s4Q4S4v5z6b6k7W7w8g8y9X9a:X:Z:]:d:f:h:l:n:r;g;hg3U:S:T:Y:[:^:e:g:i:m:o:slnOXr!X#`%]&d&f&g&i,],b1b1eQ*U$xQ,k&pQ,l&rR3j/Y$Y${i#r#t$`$a$u$x%T%U%Y)l)u)w)x*P*V*e*f*z*}+l+o.O.Y/X/Y/[/w0l0o0w2i3a3k3s3y4Q4S4v5z6b6k7W7w8S8g8y9X9a:S:T:X:Y:Z:[:]:^:d:e:f:g:h:i:l:m:n:o:r:s;Z;c;d;g;hQ+n&OQ0n+pQ4g0mR6|4hT*^$y*_S*^$y*_T4o0u4pS/e*Z4mT3w/m7UQ+O%gQ/f*[Q0T+PQ0{+yQ4z0|Q7]4{Q8j7^R9Z8kn)u$s(j*q/W/o/p2o3h3}6[6m8}:{;X;Y!W:d(f)V){*T.V.s/O/]/|0k0m2n3i3m4f4h6O6P6c6g6o6q8W8[9b;e;f]:e3T6V7|8{8|9kp)w$s(j*q.|/W/o/p2o3h3}6[6m8}:{;X;Y!Y:f(f)V){*T.V.s/O/]/|0k0m2l2n3i3m4f4h6O6P6c6g6o6q8W8[9b;e;f_:g3T6V7|7}8{8|9kpmOXr!T!X#`%]&Z&d&f&g&i,],b1b1eQ&W!SR,X&apmOXr!T!X#`%]&Z&d&f&g&i,],b1b1eR&W!SQ+r&PR0j+kqmOXr!T!X#`%]&Z&d&f&g&i,],b1b1eQ0v+wS4u0y0zU7V4s4t4xS8f7X7YS9V8e8hQ9d9WR9i9eQ&_!TR,R&ZR5R1SS%oz%tR0`+[Q&d!UR,]&eR,c&jT1c,b1eR,g&kQ,f&kR1l,gQ\'k!wR-c\'kQrOQ#`XT%`r#`Q!zTR\'m!zQ!}UR\'o!}Q)n$rR.t)nQ#QVR\'q#QQ#TWU\'w#T\'x-jQ\'x#UR-j\'yQ,v&zR1x,vQ.Z(jR2p.ZQ.^(lS2s.^2tR2t._Q,}\'QR1|,}Y!oQ\'Q,}0u4pR\'[!oS#ZW%vU(O#Z(P-kQ(P#[R-k\'zQ,y&}R1z,yr`OXr!T!X#`%]&Z&]&d&f&g&i,],b1b1eS#dZ%ZU#n`#d-tR-t(ZQ([#fQ-q(WW-y([-q2_5uQ2_-rR5u2`Q)`$hR.m)`Q$lhR)f$lQ$_cU)U$_-f:RQ-f9nR:R)cQ/R)|W3d/R3e6`8VU3e/S/T/US6`3f3gR8V6a#m)s$s(f(j)V){*T*l*m*q.T.U.V.s.|.}/O/W/]/o/p/|0k0m2l2m2n2o3T3h3i3m3}4f4h6O6P6T6U6V6[6c6g6m6o6q7|7}8O8W8[8{8|8}9b9k:{;X;Y;e;fQ/Z*TU3l/Z3n6dQ3n/]R6d3mQ*_$yR/i*_Q*h$}R/r*hQ4R/|R6p4RQ+i%yR0i+iQ4j0pS7O4j8dR8d7PQ+t&QR0s+tQ4p0uR7S4pQ1R,OS5P1R7aR7a5RQ0Z+WW4[0Z4^6v8`Q4^0^Q6v4]R8`6wQ+]%oR0a+]Q1e,bR5a1eWqOXr#`Q&h!XQ*u%]Q,[&dQ,^&fQ,_&gQ,a&iQ1`,]S1c,b1eR5`1bQ%_oQ&l!]Q&o!_Q&q!`Q&s!aQ\'c!qQ+Q%iQ+d%uQ+j%zQ,Q&_Q,i&nW-Y\']\'e\'f\'iQ-a\'aQ/h*^Q0U+RS1U,R,UQ1m,hQ1n,kQ1o,lQ2T-XW2V-[-]-`-bQ4T0VQ4a0dQ4e0kQ4y0{Q5T1WQ5_1aU5n2U2X2[Q5q2YQ6r4UQ6z4cQ6{4fQ7R4oQ7[4zQ7b5SS7q5o5sQ7s5rQ8a6xQ8i7]Q8n7cQ8u7rQ9T8bQ9Y8jQ9^8vR9f9ZQ%iwQ\'U!fQ\'a!qU+R%j%k%lQ,p&wU-T\'V\'W\'XS-X\']\'gQ/_*XS0V+S+TQ1u,rS2R-U-VQ2Y-^Q3q/cQ4U0WQ5j1{Q5m2SQ5r2ZR6h3uS$ti;ZR*i%OU$}i%O;ZR/q*gQ$siS(f#r*}Q(j#tS)V$`$aQ){$uQ*T$xQ*l%TQ*m%UQ*q%YQ.T:XQ.U:ZQ.V:]Q.s)lQ.|)uQ.})wQ/O)xQ/W*PQ/]*VQ/o*eQ/p*fh/|*z.O0w2i4v5z7W7w8g8y9X9aQ0k+lQ0m+oQ2l:dQ2m:fQ2n:hQ2o.YS3T:S:TQ3h/XQ3i/YQ3m/[Q3}/wQ4f0lQ4h0oQ6O:lQ6P:nQ6T:YQ6U:[Q6V:^Q6[3aQ6c3kQ6g3sQ6m3yQ6o4QQ6q4SQ7|:iQ7}:eQ8O:gQ8W6bQ8[6kQ8{:mQ8|:oQ8}8SQ9b:rQ9k:sQ:{;ZQ;X;cQ;Y;dQ;e;gR;f;hloOXr!X#`%]&d&f&g&i,],b1b1eQ!dPS#bZ#kQ&n!^U\'Y!l4m7UQ\'p#OQ(s#xQ)d$jS,U&]&`Q,Y&aQ,h&mQ,m&uQ-P\'SQ.a(qQ.q)eQ0P*{Q0g+gQ1],XQ2P-RQ2g.PQ3[.lQ3{/uQ4t0xQ5V1YQ5W1ZQ5Y1[Q5[1^Q5c1gQ5y2jQ6Y3XQ7Y4wQ7g5ZQ7i5]Q7j5^Q7y5}Q8h7ZR8p7h#UcOPXZr!X!^!l#`#k#x%]&]&`&a&d&f&g&i&m&u\'S(q*{+g,X,],b-R.P/u0x1Y1Z1[1^1b1e1g2j4m4w5Z5]5^5}7U7Z7hQ#UWQ#aYQ%asQ%btQ%duS\'s#S\'vQ\'y#VQ(e#qQ(l#uQ(t#{Q(u#|Q(v#}Q(w$OQ(x$PQ(y$QQ(z$RQ({$SQ(|$TQ(}$UQ)O$VQ)Q$XQ)T$^Q)X$bW)c$j)e.l3XQ*x%cQ+^%pS,s&y1vQ-b\'dS-g\'t-iQ-l\'|Q-n(TQ.X(iQ._(mQ.c9lQ.e9oQ.f9pQ.g9qQ.v)pQ/x*sQ1q,nQ1t,qQ2U-ZQ2]-oQ2q.]Q2v9tQ2w9uQ2x9vQ2y9wQ2z9xQ2{9yQ2|9zQ2}9{Q3O9|Q3P9}Q3Q:OQ3R:PQ3S.dQ3V:UQ3W:_Q3]:QQ4O/zQ4V0XQ5i:`Q5o2WQ5t2^Q6Q2rQ6R:aQ6W:cQ6X:jQ7P4kQ7n5gQ7r5pQ7{:kQ8P:pQ8Q:qQ8v7tQ9U8cQ9]8tQ9n#OR;Q;^R#WWR&{!cY!qQ\'Q,}0u4pS&w!c,uQ\']!oS\'g!r!uS\'i!v4rS,r&x\'PS-^\'^\'_Q-`\'`Q1{,{R2Z-_R(k#tR(n#uQ!dQT,|\'Q,}]!nQ!o\'Q,}0u4pQ#l]R\'Z9mT#gZ%ZS#fZ%ZU%y|},ZU(W#d#e#hS-r(X(YQ-v(ZQ0h+hQ2`-sU2a-t-u-wS5v2b2cR7u5w`#YW#S#V%v\'t\'}+e-mt#cZ|}#d#e#h%Z(X(Y(Z+h-s-t-u-w2b2c5wQ1_,ZQ1r,oQ5e1jQ7m5fT:x&y+fT#]W%vS#[W%vS\'u#S\'}S\'z#V+eS,t&y+fT-h\'t-mT\'O!c%wQ$hfR)j$mT)_$h)`R3Z.kT*O$u*QR*W$xQ/}*zQ2e.OQ4s0wQ5{2iQ7X4vQ7x5zQ8e7WQ8w7wQ9W8gQ9`8yQ9e9XR9h9alpOXr!X#`%]&d&f&g&i,],b1b1eQ&^!TR,Q&ZV%z|},ZR0q+qR,P&XQ%szR+c%tR+X%nT&b!U&eT&c!U&eT1d,b1e',
  nodeNames:
    '\u26A0 ArithOp ArithOp LineComment BlockComment Script ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > TypeParamList TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . ?. PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewExpression new TypeArgList CompareOp < ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies in const CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXStartTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast ArrowFunction TypeParamList SequenceExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem',
  maxTerm: 364,
  context: trackNewline,
  nodeProps: [
    [
      'group',
      -26,
      6,
      14,
      16,
      62,
      199,
      203,
      206,
      207,
      209,
      212,
      215,
      225,
      227,
      233,
      235,
      237,
      239,
      242,
      248,
      254,
      256,
      258,
      260,
      262,
      264,
      265,
      'Statement',
      -32,
      10,
      11,
      25,
      28,
      29,
      35,
      45,
      48,
      49,
      51,
      56,
      64,
      72,
      76,
      78,
      80,
      81,
      103,
      104,
      113,
      114,
      131,
      134,
      136,
      137,
      138,
      139,
      141,
      142,
      162,
      163,
      165,
      'Expression',
      -23,
      24,
      26,
      30,
      34,
      36,
      38,
      166,
      168,
      170,
      171,
      173,
      174,
      175,
      177,
      178,
      179,
      181,
      182,
      183,
      193,
      195,
      197,
      198,
      'Type',
      -3,
      84,
      96,
      102,
      'ClassItem',
    ],
    ['openedBy', 31, 'InterpolationStart', 50, '[', 54, '{', 69, '(', 143, 'JSXStartTag', 155, 'JSXStartTag JSXStartCloseTag',],
    ['closedBy', 33, 'InterpolationEnd', 44, ']', 55, '}', 70, ')', 144, 'JSXSelfCloseEndTag JSXEndTag', 160, 'JSXEndTag',],
  ],
  propSources: [jsHighlight,],
  skippedNodes: [0, 3, 4, 268,],
  repeatNodeCount: 33,
  tokenData:
    '$>y(CSR!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tu>PuvBavwDxwxGgxyMvyz! Qz{!![{|!%O|}!&]}!O!%O!O!P!\'g!P!Q!1w!Q!R#0t!R![#3T![!]#@T!]!^#Aa!^!_#Bk!_!`#GS!`!a#In!a!b#N{!b!c$$z!c!}>P!}#O$&U#O#P$\'`#P#Q$,w#Q#R$.R#R#S>P#S#T$/`#T#o$0j#o#p$4z#p#q$5p#q#r$7Q#r#s$8^#s$f%Z$f$g+g$g#BY>P#BY#BZ$9h#BZ$IS>P$IS$I_$9h$I_$I|>P$I|$I}$<s$I}$JO$<s$JO$JT>P$JT$JU$9h$JU$KV>P$KV$KW$9h$KW&FU>P&FU&FV$9h&FV;\'S>P;\'S;=`BZ<%l?HT>P?HT?HU$9h?HUO>P(n%d_$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z&j&hT$d&jO!^&c!_#o&c#p;\'S&c;\'S;=`&w<%lO&c&j&zP;=`<%l&c\'|\'U]$d&j\'z!bOY&}YZ&cZw&}wx&cx!^&}!^!_\'}!_#O&}#O#P&c#P#o&}#o#p\'}#p;\'S&};\'S;=`(l<%lO&}!b(SU\'z!bOY\'}Zw\'}x#O\'}#P;\'S\'};\'S;=`(f<%lO\'}!b(iP;=`<%l\'}\'|(oP;=`<%l&}\'[(y]$d&j\'wpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;\'S(r;\'S;=`*a<%lO(rp)wU\'wpOY)rZr)rs#O)r#P;\'S)r;\'S;=`*Z<%lO)rp*^P;=`<%l)r\'[*dP;=`<%l(r#S*nX\'wp\'z!bOY*gZr*grs\'}sw*gwx)rx#O*g#P;\'S*g;\'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z(CS+rq$d&j\'wp\'z!b\'m(;dOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;\'S%Z;\'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z(CS.ST\'x#S$d&j\'n(;dO!^&c!_#o&c#p;\'S&c;\'S;=`&w<%lO&c(CS.n_$d&j\'wp\'z!b\'n(;dOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%#`/x`$d&j!l$Ip\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%#S1V`#q$Id$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%#S2d_#q$Id$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$2b3l_\'v$(n$d&j\'z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;\'S4k;\'S;=`:X<%lO4k*r4r_$d&j\'z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;\'S4k;\'S;=`:X<%lO4k)`5vX$d&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;\'S5q;\'S;=`7h<%lO5q)`6jT$_#t$d&jO!^&c!_#o&c#p;\'S&c;\'S;=`&w<%lO&c#t6|TOr6yrs7]s;\'S6y;\'S;=`7b<%lO6y#t7bO$_#t#t7eP;=`<%l6y)`7kP;=`<%l5q*r7w]$_#t$d&j\'z!bOY&}YZ&cZw&}wx&cx!^&}!^!_\'}!_#O&}#O#P&c#P#o&}#o#p\'}#p;\'S&};\'S;=`(l<%lO&}%W8uZ\'z!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;\'S8p;\'S;=`:R<%lO8p%W9oU$_#t\'z!bOY\'}Zw\'}x#O\'}#P;\'S\'};\'S;=`(f<%lO\'}%W:UP;=`<%l8p*r:[P;=`<%l4k#%|:hg$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}st%Ztu<Puw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}<P!}#O%Z#O#P&c#P#R%Z#R#S<P#S#T%Z#T#o<P#o#p*g#p$g%Z$g;\'S<P;\'S;=`=y<%lO<P#%|<[i$d&j(a!L^\'wp\'z!bOY%ZYZ&cZr%Zrs&}st%Ztu<Puw%Zwx(rx!Q%Z!Q![<P![!^%Z!^!_*g!_!c%Z!c!}<P!}#O%Z#O#P&c#P#R%Z#R#S<P#S#T%Z#T#o<P#o#p*g#p$g%Z$g;\'S<P;\'S;=`=y<%lO<P#%|=|P;=`<%l<P(CS>`k$d&j\'wp\'z!b(U!LY\'t&;d$W#tOY%ZYZ&cZr%Zrs&}st%Ztu>Puw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![>P![!^%Z!^!_*g!_!c%Z!c!}>P!}#O%Z#O#P&c#P#R%Z#R#S>P#S#T%Z#T#o>P#o#p*g#p$g%Z$g;\'S>P;\'S;=`BZ<%lO>P+d@`k$d&j\'wp\'z!b$W#tOY%ZYZ&cZr%Zrs&}st%Ztu@Tuw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![@T![!^%Z!^!_*g!_!c%Z!c!}@T!}#O%Z#O#P&c#P#R%Z#R#S@T#S#T%Z#T#o@T#o#p*g#p$g%Z$g;\'S@T;\'S;=`BT<%lO@T+dBWP;=`<%l@T(CSB^P;=`<%l>P%#SBl`$d&j\'wp\'z!b#i$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%#SCy_$d&j#{$Id\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%DfETa(j%<v$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sv%ZvwFYwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%#SFe`$d&j#u$Id\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$2bGp_\'y$)`$d&j\'wpOYHoYZIuZrHorsIuswHowxKVx!^Ho!^!_LX!_#OHo#O#PIu#P#oHo#o#pLX#p;\'SHo;\'S;=`Mp<%lOHo*QHv_$d&j\'wpOYHoYZIuZrHorsIuswHowxKVx!^Ho!^!_LX!_#OHo#O#PIu#P#oHo#o#pLX#p;\'SHo;\'S;=`Mp<%lOHo)`IzX$d&jOwIuwx6cx!^Iu!^!_Jg!_#oIu#o#pJg#p;\'SIu;\'S;=`KP<%lOIu#tJjTOwJgwx7]x;\'SJg;\'S;=`Jy<%lOJg#tJ|P;=`<%lJg)`KSP;=`<%lIu*QK`]$_#t$d&j\'wpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;\'S(r;\'S;=`*a<%lO(r$fL^Z\'wpOYLXYZJgZrLXrsJgswLXwxMPx#OLX#O#PJg#P;\'SLX;\'S;=`Mj<%lOLX$fMWU$_#t\'wpOY)rZr)rs#O)r#P;\'S)r;\'S;=`*Z<%lO)r$fMmP;=`<%lLX*QMsP;=`<%lHo(*QNR_!h(!b$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z!\'l! ]_!gM|$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z\'+h!!ib$d&j\'wp\'z!b\'u#)d#j$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!#q{!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%#S!#|`$d&j\'wp\'z!b#g$IdOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z&-O!%Z`$d&j\'wp\'z!bk&%`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z&C[!&h_!V&;l$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z(CS!\'rc$d&j\'wp\'z!by\'<nOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!(}!P!Q%Z!Q![!+g![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z!\'d!)Wa$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!*]!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z!\'d!*h_!UMt$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$/l!+rg$d&j\'wp\'z!bl$\'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!+g![!^%Z!^!_*g!_!g%Z!g!h!-Z!h#O%Z#O#P&c#P#R%Z#R#S!+g#S#X%Z#X#Y!-Z#Y#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$/l!-dg$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!.{|}%Z}!O!.{!O!Q%Z!Q![!0a![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!0a#S#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$/l!/Uc$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!0a![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!0a#S#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$/l!0lc$d&j\'wp\'z!bl$\'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!0a![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!0a#S#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z(CS!2Sf$d&j\'wp\'z!b#h$IdOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}xz!3hz{#$s{!P!3h!P!Q#&Y!Q!^!3h!^!_!Mh!_!`#-x!`!a#/_!a!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;\'S!3h;\'S;=`#$m<%lO!3h(r!3sb$d&j\'wp\'z!b!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;\'S!3h;\'S;=`#$m<%lO!3h(Q!5U`$d&j\'z!b!RSOY!4{YZ&cZw!4{wx!6Wx!P!4{!P!Q!=o!Q!^!4{!^!_!?g!_!}!4{!}#O!Bn#O#P!<w#P#o!4{#o#p!?g#p;\'S!4{;\'S;=`!Cw<%lO!4{&n!6_^$d&j!RSOY!6WYZ&cZ!P!6W!P!Q!7Z!Q!^!6W!^!_!8g!_!}!6W!}#O!;U#O#P!<w#P#o!6W#o#p!8g#p;\'S!6W;\'S;=`!=i<%lO!6W&n!7ba$d&j!RSO!^&c!_#Z&c#Z#[!7Z#[#]&c#]#^!7Z#^#a&c#a#b!7Z#b#g&c#g#h!7Z#h#i&c#i#j!7Z#j#m&c#m#n!7Z#n#o&c#p;\'S&c;\'S;=`&w<%lO&cS!8lX!RSOY!8gZ!P!8g!P!Q!9X!Q!}!8g!}#O!9p#O#P!:o#P;\'S!8g;\'S;=`!;O<%lO!8gS!9^U!RS#Z#[!9X#]#^!9X#a#b!9X#g#h!9X#i#j!9X#m#n!9XS!9sVOY!9pZ#O!9p#O#P!:Y#P#Q!8g#Q;\'S!9p;\'S;=`!:i<%lO!9pS!:]SOY!9pZ;\'S!9p;\'S;=`!:i<%lO!9pS!:lP;=`<%l!9pS!:rSOY!8gZ;\'S!8g;\'S;=`!;O<%lO!8gS!;RP;=`<%l!8g&n!;Z[$d&jOY!;UYZ&cZ!^!;U!^!_!9p!_#O!;U#O#P!<P#P#Q!6W#Q#o!;U#o#p!9p#p;\'S!;U;\'S;=`!<q<%lO!;U&n!<UX$d&jOY!;UYZ&cZ!^!;U!^!_!9p!_#o!;U#o#p!9p#p;\'S!;U;\'S;=`!<q<%lO!;U&n!<tP;=`<%l!;U&n!<|X$d&jOY!6WYZ&cZ!^!6W!^!_!8g!_#o!6W#o#p!8g#p;\'S!6W;\'S;=`!=i<%lO!6W&n!=lP;=`<%l!6W(Q!=xi$d&j\'z!b!RSOY&}YZ&cZw&}wx&cx!^&}!^!_\'}!_#O&}#O#P&c#P#Z&}#Z#[!=o#[#]&}#]#^!=o#^#a&}#a#b!=o#b#g&}#g#h!=o#h#i&}#i#j!=o#j#m&}#m#n!=o#n#o&}#o#p\'}#p;\'S&};\'S;=`(l<%lO&}!f!?nZ\'z!b!RSOY!?gZw!?gwx!8gx!P!?g!P!Q!@a!Q!}!?g!}#O!Ap#O#P!:o#P;\'S!?g;\'S;=`!Bh<%lO!?g!f!@hb\'z!b!RSOY\'}Zw\'}x#O\'}#P#Z\'}#Z#[!@a#[#]\'}#]#^!@a#^#a\'}#a#b!@a#b#g\'}#g#h!@a#h#i\'}#i#j!@a#j#m\'}#m#n!@a#n;\'S\'};\'S;=`(f<%lO\'}!f!AuX\'z!bOY!ApZw!Apwx!9px#O!Ap#O#P!:Y#P#Q!?g#Q;\'S!Ap;\'S;=`!Bb<%lO!Ap!f!BeP;=`<%l!Ap!f!BkP;=`<%l!?g(Q!Bu^$d&j\'z!bOY!BnYZ&cZw!Bnwx!;Ux!^!Bn!^!_!Ap!_#O!Bn#O#P!<P#P#Q!4{#Q#o!Bn#o#p!Ap#p;\'S!Bn;\'S;=`!Cq<%lO!Bn(Q!CtP;=`<%l!Bn(Q!CzP;=`<%l!4{\'`!DW`$d&j\'wp!RSOY!C}YZ&cZr!C}rs!6Ws!P!C}!P!Q!EY!Q!^!C}!^!_!GQ!_!}!C}!}#O!JX#O#P!<w#P#o!C}#o#p!GQ#p;\'S!C};\'S;=`!Kb<%lO!C}\'`!Eci$d&j\'wp!RSOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#Z(r#Z#[!EY#[#](r#]#^!EY#^#a(r#a#b!EY#b#g(r#g#h!EY#h#i(r#i#j!EY#j#m(r#m#n!EY#n#o(r#o#p)r#p;\'S(r;\'S;=`*a<%lO(rt!GXZ\'wp!RSOY!GQZr!GQrs!8gs!P!GQ!P!Q!Gz!Q!}!GQ!}#O!IZ#O#P!:o#P;\'S!GQ;\'S;=`!JR<%lO!GQt!HRb\'wp!RSOY)rZr)rs#O)r#P#Z)r#Z#[!Gz#[#])r#]#^!Gz#^#a)r#a#b!Gz#b#g)r#g#h!Gz#h#i)r#i#j!Gz#j#m)r#m#n!Gz#n;\'S)r;\'S;=`*Z<%lO)rt!I`X\'wpOY!IZZr!IZrs!9ps#O!IZ#O#P!:Y#P#Q!GQ#Q;\'S!IZ;\'S;=`!I{<%lO!IZt!JOP;=`<%l!IZt!JUP;=`<%l!GQ\'`!J`^$d&j\'wpOY!JXYZ&cZr!JXrs!;Us!^!JX!^!_!IZ!_#O!JX#O#P!<P#P#Q!C}#Q#o!JX#o#p!IZ#p;\'S!JX;\'S;=`!K[<%lO!JX\'`!K_P;=`<%l!JX\'`!KeP;=`<%l!C}(r!Ksk$d&j\'wp\'z!b!RSOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#Z%Z#Z#[!Kh#[#]%Z#]#^!Kh#^#a%Z#a#b!Kh#b#g%Z#g#h!Kh#h#i%Z#i#j!Kh#j#m%Z#m#n!Kh#n#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z#W!Mq]\'wp\'z!b!RSOY!MhZr!Mhrs!?gsw!Mhwx!GQx!P!Mh!P!Q!Nj!Q!}!Mh!}#O#!U#O#P!:o#P;\'S!Mh;\'S;=`##U<%lO!Mh#W!Nse\'wp\'z!b!RSOY*gZr*grs\'}sw*gwx)rx#O*g#P#Z*g#Z#[!Nj#[#]*g#]#^!Nj#^#a*g#a#b!Nj#b#g*g#g#h!Nj#h#i*g#i#j!Nj#j#m*g#m#n!Nj#n;\'S*g;\'S;=`+Z<%lO*g#W#!]Z\'wp\'z!bOY#!UZr#!Urs!Apsw#!Uwx!IZx#O#!U#O#P!:Y#P#Q!Mh#Q;\'S#!U;\'S;=`##O<%lO#!U#W##RP;=`<%l#!U#W##XP;=`<%l!Mh(r##e`$d&j\'wp\'z!bOY##[YZ&cZr##[rs!Bnsw##[wx!JXx!^##[!^!_#!U!_#O##[#O#P!<P#P#Q!3h#Q#o##[#o#p#!U#p;\'S##[;\'S;=`#$g<%lO##[(r#$jP;=`<%l##[(r#$pP;=`<%l!3h(CS#%Qb$d&j\'wp\'z!b\'o(;d!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;\'S!3h;\'S;=`#$m<%lO!3h(CS#&e_$d&j\'wp\'z!bR(;dOY#&YYZ&cZr#&Yrs#\'dsw#&Ywx#*tx!^#&Y!^!_#,s!_#O#&Y#O#P#(f#P#o#&Y#o#p#,s#p;\'S#&Y;\'S;=`#-r<%lO#&Y(Bb#\'m]$d&j\'z!bR(;dOY#\'dYZ&cZw#\'dwx#(fx!^#\'d!^!_#)w!_#O#\'d#O#P#(f#P#o#\'d#o#p#)w#p;\'S#\'d;\'S;=`#*n<%lO#\'d(AO#(mX$d&jR(;dOY#(fYZ&cZ!^#(f!^!_#)Y!_#o#(f#o#p#)Y#p;\'S#(f;\'S;=`#)q<%lO#(f(;d#)_SR(;dOY#)YZ;\'S#)Y;\'S;=`#)k<%lO#)Y(;d#)nP;=`<%l#)Y(AO#)tP;=`<%l#(f(<v#*OW\'z!bR(;dOY#)wZw#)wwx#)Yx#O#)w#O#P#)Y#P;\'S#)w;\'S;=`#*h<%lO#)w(<v#*kP;=`<%l#)w(Bb#*qP;=`<%l#\'d(Ap#*}]$d&j\'wpR(;dOY#*tYZ&cZr#*trs#(fs!^#*t!^!_#+v!_#O#*t#O#P#(f#P#o#*t#o#p#+v#p;\'S#*t;\'S;=`#,m<%lO#*t(<U#+}W\'wpR(;dOY#+vZr#+vrs#)Ys#O#+v#O#P#)Y#P;\'S#+v;\'S;=`#,g<%lO#+v(<U#,jP;=`<%l#+v(Ap#,pP;=`<%l#*t(=h#,|Y\'wp\'z!bR(;dOY#,sZr#,srs#)wsw#,swx#+vx#O#,s#O#P#)Y#P;\'S#,s;\'S;=`#-l<%lO#,s(=h#-oP;=`<%l#,s(CS#-uP;=`<%l#&Y%#W#.Vb$d&j#{$Id\'wp\'z!b!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;\'S!3h;\'S;=`#$m<%lO!3h+h#/lb$T#t$d&j\'wp\'z!b!RSOY!3hYZ&cZr!3hrs!4{sw!3hwx!C}x!P!3h!P!Q!Kh!Q!^!3h!^!_!Mh!_!}!3h!}#O##[#O#P!<w#P#o!3h#o#p!Mh#p;\'S!3h;\'S;=`#$m<%lO!3h$/l#1Pp$d&j\'wp\'z!bl$\'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!+g!P!Q%Z!Q![#3T![!^%Z!^!_*g!_!g%Z!g!h!-Z!h#O%Z#O#P&c#P#R%Z#R#S#3T#S#U%Z#U#V#6_#V#X%Z#X#Y!-Z#Y#b%Z#b#c#5T#c#d#9g#d#l%Z#l#m#<i#m#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$/l#3`k$d&j\'wp\'z!bl$\'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!+g!P!Q%Z!Q![#3T![!^%Z!^!_*g!_!g%Z!g!h!-Z!h#O%Z#O#P&c#P#R%Z#R#S#3T#S#X%Z#X#Y!-Z#Y#b%Z#b#c#5T#c#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$/l#5`_$d&j\'wp\'z!bl$\'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$/l#6hd$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#7v!R!S#7v!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#7v#S#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$/l#8Rf$d&j\'wp\'z!bl$\'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#7v!R!S#7v!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#7v#S#b%Z#b#c#5T#c#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$/l#9pc$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#:{!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#:{#S#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$/l#;We$d&j\'wp\'z!bl$\'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#:{!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#:{#S#b%Z#b#c#5T#c#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$/l#<rg$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#>Z![!^%Z!^!_*g!_!c%Z!c!i#>Z!i#O%Z#O#P&c#P#R%Z#R#S#>Z#S#T%Z#T#Z#>Z#Z#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z$/l#>fi$d&j\'wp\'z!bl$\'|OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#>Z![!^%Z!^!_*g!_!c%Z!c!i#>Z!i#O%Z#O#P&c#P#R%Z#R#S#>Z#S#T%Z#T#Z#>Z#Z#b%Z#b#c#5T#c#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%Gh#@b_!a$b$d&j#y%<f\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z)[#Al_^l$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z(CS#Bz^\'}!*v!e\'.r\'wp\'z!b$U)d(nSOY*gZr*grs\'}sw*gwx)rx!P*g!P!Q#Cv!Q!^*g!^!_#Dl!_!`#F^!`#O*g#P;\'S*g;\'S;=`+Z<%lO*g(n#DPX$f&j\'wp\'z!bOY*gZr*grs\'}sw*gwx)rx#O*g#P;\'S*g;\'S;=`+Z<%lO*g$Kh#DuZ#k$Id\'wp\'z!bOY*gZr*grs\'}sw*gwx)rx!_*g!_!`#Eh!`#O*g#P;\'S*g;\'S;=`+Z<%lO*g$Kh#EqX#{$Id\'wp\'z!bOY*gZr*grs\'}sw*gwx)rx#O*g#P;\'S*g;\'S;=`+Z<%lO*g$Kh#FgX#l$Id\'wp\'z!bOY*gZr*grs\'}sw*gwx)rx#O*g#P;\'S*g;\'S;=`+Z<%lO*g%Gh#G_a#X%?x$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a#Hd!a#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%#W#Ho_#d$Ih$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%Gh#I}adBf#l$Id$a#|$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`#KS!`!a#L^!a#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%#S#K__#l$Id$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%#S#Lia#k$Id$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`!a#Mn!a#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%#S#My`#k$Id$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z\'+h$ Wc(b$Ip$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P$!c!P!^%Z!^!_*g!_!a%Z!a!b$#m!b#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z\'+`$!n_z\'#p$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%#S$#x`$d&j#v$Id\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z#&^$%V_!x!Ln$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z(@^$&a_|(8n$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z(n$\'eZ$d&jO!^$(W!^!_$(n!_#i$(W#i#j$(s#j#l$(W#l#m$*f#m#o$(W#o#p$(n#p;\'S$(W;\'S;=`$,q<%lO$(W(n$(_T[#S$d&jO!^&c!_#o&c#p;\'S&c;\'S;=`&w<%lO&c#S$(sO[#S(n$(x[$d&jO!Q&c!Q![$)n![!^&c!_!c&c!c!i$)n!i#T&c#T#Z$)n#Z#o&c#o#p$,U#p;\'S&c;\'S;=`&w<%lO&c(n$)sZ$d&jO!Q&c!Q![$*f![!^&c!_!c&c!c!i$*f!i#T&c#T#Z$*f#Z#o&c#p;\'S&c;\'S;=`&w<%lO&c(n$*kZ$d&jO!Q&c!Q![$+^![!^&c!_!c&c!c!i$+^!i#T&c#T#Z$+^#Z#o&c#p;\'S&c;\'S;=`&w<%lO&c(n$+cZ$d&jO!Q&c!Q![$(W![!^&c!_!c&c!c!i$(W!i#T&c#T#Z$(W#Z#o&c#p;\'S&c;\'S;=`&w<%lO&c#S$,XR!Q![$,b!c!i$,b#T#Z$,b#S$,eS!Q![$,b!c!i$,b#T#Z$,b#q#r$(n(n$,tP;=`<%l$(W!\'l$-S_!SM|$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z%#S$.^`#s$Id$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z&,v$/k_$d&j\'wp\'z!b(R&%WOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z(CS$0yk$d&j\'wp\'z!b(U!LY\'t&;d$Y#tOY%ZYZ&cZr%Zrs&}st%Ztu$0juw%Zwx(rx}%Z}!O$2n!O!Q%Z!Q![$0j![!^%Z!^!_*g!_!c%Z!c!}$0j!}#O%Z#O#P&c#P#R%Z#R#S$0j#S#T%Z#T#o$0j#o#p*g#p$g%Z$g;\'S$0j;\'S;=`$4t<%lO$0j+d$2yk$d&j\'wp\'z!b$Y#tOY%ZYZ&cZr%Zrs&}st%Ztu$2nuw%Zwx(rx}%Z}!O$2n!O!Q%Z!Q![$2n![!^%Z!^!_*g!_!c%Z!c!}$2n!}#O%Z#O#P&c#P#R%Z#R#S$2n#S#T%Z#T#o$2n#o#p*g#p$g%Z$g;\'S$2n;\'S;=`$4n<%lO$2n+d$4qP;=`<%l$2n(CS$4wP;=`<%l$0j!5p$5TX!X!3l\'wp\'z!bOY*gZr*grs\'}sw*gwx)rx#O*g#P;\'S*g;\'S;=`+Z<%lO*g%Df$5{a(i%<v$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Cn!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$#m#q;\'S%Z;\'S;=`+a<%lO%Z%#`$7__!W$I`o`$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z(r$8i_!mS$d&j\'wp\'z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;\'S%Z;\'S;=`+a<%lO%Z(CS$9y|$d&j\'wp\'z!b\'m(;d(U!LY\'t&;d$W#tOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%Ztu>Puw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![>P![!^%Z!^!_*g!_!c%Z!c!}>P!}#O%Z#O#P&c#P#R%Z#R#S>P#S#T%Z#T#o>P#o#p*g#p$f%Z$f$g+g$g#BY>P#BY#BZ$9h#BZ$IS>P$IS$I_$9h$I_$JT>P$JT$JU$9h$JU$KV>P$KV$KW$9h$KW&FU>P&FU&FV$9h&FV;\'S>P;\'S;=`BZ<%l?HT>P?HT?HU$9h?HUO>P(CS$=Uk$d&j\'wp\'z!b\'n(;d(U!LY\'t&;d$W#tOY%ZYZ&cZr%Zrs&}st%Ztu>Puw%Zwx(rx}%Z}!O@T!O!Q%Z!Q![>P![!^%Z!^!_*g!_!c%Z!c!}>P!}#O%Z#O#P&c#P#R%Z#R#S>P#S#T%Z#T#o>P#o#p*g#p$g%Z$g;\'S>P;\'S;=`BZ<%lO>P',
  tokenizers: [
    noSemicolon,
    incdecToken,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    insertSemicolon,
    new LocalTokenGroup(
      '$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOq~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;\'S!P;\'S;=`#v<%lO!P~!UO!O~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(T~~',
      141,
      326,
    ),
    new LocalTokenGroup('j~RQYZXz{^~^O\'q~~aP!P!Qd~iO\'r~~', 25, 308,),
  ],
  topRules: { Script: [0, 5,], SingleExpression: [1, 266,], SingleClassItem: [2, 267,], },
  dialects: { jsx: 12686, ts: 12688, },
  dynamicPrecedences: { 76: 1, 78: 1, 163: 1, 191: 1, },
  specialized: [{ term: 312, get: (value,) => spec_identifier[value] || -1, }, { term: 328, get: (value,) => spec_word[value] || -1, }, {
    term: 67,
    get: (value,) => spec_LessThan[value] || -1,
  },],
  tokenPrec: 12712,
},);

// https :https://framerusercontent.com/modules/YrJiUSsP9WZPvnJAGTTV/qYWVNl0YKyBbL8cTq65j/codemirror_lang_javascript.js
var snippets = [
  /* @__PURE__ */ snippetCompletion('function ${name}(${params}) {\n	${}\n}', {
    label: 'function',
    detail: 'definition',
    type: 'keyword',
  },),
  /* @__PURE__ */ snippetCompletion('for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}', {
    label: 'for',
    detail: 'loop',
    type: 'keyword',
  },),
  /* @__PURE__ */ snippetCompletion('for (let ${name} of ${collection}) {\n	${}\n}', {
    label: 'for',
    detail: 'of loop',
    type: 'keyword',
  },),
  /* @__PURE__ */ snippetCompletion('do {\n	${}\n} while (${})', { label: 'do', detail: 'loop', type: 'keyword', },),
  /* @__PURE__ */ snippetCompletion('while (${}) {\n	${}\n}', { label: 'while', detail: 'loop', type: 'keyword', },),
  /* @__PURE__ */ snippetCompletion('try {\n	${}\n} catch (${error}) {\n	${}\n}', {
    label: 'try',
    detail: '/ catch block',
    type: 'keyword',
  },),
  /* @__PURE__ */ snippetCompletion('if (${}) {\n	${}\n}', { label: 'if', detail: 'block', type: 'keyword', },),
  /* @__PURE__ */ snippetCompletion('if (${}) {\n	${}\n} else {\n	${}\n}', { label: 'if', detail: '/ else block', type: 'keyword', },),
  /* @__PURE__ */ snippetCompletion('class ${name} {\n	constructor(${params}) {\n		${}\n	}\n}', {
    label: 'class',
    detail: 'definition',
    type: 'keyword',
  },),
  /* @__PURE__ */ snippetCompletion('import {${names}} from "${module}"\n${}', { label: 'import', detail: 'named', type: 'keyword', },),
  /* @__PURE__ */ snippetCompletion('import ${name} from "${module}"\n${}', { label: 'import', detail: 'default', type: 'keyword', },),
];
var cache = /* @__PURE__ */ new NodeWeakMap();
var ScopeNodes = /* @__PURE__ */ new Set([
  'Script',
  'Block',
  'FunctionExpression',
  'FunctionDeclaration',
  'ArrowFunction',
  'MethodDeclaration',
  'ForStatement',
],);
function defID(type,) {
  return (node, def,) => {
    let id = node.node.getChild('VariableDefinition',);
    if (id) def(id, type,);
    return true;
  };
}
var functionContext = ['FunctionDeclaration',];
var gatherCompletions = {
  FunctionDeclaration: /* @__PURE__ */ defID('function',),
  ClassDeclaration: /* @__PURE__ */ defID('class',),
  ClassExpression: () => true,
  EnumDeclaration: /* @__PURE__ */ defID('constant',),
  TypeAliasDeclaration: /* @__PURE__ */ defID('type',),
  NamespaceDeclaration: /* @__PURE__ */ defID('namespace',),
  VariableDefinition(node, def,) {
    if (!node.matchContext(functionContext,)) def(node, 'variable',);
  },
  TypeDefinition(node, def,) {
    def(node, 'type',);
  },
  __proto__: null,
};
function getScope(doc, node,) {
  let cached = cache.get(node,);
  if (cached) return cached;
  let completions = [], top = true;
  function def(node2, type,) {
    let name = doc.sliceString(node2.from, node2.to,);
    completions.push({ label: name, type, },);
  }
  node.cursor(IterMode.IncludeAnonymous,).iterate((node2,) => {
    if (top) {
      top = false;
    } else if (node2.name) {
      let gather = gatherCompletions[node2.name];
      if (gather && gather(node2, def,) || ScopeNodes.has(node2.name,)) return false;
    } else if (node2.to - node2.from > 8192) {
      for (let c of getScope(doc, node2.node,)) completions.push(c,);
      return false;
    }
  },);
  cache.set(node, completions,);
  return completions;
}
var Identifier = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/;
var dontComplete = [
  'TemplateString',
  'String',
  'RegExp',
  'LineComment',
  'BlockComment',
  'VariableDefinition',
  'TypeDefinition',
  'Label',
  'PropertyDefinition',
  'PropertyName',
  'PrivatePropertyDefinition',
  'PrivatePropertyName',
  '.',
  '?.',
];
function localCompletionSource(context,) {
  let inner = syntaxTree(context.state,).resolveInner(context.pos, -1,);
  if (dontComplete.indexOf(inner.name,) > -1) return null;
  let isWord = inner.name == 'VariableName' ||
    inner.to - inner.from < 20 && Identifier.test(context.state.sliceDoc(inner.from, inner.to,),);
  if (!isWord && !context.explicit) return null;
  let options = [];
  for (let pos = inner; pos; pos = pos.parent) {
    if (ScopeNodes.has(pos.name,)) options = options.concat(getScope(context.state.doc, pos,),);
  }
  return { options, from: isWord ? inner.from : context.pos, validFor: Identifier, };
}
var javascriptLanguage = /* @__PURE__ */ LRLanguage.define({
  name: 'javascript',
  parser: /* @__PURE__ */ parser.configure({
    props: [
      /* @__PURE__ */ indentNodeProp.add({
        IfStatement: /* @__PURE__ */ continuedIndent({ except: /^\s*({|else\b)/, },),
        TryStatement: /* @__PURE__ */ continuedIndent({ except: /^\s*({|catch\b|finally\b)/, },),
        LabeledStatement: flatIndent,
        SwitchBody: (context,) => {
          let after = context.textAfter, closed = /^\s*\}/.test(after,), isCase = /^\s*(case|default)\b/.test(after,);
          return context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit;
        },
        Block: /* @__PURE__ */ delimitedIndent({ closing: '}', },),
        ArrowFunction: (cx,) => cx.baseIndent + cx.unit,
        'TemplateString BlockComment': () => null,
        'Statement Property': /* @__PURE__ */ continuedIndent({ except: /^{/, },),
        JSXElement(context,) {
          let closed = /^\s*<\//.test(context.textAfter,);
          return context.lineIndent(context.node.from,) + (closed ? 0 : context.unit);
        },
        JSXEscape(context,) {
          let closed = /\s*\}/.test(context.textAfter,);
          return context.lineIndent(context.node.from,) + (closed ? 0 : context.unit);
        },
        'JSXOpenTag JSXSelfClosingTag'(context,) {
          return context.column(context.node.from,) + context.unit;
        },
      },),
      /* @__PURE__ */ foldNodeProp.add({
        'Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType': foldInside,
        BlockComment(tree,) {
          return { from: tree.from + 2, to: tree.to - 2, };
        },
      },),
    ],
  },),
  languageData: {
    closeBrackets: { brackets: ['(', '[', '{', '\'', '"', '`',], },
    commentTokens: { line: '//', block: { open: '/*', close: '*/', }, },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: '$',
  },
},);
var jsxSublanguage = {
  test: (node,) => /^JSX/.test(node.name,),
  facet: /* @__PURE__ */ defineLanguageFacet({ commentTokens: { block: { open: '{/*', close: '*/}', }, }, },),
};
var typescriptLanguage = /* @__PURE__ */ javascriptLanguage.configure({ dialect: 'ts', }, 'typescript',);
var jsxLanguage = /* @__PURE__ */ javascriptLanguage.configure({
  dialect: 'jsx',
  props: [/* @__PURE__ */ sublanguageProp.add((n,) => n.isTop ? [jsxSublanguage,] : void 0),],
},);
var tsxLanguage = /* @__PURE__ */ javascriptLanguage.configure({
  dialect: 'jsx ts',
  props: [/* @__PURE__ */ sublanguageProp.add((n,) => n.isTop ? [jsxSublanguage,] : void 0),],
}, 'typescript',);
var keywords =
  /* @__PURE__ */ 'break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield'
    .split(' ',).map((kw,) => ({ label: kw, type: 'keyword', }));
function javascript(config = {},) {
  let lang = config.jsx ? config.typescript ? tsxLanguage : jsxLanguage : config.typescript ? typescriptLanguage : javascriptLanguage;
  return new LanguageSupport(lang, [
    javascriptLanguage.data.of({ autocomplete: ifNotIn(dontComplete, completeFromList(snippets.concat(keywords,),),), },),
    javascriptLanguage.data.of({ autocomplete: localCompletionSource, },),
    config.jsx ? autoCloseTags : [],
  ],);
}
function findOpenTag(node,) {
  for (;;) {
    if (node.name == 'JSXOpenTag' || node.name == 'JSXSelfClosingTag' || node.name == 'JSXFragmentTag') return node;
    if (node.name == 'JSXEscape' || !node.parent) return null;
    node = node.parent;
  }
}
function elementName(doc, tree, max = doc.length,) {
  for (let ch = tree === null || tree === void 0 ? void 0 : tree.firstChild; ch; ch = ch.nextSibling) {
    if (ch.name == 'JSXIdentifier' || ch.name == 'JSXBuiltin' || ch.name == 'JSXNamespacedName' || ch.name == 'JSXMemberExpression') {
      return doc.sliceString(ch.from, Math.min(ch.to, max,),);
    }
  }
  return '';
}
function isEndTag(node,) {
  return node && (node.name == 'JSXEndTag' || node.name == 'JSXSelfCloseEndTag');
}
var android = typeof navigator == 'object' && /* @__PURE__ */ /Android\b/.test(navigator.userAgent,);
var autoCloseTags = /* @__PURE__ */ EditorView.inputHandler.of((view, from, to, text,) => {
  if (
    (android ? view.composing : view.compositionStarted) || view.state.readOnly || from != to || text != '>' && text != '/' ||
    !javascriptLanguage.isActiveAt(view.state, from, -1,)
  ) return false;
  let { state, } = view;
  let changes = state.changeByRange((range,) => {
    var _a;
    let { head, } = range, around = syntaxTree(state,).resolveInner(head, -1,), name;
    if (around.name == 'JSXStartTag') around = around.parent;
    if (around.name == 'JSXAttributeValue' && around.to > head);
    else if (text == '>' && around.name == 'JSXFragmentTag') {
      return { range: EditorSelection.cursor(head + 1,), changes: { from: head, insert: `></>`, }, };
    } else if (text == '/' && around.name == 'JSXFragmentTag') {
      let empty = around.parent, base = empty === null || empty === void 0 ? void 0 : empty.parent;
      if (
        empty.from == head - 1 && ((_a = base.lastChild) === null || _a === void 0 ? void 0 : _a.name) != 'JSXEndTag' &&
        (name = elementName(state.doc, base === null || base === void 0 ? void 0 : base.firstChild, head,))
      ) {
        let insert = `/${name}>`;
        return { range: EditorSelection.cursor(head + insert.length,), changes: { from: head, insert, }, };
      }
    } else if (text == '>') {
      let openTag = findOpenTag(around,);
      if (
        openTag && !isEndTag(openTag.lastChild,) && state.sliceDoc(head, head + 2,) != '</' &&
        (name = elementName(state.doc, openTag, head,))
      ) return { range: EditorSelection.cursor(head + 1,), changes: { from: head, insert: `></${name}>`, }, };
    }
    return { range, };
  },);
  if (changes.changes.empty) return false;
  view.dispatch(changes, { userEvent: 'input.type', scrollIntoView: true, },);
  return true;
},);

// https :https://framerusercontent.com/modules/GrkjcC7Ol5LkBvrp44De/VLPQBO2akjkDhtOMowLI/lezer_html.js
var scriptText = 54;
var StartCloseScriptTag = 1;
var styleText = 55;
var StartCloseStyleTag = 2;
var textareaText = 56;
var StartCloseTextareaTag = 3;
var EndTag = 4;
var SelfClosingEndTag = 5;
var StartTag = 6;
var StartScriptTag = 7;
var StartStyleTag = 8;
var StartTextareaTag = 9;
var StartSelfClosingTag = 10;
var StartCloseTag = 11;
var NoMatchStartCloseTag = 12;
var MismatchedStartCloseTag = 13;
var missingCloseTag = 57;
var IncompleteCloseTag = 14;
var commentContent$1 = 58;
var Element = 20;
var TagName = 22;
var Attribute = 23;
var AttributeName = 24;
var AttributeValue = 26;
var UnquotedAttributeValue = 27;
var ScriptText = 28;
var StyleText = 31;
var TextareaText = 34;
var OpenTag = 36;
var CloseTag = 37;
var Dialect_noMatch = 0;
var Dialect_selfClosing = 1;
var selfClosers = {
  area: true,
  base: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true,
  menuitem: true,
};
var implicitlyClosed = {
  dd: true,
  li: true,
  optgroup: true,
  option: true,
  p: true,
  rp: true,
  rt: true,
  tbody: true,
  td: true,
  tfoot: true,
  th: true,
  tr: true,
};
var closeOnOpen = {
  dd: { dd: true, dt: true, },
  dt: { dd: true, dt: true, },
  li: { li: true, },
  option: { option: true, optgroup: true, },
  optgroup: { optgroup: true, },
  p: {
    address: true,
    article: true,
    aside: true,
    blockquote: true,
    dir: true,
    div: true,
    dl: true,
    fieldset: true,
    footer: true,
    form: true,
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
    header: true,
    hgroup: true,
    hr: true,
    menu: true,
    nav: true,
    ol: true,
    p: true,
    pre: true,
    section: true,
    table: true,
    ul: true,
  },
  rp: { rp: true, rt: true, },
  rt: { rp: true, rt: true, },
  tbody: { tbody: true, tfoot: true, },
  td: { td: true, th: true, },
  tfoot: { tbody: true, },
  th: { td: true, th: true, },
  thead: { tbody: true, tfoot: true, },
  tr: { tr: true, },
};
function nameChar(ch,) {
  return ch == 45 || ch == 46 || ch == 58 || ch >= 65 && ch <= 90 || ch == 95 || ch >= 97 && ch <= 122 || ch >= 161;
}
function isSpace(ch,) {
  return ch == 9 || ch == 10 || ch == 13 || ch == 32;
}
var cachedName = null;
var cachedInput = null;
var cachedPos = 0;
function tagNameAfter(input, offset,) {
  let pos = input.pos + offset;
  if (cachedPos == pos && cachedInput == input) return cachedName;
  let next = input.peek(offset,);
  while (isSpace(next,)) next = input.peek(++offset,);
  let name = '';
  for (;;) {
    if (!nameChar(next,)) break;
    name += String.fromCharCode(next,);
    next = input.peek(++offset,);
  }
  cachedInput = input;
  cachedPos = pos;
  return cachedName = name ? name.toLowerCase() : next == question || next == bang ? void 0 : null;
}
var lessThan = 60;
var greaterThan = 62;
var slash2 = 47;
var question = 63;
var bang = 33;
var dash = 45;
function ElementContext(name, parent,) {
  this.name = name;
  this.parent = parent;
  this.hash = parent ? parent.hash : 0;
  for (let i = 0; i < name.length; i++) this.hash += (this.hash << 4) + name.charCodeAt(i,) + (name.charCodeAt(i,) << 8);
}
var startTagTerms = [StartTag, StartSelfClosingTag, StartScriptTag, StartStyleTag, StartTextareaTag,];
var elementContext = new ContextTracker({
  start: null,
  shift(context, term, stack, input,) {
    return startTagTerms.indexOf(term,) > -1 ? new ElementContext(tagNameAfter(input, 1,) || '', context,) : context;
  },
  reduce(context, term,) {
    return term == Element && context ? context.parent : context;
  },
  reuse(context, node, stack, input,) {
    let type = node.type.id;
    return type == StartTag || type == OpenTag ? new ElementContext(tagNameAfter(input, 1,) || '', context,) : context;
  },
  hash(context,) {
    return context ? context.hash : 0;
  },
  strict: false,
},);
var tagStart = new ExternalTokenizer((input, stack,) => {
  if (input.next != lessThan) {
    if (input.next < 0 && stack.context) input.acceptToken(missingCloseTag,);
    return;
  }
  input.advance();
  let close = input.next == slash2;
  if (close) input.advance();
  let name = tagNameAfter(input, 0,);
  if (name === void 0) return;
  if (!name) return input.acceptToken(close ? IncompleteCloseTag : StartTag,);
  let parent = stack.context ? stack.context.name : null;
  if (close) {
    if (name == parent) return input.acceptToken(StartCloseTag,);
    if (parent && implicitlyClosed[parent]) return input.acceptToken(missingCloseTag, -2,);
    if (stack.dialectEnabled(Dialect_noMatch,)) return input.acceptToken(NoMatchStartCloseTag,);
    for (let cx = stack.context; cx; cx = cx.parent) if (cx.name == name) return;
    input.acceptToken(MismatchedStartCloseTag,);
  } else {
    if (name == 'script') return input.acceptToken(StartScriptTag,);
    if (name == 'style') return input.acceptToken(StartStyleTag,);
    if (name == 'textarea') return input.acceptToken(StartTextareaTag,);
    if (selfClosers.hasOwnProperty(name,)) return input.acceptToken(StartSelfClosingTag,);
    if (parent && closeOnOpen[parent] && closeOnOpen[parent][name]) input.acceptToken(missingCloseTag, -1,);
    else input.acceptToken(StartTag,);
  }
}, { contextual: true, },);
var commentContent = new ExternalTokenizer((input,) => {
  for (let dashes = 0, i = 0;; i++) {
    if (input.next < 0) {
      if (i) input.acceptToken(commentContent$1,);
      break;
    }
    if (input.next == dash) {
      dashes++;
    } else if (input.next == greaterThan && dashes >= 2) {
      if (i > 3) input.acceptToken(commentContent$1, -2,);
      break;
    } else {
      dashes = 0;
    }
    input.advance();
  }
},);
function inForeignElement(context,) {
  for (; context; context = context.parent) if (context.name == 'svg' || context.name == 'math') return true;
  return false;
}
var endTag = new ExternalTokenizer((input, stack,) => {
  if (input.next == slash2 && input.peek(1,) == greaterThan) {
    let selfClosing = stack.dialectEnabled(Dialect_selfClosing,) || inForeignElement(stack.context,);
    input.acceptToken(selfClosing ? SelfClosingEndTag : EndTag, 2,);
  } else if (input.next == greaterThan) {
    input.acceptToken(EndTag, 1,);
  }
},);
function contentTokenizer(tag, textToken, endToken,) {
  let lastState = 2 + tag.length;
  return new ExternalTokenizer((input,) => {
    for (let state = 0, matchedLen = 0, i = 0;; i++) {
      if (input.next < 0) {
        if (i) input.acceptToken(textToken,);
        break;
      }
      if (
        state == 0 && input.next == lessThan || state == 1 && input.next == slash2 ||
        state >= 2 && state < lastState && input.next == tag.charCodeAt(state - 2,)
      ) {
        state++;
        matchedLen++;
      } else if ((state == 2 || state == lastState) && isSpace(input.next,)) {
        matchedLen++;
      } else if (state == lastState && input.next == greaterThan) {
        if (i > matchedLen) input.acceptToken(textToken, -matchedLen,);
        else input.acceptToken(endToken, -(matchedLen - 2),);
        break;
      } else if ((input.next == 10 || input.next == 13) && i) {
        input.acceptToken(textToken, 1,);
        break;
      } else {
        state = matchedLen = 0;
      }
      input.advance();
    }
  },);
}
var scriptTokens = contentTokenizer('script', scriptText, StartCloseScriptTag,);
var styleTokens = contentTokenizer('style', styleText, StartCloseStyleTag,);
var textareaTokens = contentTokenizer('textarea', textareaText, StartCloseTextareaTag,);
var htmlHighlighting = styleTags({
  'Text RawText': tags.content,
  'StartTag StartCloseTag SelfClosingEndTag EndTag': tags.angleBracket,
  TagName: tags.tagName,
  'MismatchedCloseTag/TagName': [tags.tagName, tags.invalid,],
  AttributeName: tags.attributeName,
  'AttributeValue UnquotedAttributeValue': tags.attributeValue,
  Is: tags.definitionOperator,
  'EntityReference CharacterReference': tags.character,
  Comment: tags.blockComment,
  ProcessingInst: tags.processingInstruction,
  DoctypeDecl: tags.documentMeta,
},);
var parser2 = LRParser.deserialize({
  version: 14,
  states:
    ',xOVO!rOOO!WQ#tO\'#CqO!]Q#tO\'#CzO!bQ#tO\'#C}O!gQ#tO\'#DQO!lQ#tO\'#DSO!qOaO\'#CpO!|ObO\'#CpO#XOdO\'#CpO$eO!rO\'#CpOOO`\'#Cp\'#CpO$lO$fO\'#DTO$tQ#tO\'#DVO$yQ#tO\'#DWOOO`\'#Dk\'#DkOOO`\'#DY\'#DYQVO!rOOO%OQ&rO,59]O%WQ&rO,59fO%`Q&rO,59iO%hQ&rO,59lO%sQ&rO,59nOOOa\'#D^\'#D^O%{OaO\'#CxO&WOaO,59[OOOb\'#D_\'#D_O&`ObO\'#C{O&kObO,59[OOOd\'#D`\'#D`O&sOdO\'#DOO\'OOdO,59[OOO`\'#Da\'#DaO\'WO!rO,59[O\'_Q#tO\'#DROOO`,59[,59[OOOp\'#Db\'#DbO\'dO$fO,59oOOO`,59o,59oO\'lQ#|O,59qO\'qQ#|O,59rOOO`-E7W-E7WO\'vQ&rO\'#CsOOQW\'#DZ\'#DZO(UQ&rO1G.wOOOa1G.w1G.wO(^Q&rO1G/QOOOb1G/Q1G/QO(fQ&rO1G/TOOOd1G/T1G/TO(nQ&rO1G/WOOO`1G/W1G/WOOO`1G/Y1G/YO(yQ&rO1G/YOOOa-E7[-E7[O)RQ#tO\'#CyOOO`1G.v1G.vOOOb-E7]-E7]O)WQ#tO\'#C|OOOd-E7^-E7^O)]Q#tO\'#DPOOO`-E7_-E7_O)bQ#|O,59mOOOp-E7`-E7`OOO`1G/Z1G/ZOOO`1G/]1G/]OOO`1G/^1G/^O)gQ,UO,59_OOQW-E7X-E7XOOOa7+$c7+$cOOOb7+$l7+$lOOOd7+$o7+$oOOO`7+$r7+$rOOO`7+$t7+$tO)rQ#|O,59eO)wQ#|O,59hO)|Q#|O,59kOOO`1G/X1G/XO*RO7[O\'#CvO*dOMhO\'#CvOOQW1G.y1G.yOOO`1G/P1G/POOO`1G/S1G/SOOO`1G/V1G/VOOOO\'#D[\'#D[O*uO7[O,59bOOQW,59b,59bOOOO\'#D]\'#D]O+WOMhO,59bOOOO-E7Y-E7YOOQW1G.|1G.|OOOO-E7Z-E7Z',
  stateData:
    '+s~O!^OS~OUSOVPOWQOXROYTO[]O][O^^O`^Oa^Ob^Oc^Ox^O{_O!dZO~OfaO~OfbO~OfcO~OfdO~OfeO~O!WfOPlP!ZlP~O!XiOQoP!ZoP~O!YlORrP!ZrP~OUSOVPOWQOXROYTOZqO[]O][O^^O`^Oa^Ob^Oc^Ox^O!dZO~O!ZrO~P#dO![sO!euO~OfvO~OfwO~OS|OhyO~OS!OOhyO~OS!QOhyO~OS!SOT!TOhyO~OS!TOhyO~O!WfOPlX!ZlX~OP!WO!Z!XO~O!XiOQoX!ZoX~OQ!ZO!Z!XO~O!YlORrX!ZrX~OR!]O!Z!XO~O!Z!XO~P#dOf!_O~O![sO!e!aO~OS!bO~OS!cO~Oi!dOSgXhgXTgX~OS!fOhyO~OS!gOhyO~OS!hOhyO~OS!iOT!jOhyO~OS!jOhyO~Of!kO~Of!lO~Of!mO~OS!nO~Ok!qO!`!oO!b!pO~OS!rO~OS!sO~OS!tO~Oa!uOb!uOc!uO!`!wO!a!uO~Oa!xOb!xOc!xO!b!wO!c!xO~Oa!uOb!uOc!uO!`!{O!a!uO~Oa!xOb!xOc!xO!b!{O!c!xO~OT~bac!dx{!d~',
  goto:
    '%p!`PPPPPPPPPPPPPPPPPPPP!a!gP!mPP!yP!|#P#S#Y#]#`#f#i#l#r#x!aP!a!aP$O$U$l$r$x%O%U%[%bPPPPPPPP%hX^OX`pXUOX`pezabcde{}!P!R!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ}bQ!PcQ!RdQ!UeZ!e{}!P!R!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp',
  nodeNames:
    '\u26A0 StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl',
  maxTerm: 67,
  context: elementContext,
  nodeProps: [
    ['closedBy', -10, 1, 2, 3, 7, 8, 9, 10, 11, 12, 13, 'EndTag', 6, 'EndTag SelfClosingEndTag', -4, 21, 30, 33, 36, 'CloseTag',],
    ['openedBy', 4, 'StartTag StartCloseTag', 5, 'StartTag', -4, 29, 32, 35, 37, 'OpenTag',],
    ['group', -9, 14, 17, 18, 19, 20, 39, 40, 41, 42, 'Entity', 16, 'Entity TextContent', -3, 28, 31, 34, 'TextContent Entity',],
  ],
  propSources: [htmlHighlighting,],
  skippedNodes: [0,],
  repeatNodeCount: 9,
  tokenData:
    '#%g!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs4ysv-_vw5iwxJ^x}-_}!OKP!O!P-_!P!Q$q!Q![-_![!]!!O!]!^-_!^!_!&W!_!`#$o!`!a&X!a!c-_!c!}!!O!}#R-_#R#S!!O#S#T3V#T#o!!O#o#s-_#s$f$q$f%W-_%W%o!!O%o%p-_%p&a!!O&a&b-_&b1p!!O1p4U-_4U4d!!O4d4e-_4e$IS!!O$IS$I`-_$I`$Ib!!O$Ib$Kh-_$Kh%#t!!O%#t&/x-_&/x&Et!!O&Et&FV-_&FV;\'S!!O;\'S;:j!&Q;:j;=`4s<%l?&r-_?&r?Ah!!O?Ah?BY$q?BY?Mn!!O?MnO$q!Z$|c`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;\'S$q;\'S;=`+z<%lO$q!R&bX`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;\'S&X;\'S;=`*y<%lO&Xq\'UV`P!cpOv&}wx\'kx!^&}!^!_(V!_;\'S&};\'S;=`(n<%lO&}P\'pT`POv\'kw!^\'k!_;\'S\'k;\'S;=`(P<%lO\'kP(SP;=`<%l\'kp([S!cpOv(Vx;\'S(V;\'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({W`P!a`Or(trs\'ksv(tw!^(t!^!_)e!_;\'S(t;\'S;=`*P<%lO(t`)jT!a`Or)esv)ew;\'S)e;\'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!a`!cpOr*Vrs(Vsv*Vwx)ex;\'S*V;\'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYkWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;\'S+P;\'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]``P!a`!cp!^^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;\'S&X;\'S;=`*y<%lO&X!_-ljhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_1n!_!a&X!a#S-_#S#T3V#T#s-_#s$f$q$f;\'S-_;\'S;=`4s<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/echSkWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!^!_0p!a#S/^#S#T0p#T#s/^#s$f+P$f;\'S/^;\'S;=`1h<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0uXhSqr0psw0px!P0p!Q!_0p!a#s0p$f;\'S0p;\'S;=`1b<%l?Ah0p?BY?Mn0pS1eP;=`<%l0p[1kP;=`<%l/^!U1wbhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!U3SP;=`<%l1n!V3bchS`P!a`!cpOq&Xqr3Vrs&}sv3Vvw0pwx(tx!P3V!P!Q&X!Q!^3V!^!_1n!_!a&X!a#s3V#s$f&X$f;\'S3V;\'S;=`4m<%l?Ah3V?Ah?BY&X?BY?Mn3V?MnO&X!V4pP;=`<%l3V!_4vP;=`<%l-_!Z5SV!`h`P!cpOv&}wx\'kx!^&}!^!_(V!_;\'S&};\'S;=`(n<%lO&}!_5rjhSkWc!ROX7dXZ8qZ[7d[^8q^p7dqr:crs8qst@Ttw:cwx8qx!P:c!P!Q7d!Q!]:c!]!^/^!^!_=p!_!a8q!a#S:c#S#T=p#T#s:c#s$f7d$f;\'S:c;\'S;=`?}<%l?Ah:c?Ah?BY7d?BY?Mn:c?MnO7d!Z7ibkWOX7dXZ8qZ[7d[^8q^p7dqr7drs8qst+Ptw7dwx8qx!]7d!]!^9f!^!a8q!a#S7d#S#T8q#T;\'S7d;\'S;=`:]<%lO7d!R8tVOp8qqs8qt!]8q!]!^9Z!^;\'S8q;\'S;=`9`<%lO8q!R9`Oa!R!R9cP;=`<%l8q!Z9mYkWa!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;\'S+P;\'S;=`+t<%lO+P!Z:`P;=`<%l7d!_:jjhSkWOX7dXZ8qZ[7d[^8q^p7dqr:crs8qst/^tw:cwx8qx!P:c!P!Q7d!Q!]:c!]!^<[!^!_=p!_!a8q!a#S:c#S#T=p#T#s:c#s$f7d$f;\'S:c;\'S;=`?}<%l?Ah:c?Ah?BY7d?BY?Mn:c?MnO7d!_<echSkWa!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!^!_0p!a#S/^#S#T0p#T#s/^#s$f+P$f;\'S/^;\'S;=`1h<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V=udhSOp8qqr=prs8qst0ptw=pwx8qx!P=p!P!Q8q!Q!]=p!]!^?T!^!_=p!_!a8q!a#s=p#s$f8q$f;\'S=p;\'S;=`?w<%l?Ah=p?Ah?BY8q?BY?Mn=p?MnO8q!V?[XhSa!Rqr0psw0px!P0p!Q!_0p!a#s0p$f;\'S0p;\'S;=`1b<%l?Ah0p?BY?Mn0p!V?zP;=`<%l=p!_@QP;=`<%l:c!_@[ihSkWOXAyXZCTZ[Ay[^CT^pAyqrDrrsCTswDrwxCTx!PDr!P!QAy!Q!]Dr!]!^/^!^!_G|!_!aCT!a#SDr#S#TG|#T#sDr#s$fAy$f;\'SDr;\'S;=`JW<%l?AhDr?Ah?BYAy?BY?MnDr?MnOAy!ZBOakWOXAyXZCTZ[Ay[^CT^pAyqrAyrsCTswAywxCTx!]Ay!]!^Cu!^!aCT!a#SAy#S#TCT#T;\'SAy;\'S;=`Dl<%lOAy!RCWUOpCTq!]CT!]!^Cj!^;\'SCT;\'S;=`Co<%lOCT!RCoOb!R!RCrP;=`<%lCT!ZC|YkWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;\'S+P;\'S;=`+t<%lO+P!ZDoP;=`<%lAy!_DyihSkWOXAyXZCTZ[Ay[^CT^pAyqrDrrsCTswDrwxCTx!PDr!P!QAy!Q!]Dr!]!^Fh!^!_G|!_!aCT!a#SDr#S#TG|#T#sDr#s$fAy$f;\'SDr;\'S;=`JW<%l?AhDr?Ah?BYAy?BY?MnDr?MnOAy!_FqchSkWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!^!_0p!a#S/^#S#T0p#T#s/^#s$f+P$f;\'S/^;\'S;=`1h<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VHRchSOpCTqrG|rsCTswG|wxCTx!PG|!P!QCT!Q!]G|!]!^I^!^!_G|!_!aCT!a#sG|#s$fCT$f;\'SG|;\'S;=`JQ<%l?AhG|?Ah?BYCT?BY?MnG|?MnOCT!VIeXhSb!Rqr0psw0px!P0p!Q!_0p!a#s0p$f;\'S0p;\'S;=`1b<%l?Ah0p?BY?Mn0p!VJTP;=`<%lG|!_JZP;=`<%lDr!ZJgW!bx`P!a`Or(trs\'ksv(tw!^(t!^!_)e!_;\'S(t;\'S;=`*P<%lO(t!aK^lhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMU!O!P-_!P!Q$q!Q!^-_!^!_1n!_!a&X!a#S-_#S#T3V#T#s-_#s$f$q$f;\'S-_;\'S;=`4s<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aMckhS`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_1n!_!`&X!`!a! W!a#S-_#S#T3V#T#s-_#s$f$q$f;\'S-_;\'S;=`4s<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!T! cX`P!a`!cp!eQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;\'S&X;\'S;=`*y<%lO&X!a!!_!ZhSfQ`PkW!a`!cpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!O!!O!O!P!!O!P!Q$q!Q![!!O![!]!!O!]!^-_!^!_1n!_!a&X!a!c-_!c!}!!O!}#R-_#R#S!!O#S#T3V#T#o!!O#o#s-_#s$f$q$f$}-_$}%O!!O%O%W-_%W%o!!O%o%p-_%p&a!!O&a&b-_&b1p!!O1p4U!!O4U4d!!O4d4e-_4e$IS!!O$IS$I`-_$I`$Ib!!O$Ib$Je-_$Je$Jg!!O$Jg$Kh-_$Kh%#t!!O%#t&/x-_&/x&Et!!O&Et&FV-_&FV;\'S!!O;\'S;:j!&Q;:j;=`4s<%l?&r-_?&r?Ah!!O?Ah?BY$q?BY?Mn!!O?MnO$q!a!&TP;=`<%l!!O!V!&achS!a`!cpOq*Vqr!\'lrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!b!Ey!b#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!\'uhhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex}1n}!O!)a!O!P1n!P!Q*V!Q!_1n!_!a*V!a!f1n!f!g!,]!g#W1n#W#X!<y#X#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!)jdhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex}1n}!O!*x!O!P1n!P!Q*V!Q!_1n!_!a*V!a#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!+TbhS!a`!cp!dPOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!,fdhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!q1n!q!r!-t!r#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!-}dhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!e1n!e!f!/]!f#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!/fdhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!v1n!v!w!0t!w#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!0}dhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!{1n!{!|!2]!|#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!2fdhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!r1n!r!s!3t!s#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!3}dhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a!g1n!g!h!5]!h#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!5fchS!a`!cpOq!6qqr!5]rs!7hsv!5]vw!;`wx!9[x!P!5]!P!Q!6q!Q!_!5]!_!`!6q!`!a!:j!a#s!5]#s$f!6q$f;\'S!5];\'S;=`!<s<%l?Ah!5]?Ah?BY!6q?BY?Mn!5]?MnO!6q!R!6xY!a`!cpOr!6qrs!7hsv!6qvw!8Swx!9[x!`!6q!`!a!:j!a;\'S!6q;\'S;=`!;Y<%lO!6qq!7mV!cpOv!7hvx!8Sx!`!7h!`!a!8q!a;\'S!7h;\'S;=`!9U<%lO!7hP!8VTO!`!8S!`!a!8f!a;\'S!8S;\'S;=`!8k<%lO!8SP!8kO{PP!8nP;=`<%l!8Sq!8xS!cp{POv(Vx;\'S(V;\'S;=`(h<%lO(Vq!9XP;=`<%l!7ha!9aX!a`Or!9[rs!8Ssv!9[vw!8Sw!`!9[!`!a!9|!a;\'S!9[;\'S;=`!:d<%lO!9[a!:TT!a`{POr)esv)ew;\'S)e;\'S;=`)y<%lO)ea!:gP;=`<%l!9[!R!:sV!a`!cp{POr*Vrs(Vsv*Vwx)ex;\'S*V;\'S;=`*s<%lO*V!R!;]P;=`<%l!6qT!;ebhSOq!8Sqr!;`rs!8Ssw!;`wx!8Sx!P!;`!P!Q!8S!Q!_!;`!_!`!8S!`!a!8f!a#s!;`#s$f!8S$f;\'S!;`;\'S;=`!<m<%l?Ah!;`?Ah?BY!8S?BY?Mn!;`?MnO!8ST!<pP;=`<%l!;`!V!<vP;=`<%l!5]!V!=SdhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#c1n#c#d!>b#d#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!>kdhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#V1n#V#W!?y#W#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!@SdhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#h1n#h#i!Ab#i#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!AkdhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#m1n#m#n!By#n#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!CSdhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#d1n#d#e!Db#e#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!DkdhS!a`!cpOq*Vqr1nrs(Vsv1nvw0pwx)ex!P1n!P!Q*V!Q!_1n!_!a*V!a#X1n#X#Y!5]#Y#s1n#s$f*V$f;\'S1n;\'S;=`3P<%l?Ah1n?Ah?BY*V?BY?Mn1n?MnO*V!V!FSchS!a`!cpOq!G_qr!Eyrs!HUsv!Eyvw!Ncwx!Jvx!P!Ey!P!Q!G_!Q!_!Ey!_!a!G_!a!b##T!b#s!Ey#s$f!G_$f;\'S!Ey;\'S;=`#$i<%l?Ah!Ey?Ah?BY!G_?BY?Mn!Ey?MnO!G_!R!GfY!a`!cpOr!G_rs!HUsv!G_vw!Hpwx!Jvx!a!G_!a!b!Lv!b;\'S!G_;\'S;=`!N]<%lO!G_q!HZV!cpOv!HUvx!Hpx!a!HU!a!b!Iq!b;\'S!HU;\'S;=`!Jp<%lO!HUP!HsTO!a!Hp!a!b!IS!b;\'S!Hp;\'S;=`!Ik<%lO!HpP!IVTO!`!Hp!`!a!If!a;\'S!Hp;\'S;=`!Ik<%lO!HpP!IkOxPP!InP;=`<%l!Hpq!IvV!cpOv!HUvx!Hpx!`!HU!`!a!J]!a;\'S!HU;\'S;=`!Jp<%lO!HUq!JdS!cpxPOv(Vx;\'S(V;\'S;=`(h<%lO(Vq!JsP;=`<%l!HUa!J{X!a`Or!Jvrs!Hpsv!Jvvw!Hpw!a!Jv!a!b!Kh!b;\'S!Jv;\'S;=`!Lp<%lO!Jva!KmX!a`Or!Jvrs!Hpsv!Jvvw!Hpw!`!Jv!`!a!LY!a;\'S!Jv;\'S;=`!Lp<%lO!Jva!LaT!a`xPOr)esv)ew;\'S)e;\'S;=`)y<%lO)ea!LsP;=`<%l!Jv!R!L}Y!a`!cpOr!G_rs!HUsv!G_vw!Hpwx!Jvx!`!G_!`!a!Mm!a;\'S!G_;\'S;=`!N]<%lO!G_!R!MvV!a`!cpxPOr*Vrs(Vsv*Vwx)ex;\'S*V;\'S;=`*s<%lO*V!R!N`P;=`<%l!G_T!NhbhSOq!Hpqr!Ncrs!Hpsw!Ncwx!Hpx!P!Nc!P!Q!Hp!Q!_!Nc!_!a!Hp!a!b# p!b#s!Nc#s$f!Hp$f;\'S!Nc;\'S;=`#!}<%l?Ah!Nc?Ah?BY!Hp?BY?Mn!Nc?MnO!HpT# ubhSOq!Hpqr!Ncrs!Hpsw!Ncwx!Hpx!P!Nc!P!Q!Hp!Q!_!Nc!_!`!Hp!`!a!If!a#s!Nc#s$f!Hp$f;\'S!Nc;\'S;=`#!}<%l?Ah!Nc?Ah?BY!Hp?BY?Mn!Nc?MnO!HpT##QP;=`<%l!Nc!V##^chS!a`!cpOq!G_qr!Eyrs!HUsv!Eyvw!Ncwx!Jvx!P!Ey!P!Q!G_!Q!_!Ey!_!`!G_!`!a!Mm!a#s!Ey#s$f!G_$f;\'S!Ey;\'S;=`#$i<%l?Ah!Ey?Ah?BY!G_?BY?Mn!Ey?MnO!G_!V#$lP;=`<%l!Ey!V#$zXiS`P!a`!cpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;\'S&X;\'S;=`*y<%lO&X',
  tokenizers: [scriptTokens, styleTokens, textareaTokens, endTag, tagStart, commentContent, 0, 1, 2, 3, 4, 5,],
  topRules: { Document: [0, 15,], },
  dialects: { noMatch: 0, selfClosing: 485, },
  tokenPrec: 487,
},);
function getAttrs(openTag, input,) {
  let attrs = /* @__PURE__ */ Object.create(null,);
  for (let att of openTag.getChildren(Attribute,)) {
    let name = att.getChild(AttributeName,), value = att.getChild(AttributeValue,) || att.getChild(UnquotedAttributeValue,);
    if (name) {
      attrs[input.read(name.from, name.to,)] = !value
        ? ''
        : value.type.id == AttributeValue
        ? input.read(value.from + 1, value.to - 1,)
        : input.read(value.from, value.to,);
    }
  }
  return attrs;
}
function findTagName(openTag, input,) {
  let tagNameNode = openTag.getChild(TagName,);
  return tagNameNode ? input.read(tagNameNode.from, tagNameNode.to,) : ' ';
}
function maybeNest(node, input, tags22,) {
  let attrs;
  for (let tag of tags22) {
    if (!tag.attrs || tag.attrs(attrs || (attrs = getAttrs(node.node.parent.firstChild, input,)),)) return { parser: tag.parser, };
  }
  return null;
}
function configureNesting(tags22 = [], attributes = [],) {
  let script = [], style = [], textarea = [], other = [];
  for (let tag of tags22) {
    let array = tag.tag == 'script' ? script : tag.tag == 'style' ? style : tag.tag == 'textarea' ? textarea : other;
    array.push(tag,);
  }
  let attrs = attributes.length ? /* @__PURE__ */ Object.create(null,) : null;
  for (let attr of attributes) (attrs[attr.name] || (attrs[attr.name] = [])).push(attr,);
  return parseMixed((node, input,) => {
    let id = node.type.id;
    if (id == ScriptText) return maybeNest(node, input, script,);
    if (id == StyleText) return maybeNest(node, input, style,);
    if (id == TextareaText) return maybeNest(node, input, textarea,);
    if (id == Element && other.length) {
      let n = node.node, open = n.firstChild, tagName = open && findTagName(open, input,), attrs2;
      if (tagName) {
        for (let tag of other) {
          if (tag.tag == tagName && (!tag.attrs || tag.attrs(attrs2 || (attrs2 = getAttrs(n, input,)),))) {
            let close = n.lastChild;
            return { parser: tag.parser, overlay: [{ from: open.to, to: close.type.id == CloseTag ? close.from : n.to, },], };
          }
        }
      }
    }
    if (attrs && id == Attribute) {
      let n1 = node.node, nameNode;
      if (nameNode = n1.firstChild) {
        let matches = attrs[input.read(nameNode.from, nameNode.to,)];
        if (matches) {
          for (let attr of matches) {
            if (attr.tagName && attr.tagName != findTagName(n1.parent, input,)) continue;
            let value = n1.lastChild;
            if (value.type.id == AttributeValue) {
              let from = value.from + 1;
              let last = value.lastChild, to = value.to - (last && last.isError ? 0 : 1);
              if (to > from) return { parser: attr.parser, overlay: [{ from, to, },], };
            } else if (value.type.id == UnquotedAttributeValue) {
              return { parser: attr.parser, overlay: [{ from: value.from, to: value.to, },], };
            }
          }
        }
      }
    }
    return null;
  },);
}

// https :https://framerusercontent.com/modules/baxvQBtmpZ5GFXZ1GP2Q/aAUh2G8ZOS1DqssCE8EA/lezer_css.js
var descendantOp = 95;
var Unit = 1;
var callee = 96;
var identifier = 97;
var VariableName = 2;
var space2 = [
  9,
  10,
  11,
  12,
  13,
  32,
  133,
  160,
  5760,
  8192,
  8193,
  8194,
  8195,
  8196,
  8197,
  8198,
  8199,
  8200,
  8201,
  8202,
  8232,
  8233,
  8239,
  8287,
  12288,
];
var colon = 58;
var parenL = 40;
var underscore = 95;
var bracketL = 91;
var dash2 = 45;
var period = 46;
var hash = 35;
var percent = 37;
function isAlpha(ch,) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 161;
}
function isDigit(ch,) {
  return ch >= 48 && ch <= 57;
}
var identifiers = new ExternalTokenizer((input, stack,) => {
  for (let inside = false, dashes = 0, i = 0;; i++) {
    let { next, } = input;
    if (isAlpha(next,) || next == dash2 || next == underscore || inside && isDigit(next,)) {
      if (!inside && (next != dash2 || i > 0)) inside = true;
      if (dashes === i && next == dash2) dashes++;
      input.advance();
    } else {
      if (inside) input.acceptToken(next == parenL ? callee : dashes == 2 && stack.canShift(VariableName,) ? VariableName : identifier,);
      break;
    }
  }
},);
var descendant = new ExternalTokenizer((input,) => {
  if (space2.includes(input.peek(-1,),)) {
    let { next, } = input;
    if (isAlpha(next,) || next == underscore || next == hash || next == period || next == bracketL || next == colon || next == dash2) {
      input.acceptToken(descendantOp,);
    }
  }
},);
var unitToken = new ExternalTokenizer((input,) => {
  if (!space2.includes(input.peek(-1,),)) {
    let { next, } = input;
    if (next == percent) {
      input.advance();
      input.acceptToken(Unit,);
    }
    if (isAlpha(next,)) {
      do {
        input.advance();
      } while (isAlpha(input.next,));
      input.acceptToken(Unit,);
    }
  }
},);
var cssHighlighting = styleTags({
  'AtKeyword import charset namespace keyframes media supports': tags.definitionKeyword,
  'from to selector': tags.keyword,
  NamespaceName: tags.namespace,
  KeyframeName: tags.labelName,
  KeyframeRangeName: tags.operatorKeyword,
  TagName: tags.tagName,
  ClassName: tags.className,
  PseudoClassName: tags.constant(tags.className,),
  IdName: tags.labelName,
  'FeatureName PropertyName': tags.propertyName,
  AttributeName: tags.attributeName,
  NumberLiteral: tags.number,
  KeywordQuery: tags.keyword,
  UnaryQueryOp: tags.operatorKeyword,
  'CallTag ValueName': tags.atom,
  VariableName: tags.variableName,
  Callee: tags.operatorKeyword,
  Unit: tags.unit,
  'UniversalSelector NestingSelector': tags.definitionOperator,
  MatchOp: tags.compareOperator,
  'ChildOp SiblingOp, LogicOp': tags.logicOperator,
  BinOp: tags.arithmeticOperator,
  Important: tags.modifier,
  Comment: tags.blockComment,
  ColorLiteral: tags.color,
  'ParenthesizedContent StringLiteral': tags.string,
  ':': tags.punctuation,
  'PseudoOp #': tags.derefOperator,
  '; ,': tags.separator,
  '( )': tags.paren,
  '[ ]': tags.squareBracket,
  '{ }': tags.brace,
},);
var spec_callee = {
  __proto__: null,
  lang: 32,
  'nth-child': 32,
  'nth-last-child': 32,
  'nth-of-type': 32,
  'nth-last-of-type': 32,
  dir: 32,
  'host-context': 32,
  url: 60,
  'url-prefix': 60,
  domain: 60,
  regexp: 60,
  selector: 134,
};
var spec_AtKeyword = {
  __proto__: null,
  '@import': 114,
  '@media': 138,
  '@charset': 142,
  '@namespace': 146,
  '@keyframes': 152,
  '@supports': 164,
};
var spec_identifier2 = { __proto__: null, not: 128, only: 128, };
var parser3 = LRParser.deserialize({
  version: 14,
  states:
    '8`QYQ[OOO#_Q[OOOOQP\'#Cd\'#CdOOQP\'#Cc\'#CcO#fQ[O\'#CfO$YQXO\'#CaO$aQ[O\'#ChO$lQ[O\'#DPO$qQ[O\'#DTOOQP\'#Ee\'#EeO$vQdO\'#DeO%bQ[O\'#DrO$vQdO\'#DtO%sQ[O\'#DvO&OQ[O\'#DyO&WQ[O\'#EPO&fQ[O\'#EROOQS\'#Ed\'#EdOOQS\'#ET\'#ETQYQ[OOO&mQXO\'#CdO\'bQWO\'#DaO\'gQWO\'#EkO\'rQ[O\'#EkQOQWOOOOQP\'#Cg\'#CgOOQP,59Q,59QO#fQ[O,59QO\'|Q[O\'#EWO(hQWO,58{O(pQ[O,59SO$lQ[O,59kO$qQ[O,59oO\'|Q[O,59sO\'|Q[O,59uO\'|Q[O,59vO({Q[O\'#D`OOQS,58{,58{OOQP\'#Ck\'#CkOOQO\'#C}\'#C}OOQP,59S,59SO)SQWO,59SO)XQWO,59SOOQP\'#DR\'#DROOQP,59k,59kOOQO\'#DV\'#DVO)^Q`O,59oOOQS\'#Cp\'#CpO$vQdO\'#CqO)fQvO\'#CsO*sQtO,5:POOQO\'#Cx\'#CxO)XQWO\'#CwO+XQWO\'#CyOOQS\'#Eh\'#EhOOQO\'#Dh\'#DhO+^Q[O\'#DoO+lQWO\'#ElO&WQ[O\'#DmO+zQWO\'#DpOOQO\'#Em\'#EmO(kQWO,5:^O,PQpO,5:`OOQS\'#Dx\'#DxO,XQWO,5:bO,^Q[O,5:bOOQO\'#D{\'#D{O,fQWO,5:eO,kQWO,5:kO,sQWO,5:mOOQS-E8R-E8RO$vQdO,59{O,{Q[O\'#EYO-YQWO,5;VO-YQWO,5;VOOQP1G.l1G.lO.PQXO,5:rOOQO-E8U-E8UOOQS1G.g1G.gOOQP1G.n1G.nO)SQWO1G.nO)XQWO1G.nOOQP1G/V1G/VO.^Q`O1G/ZO.wQXO1G/_O/_QXO1G/aO/uQXO1G/bO0]QWO,59zO0bQ[O\'#DOO0iQdO\'#CoOOQP1G/Z1G/ZO$vQdO1G/ZO0pQpO,59]OOQS,59_,59_O$vQdO,59aO0xQWO1G/kOOQS,59c,59cO0}Q!bO,59eO1VQWO\'#DhO1bQWO,5:TO1gQWO,5:ZO&WQ[O,5:VO&WQ[O\'#EZO1oQWO,5;WO1zQWO,5:XO\'|Q[O,5:[OOQS1G/x1G/xOOQS1G/z1G/zOOQS1G/|1G/|O2]QWO1G/|O2bQdO\'#D|OOQS1G0P1G0POOQS1G0V1G0VOOQS1G0X1G0XO2mQtO1G/gOOQO,5:t,5:tO3TQ[O,5:tOOQO-E8W-E8WO3bQWO1G0qOOQP7+$Y7+$YOOQP7+$u7+$uO$vQdO7+$uOOQS1G/f1G/fO3mQXO\'#EjO3tQWO,59jO3yQtO\'#EUO4nQdO\'#EgO4xQWO,59ZO4}QpO7+$uOOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%V7+%VO5VQWO1G/PO$vQdO1G/oOOQO1G/u1G/uOOQO1G/q1G/qO5[QWO,5:uOOQO-E8X-E8XO5jQXO1G/vOOQS7+%h7+%hO5qQYO\'#CsOOQO\'#EO\'#EOO5|Q`O\'#D}OOQO\'#D}\'#D}O6XQWO\'#E[O6aQdO,5:hOOQS,5:h,5:hO6lQtO\'#EXO$vQdO\'#EXO7jQdO7+%ROOQO7+%R7+%ROOQO1G0`1G0`O7}QpO<<HaO8VQWO,5;UOOQP1G/U1G/UOOQS-E8S-E8SO$vQdO\'#EVO8_QWO,5;ROOQT1G.u1G.uOOQP<<Ha<<HaOOQS7+$k7+$kO8gQdO7+%ZOOQO7+%b7+%bOOQO,5:i,5:iO2eQdO\'#E]O6XQWO,5:vOOQS,5:v,5:vOOQS-E8Y-E8YOOQS1G0S1G0SO8nQtO,5:sOOQS-E8V-E8VOOQO<<Hm<<HmOOQPAN={AN={O9lQdO,5:qOOQO-E8T-E8TOOQO<<Hu<<HuOOQO,5:w,5:wOOQO-E8Z-E8ZOOQS1G0b1G0b',
  stateData:
    ':O~O#VOSROS~OUXOXXO]UO^UOtVOxWO!Y`O!ZYO!gZO!i[O!k]O!n^O!t_O#TQO#YSO~OQeOUXOXXO]UO^UOtVOxWO!Y`O!ZYO!gZO!i[O!k]O!n^O!t_O#TdO#YSO~O#Q#_P~P!ZO#TiO~O]nO^nOplOtoOxpO|qO!PsO#RrO#YkO~O!RtO~P#kO`zO#SwO#TvO~O#T{O~O#T}O~OQ!WOb!QOf!WOh!WOn!VO#S!TO#T!PO#]!RO~Ob!YO!b![O!e!]O#T!XO!R#`P~Oh!bOn!VO#T!aO~Oh!dO#T!dO~Ob!YO!b![O!e!]O#T!XO~O!W#`P~P%bO]WX]!UX^WXpWXtWXxWX|WX!PWX!RWX#RWX#YWX~O]!iO~O!W!jO#Q#_X!Q#_X~O#Q#_X!Q#_X~P!ZOUXOXXO]UO^UOtVOxWO#TQO#YSO~OplO!RtO~O`!sO#SwO#TvO~O!Q#_P~P!ZOb!zO~Ob!{O~Ov!|Oz!}O~OP#PObgXjgX!WgX!bgX!egX#TgXagXQgXfgXhgXngXpgX!VgX#QgX#SgX#]gXvgX!QgX~Ob!YOj#QO!b![O!e!]O#T!XO!W#`P~Ob#TO~Ob!YO!b![O!e!]O#T#UO~Op#YO!`#XO!R#`X!W#`X~Ob#]O~Oj#QO!W#_O~O!W#`O~Oh#aOn!VO~O!R#bO~O!RtO!`#XO~O!RtO!W#eO~O!W!|X#Q!|X!Q!|X~P!ZO!W!jO#Q#_a!Q#_a~O]nO^nOtoOxpO|qO!PsO#RrO#YkO~Op!za!R!zaa!za~P-eOv#lOz#mO~O]nO^nOtoOxpO#YkO~Op{i|{i!P{i!R{i#R{ia{i~P.fOp}i|}i!P}i!R}i#R}ia}i~P.fOp!Oi|!Oi!P!Oi!R!Oi#R!Oia!Oi~P.fO!Q#nO~Oa#^P~P\'|Oa#ZP~P$vOa#uOj#QO~O!W#wO~Oh#xOo#xO~O]!^Xa![X!`![X~O]#yO~Oa#zO!`#XO~Op#YO!R#`a!W#`a~O!`#XOp!aa!R!aa!W!aaa!aa~O!W$PO~O!Q$WO#T$RO#]$QO~Oj#QOp$YO!V$[O!W!Ti#Q!Ti!Q!Ti~P$vO!W!|a#Q!|a!Q!|a~P!ZO!W!jO#Q#_i!Q#_i~Oa#^X~P#kOa$`O~Oj#QOQ!xXa!xXb!xXf!xXh!xXn!xXp!xX#S!xX#T!xX#]!xX~Op$bOa#ZX~P$vOa$dO~Oj#QOv$eO~Oa$fO~O!`#XOp!}a!R!}a!W!}a~Oa$hO~P-eOP#POpgX!RgX~O#]$QOp!qX!R!qX~Op$jO!RtO~O!Q$nO#T$RO#]$QO~Oj#QOQ!{Xb!{Xf!{Xh!{Xn!{Xp!{X!V!{X!W!{X#Q!{X#S!{X#T!{X#]!{X!Q!{X~Op$YO!V$qO!W!Tq#Q!Tq!Q!Tq~P$vOj#QOv$rO~OplOa#^a~Op$bOa#Za~Oa$uO~P$vOj#QOQ!{ab!{af!{ah!{an!{ap!{a!V!{a!W!{a#Q!{a#S!{a#T!{a#]!{a!Q!{a~Oa!yap!ya~P$vO#VoR#]j!Pj~',
  goto:
    ',z#bPPPPP#cP#l#{P#l$[#lPP$bPPP$h$q$qP%TP$qP$q%o&RPPP&k&q#lP&wP#lP&}P#lP#l#lPPP\'T\'j\'wPP#cPP(O(O(Y(OP(OP(O(OP#cP#cP#cP(]#cP(`(c(f(m#cP#cP(r)R)a)g)q)w*R*X*_PPPPPP*e*nP+Z+^P,S,V,],f_aOPcgt!j#hkXOPcglqrst!j!z#]#hkROPcglqrst!j!z#]#hQjSR!mkQxUR!qnQ!qzQ#S!UR#k!sq!WY[!Q!i!{!}#Q#f#m#r#y$Y$Z$b$g$sp!WY[!Q!i!{!}#Q#f#m#r#y$Y$Z$b$g$sU$T#b$V$jR$i$Sq!UY[!Q!i!{!}#Q#f#m#r#y$Y$Z$b$g$sp!WY[!Q!i!{!}#Q#f#m#r#y$Y$Z$b$g$sQ!b]R#a!cQyUR!rnQ!qyR#k!rQ|VR!toQ!OWR!upQuTQ!pmQ#^!_Q#d!fQ#e!gQ$l$UR$x$kSfPtQ!lgQ#g!jR$]#hZePgt!j#ha!^Z_`!S!Y![#X#YR#V!YR!c]R!e^R#c!eS$U#b$VR$v$jV$S#b$V$jQcOSgPtU!hcg#hR#h!jQ#r!{U$a#r$g$sQ$g#yR$s$bQ$c#rR$t$cQmTS!om$_R$_#oQ$Z#fR$p$ZQ!kfS#i!k#jR#j!lQ#Z!ZR#}#ZQ$V#bR$m$VQ$k$UR$w$k_bOPcgt!j#h^TOPcgt!j#hQ!nlQ!vqQ!wrQ!xsQ#o!zR$O#]R#s!{Q!SYQ!`[Q#O!QQ#f!i[#q!{#r#y$b$g$sQ#t!}Q#v#QS$X#f$ZQ$^#mR$o$YR#p!zQhPR!ytQ!_ZQ!g`R#R!SU!ZZ`!SQ!f_Q#W!YQ#[![Q#{#XR#|#Y',
  nodeNames:
    '\u26A0 Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent , PseudoClassName ArgList IdSelector # IdName ] AttributeSelector [ AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports AtRule Styles',
  maxTerm: 109,
  nodeProps: [['openedBy', 17, '(', 48, '{',], ['closedBy', 18, ')', 49, '}',],],
  propSources: [cssHighlighting,],
  skippedNodes: [0, 3,],
  repeatNodeCount: 9,
  tokenData:
    'Lq~R!^OX$}X^%u^p$}pq%uqr)Xrs.Rst/utu6duv$}vw7^wx7oxy9^yz9oz{9t{|:_|}?Q}!O?c!O!P@Q!P!Q@i!Q![Cu![!]Dp!]!^El!^!_$}!_!`E}!`!aF`!a!b$}!b!cG[!c!}$}!}#OHt#O#P$}#P#QIV#Q#R6d#R#T$}#T#UIh#U#c$}#c#dJy#d#o$}#o#pK`#p#q6d#q#rKq#r#sLS#s#y$}#y#z%u#z$f$}$f$g%u$g#BY$}#BY#BZ%u#BZ$IS$}$IS$I_%u$I_$I|$}$I|$JO%u$JO$JT$}$JT$JU%u$JU$KV$}$KV$KW%u$KW&FU$}&FU&FV%u&FV;\'S$};\'S;=`Lk<%lO$}W%QSOy%^z;\'S%^;\'S;=`%o<%lO%^W%cSoWOy%^z;\'S%^;\'S;=`%o<%lO%^W%rP;=`<%l%^~%zh#V~OX%^X^\'f^p%^pq\'fqy%^z#y%^#y#z\'f#z$f%^$f$g\'f$g#BY%^#BY#BZ\'f#BZ$IS%^$IS$I_\'f$I_$I|%^$I|$JO\'f$JO$JT%^$JT$JU\'f$JU$KV%^$KV$KW\'f$KW&FU%^&FU&FV\'f&FV;\'S%^;\'S;=`%o<%lO%^~\'mh#V~oWOX%^X^\'f^p%^pq\'fqy%^z#y%^#y#z\'f#z$f%^$f$g\'f$g#BY%^#BY#BZ\'f#BZ$IS%^$IS$I_\'f$I_$I|%^$I|$JO\'f$JO$JT%^$JT$JU\'f$JU$KV%^$KV$KW\'f$KW&FU%^&FU&FV\'f&FV;\'S%^;\'S;=`%o<%lO%^^)[UOy%^z#]%^#]#^)n#^;\'S%^;\'S;=`%o<%lO%^^)sUoWOy%^z#a%^#a#b*V#b;\'S%^;\'S;=`%o<%lO%^^*[UoWOy%^z#d%^#d#e*n#e;\'S%^;\'S;=`%o<%lO%^^*sUoWOy%^z#c%^#c#d+V#d;\'S%^;\'S;=`%o<%lO%^^+[UoWOy%^z#f%^#f#g+n#g;\'S%^;\'S;=`%o<%lO%^^+sUoWOy%^z#h%^#h#i,V#i;\'S%^;\'S;=`%o<%lO%^^,[UoWOy%^z#T%^#T#U,n#U;\'S%^;\'S;=`%o<%lO%^^,sUoWOy%^z#b%^#b#c-V#c;\'S%^;\'S;=`%o<%lO%^^-[UoWOy%^z#h%^#h#i-n#i;\'S%^;\'S;=`%o<%lO%^^-uS!VUoWOy%^z;\'S%^;\'S;=`%o<%lO%^~.UWOY.RZr.Rrs.ns#O.R#O#P.s#P;\'S.R;\'S;=`/o<%lO.R~.sOh~~.vRO;\'S.R;\'S;=`/P;=`O.R~/SXOY.RZr.Rrs.ns#O.R#O#P.s#P;\'S.R;\'S;=`/o;=`<%l.R<%lO.R~/rP;=`<%l.R_/zYtPOy%^z!Q%^!Q![0j![!c%^!c!i0j!i#T%^#T#Z0j#Z;\'S%^;\'S;=`%o<%lO%^^0oYoWOy%^z!Q%^!Q![1_![!c%^!c!i1_!i#T%^#T#Z1_#Z;\'S%^;\'S;=`%o<%lO%^^1dYoWOy%^z!Q%^!Q![2S![!c%^!c!i2S!i#T%^#T#Z2S#Z;\'S%^;\'S;=`%o<%lO%^^2ZYfUoWOy%^z!Q%^!Q![2y![!c%^!c!i2y!i#T%^#T#Z2y#Z;\'S%^;\'S;=`%o<%lO%^^3QYfUoWOy%^z!Q%^!Q![3p![!c%^!c!i3p!i#T%^#T#Z3p#Z;\'S%^;\'S;=`%o<%lO%^^3uYoWOy%^z!Q%^!Q![4e![!c%^!c!i4e!i#T%^#T#Z4e#Z;\'S%^;\'S;=`%o<%lO%^^4lYfUoWOy%^z!Q%^!Q![5[![!c%^!c!i5[!i#T%^#T#Z5[#Z;\'S%^;\'S;=`%o<%lO%^^5aYoWOy%^z!Q%^!Q![6P![!c%^!c!i6P!i#T%^#T#Z6P#Z;\'S%^;\'S;=`%o<%lO%^^6WSfUoWOy%^z;\'S%^;\'S;=`%o<%lO%^Y6gUOy%^z!_%^!_!`6y!`;\'S%^;\'S;=`%o<%lO%^Y7QSzQoWOy%^z;\'S%^;\'S;=`%o<%lO%^X7cSXPOy%^z;\'S%^;\'S;=`%o<%lO%^~7rWOY7oZw7owx.nx#O7o#O#P8[#P;\'S7o;\'S;=`9W<%lO7o~8_RO;\'S7o;\'S;=`8h;=`O7o~8kXOY7oZw7owx.nx#O7o#O#P8[#P;\'S7o;\'S;=`9W;=`<%l7o<%lO7o~9ZP;=`<%l7o_9cSbVOy%^z;\'S%^;\'S;=`%o<%lO%^~9tOa~_9{UUPjSOy%^z!_%^!_!`6y!`;\'S%^;\'S;=`%o<%lO%^_:fWjS!PPOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;\'S%^;\'S;=`%o<%lO%^^;TUoWOy%^z!Q%^!Q![;g![;\'S%^;\'S;=`%o<%lO%^^;nYoW#]UOy%^z!Q%^!Q![;g![!g%^!g!h<^!h#X%^#X#Y<^#Y;\'S%^;\'S;=`%o<%lO%^^<cYoWOy%^z{%^{|=R|}%^}!O=R!O!Q%^!Q![=j![;\'S%^;\'S;=`%o<%lO%^^=WUoWOy%^z!Q%^!Q![=j![;\'S%^;\'S;=`%o<%lO%^^=qUoW#]UOy%^z!Q%^!Q![=j![;\'S%^;\'S;=`%o<%lO%^^>[[oW#]UOy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;\'S%^;\'S;=`%o<%lO%^_?VSpVOy%^z;\'S%^;\'S;=`%o<%lO%^^?hWjSOy%^z!O%^!O!P;O!P!Q%^!Q![>T![;\'S%^;\'S;=`%o<%lO%^_@VU#YPOy%^z!Q%^!Q![;g![;\'S%^;\'S;=`%o<%lO%^~@nTjSOy%^z{@}{;\'S%^;\'S;=`%o<%lO%^~ASUoWOy@}yzAfz{Bm{;\'S@};\'S;=`Co<%lO@}~AiTOzAfz{Ax{;\'SAf;\'S;=`Bg<%lOAf~A{VOzAfz{Ax{!PAf!P!QBb!Q;\'SAf;\'S;=`Bg<%lOAf~BgOR~~BjP;=`<%lAf~BrWoWOy@}yzAfz{Bm{!P@}!P!QC[!Q;\'S@};\'S;=`Co<%lO@}~CcSoWR~Oy%^z;\'S%^;\'S;=`%o<%lO%^~CrP;=`<%l@}^Cz[#]UOy%^z!O%^!O!P;g!P!Q%^!Q![>T![!g%^!g!h<^!h#X%^#X#Y<^#Y;\'S%^;\'S;=`%o<%lO%^XDuU]POy%^z![%^![!]EX!];\'S%^;\'S;=`%o<%lO%^XE`S^PoWOy%^z;\'S%^;\'S;=`%o<%lO%^_EqS!WVOy%^z;\'S%^;\'S;=`%o<%lO%^YFSSzQOy%^z;\'S%^;\'S;=`%o<%lO%^XFeU|POy%^z!`%^!`!aFw!a;\'S%^;\'S;=`%o<%lO%^XGOS|PoWOy%^z;\'S%^;\'S;=`%o<%lO%^XG_WOy%^z!c%^!c!}Gw!}#T%^#T#oGw#o;\'S%^;\'S;=`%o<%lO%^XHO[!YPoWOy%^z}%^}!OGw!O!Q%^!Q![Gw![!c%^!c!}Gw!}#T%^#T#oGw#o;\'S%^;\'S;=`%o<%lO%^XHySxPOy%^z;\'S%^;\'S;=`%o<%lO%^^I[SvUOy%^z;\'S%^;\'S;=`%o<%lO%^XIkUOy%^z#b%^#b#cI}#c;\'S%^;\'S;=`%o<%lO%^XJSUoWOy%^z#W%^#W#XJf#X;\'S%^;\'S;=`%o<%lO%^XJmS!`PoWOy%^z;\'S%^;\'S;=`%o<%lO%^XJ|UOy%^z#f%^#f#gJf#g;\'S%^;\'S;=`%o<%lO%^ZKeS!RROy%^z;\'S%^;\'S;=`%o<%lO%^_KvS!QVOy%^z;\'S%^;\'S;=`%o<%lO%^ZLXU!PPOy%^z!_%^!_!`6y!`;\'S%^;\'S;=`%o<%lO%^WLnP;=`<%l$}',
  tokenizers: [descendant, unitToken, identifiers, 0, 1, 2, 3,],
  topRules: { StyleSheet: [0, 4,], Styles: [1, 84,], },
  specialized: [{ term: 96, get: (value,) => spec_callee[value] || -1, }, { term: 56, get: (value,) => spec_AtKeyword[value] || -1, }, {
    term: 97,
    get: (value,) => spec_identifier2[value] || -1,
  },],
  tokenPrec: 1142,
},);

// https :https://framerusercontent.com/modules/Gg5hLFaRxQ2EaXSWb101/kXQVFiwPVLfGsrUiA5zE/codemirror_lang_css.js
var _properties = null;
function properties() {
  if (!_properties && typeof document == 'object' && document.body) {
    let { style, } = document.body, names = [], seen = /* @__PURE__ */ new Set();
    for (let prop in style) {
      if (prop != 'cssText' && prop != 'cssFloat') {
        if (typeof style[prop] == 'string') {
          if (/[A-Z]/.test(prop,)) prop = prop.replace(/[A-Z]/g, (ch,) => '-' + ch.toLowerCase(),);
          if (!seen.has(prop,)) {
            names.push(prop,);
            seen.add(prop,);
          }
        }
      }
    }
    _properties = names.sort().map((name,) => ({ type: 'property', label: name, }));
  }
  return _properties || [];
}
var pseudoClasses = /* @__PURE__ */ [
  'active',
  'after',
  'any-link',
  'autofill',
  'backdrop',
  'before',
  'checked',
  'cue',
  'default',
  'defined',
  'disabled',
  'empty',
  'enabled',
  'file-selector-button',
  'first',
  'first-child',
  'first-letter',
  'first-line',
  'first-of-type',
  'focus',
  'focus-visible',
  'focus-within',
  'fullscreen',
  'has',
  'host',
  'host-context',
  'hover',
  'in-range',
  'indeterminate',
  'invalid',
  'is',
  'lang',
  'last-child',
  'last-of-type',
  'left',
  'link',
  'marker',
  'modal',
  'not',
  'nth-child',
  'nth-last-child',
  'nth-last-of-type',
  'nth-of-type',
  'only-child',
  'only-of-type',
  'optional',
  'out-of-range',
  'part',
  'placeholder',
  'placeholder-shown',
  'read-only',
  'read-write',
  'required',
  'right',
  'root',
  'scope',
  'selection',
  'slotted',
  'target',
  'target-text',
  'valid',
  'visited',
  'where',
].map((name,) => ({ type: 'class', label: name, }));
var values = /* @__PURE__ */ [
  'above',
  'absolute',
  'activeborder',
  'additive',
  'activecaption',
  'after-white-space',
  'ahead',
  'alias',
  'all',
  'all-scroll',
  'alphabetic',
  'alternate',
  'always',
  'antialiased',
  'appworkspace',
  'asterisks',
  'attr',
  'auto',
  'auto-flow',
  'avoid',
  'avoid-column',
  'avoid-page',
  'avoid-region',
  'axis-pan',
  'background',
  'backwards',
  'baseline',
  'below',
  'bidi-override',
  'blink',
  'block',
  'block-axis',
  'bold',
  'bolder',
  'border',
  'border-box',
  'both',
  'bottom',
  'break',
  'break-all',
  'break-word',
  'bullets',
  'button',
  'button-bevel',
  'buttonface',
  'buttonhighlight',
  'buttonshadow',
  'buttontext',
  'calc',
  'capitalize',
  'caps-lock-indicator',
  'caption',
  'captiontext',
  'caret',
  'cell',
  'center',
  'checkbox',
  'circle',
  'cjk-decimal',
  'clear',
  'clip',
  'close-quote',
  'col-resize',
  'collapse',
  'color',
  'color-burn',
  'color-dodge',
  'column',
  'column-reverse',
  'compact',
  'condensed',
  'contain',
  'content',
  'contents',
  'content-box',
  'context-menu',
  'continuous',
  'copy',
  'counter',
  'counters',
  'cover',
  'crop',
  'cross',
  'crosshair',
  'currentcolor',
  'cursive',
  'cyclic',
  'darken',
  'dashed',
  'decimal',
  'decimal-leading-zero',
  'default',
  'default-button',
  'dense',
  'destination-atop',
  'destination-in',
  'destination-out',
  'destination-over',
  'difference',
  'disc',
  'discard',
  'disclosure-closed',
  'disclosure-open',
  'document',
  'dot-dash',
  'dot-dot-dash',
  'dotted',
  'double',
  'down',
  'e-resize',
  'ease',
  'ease-in',
  'ease-in-out',
  'ease-out',
  'element',
  'ellipse',
  'ellipsis',
  'embed',
  'end',
  'ethiopic-abegede-gez',
  'ethiopic-halehame-aa-er',
  'ethiopic-halehame-gez',
  'ew-resize',
  'exclusion',
  'expanded',
  'extends',
  'extra-condensed',
  'extra-expanded',
  'fantasy',
  'fast',
  'fill',
  'fill-box',
  'fixed',
  'flat',
  'flex',
  'flex-end',
  'flex-start',
  'footnotes',
  'forwards',
  'from',
  'geometricPrecision',
  'graytext',
  'grid',
  'groove',
  'hand',
  'hard-light',
  'help',
  'hidden',
  'hide',
  'higher',
  'highlight',
  'highlighttext',
  'horizontal',
  'hsl',
  'hsla',
  'hue',
  'icon',
  'ignore',
  'inactiveborder',
  'inactivecaption',
  'inactivecaptiontext',
  'infinite',
  'infobackground',
  'infotext',
  'inherit',
  'initial',
  'inline',
  'inline-axis',
  'inline-block',
  'inline-flex',
  'inline-grid',
  'inline-table',
  'inset',
  'inside',
  'intrinsic',
  'invert',
  'italic',
  'justify',
  'keep-all',
  'landscape',
  'large',
  'larger',
  'left',
  'level',
  'lighter',
  'lighten',
  'line-through',
  'linear',
  'linear-gradient',
  'lines',
  'list-item',
  'listbox',
  'listitem',
  'local',
  'logical',
  'loud',
  'lower',
  'lower-hexadecimal',
  'lower-latin',
  'lower-norwegian',
  'lowercase',
  'ltr',
  'luminosity',
  'manipulation',
  'match',
  'matrix',
  'matrix3d',
  'medium',
  'menu',
  'menutext',
  'message-box',
  'middle',
  'min-intrinsic',
  'mix',
  'monospace',
  'move',
  'multiple',
  'multiple_mask_images',
  'multiply',
  'n-resize',
  'narrower',
  'ne-resize',
  'nesw-resize',
  'no-close-quote',
  'no-drop',
  'no-open-quote',
  'no-repeat',
  'none',
  'normal',
  'not-allowed',
  'nowrap',
  'ns-resize',
  'numbers',
  'numeric',
  'nw-resize',
  'nwse-resize',
  'oblique',
  'opacity',
  'open-quote',
  'optimizeLegibility',
  'optimizeSpeed',
  'outset',
  'outside',
  'outside-shape',
  'overlay',
  'overline',
  'padding',
  'padding-box',
  'painted',
  'page',
  'paused',
  'perspective',
  'pinch-zoom',
  'plus-darker',
  'plus-lighter',
  'pointer',
  'polygon',
  'portrait',
  'pre',
  'pre-line',
  'pre-wrap',
  'preserve-3d',
  'progress',
  'push-button',
  'radial-gradient',
  'radio',
  'read-only',
  'read-write',
  'read-write-plaintext-only',
  'rectangle',
  'region',
  'relative',
  'repeat',
  'repeating-linear-gradient',
  'repeating-radial-gradient',
  'repeat-x',
  'repeat-y',
  'reset',
  'reverse',
  'rgb',
  'rgba',
  'ridge',
  'right',
  'rotate',
  'rotate3d',
  'rotateX',
  'rotateY',
  'rotateZ',
  'round',
  'row',
  'row-resize',
  'row-reverse',
  'rtl',
  'run-in',
  'running',
  's-resize',
  'sans-serif',
  'saturation',
  'scale',
  'scale3d',
  'scaleX',
  'scaleY',
  'scaleZ',
  'screen',
  'scroll',
  'scrollbar',
  'scroll-position',
  'se-resize',
  'self-start',
  'self-end',
  'semi-condensed',
  'semi-expanded',
  'separate',
  'serif',
  'show',
  'single',
  'skew',
  'skewX',
  'skewY',
  'skip-white-space',
  'slide',
  'slider-horizontal',
  'slider-vertical',
  'sliderthumb-horizontal',
  'sliderthumb-vertical',
  'slow',
  'small',
  'small-caps',
  'small-caption',
  'smaller',
  'soft-light',
  'solid',
  'source-atop',
  'source-in',
  'source-out',
  'source-over',
  'space',
  'space-around',
  'space-between',
  'space-evenly',
  'spell-out',
  'square',
  'start',
  'static',
  'status-bar',
  'stretch',
  'stroke',
  'stroke-box',
  'sub',
  'subpixel-antialiased',
  'svg_masks',
  'super',
  'sw-resize',
  'symbolic',
  'symbols',
  'system-ui',
  'table',
  'table-caption',
  'table-cell',
  'table-column',
  'table-column-group',
  'table-footer-group',
  'table-header-group',
  'table-row',
  'table-row-group',
  'text',
  'text-bottom',
  'text-top',
  'textarea',
  'textfield',
  'thick',
  'thin',
  'threeddarkshadow',
  'threedface',
  'threedhighlight',
  'threedlightshadow',
  'threedshadow',
  'to',
  'top',
  'transform',
  'translate',
  'translate3d',
  'translateX',
  'translateY',
  'translateZ',
  'transparent',
  'ultra-condensed',
  'ultra-expanded',
  'underline',
  'unidirectional-pan',
  'unset',
  'up',
  'upper-latin',
  'uppercase',
  'url',
  'var',
  'vertical',
  'vertical-text',
  'view-box',
  'visible',
  'visibleFill',
  'visiblePainted',
  'visibleStroke',
  'visual',
  'w-resize',
  'wait',
  'wave',
  'wider',
  'window',
  'windowframe',
  'windowtext',
  'words',
  'wrap',
  'wrap-reverse',
  'x-large',
  'x-small',
  'xor',
  'xx-large',
  'xx-small',
].map((name,) => ({ type: 'keyword', label: name, })).concat(
  /* @__PURE__ */ [
    'aliceblue',
    'antiquewhite',
    'aqua',
    'aquamarine',
    'azure',
    'beige',
    'bisque',
    'black',
    'blanchedalmond',
    'blue',
    'blueviolet',
    'brown',
    'burlywood',
    'cadetblue',
    'chartreuse',
    'chocolate',
    'coral',
    'cornflowerblue',
    'cornsilk',
    'crimson',
    'cyan',
    'darkblue',
    'darkcyan',
    'darkgoldenrod',
    'darkgray',
    'darkgreen',
    'darkkhaki',
    'darkmagenta',
    'darkolivegreen',
    'darkorange',
    'darkorchid',
    'darkred',
    'darksalmon',
    'darkseagreen',
    'darkslateblue',
    'darkslategray',
    'darkturquoise',
    'darkviolet',
    'deeppink',
    'deepskyblue',
    'dimgray',
    'dodgerblue',
    'firebrick',
    'floralwhite',
    'forestgreen',
    'fuchsia',
    'gainsboro',
    'ghostwhite',
    'gold',
    'goldenrod',
    'gray',
    'grey',
    'green',
    'greenyellow',
    'honeydew',
    'hotpink',
    'indianred',
    'indigo',
    'ivory',
    'khaki',
    'lavender',
    'lavenderblush',
    'lawngreen',
    'lemonchiffon',
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightgreen',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightslategray',
    'lightsteelblue',
    'lightyellow',
    'lime',
    'limegreen',
    'linen',
    'magenta',
    'maroon',
    'mediumaquamarine',
    'mediumblue',
    'mediumorchid',
    'mediumpurple',
    'mediumseagreen',
    'mediumslateblue',
    'mediumspringgreen',
    'mediumturquoise',
    'mediumvioletred',
    'midnightblue',
    'mintcream',
    'mistyrose',
    'moccasin',
    'navajowhite',
    'navy',
    'oldlace',
    'olive',
    'olivedrab',
    'orange',
    'orangered',
    'orchid',
    'palegoldenrod',
    'palegreen',
    'paleturquoise',
    'palevioletred',
    'papayawhip',
    'peachpuff',
    'peru',
    'pink',
    'plum',
    'powderblue',
    'purple',
    'rebeccapurple',
    'red',
    'rosybrown',
    'royalblue',
    'saddlebrown',
    'salmon',
    'sandybrown',
    'seagreen',
    'seashell',
    'sienna',
    'silver',
    'skyblue',
    'slateblue',
    'slategray',
    'snow',
    'springgreen',
    'steelblue',
    'tan',
    'teal',
    'thistle',
    'tomato',
    'turquoise',
    'violet',
    'wheat',
    'white',
    'whitesmoke',
    'yellow',
    'yellowgreen',
  ].map((name,) => ({ type: 'constant', label: name, })),
);
var tags2 = /* @__PURE__ */ [
  'a',
  'abbr',
  'address',
  'article',
  'aside',
  'b',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'figcaption',
  'figure',
  'footer',
  'form',
  'header',
  'hgroup',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'main',
  'meter',
  'nav',
  'ol',
  'output',
  'p',
  'pre',
  'ruby',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'tr',
  'u',
  'ul',
].map((name,) => ({ type: 'type', label: name, }));
var identifier2 = /^(\w[\w-]*|-\w[\w-]*|)$/;
var variable = /^-(-[\w-]*)?$/;
function isVarArg(node, doc,) {
  var _a;
  if (node.name == '(' || node.type.isError) node = node.parent || node;
  if (node.name != 'ArgList') return false;
  let callee2 = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.firstChild;
  if ((callee2 === null || callee2 === void 0 ? void 0 : callee2.name) != 'Callee') return false;
  return doc.sliceString(callee2.from, callee2.to,) == 'var';
}
var VariablesByNode = /* @__PURE__ */ new NodeWeakMap();
var declSelector = ['Declaration',];
function astTop(node,) {
  for (let cur = node;;) {
    if (cur.type.isTop) return cur;
    if (!(cur = cur.parent)) return node;
  }
}
function variableNames(doc, node, isVariable,) {
  if (node.to - node.from > 4096) {
    let known = VariablesByNode.get(node,);
    if (known) return known;
    let result = [], seen = /* @__PURE__ */ new Set(), cursor = node.cursor(IterMode.IncludeAnonymous,);
    if (cursor.firstChild()) {
      do {
        for (let option of variableNames(doc, cursor.node, isVariable,)) {
          if (!seen.has(option.label,)) {
            seen.add(option.label,);
            result.push(option,);
          }
        }
      } while (cursor.nextSibling());
    }
    VariablesByNode.set(node, result,);
    return result;
  } else {
    let result1 = [], seen1 = /* @__PURE__ */ new Set();
    node.cursor().iterate((node2,) => {
      var _a;
      if (
        isVariable(node2,) && node2.matchContext(declSelector,) &&
        ((_a = node2.node.nextSibling) === null || _a === void 0 ? void 0 : _a.name) == ':'
      ) {
        let name = doc.sliceString(node2.from, node2.to,);
        if (!seen1.has(name,)) {
          seen1.add(name,);
          result1.push({ label: name, type: 'variable', },);
        }
      }
    },);
    return result1;
  }
}
var defineCSSCompletionSource = (isVariable,) => (context,) => {
  let { state, pos, } = context, node = syntaxTree(state,).resolveInner(pos, -1,);
  let isDash = node.type.isError && node.from == node.to - 1 && state.doc.sliceString(node.from, node.to,) == '-';
  if (node.name == 'PropertyName' || (isDash || node.name == 'TagName') && /^(Block|Styles)$/.test(node.resolve(node.to,).name,)) {
    return { from: node.from, options: properties(), validFor: identifier2, };
  }
  if (node.name == 'ValueName') return { from: node.from, options: values, validFor: identifier2, };
  if (node.name == 'PseudoClassName') return { from: node.from, options: pseudoClasses, validFor: identifier2, };
  if (isVariable(node,) || (context.explicit || isDash) && isVarArg(node, state.doc,)) {
    return {
      from: isVariable(node,) || isDash ? node.from : pos,
      options: variableNames(state.doc, astTop(node,), isVariable,),
      validFor: variable,
    };
  }
  if (node.name == 'TagName') {
    for (let { parent, } = node; parent; parent = parent.parent) {
      if (parent.name == 'Block') return { from: node.from, options: properties(), validFor: identifier2, };
    }
    return { from: node.from, options: tags2, validFor: identifier2, };
  }
  if (!context.explicit) return null;
  let above = node.resolve(pos,), before = above.childBefore(pos,);
  if (before && before.name == ':' && above.name == 'PseudoClassSelector') {
    return { from: pos, options: pseudoClasses, validFor: identifier2, };
  }
  if (before && before.name == ':' && above.name == 'Declaration' || above.name == 'ArgList') {
    return { from: pos, options: values, validFor: identifier2, };
  }
  if (above.name == 'Block' || above.name == 'Styles') return { from: pos, options: properties(), validFor: identifier2, };
  return null;
};
var cssCompletionSource = /* @__PURE__ */ defineCSSCompletionSource((n,) => n.name == 'VariableName');
var cssLanguage = /* @__PURE__ */ LRLanguage.define({
  name: 'css',
  parser: /* @__PURE__ */ parser3.configure({
    props: [
      /* @__PURE__ */ indentNodeProp.add({ Declaration: /* @__PURE__ */ continuedIndent(), },),
      /* @__PURE__ */ foldNodeProp.add({ Block: foldInside, },),
    ],
  },),
  languageData: { commentTokens: { block: { open: '/*', close: '*/', }, }, indentOnInput: /^\s*\}$/, wordChars: '-', },
},);
function css() {
  return new LanguageSupport(cssLanguage, cssLanguage.data.of({ autocomplete: cssCompletionSource, },),);
}

// https :https://framerusercontent.com/modules/ju8TqAduufCaScL3E39X/3zUBDnN91MxwGUPcS8Lv/codemirror_lang_html.js
var Targets = ['_blank', '_self', '_top', '_parent',];
var Charsets = ['ascii', 'utf-8', 'utf-16', 'latin1', 'latin1',];
var Methods = ['get', 'post', 'put', 'delete',];
var Encs = ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain',];
var Bool = ['true', 'false',];
var S = {};
var Tags = {
  a: { attrs: { href: null, ping: null, type: null, media: null, target: Targets, hreflang: null, }, },
  abbr: S,
  address: S,
  area: {
    attrs: {
      alt: null,
      coords: null,
      href: null,
      target: null,
      ping: null,
      media: null,
      hreflang: null,
      type: null,
      shape: ['default', 'rect', 'circle', 'poly',],
    },
  },
  article: S,
  aside: S,
  audio: {
    attrs: {
      src: null,
      mediagroup: null,
      crossorigin: ['anonymous', 'use-credentials',],
      preload: ['none', 'metadata', 'auto',],
      autoplay: ['autoplay',],
      loop: ['loop',],
      controls: ['controls',],
    },
  },
  b: S,
  base: { attrs: { href: null, target: Targets, }, },
  bdi: S,
  bdo: S,
  blockquote: { attrs: { cite: null, }, },
  body: S,
  br: S,
  button: {
    attrs: {
      form: null,
      formaction: null,
      name: null,
      value: null,
      autofocus: ['autofocus',],
      disabled: ['autofocus',],
      formenctype: Encs,
      formmethod: Methods,
      formnovalidate: ['novalidate',],
      formtarget: Targets,
      type: ['submit', 'reset', 'button',],
    },
  },
  canvas: { attrs: { width: null, height: null, }, },
  caption: S,
  center: S,
  cite: S,
  code: S,
  col: { attrs: { span: null, }, },
  colgroup: { attrs: { span: null, }, },
  command: {
    attrs: {
      type: ['command', 'checkbox', 'radio',],
      label: null,
      icon: null,
      radiogroup: null,
      command: null,
      title: null,
      disabled: ['disabled',],
      checked: ['checked',],
    },
  },
  data: { attrs: { value: null, }, },
  datagrid: { attrs: { disabled: ['disabled',], multiple: ['multiple',], }, },
  datalist: { attrs: { data: null, }, },
  dd: S,
  del: { attrs: { cite: null, datetime: null, }, },
  details: { attrs: { open: ['open',], }, },
  dfn: S,
  div: S,
  dl: S,
  dt: S,
  em: S,
  embed: { attrs: { src: null, type: null, width: null, height: null, }, },
  eventsource: { attrs: { src: null, }, },
  fieldset: { attrs: { disabled: ['disabled',], form: null, name: null, }, },
  figcaption: S,
  figure: S,
  footer: S,
  form: {
    attrs: {
      action: null,
      name: null,
      'accept-charset': Charsets,
      autocomplete: ['on', 'off',],
      enctype: Encs,
      method: Methods,
      novalidate: ['novalidate',],
      target: Targets,
    },
  },
  h1: S,
  h2: S,
  h3: S,
  h4: S,
  h5: S,
  h6: S,
  head: { children: ['title', 'base', 'link', 'style', 'meta', 'script', 'noscript', 'command',], },
  header: S,
  hgroup: S,
  hr: S,
  html: { attrs: { manifest: null, }, },
  i: S,
  iframe: {
    attrs: {
      src: null,
      srcdoc: null,
      name: null,
      width: null,
      height: null,
      sandbox: ['allow-top-navigation', 'allow-same-origin', 'allow-forms', 'allow-scripts',],
      seamless: ['seamless',],
    },
  },
  img: {
    attrs: { alt: null, src: null, ismap: null, usemap: null, width: null, height: null, crossorigin: ['anonymous', 'use-credentials',], },
  },
  input: {
    attrs: {
      alt: null,
      dirname: null,
      form: null,
      formaction: null,
      height: null,
      list: null,
      max: null,
      maxlength: null,
      min: null,
      name: null,
      pattern: null,
      placeholder: null,
      size: null,
      src: null,
      step: null,
      value: null,
      width: null,
      accept: ['audio/*', 'video/*', 'image/*',],
      autocomplete: ['on', 'off',],
      autofocus: ['autofocus',],
      checked: ['checked',],
      disabled: ['disabled',],
      formenctype: Encs,
      formmethod: Methods,
      formnovalidate: ['novalidate',],
      formtarget: Targets,
      multiple: ['multiple',],
      readonly: ['readonly',],
      required: ['required',],
      type: [
        'hidden',
        'text',
        'search',
        'tel',
        'url',
        'email',
        'password',
        'datetime',
        'date',
        'month',
        'week',
        'time',
        'datetime-local',
        'number',
        'range',
        'color',
        'checkbox',
        'radio',
        'file',
        'submit',
        'image',
        'reset',
        'button',
      ],
    },
  },
  ins: { attrs: { cite: null, datetime: null, }, },
  kbd: S,
  keygen: { attrs: { challenge: null, form: null, name: null, autofocus: ['autofocus',], disabled: ['disabled',], keytype: ['RSA',], }, },
  label: { attrs: { for: null, form: null, }, },
  legend: S,
  li: { attrs: { value: null, }, },
  link: { attrs: { href: null, type: null, hreflang: null, media: null, sizes: ['all', '16x16', '16x16 32x32', '16x16 32x32 64x64',], }, },
  map: { attrs: { name: null, }, },
  mark: S,
  menu: { attrs: { label: null, type: ['list', 'context', 'toolbar',], }, },
  meta: {
    attrs: {
      content: null,
      charset: Charsets,
      name: ['viewport', 'application-name', 'author', 'description', 'generator', 'keywords',],
      'http-equiv': ['content-language', 'content-type', 'default-style', 'refresh',],
    },
  },
  meter: { attrs: { value: null, min: null, low: null, high: null, max: null, optimum: null, }, },
  nav: S,
  noscript: S,
  object: {
    attrs: { data: null, type: null, name: null, usemap: null, form: null, width: null, height: null, typemustmatch: ['typemustmatch',], },
  },
  ol: {
    attrs: { reversed: ['reversed',], start: null, type: ['1', 'a', 'A', 'i', 'I',], },
    children: ['li', 'script', 'template', 'ul', 'ol',],
  },
  optgroup: { attrs: { disabled: ['disabled',], label: null, }, },
  option: { attrs: { disabled: ['disabled',], label: null, selected: ['selected',], value: null, }, },
  output: { attrs: { for: null, form: null, name: null, }, },
  p: S,
  param: { attrs: { name: null, value: null, }, },
  pre: S,
  progress: { attrs: { value: null, max: null, }, },
  q: { attrs: { cite: null, }, },
  rp: S,
  rt: S,
  ruby: S,
  samp: S,
  script: { attrs: { type: ['text/javascript',], src: null, async: ['async',], defer: ['defer',], charset: Charsets, }, },
  section: S,
  select: { attrs: { form: null, name: null, size: null, autofocus: ['autofocus',], disabled: ['disabled',], multiple: ['multiple',], }, },
  slot: { attrs: { name: null, }, },
  small: S,
  source: { attrs: { src: null, type: null, media: null, }, },
  span: S,
  strong: S,
  style: { attrs: { type: ['text/css',], media: null, scoped: null, }, },
  sub: S,
  summary: S,
  sup: S,
  table: S,
  tbody: S,
  td: { attrs: { colspan: null, rowspan: null, headers: null, }, },
  template: S,
  textarea: {
    attrs: {
      dirname: null,
      form: null,
      maxlength: null,
      name: null,
      placeholder: null,
      rows: null,
      cols: null,
      autofocus: ['autofocus',],
      disabled: ['disabled',],
      readonly: ['readonly',],
      required: ['required',],
      wrap: ['soft', 'hard',],
    },
  },
  tfoot: S,
  th: { attrs: { colspan: null, rowspan: null, headers: null, scope: ['row', 'col', 'rowgroup', 'colgroup',], }, },
  thead: S,
  time: { attrs: { datetime: null, }, },
  title: S,
  tr: S,
  track: {
    attrs: {
      src: null,
      label: null,
      default: null,
      kind: ['subtitles', 'captions', 'descriptions', 'chapters', 'metadata',],
      srclang: null,
    },
  },
  ul: { children: ['li', 'script', 'template', 'ul', 'ol',], },
  var: S,
  video: {
    attrs: {
      src: null,
      poster: null,
      width: null,
      height: null,
      crossorigin: ['anonymous', 'use-credentials',],
      preload: ['auto', 'metadata', 'none',],
      autoplay: ['autoplay',],
      mediagroup: ['movie',],
      muted: ['muted',],
      controls: ['controls',],
    },
  },
  wbr: S,
};
var GlobalAttrs = {
  accesskey: null,
  class: null,
  contenteditable: Bool,
  contextmenu: null,
  dir: ['ltr', 'rtl', 'auto',],
  draggable: ['true', 'false', 'auto',],
  dropzone: ['copy', 'move', 'link', 'string:', 'file:',],
  hidden: ['hidden',],
  id: null,
  inert: ['inert',],
  itemid: null,
  itemprop: null,
  itemref: null,
  itemscope: ['itemscope',],
  itemtype: null,
  lang: ['ar', 'bn', 'de', 'en-GB', 'en-US', 'es', 'fr', 'hi', 'id', 'ja', 'pa', 'pt', 'ru', 'tr', 'zh',],
  spellcheck: Bool,
  autocorrect: Bool,
  autocapitalize: Bool,
  style: null,
  tabindex: null,
  title: null,
  translate: ['yes', 'no',],
  rel: [
    'stylesheet',
    'alternate',
    'author',
    'bookmark',
    'help',
    'license',
    'next',
    'nofollow',
    'noreferrer',
    'prefetch',
    'prev',
    'search',
    'tag',
  ],
  role:
    /* @__PURE__ */ 'alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer'
      .split(' ',),
  'aria-activedescendant': null,
  'aria-atomic': Bool,
  'aria-autocomplete': ['inline', 'list', 'both', 'none',],
  'aria-busy': Bool,
  'aria-checked': ['true', 'false', 'mixed', 'undefined',],
  'aria-controls': null,
  'aria-describedby': null,
  'aria-disabled': Bool,
  'aria-dropeffect': null,
  'aria-expanded': ['true', 'false', 'undefined',],
  'aria-flowto': null,
  'aria-grabbed': ['true', 'false', 'undefined',],
  'aria-haspopup': Bool,
  'aria-hidden': Bool,
  'aria-invalid': ['true', 'false', 'grammar', 'spelling',],
  'aria-label': null,
  'aria-labelledby': null,
  'aria-level': null,
  'aria-live': ['off', 'polite', 'assertive',],
  'aria-multiline': Bool,
  'aria-multiselectable': Bool,
  'aria-owns': null,
  'aria-posinset': null,
  'aria-pressed': ['true', 'false', 'mixed', 'undefined',],
  'aria-readonly': Bool,
  'aria-relevant': null,
  'aria-required': Bool,
  'aria-selected': ['true', 'false', 'undefined',],
  'aria-setsize': null,
  'aria-sort': ['ascending', 'descending', 'none', 'other',],
  'aria-valuemax': null,
  'aria-valuemin': null,
  'aria-valuenow': null,
  'aria-valuetext': null,
};
var eventAttributes =
  /* @__PURE__ */ 'beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload'
    .split(' ',).map((n,) => 'on' + n);
for (let a of eventAttributes) GlobalAttrs[a] = null;
var Schema = class {
  constructor(extraTags, extraAttrs,) {
    this.tags = Object.assign(Object.assign({}, Tags,), extraTags,);
    this.globalAttrs = Object.assign(Object.assign({}, GlobalAttrs,), extraAttrs,);
    this.allTags = Object.keys(this.tags,);
    this.globalAttrNames = Object.keys(this.globalAttrs,);
  }
};
Schema.default = /* @__PURE__ */ new Schema();
function elementName2(doc, tree, max = doc.length,) {
  if (!tree) return '';
  let tag = tree.firstChild;
  let name = tag && tag.getChild('TagName',);
  return name ? doc.sliceString(name.from, Math.min(name.to, max,),) : '';
}
function findParentElement(tree, skip = false,) {
  for (; tree; tree = tree.parent) {
    if (tree.name == 'Element') {
      if (skip) skip = false;
      else return tree;
    }
  }
  return null;
}
function allowedChildren(doc, tree, schema,) {
  let parentInfo = schema.tags[elementName2(doc, findParentElement(tree,),)];
  return (parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.children) || schema.allTags;
}
function openTags(doc, tree,) {
  let open = [];
  for (let parent = findParentElement(tree,); parent && !parent.type.isTop; parent = findParentElement(parent.parent,)) {
    let tagName = elementName2(doc, parent,);
    if (tagName && parent.lastChild.name == 'CloseTag') break;
    if (tagName && open.indexOf(tagName,) < 0 && (tree.name == 'EndTag' || tree.from >= parent.firstChild.to)) open.push(tagName,);
  }
  return open;
}
var identifier3 = /^[:\-\.\w\u00b7-\uffff]*$/;
function completeTag(state, schema, tree, from, to,) {
  let end = /\s*>/.test(state.sliceDoc(to, to + 5,),) ? '' : '>';
  let parent = findParentElement(tree, true,);
  return {
    from,
    to,
    options: allowedChildren(state.doc, parent, schema,).map((tagName,) => ({ label: tagName, type: 'type', })).concat(
      openTags(state.doc, tree,).map((tag, i,) => ({ label: '/' + tag, apply: '/' + tag + end, type: 'type', boost: 99 - i, })),
    ),
    validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/,
  };
}
function completeCloseTag(state, tree, from, to,) {
  let end = /\s*>/.test(state.sliceDoc(to, to + 5,),) ? '' : '>';
  return {
    from,
    to,
    options: openTags(state.doc, tree,).map((tag, i,) => ({ label: tag, apply: tag + end, type: 'type', boost: 99 - i, })),
    validFor: identifier3,
  };
}
function completeStartTag(state, schema, tree, pos,) {
  let options = [], level = 0;
  for (let tagName of allowedChildren(state.doc, tree, schema,)) options.push({ label: '<' + tagName, type: 'type', },);
  for (let open of openTags(state.doc, tree,)) options.push({ label: '</' + open + '>', type: 'type', boost: 99 - level++, },);
  return { from: pos, to: pos, options, validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/, };
}
function completeAttrName(state, schema, tree, from, to,) {
  let elt = findParentElement(tree,), info = elt ? schema.tags[elementName2(state.doc, elt,)] : null;
  let localAttrs = info && info.attrs ? Object.keys(info.attrs,) : [];
  let names = info && info.globalAttrs === false
    ? localAttrs
    : localAttrs.length
    ? localAttrs.concat(schema.globalAttrNames,)
    : schema.globalAttrNames;
  return { from, to, options: names.map((attrName,) => ({ label: attrName, type: 'property', })), validFor: identifier3, };
}
function completeAttrValue(state, schema, tree, from, to,) {
  var _a;
  let nameNode = (_a = tree.parent) === null || _a === void 0 ? void 0 : _a.getChild('AttributeName',);
  let options = [], token = void 0;
  if (nameNode) {
    let attrName = state.sliceDoc(nameNode.from, nameNode.to,);
    let attrs = schema.globalAttrs[attrName];
    if (!attrs) {
      let elt = findParentElement(tree,), info = elt ? schema.tags[elementName2(state.doc, elt,)] : null;
      attrs = (info === null || info === void 0 ? void 0 : info.attrs) && info.attrs[attrName];
    }
    if (attrs) {
      let base = state.sliceDoc(from, to,).toLowerCase(), quoteStart = '"', quoteEnd = '"';
      if (/^['"]/.test(base,)) {
        token = base[0] == '"' ? /^[^"]*$/ : /^[^']*$/;
        quoteStart = '';
        quoteEnd = state.sliceDoc(to, to + 1,) == base[0] ? '' : base[0];
        base = base.slice(1,);
        from++;
      } else {
        token = /^[^\s<>='"]*$/;
      }
      for (let value of attrs) options.push({ label: value, apply: quoteStart + value + quoteEnd, type: 'constant', },);
    }
  }
  return { from, to, options, validFor: token, };
}
function htmlCompletionFor(schema, context,) {
  let { state, pos, } = context, around = syntaxTree(state,).resolveInner(pos,), tree = around.resolve(pos, -1,);
  for (let scan = pos, before; around == tree && (before = tree.childBefore(scan,));) {
    let last = before.lastChild;
    if (!last || !last.type.isError || last.from < last.to) break;
    around = tree = before;
    scan = last.from;
  }
  if (tree.name == 'TagName') {
    return tree.parent && /CloseTag$/.test(tree.parent.name,)
      ? completeCloseTag(state, tree, tree.from, pos,)
      : completeTag(state, schema, tree, tree.from, pos,);
  } else if (tree.name == 'StartTag') {
    return completeTag(state, schema, tree, pos, pos,);
  } else if (tree.name == 'StartCloseTag' || tree.name == 'IncompleteCloseTag') {
    return completeCloseTag(state, tree, pos, pos,);
  } else if (context.explicit && (tree.name == 'OpenTag' || tree.name == 'SelfClosingTag') || tree.name == 'AttributeName') {
    return completeAttrName(state, schema, tree, tree.name == 'AttributeName' ? tree.from : pos, pos,);
  } else if (tree.name == 'Is' || tree.name == 'AttributeValue' || tree.name == 'UnquotedAttributeValue') {
    return completeAttrValue(state, schema, tree, tree.name == 'Is' ? pos : tree.from, pos,);
  } else if (context.explicit && (around.name == 'Element' || around.name == 'Text' || around.name == 'Document')) {
    return completeStartTag(state, schema, tree, pos,);
  } else {
    return null;
  }
}
function htmlCompletionSourceWith(config,) {
  let { extraTags, extraGlobalAttributes: extraAttrs, } = config;
  let schema = extraAttrs || extraTags ? new Schema(extraTags, extraAttrs,) : Schema.default;
  return (context,) => htmlCompletionFor(schema, context,);
}
var defaultNesting = [
  {
    tag: 'script',
    attrs: (attrs,) => attrs.type == 'text/typescript' || attrs.lang == 'ts',
    parser: typescriptLanguage.parser,
  },
  { tag: 'script', attrs: (attrs,) => attrs.type == 'text/babel' || attrs.type == 'text/jsx', parser: jsxLanguage.parser, },
  { tag: 'script', attrs: (attrs,) => attrs.type == 'text/typescript-jsx', parser: tsxLanguage.parser, },
  {
    tag: 'script',
    attrs(attrs,) {
      return !attrs.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(attrs.type,);
    },
    parser: javascriptLanguage.parser,
  },
  {
    tag: 'style',
    attrs(attrs,) {
      return (!attrs.lang || attrs.lang == 'css') && (!attrs.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(attrs.type,));
    },
    parser: cssLanguage.parser,
  },
];
var defaultAttrs = /* @__PURE__ */ [{ name: 'style', parser: /* @__PURE__ */ cssLanguage.parser.configure({ top: 'Styles', },), },].concat(
  /* @__PURE__ */ eventAttributes.map((name,) => ({ name, parser: javascriptLanguage.parser, })),
);
var htmlPlain = /* @__PURE__ */ LRLanguage.define({
  name: 'html',
  parser: /* @__PURE__ */ parser2.configure({
    props: [
      /* @__PURE__ */ indentNodeProp.add({
        Element(context,) {
          let after = /^(\s*)(<\/)?/.exec(context.textAfter,);
          if (context.node.to <= context.pos + after[0].length) return context.continue();
          return context.lineIndent(context.node.from,) + (after[2] ? 0 : context.unit);
        },
        'OpenTag CloseTag SelfClosingTag'(context,) {
          return context.column(context.node.from,) + context.unit;
        },
        Document(context,) {
          if (context.pos + /\s*/.exec(context.textAfter,)[0].length < context.node.to) return context.continue();
          let endElt = null, close;
          for (let cur = context.node;;) {
            let last = cur.lastChild;
            if (!last || last.name != 'Element' || last.to != cur.to) break;
            endElt = cur = last;
          }
          if (endElt && !((close = endElt.lastChild) && (close.name == 'CloseTag' || close.name == 'SelfClosingTag'))) {
            return context.lineIndent(endElt.from,) + context.unit;
          }
          return null;
        },
      },),
      /* @__PURE__ */ foldNodeProp.add({
        Element(node,) {
          let first = node.firstChild, last = node.lastChild;
          if (!first || first.name != 'OpenTag') return null;
          return { from: first.to, to: last.name == 'CloseTag' ? last.from : node.to, };
        },
      },),
      /* @__PURE__ */ bracketMatchingHandle.add({ 'OpenTag CloseTag': (node,) => node.getChild('TagName',), },),
    ],
  },),
  languageData: { commentTokens: { block: { open: '<!--', close: '-->', }, }, indentOnInput: /^\s*<\/\w+\W$/, wordChars: '-._', },
},);
var htmlLanguage = /* @__PURE__ */ htmlPlain.configure({ wrap: /* @__PURE__ */ configureNesting(defaultNesting, defaultAttrs,), },);
function html(config = {},) {
  let dialect = '', wrap;
  if (config.matchClosingTags === false) dialect = 'noMatch';
  if (config.selfClosingTags === true) dialect = (dialect ? dialect + ' ' : '') + 'selfClosing';
  if (config.nestedLanguages && config.nestedLanguages.length || config.nestedAttributes && config.nestedAttributes.length) {
    wrap = configureNesting((config.nestedLanguages || []).concat(defaultNesting,), (config.nestedAttributes || []).concat(defaultAttrs,),);
  }
  let lang = wrap ? htmlPlain.configure({ wrap, dialect, },) : dialect ? htmlLanguage.configure({ dialect, },) : htmlLanguage;
  return new LanguageSupport(lang, [
    htmlLanguage.data.of({ autocomplete: htmlCompletionSourceWith(config,), },),
    config.autoCloseTags !== false ? autoCloseTags2 : [],
    javascript().support,
    css().support,
  ],);
}
var selfClosers2 = /* @__PURE__ */ new Set(
  /* @__PURE__ */ 'area base br col command embed frame hr img input keygen link meta param source track wbr menuitem'.split(' ',),
);
var autoCloseTags2 = /* @__PURE__ */ EditorView.inputHandler.of((view, from, to, text,) => {
  if (
    view.composing || view.state.readOnly || from != to || text != '>' && text != '/' || !htmlLanguage.isActiveAt(view.state, from, -1,)
  ) return false;
  let { state, } = view;
  let changes = state.changeByRange((range,) => {
    var _a, _b, _c;
    let { head, } = range, around = syntaxTree(state,).resolveInner(head, -1,), name;
    if (around.name == 'TagName' || around.name == 'StartTag') around = around.parent;
    if (text == '>' && around.name == 'OpenTag') {
      if (
        ((_b = (_a = around.parent) === null || _a === void 0 ? void 0 : _a.lastChild) === null || _b === void 0 ? void 0 : _b.name) !=
          'CloseTag' && (name = elementName2(state.doc, around.parent, head,)) && !selfClosers2.has(name,)
      ) {
        let hasRightBracket = view.state.doc.sliceString(head, head + 1,) === '>';
        let insert = `${hasRightBracket ? '' : '>'}</${name}>`;
        return { range: EditorSelection.cursor(head + 1,), changes: { from: head + (hasRightBracket ? 1 : 0), insert, }, };
      }
    } else if (text == '/' && around.name == 'OpenTag') {
      let empty = around.parent, base = empty === null || empty === void 0 ? void 0 : empty.parent;
      if (
        empty.from == head - 1 && ((_c = base.lastChild) === null || _c === void 0 ? void 0 : _c.name) != 'CloseTag' &&
        (name = elementName2(state.doc, base, head,)) && !selfClosers2.has(name,)
      ) {
        let hasRightBracket1 = view.state.doc.sliceString(head, head + 1,) === '>';
        let insert1 = `/${name}${hasRightBracket1 ? '' : '>'}`;
        let pos = head + insert1.length + (hasRightBracket1 ? 1 : 0);
        return { range: EditorSelection.cursor(pos,), changes: { from: head, insert: insert1, }, };
      }
    }
    return { range, };
  },);
  if (changes.changes.empty) return false;
  view.dispatch(changes, { userEvent: 'input.type', scrollIntoView: true, },);
  return true;
},);

export { css, html, htmlLanguage, javascript, javascriptLanguage, };
