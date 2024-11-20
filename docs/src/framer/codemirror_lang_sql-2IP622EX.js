// @ts-nocheck
/* eslint-disable */
import { completeFromList, ifNotIn, } from './chunk-RD5SFWJ7.js';
import {
  continuedIndent,
  ExternalTokenizer,
  foldNodeProp,
  indentNodeProp,
  LanguageSupport,
  LRLanguage,
  LRParser,
  styleTags,
  syntaxTree,
  tags,
} from './chunk-QHDV5QG3.js';
import './chunk-RUAN5HWR.js';

// https :https://framerusercontent.com/modules/ErpiHuOpMsJgQursm47q/uyWXpN0RN41fZeXKclFO/codemirror_lang_sql.js
var whitespace = 36;
var LineComment = 1;
var BlockComment = 2;
var String$1 = 3;
var Number = 4;
var Bool = 5;
var Null = 6;
var ParenL = 7;
var ParenR = 8;
var BraceL = 9;
var BraceR = 10;
var BracketL = 11;
var BracketR = 12;
var Semi = 13;
var Dot = 14;
var Operator = 15;
var Punctuation = 16;
var SpecialVar = 17;
var Identifier = 18;
var QuotedIdentifier = 19;
var Keyword = 20;
var Type = 21;
var Bits = 22;
var Bytes = 23;
var Builtin = 24;
function isAlpha(ch,) {
  return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 48 && ch <= 57;
}
function isHexDigit(ch,) {
  return ch >= 48 && ch <= 57 || ch >= 97 && ch <= 102 || ch >= 65 && ch <= 70;
}
function readLiteral(input, endQuote, backslashEscapes,) {
  for (let escaped = false;;) {
    if (input.next < 0) return;
    if (input.next == endQuote && !escaped) {
      input.advance();
      return;
    }
    escaped = backslashEscapes && !escaped && input.next == 92;
    input.advance();
  }
}
function readDoubleDollarLiteral(input,) {
  for (;;) {
    if (input.next < 0 || input.peek(1,) < 0) return;
    if (input.next == 36 && input.peek(1,) == 36) {
      input.advance(2,);
      return;
    }
    input.advance();
  }
}
function readWord(input, result,) {
  for (;;) {
    if (input.next != 95 && !isAlpha(input.next,)) break;
    if (result != null) result += String.fromCharCode(input.next,);
    input.advance();
  }
  return result;
}
function readWordOrQuoted(input,) {
  if (input.next == 39 || input.next == 34 || input.next == 96) {
    let quote = input.next;
    input.advance();
    readLiteral(input, quote, false,);
  } else {
    readWord(input,);
  }
}
function readBits(input, endQuote,) {
  while (input.next == 48 || input.next == 49) input.advance();
  if (endQuote && input.next == endQuote) input.advance();
}
function readNumber(input, sawDot,) {
  for (;;) {
    if (input.next == 46) {
      if (sawDot) break;
      sawDot = true;
    } else if (input.next < 48 || input.next > 57) {
      break;
    }
    input.advance();
  }
  if (input.next == 69 || input.next == 101) {
    input.advance();
    if (input.next == 43 || input.next == 45) input.advance();
    while (input.next >= 48 && input.next <= 57) input.advance();
  }
}
function eol(input,) {
  while (!(input.next < 0 || input.next == 10)) input.advance();
}
function inString(ch, str,) {
  for (let i = 0; i < str.length; i++) if (str.charCodeAt(i,) == ch) return true;
  return false;
}
var Space = ' 	\r\n';
function keywords(keywords2, types, builtin,) {
  let result = /* @__PURE__ */ Object.create(null,);
  result['true'] = result['false'] = Bool;
  result['null'] = result['unknown'] = Null;
  for (let kw of keywords2.split(' ',)) if (kw) result[kw] = Keyword;
  for (let tp of types.split(' ',)) if (tp) result[tp] = Type;
  for (let kw1 of (builtin || '').split(' ',)) if (kw1) result[kw1] = Builtin;
  return result;
}
var SQLTypes =
  'array binary bit boolean char character clob date decimal double float int integer interval large national nchar nclob numeric object precision real smallint time timestamp varchar varying ';
var SQLKeywords =
  'absolute action add after all allocate alter and any are as asc assertion at authorization before begin between both breadth by call cascade cascaded case cast catalog check close collate collation column commit condition connect connection constraint constraints constructor continue corresponding count create cross cube current current_date current_default_transform_group current_transform_group_for_type current_path current_role current_time current_timestamp current_user cursor cycle data day deallocate declare default deferrable deferred delete depth deref desc describe descriptor deterministic diagnostics disconnect distinct do domain drop dynamic each else elseif end end-exec equals escape except exception exec execute exists exit external fetch first for foreign found from free full function general get global go goto grant group grouping handle having hold hour identity if immediate in indicator initially inner inout input insert intersect into is isolation join key language last lateral leading leave left level like limit local localtime localtimestamp locator loop map match method minute modifies module month names natural nesting new next no none not of old on only open option or order ordinality out outer output overlaps pad parameter partial path prepare preserve primary prior privileges procedure public read reads recursive redo ref references referencing relative release repeat resignal restrict result return returns revoke right role rollback rollup routine row rows savepoint schema scroll search second section select session session_user set sets signal similar size some space specific specifictype sql sqlexception sqlstate sqlwarning start state static system_user table temporary then timezone_hour timezone_minute to trailing transaction translation treat trigger under undo union unique unnest until update usage user using value values view when whenever where while with without work write year zone ';
var defaults = {
  backslashEscapes: false,
  hashComments: false,
  spaceAfterDashes: false,
  slashComments: false,
  doubleQuotedStrings: false,
  doubleDollarQuotedStrings: false,
  unquotedBitLiterals: false,
  treatBitsAsBytes: false,
  charSetCasts: false,
  operatorChars: '*+-%<>!=&|~^/',
  specialVar: '?',
  identifierQuotes: '"',
  words: /* @__PURE__ */ keywords(SQLKeywords, SQLTypes,),
};
function dialect(spec, kws, types, builtin,) {
  let dialect2 = {};
  for (let prop in defaults) dialect2[prop] = (spec.hasOwnProperty(prop,) ? spec : defaults)[prop];
  if (kws) dialect2.words = keywords(kws, types || '', builtin,);
  return dialect2;
}
function tokensFor(d,) {
  return new ExternalTokenizer((input,) => {
    var _a;
    let { next, } = input;
    input.advance();
    if (inString(next, Space,)) {
      while (inString(input.next, Space,)) input.advance();
      input.acceptToken(whitespace,);
    } else if (next == 36 && input.next == 36 && d.doubleDollarQuotedStrings) {
      readDoubleDollarLiteral(input,);
      input.acceptToken(String$1,);
    } else if (next == 39 || next == 34 && d.doubleQuotedStrings) {
      readLiteral(input, next, d.backslashEscapes,);
      input.acceptToken(String$1,);
    } else if (next == 35 && d.hashComments || next == 47 && input.next == 47 && d.slashComments) {
      eol(input,);
      input.acceptToken(LineComment,);
    } else if (next == 45 && input.next == 45 && (!d.spaceAfterDashes || input.peek(1,) == 32)) {
      eol(input,);
      input.acceptToken(LineComment,);
    } else if (next == 47 && input.next == 42) {
      input.advance();
      for (let depth = 1;;) {
        let cur = input.next;
        if (input.next < 0) break;
        input.advance();
        if (cur == 42 && input.next == 47) {
          depth--;
          input.advance();
          if (!depth) break;
        } else if (cur == 47 && input.next == 42) {
          depth++;
          input.advance();
        }
      }
      input.acceptToken(BlockComment,);
    } else if ((next == 101 || next == 69) && input.next == 39) {
      input.advance();
      readLiteral(input, 39, true,);
    } else if ((next == 110 || next == 78) && input.next == 39 && d.charSetCasts) {
      input.advance();
      readLiteral(input, 39, d.backslashEscapes,);
      input.acceptToken(String$1,);
    } else if (next == 95 && d.charSetCasts) {
      for (let i = 0;; i++) {
        if (input.next == 39 && i > 1) {
          input.advance();
          readLiteral(input, 39, d.backslashEscapes,);
          input.acceptToken(String$1,);
          break;
        }
        if (!isAlpha(input.next,)) break;
        input.advance();
      }
    } else if (next == 40) {
      input.acceptToken(ParenL,);
    } else if (next == 41) {
      input.acceptToken(ParenR,);
    } else if (next == 123) {
      input.acceptToken(BraceL,);
    } else if (next == 125) {
      input.acceptToken(BraceR,);
    } else if (next == 91) {
      input.acceptToken(BracketL,);
    } else if (next == 93) {
      input.acceptToken(BracketR,);
    } else if (next == 59) {
      input.acceptToken(Semi,);
    } else if (d.unquotedBitLiterals && next == 48 && input.next == 98) {
      input.advance();
      readBits(input,);
      input.acceptToken(Bits,);
    } else if ((next == 98 || next == 66) && (input.next == 39 || input.next == 34)) {
      const quoteStyle = input.next;
      input.advance();
      if (d.treatBitsAsBytes) {
        readLiteral(input, quoteStyle, d.backslashEscapes,);
        input.acceptToken(Bytes,);
      } else {
        readBits(input, quoteStyle,);
        input.acceptToken(Bits,);
      }
    } else if (next == 48 && (input.next == 120 || input.next == 88) || (next == 120 || next == 88) && input.next == 39) {
      let quoted = input.next == 39;
      input.advance();
      while (isHexDigit(input.next,)) input.advance();
      if (quoted && input.next == 39) input.advance();
      input.acceptToken(Number,);
    } else if (next == 46 && input.next >= 48 && input.next <= 57) {
      readNumber(input, true,);
      input.acceptToken(Number,);
    } else if (next == 46) {
      input.acceptToken(Dot,);
    } else if (next >= 48 && next <= 57) {
      readNumber(input, false,);
      input.acceptToken(Number,);
    } else if (inString(next, d.operatorChars,)) {
      while (inString(input.next, d.operatorChars,)) input.advance();
      input.acceptToken(Operator,);
    } else if (inString(next, d.specialVar,)) {
      if (input.next == next) input.advance();
      readWordOrQuoted(input,);
      input.acceptToken(SpecialVar,);
    } else if (inString(next, d.identifierQuotes,)) {
      readLiteral(input, next, false,);
      input.acceptToken(QuotedIdentifier,);
    } else if (next == 58 || next == 44) {
      input.acceptToken(Punctuation,);
    } else if (isAlpha(next,)) {
      let word = readWord(input, String.fromCharCode(next,),);
      input.acceptToken(input.next == 46 ? Identifier : (_a = d.words[word.toLowerCase()]) !== null && _a !== void 0 ? _a : Identifier,);
    }
  },);
}
var tokens = /* @__PURE__ */ tokensFor(defaults,);
var parser$1 = /* @__PURE__ */ LRParser.deserialize({
  version: 14,
  states:
    '%vQ]QQOOO#wQRO\'#DSO$OQQO\'#CwO%eQQO\'#CxO%lQQO\'#CyO%sQQO\'#CzOOQQ\'#DS\'#DSOOQQ\'#C}\'#C}O\'UQRO\'#C{OOQQ\'#Cv\'#CvOOQQ\'#C|\'#C|Q]QQOOQOQQOOO\'`QQO\'#DOO(xQRO,59cO)PQQO,59cO)UQQO\'#DSOOQQ,59d,59dO)cQQO,59dOOQQ,59e,59eO)jQQO,59eOOQQ,59f,59fO)qQQO,59fOOQQ-E6{-E6{OOQQ,59b,59bOOQQ-E6z-E6zOOQQ,59j,59jOOQQ-E6|-E6|O+VQRO1G.}O+^QQO,59cOOQQ1G/O1G/OOOQQ1G/P1G/POOQQ1G/Q1G/QP+kQQO\'#C}O+rQQO1G.}O)PQQO,59cO,PQQO\'#Cw',
  stateData:
    ',[~OtOSPOSQOS~ORUOSUOTUOUUOVROXSOZTO]XO^QO_UO`UOaPObPOcPOdUOeUOfUOgUOhUO~O^]ORvXSvXTvXUvXVvXXvXZvX]vX_vX`vXavXbvXcvXdvXevXfvXgvXhvX~OsvX~P!jOa_Ob_Oc_O~ORUOSUOTUOUUOVROXSOZTO^tO_UO`UOa`Ob`Oc`OdUOeUOfUOgUOhUO~OWaO~P$ZOYcO~P$ZO[eO~P$ZORUOSUOTUOUUOVROXSOZTO^QO_UO`UOaPObPOcPOdUOeUOfUOgUOhUO~O]hOsoX~P%zOajObjOcjO~O^]ORkaSkaTkaUkaVkaXkaZka]ka_ka`kaakabkackadkaekafkagkahka~Oska~P\'kO^]O~OWvXYvX[vX~P!jOWnO~P$ZOYoO~P$ZO[pO~P$ZO^]ORkiSkiTkiUkiVkiXkiZki]ki_ki`kiakibkickidkiekifkigkihki~Oski~P)xOWkaYka[ka~P\'kO]hO~P$ZOWkiYki[ki~P)xOasObsOcsO~O',
  goto: '#hwPPPPPPPPPPPPPPPPPPPPPPPPPPx||||!Y!^!d!xPPP#[TYOZeUORSTWZbdfqT[OZQZORiZSWOZQbRQdSQfTZgWbdfqQ^PWk^lmrQl_Qm`RrseVORSTWZbdfq',
  nodeNames:
    '\u26A0 LineComment BlockComment String Number Bool Null ( ) { } [ ] ; . Operator Punctuation SpecialVar Identifier QuotedIdentifier Keyword Type Bits Bytes Builtin Script Statement CompositeIdentifier Parens Braces Brackets Statement',
  maxTerm: 38,
  skippedNodes: [0, 1, 2,],
  repeatNodeCount: 3,
  tokenData: 'RORO',
  tokenizers: [0, tokens,],
  topRules: { Script: [0, 25,], },
  tokenPrec: 0,
},);
function tokenBefore(tree,) {
  let cursor = tree.cursor().moveTo(tree.from, -1,);
  while (/Comment/.test(cursor.name,)) cursor.moveTo(cursor.from, -1,);
  return cursor.node;
}
function idName(doc, node,) {
  let text = doc.sliceString(node.from, node.to,);
  let quoted = /^([`'"])(.*)\1$/.exec(text,);
  return quoted ? quoted[2] : text;
}
function plainID(node,) {
  return node && (node.name == 'Identifier' || node.name == 'QuotedIdentifier');
}
function pathFor(doc, id,) {
  if (id.name == 'CompositeIdentifier') {
    let path = [];
    for (let ch = id.firstChild; ch; ch = ch.nextSibling) if (plainID(ch,)) path.push(idName(doc, ch,),);
    return path;
  }
  return [idName(doc, id,),];
}
function parentsFor(doc, node,) {
  for (let path = [];;) {
    if (!node || node.name != '.') return path;
    let name = tokenBefore(node,);
    if (!plainID(name,)) return path;
    path.unshift(idName(doc, name,),);
    node = tokenBefore(name,);
  }
}
function sourceContext(state, startPos,) {
  let pos = syntaxTree(state,).resolveInner(startPos, -1,);
  let aliases = getAliases(state.doc, pos,);
  if (pos.name == 'Identifier' || pos.name == 'QuotedIdentifier' || pos.name == 'Keyword') {
    return {
      from: pos.from,
      quoted: pos.name == 'QuotedIdentifier' ? state.doc.sliceString(pos.from, pos.from + 1,) : null,
      parents: parentsFor(state.doc, tokenBefore(pos,),),
      aliases,
    };
  }
  if (pos.name == '.') {
    return { from: startPos, quoted: null, parents: parentsFor(state.doc, pos,), aliases, };
  } else {
    return { from: startPos, quoted: null, parents: [], empty: true, aliases, };
  }
}
var EndFrom = /* @__PURE__ */ new Set(
  /* @__PURE__ */ 'where group having order union intersect except all distinct limit offset fetch for'.split(' ',),
);
function getAliases(doc, at,) {
  let statement;
  for (let parent = at; !statement; parent = parent.parent) {
    if (!parent) return null;
    if (parent.name == 'Statement') statement = parent;
  }
  let aliases = null;
  for (let scan = statement.firstChild, sawFrom = false, prevID = null; scan; scan = scan.nextSibling) {
    let kw = scan.name == 'Keyword' ? doc.sliceString(scan.from, scan.to,).toLowerCase() : null;
    let alias = null;
    if (!sawFrom) {
      sawFrom = kw == 'from';
    } else if (kw == 'as' && prevID && plainID(scan.nextSibling,)) {
      alias = idName(doc, scan.nextSibling,);
    } else if (kw && EndFrom.has(kw,)) {
      break;
    } else if (prevID && plainID(scan,)) {
      alias = idName(doc, scan,);
    }
    if (alias) {
      if (!aliases) aliases = /* @__PURE__ */ Object.create(null,);
      aliases[alias] = pathFor(doc, prevID,);
    }
    prevID = /Identifier$/.test(scan.name,) ? scan : null;
  }
  return aliases;
}
function maybeQuoteCompletions(quote, completions,) {
  if (!quote) return completions;
  return completions.map((c,) => Object.assign(Object.assign({}, c,), { label: quote + c.label + quote, apply: void 0, },));
}
var Span = /^\w*$/;
var QuotedSpan = /^[`'"]?\w*[`'"]?$/;
var CompletionLevel = class {
  child(name,) {
    let children = this.children || (this.children = /* @__PURE__ */ Object.create(null,));
    return children[name] || (children[name] = new CompletionLevel());
  }
  childCompletions(type,) {
    return this.children ? Object.keys(this.children,).filter((x,) => x).map((name,) => ({ label: name, type, })) : [];
  }
  constructor() {
    this.list = [];
    this.children = void 0;
  }
};
function completeFromSchema(schema, tables, schemas, defaultTableName, defaultSchemaName,) {
  let top = new CompletionLevel();
  let defaultSchema = top.child(defaultSchemaName || '',);
  for (let table in schema) {
    let dot = table.indexOf('.',);
    let schemaCompletions = dot > -1 ? top.child(table.slice(0, dot,),) : defaultSchema;
    let tableCompletions = schemaCompletions.child(dot > -1 ? table.slice(dot + 1,) : table,);
    tableCompletions.list = schema[table].map((val,) => typeof val == 'string' ? { label: val, type: 'property', } : val);
  }
  defaultSchema.list = (tables || defaultSchema.childCompletions('type',)).concat(
    defaultTableName ? defaultSchema.child(defaultTableName,).list : [],
  );
  for (let sName in top.children) {
    let schema2 = top.child(sName,);
    if (!schema2.list.length) schema2.list = schema2.childCompletions('type',);
  }
  top.list = defaultSchema.list.concat(schemas || top.childCompletions('type',),);
  return (context,) => {
    let { parents, from, quoted, empty, aliases, } = sourceContext(context.state, context.pos,);
    if (empty && !context.explicit) return null;
    if (aliases && parents.length == 1) parents = aliases[parents[0]] || parents;
    let level = top;
    for (let name of parents) {
      while (!level.children || !level.children[name]) {
        if (level == top) level = defaultSchema;
        else if (level == defaultSchema && defaultTableName) level = level.child(defaultTableName,);
        else return null;
      }
      level = level.child(name,);
    }
    let quoteAfter = quoted && context.state.sliceDoc(context.pos, context.pos + 1,) == quoted;
    let options = level.list;
    if (level == top && aliases) options = options.concat(Object.keys(aliases,).map((name,) => ({ label: name, type: 'constant', })),);
    return {
      from,
      to: quoteAfter ? context.pos + 1 : void 0,
      options: maybeQuoteCompletions(quoted, options,),
      validFor: quoted ? QuotedSpan : Span,
    };
  };
}
function completeKeywords(keywords2, upperCase,) {
  let completions = Object.keys(keywords2,).map((keyword,) => ({
    label: upperCase ? keyword.toUpperCase() : keyword,
    type: keywords2[keyword] == Type ? 'type' : keywords2[keyword] == Keyword ? 'keyword' : 'variable',
    boost: -1,
  }));
  return ifNotIn(['QuotedIdentifier', 'SpecialVar', 'String', 'LineComment', 'BlockComment', '.',], completeFromList(completions,),);
}
var parser = /* @__PURE__ */ parser$1.configure({
  props: [
    /* @__PURE__ */ indentNodeProp.add({ Statement: /* @__PURE__ */ continuedIndent(), },),
    /* @__PURE__ */ foldNodeProp.add({
      Statement(tree,) {
        return { from: tree.firstChild.to, to: tree.to, };
      },
      BlockComment(tree,) {
        return { from: tree.from + 2, to: tree.to - 2, };
      },
    },),
    /* @__PURE__ */ styleTags({
      Keyword: tags.keyword,
      Type: tags.typeName,
      Builtin: /* @__PURE__ */ tags.standard(tags.name,),
      Bits: tags.number,
      Bytes: tags.string,
      Bool: tags.bool,
      Null: tags.null,
      Number: tags.number,
      String: tags.string,
      Identifier: tags.name,
      QuotedIdentifier: /* @__PURE__ */ tags.special(tags.string,),
      SpecialVar: /* @__PURE__ */ tags.special(tags.name,),
      LineComment: tags.lineComment,
      BlockComment: tags.blockComment,
      Operator: tags.operator,
      'Semi Punctuation': tags.punctuation,
      '( )': tags.paren,
      '{ }': tags.brace,
      '[ ]': tags.squareBracket,
    },),
  ],
},);
var SQLDialect = class {
  /**
  Returns the language for this dialect as an extension.
  */
  get extension() {
    return this.language.extension;
  }
  /**
  Define a new dialect.
  */
  static define(spec,) {
    let d = dialect(spec, spec.keywords, spec.types, spec.builtin,);
    let language = LRLanguage.define({
      name: 'sql',
      parser: parser.configure({ tokenizers: [{ from: tokens, to: tokensFor(d,), },], },),
      languageData: {
        commentTokens: { line: '--', block: { open: '/*', close: '*/', }, },
        closeBrackets: { brackets: ['(', '[', '{', '\'', '"', '`',], },
      },
    },);
    return new SQLDialect(d, language, spec,);
  }
  constructor(dialect2, language, spec,) {
    this.dialect = dialect2;
    this.language = language;
    this.spec = spec;
  }
};
function keywordCompletionSource(dialect2, upperCase = false,) {
  return completeKeywords(dialect2.dialect.words, upperCase,);
}
function keywordCompletion(dialect2, upperCase = false,) {
  return dialect2.language.data.of({ autocomplete: keywordCompletionSource(dialect2, upperCase,), },);
}
function schemaCompletionSource(config,) {
  return config.schema
    ? completeFromSchema(config.schema, config.tables, config.schemas, config.defaultTable, config.defaultSchema,)
    : () => null;
}
function schemaCompletion(config,) {
  return config.schema ? (config.dialect || StandardSQL).language.data.of({ autocomplete: schemaCompletionSource(config,), },) : [];
}
function sql(config = {},) {
  let lang = config.dialect || StandardSQL;
  return new LanguageSupport(lang.language, [schemaCompletion(config,), keywordCompletion(lang, !!config.upperCaseKeywords,),],);
}
var StandardSQL = /* @__PURE__ */ SQLDialect.define({},);
var PostgreSQL = /* @__PURE__ */ SQLDialect.define({
  charSetCasts: true,
  doubleDollarQuotedStrings: true,
  operatorChars: '+-*/<>=~!@#%^&|`?',
  specialVar: '',
  keywords: SQLKeywords +
    'a abort abs absent access according ada admin aggregate alias also always analyse analyze array_agg array_max_cardinality asensitive assert assignment asymmetric atomic attach attribute attributes avg backward base64 begin_frame begin_partition bernoulli bit_length blocked bom c cache called cardinality catalog_name ceil ceiling chain char_length character_length character_set_catalog character_set_name character_set_schema characteristics characters checkpoint class class_origin cluster coalesce cobol collation_catalog collation_name collation_schema collect column_name columns command_function command_function_code comment comments committed concurrently condition_number configuration conflict connection_name constant constraint_catalog constraint_name constraint_schema contains content control conversion convert copy corr cost covar_pop covar_samp csv cume_dist current_catalog current_row current_schema cursor_name database datalink datatype datetime_interval_code datetime_interval_precision db debug defaults defined definer degree delimiter delimiters dense_rank depends derived detach detail dictionary disable discard dispatch dlnewcopy dlpreviouscopy dlurlcomplete dlurlcompleteonly dlurlcompletewrite dlurlpath dlurlpathonly dlurlpathwrite dlurlscheme dlurlserver dlvalue document dump dynamic_function dynamic_function_code element elsif empty enable encoding encrypted end_frame end_partition endexec enforced enum errcode error event every exclude excluding exclusive exp explain expression extension extract family file filter final first_value flag floor following force foreach fortran forward frame_row freeze fs functions fusion g generated granted greatest groups handler header hex hierarchy hint id ignore ilike immediately immutable implementation implicit import include including increment indent index indexes info inherit inherits inline insensitive instance instantiable instead integrity intersection invoker isnull k key_member key_type label lag last_value lead leakproof least length library like_regex link listen ln load location lock locked log logged lower m mapping matched materialized max max_cardinality maxvalue member merge message message_length message_octet_length message_text min minvalue mod mode more move multiset mumps name namespace nfc nfd nfkc nfkd nil normalize normalized nothing notice notify notnull nowait nth_value ntile nullable nullif nulls number occurrences_regex octet_length octets off offset oids operator options ordering others over overlay overriding owned owner p parallel parameter_mode parameter_name parameter_ordinal_position parameter_specific_catalog parameter_specific_name parameter_specific_schema parser partition pascal passing passthrough password percent percent_rank percentile_cont percentile_disc perform period permission pg_context pg_datatype_name pg_exception_context pg_exception_detail pg_exception_hint placing plans pli policy portion position position_regex power precedes preceding prepared print_strict_params procedural procedures program publication query quote raise range rank reassign recheck recovery refresh regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy regr_syy reindex rename repeatable replace replica requiring reset respect restart restore result_oid returned_cardinality returned_length returned_octet_length returned_sqlstate returning reverse routine_catalog routine_name routine_schema routines row_count row_number rowtype rule scale schema_name schemas scope scope_catalog scope_name scope_schema security selective self sensitive sequence sequences serializable server server_name setof share show simple skip slice snapshot source specific_name sqlcode sqlerror sqrt stable stacked standalone statement statistics stddev_pop stddev_samp stdin stdout storage strict strip structure style subclass_origin submultiset subscription substring substring_regex succeeds sum symmetric sysid system system_time t table_name tables tablesample tablespace temp template ties token top_level_count transaction_active transactions_committed transactions_rolled_back transform transforms translate translate_regex trigger_catalog trigger_name trigger_schema trim trim_array truncate trusted type types uescape unbounded uncommitted unencrypted unlink unlisten unlogged unnamed untyped upper uri use_column use_variable user_defined_type_catalog user_defined_type_code user_defined_type_name user_defined_type_schema vacuum valid validate validator value_of var_pop var_samp varbinary variable_conflict variadic verbose version versioning views volatile warning whitespace width_bucket window within wrapper xmlagg xmlattributes xmlbinary xmlcast xmlcomment xmlconcat xmldeclaration xmldocument xmlelement xmlexists xmlforest xmliterate xmlnamespaces xmlparse xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltext xmlvalidate yes',
  types: SQLTypes +
    'bigint int8 bigserial serial8 varbit bool box bytea cidr circle precision float8 inet int4 json jsonb line lseg macaddr macaddr8 money numeric pg_lsn point polygon float4 int2 smallserial serial2 serial serial4 text timetz timestamptz tsquery tsvector txid_snapshot uuid xml',
},);
var MySQLKeywords =
  'accessible algorithm analyze asensitive authors auto_increment autocommit avg avg_row_length binlog btree cache catalog_name chain change changed checkpoint checksum class_origin client_statistics coalesce code collations columns comment committed completion concurrent consistent contains contributors convert database databases day_hour day_microsecond day_minute day_second delay_key_write delayed delimiter des_key_file dev_pop dev_samp deviance directory disable discard distinctrow div dual dumpfile enable enclosed ends engine engines enum errors escaped even event events every explain extended fast field fields flush force found_rows fulltext grants handler hash high_priority hosts hour_microsecond hour_minute hour_second ignore ignore_server_ids import index index_statistics infile innodb insensitive insert_method install invoker iterate keys kill linear lines list load lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modify mutex mysql_errno no_write_to_binlog offline offset one online optimize optionally outfile pack_keys parser partition partitions password phase plugin plugins prev processlist profile profiles purge query quick range read_write rebuild recover regexp relaylog remove rename reorganize repair repeatable replace require resume rlike row_format rtree schedule schema_name schemas second_microsecond security sensitive separator serializable server share show slave slow snapshot soname spatial sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result ssl starting starts std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace terminated triggers truncate uncommitted uninstall unlock upgrade use use_frm user_resources user_statistics utc_date utc_time utc_timestamp variables views warnings xa xor year_month zerofill';
var MySQLTypes = SQLTypes +
  'bool blob long longblob longtext medium mediumblob mediumint mediumtext tinyblob tinyint tinytext text bigint int1 int2 int3 int4 int8 float4 float8 varbinary varcharacter precision datetime unsigned signed';
var MySQLBuiltin = 'charset clear edit ego help nopager notee nowarning pager print prompt quit rehash source status system tee';
var MySQL = /* @__PURE__ */ SQLDialect.define({
  operatorChars: '*+-%<>!=&|^',
  charSetCasts: true,
  doubleQuotedStrings: true,
  unquotedBitLiterals: true,
  hashComments: true,
  spaceAfterDashes: true,
  specialVar: '@?',
  identifierQuotes: '`',
  keywords: SQLKeywords + 'group_concat ' + MySQLKeywords,
  types: MySQLTypes,
  builtin: MySQLBuiltin,
},);
var MariaSQL = /* @__PURE__ */ SQLDialect.define({
  operatorChars: '*+-%<>!=&|^',
  charSetCasts: true,
  doubleQuotedStrings: true,
  unquotedBitLiterals: true,
  hashComments: true,
  spaceAfterDashes: true,
  specialVar: '@?',
  identifierQuotes: '`',
  keywords: SQLKeywords + 'always generated groupby_concat hard persistent shutdown soft virtual ' + MySQLKeywords,
  types: MySQLTypes,
  builtin: MySQLBuiltin,
},);
var MSSQL = /* @__PURE__ */ SQLDialect.define({
  keywords: SQLKeywords +
    'trigger proc view index for add constraint key primary foreign collate clustered nonclustered declare exec go if use index holdlock nolock nowait paglock pivot readcommitted readcommittedlock readpast readuncommitted repeatableread rowlock serializable snapshot tablock tablockx unpivot updlock with',
  types: SQLTypes +
    'bigint smallint smallmoney tinyint money real text nvarchar ntext varbinary image hierarchyid uniqueidentifier sql_variant xml',
  builtin:
    'binary_checksum checksum connectionproperty context_info current_request_id error_line error_message error_number error_procedure error_severity error_state formatmessage get_filestream_transaction_context getansinull host_id host_name isnull isnumeric min_active_rowversion newid newsequentialid rowcount_big xact_state object_id',
  operatorChars: '*+-%<>!=^&|/',
  specialVar: '@',
},);
var SQLite = /* @__PURE__ */ SQLDialect.define({
  keywords: SQLKeywords +
    'abort analyze attach autoincrement conflict database detach exclusive fail glob ignore index indexed instead isnull notnull offset plan pragma query raise regexp reindex rename replace temp vacuum virtual',
  types: SQLTypes +
    'bool blob long longblob longtext medium mediumblob mediumint mediumtext tinyblob tinyint tinytext text bigint int2 int8 unsigned signed real',
  builtin:
    'auth backup bail changes clone databases dbinfo dump echo eqp explain fullschema headers help import imposter indexes iotrace lint load log mode nullvalue once print prompt quit restore save scanstats separator shell show stats system tables testcase timeout timer trace vfsinfo vfslist vfsname width',
  operatorChars: '*+-%<>!=&|/~',
  identifierQuotes: '`"',
  specialVar: '@:?$',
},);
var Cassandra = /* @__PURE__ */ SQLDialect.define({
  keywords:
    'add all allow alter and any apply as asc authorize batch begin by clustering columnfamily compact consistency count create custom delete desc distinct drop each_quorum exists filtering from grant if in index insert into key keyspace keyspaces level limit local_one local_quorum modify nan norecursive nosuperuser not of on one order password permission permissions primary quorum rename revoke schema select set storage superuser table three to token truncate ttl two type unlogged update use user users using values where with writetime infinity NaN',
  types: SQLTypes + 'ascii bigint blob counter frozen inet list map static text timeuuid tuple uuid varint',
  slashComments: true,
},);
var PLSQL = /* @__PURE__ */ SQLDialect.define({
  keywords: SQLKeywords +
    'abort accept access add all alter and any arraylen as asc assert assign at attributes audit authorization avg base_table begin between binary_integer body by case cast char_base check close cluster clusters colauth column comment commit compress connected constant constraint crash create current currval cursor data_base database dba deallocate debugoff debugon declare default definition delay delete desc digits dispose distinct do drop else elseif elsif enable end entry exception exception_init exchange exclusive exists external fast fetch file for force form from function generic goto grant group having identified if immediate in increment index indexes indicator initial initrans insert interface intersect into is key level library like limited local lock log logging loop master maxextents maxtrans member minextents minus mislabel mode modify multiset new next no noaudit nocompress nologging noparallel not nowait number_base of off offline on online only option or order out package parallel partition pctfree pctincrease pctused pls_integer positive positiven pragma primary prior private privileges procedure public raise range raw rebuild record ref references refresh rename replace resource restrict return returning returns reverse revoke rollback row rowid rowlabel rownum rows run savepoint schema segment select separate set share snapshot some space split sql start statement storage subtype successful synonym tabauth table tables tablespace task terminate then to trigger truncate type union unique unlimited unrecoverable unusable update use using validate value values variable view views when whenever where while with work',
  builtin:
    'appinfo arraysize autocommit autoprint autorecovery autotrace blockterminator break btitle cmdsep colsep compatibility compute concat copycommit copytypecheck define echo editfile embedded feedback flagger flush heading headsep instance linesize lno loboffset logsource longchunksize markup native newpage numformat numwidth pagesize pause pno recsep recsepchar repfooter repheader serveroutput shiftinout show showmode spool sqlblanklines sqlcase sqlcode sqlcontinue sqlnumber sqlpluscompatibility sqlprefix sqlprompt sqlterminator suffix tab term termout timing trimout trimspool ttitle underline verify version wrap',
  types: SQLTypes +
    'ascii bfile bfilename bigserial bit blob dec long number nvarchar nvarchar2 serial smallint string text uid varchar2 xml',
  operatorChars: '*/+-%<>!=~',
  doubleQuotedStrings: true,
  charSetCasts: true,
},);
var __FramerMetadata__ = {
  'exports': {
    'MSSQL': { 'type': 'variable', 'annotations': { 'framerContractVersion': '1', }, },
    'schemaCompletion': { 'type': 'function', 'annotations': { 'framerContractVersion': '1', }, },
    'sql': { 'type': 'function', 'annotations': { 'framerContractVersion': '1', }, },
    'PostgreSQL': { 'type': 'variable', 'annotations': { 'framerContractVersion': '1', }, },
    'StandardSQL': { 'type': 'variable', 'annotations': { 'framerContractVersion': '1', }, },
    'SQLDialect': { 'type': 'variable', 'annotations': { 'framerContractVersion': '1', }, },
    'keywordCompletionSource': { 'type': 'function', 'annotations': { 'framerContractVersion': '1', }, },
    'keywordCompletion': { 'type': 'function', 'annotations': { 'framerContractVersion': '1', }, },
    'MySQL': { 'type': 'variable', 'annotations': { 'framerContractVersion': '1', }, },
    'MariaSQL': { 'type': 'variable', 'annotations': { 'framerContractVersion': '1', }, },
    'PLSQL': { 'type': 'variable', 'annotations': { 'framerContractVersion': '1', }, },
    'schemaCompletionSource': { 'type': 'function', 'annotations': { 'framerContractVersion': '1', }, },
    'Cassandra': { 'type': 'variable', 'annotations': { 'framerContractVersion': '1', }, },
    'SQLite': { 'type': 'variable', 'annotations': { 'framerContractVersion': '1', }, },
    '__FramerMetadata__': { 'type': 'variable', },
  },
};
export {
  __FramerMetadata__,
  Cassandra,
  keywordCompletion,
  keywordCompletionSource,
  MariaSQL,
  MSSQL,
  MySQL,
  PLSQL,
  PostgreSQL,
  schemaCompletion,
  schemaCompletionSource,
  sql,
  SQLDialect,
  SQLite,
  StandardSQL,
};
