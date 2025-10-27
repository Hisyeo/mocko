import React, { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { linter, lintGutter, Diagnostic, forEachDiagnostic } from '@codemirror/lint';
import NSpell from 'nspell';
import HisyeoLexer from '../vendor/grammar/HisyeoLexer.js';
import HisyeoParser from '../vendor/grammar/HisyeoParser.js';
import { HisyeoErrorListener } from '../grammar/HisyeoErrorListener.js';
import { InputStream, CommonTokenStream } from 'antlr4';
import { minimalSetup } from 'codemirror';
import { autocompletion, CompletionContext } from '@codemirror/autocomplete';
import Fuse from 'fuse.js';
import hisyeoHunspellFiles from '../vendor/hunspell/hisyeo.json';
const { aff: hisyeoAff, dic: hisyeoDic } = hisyeoHunspellFiles

interface HisyeoFuseResult {
  type: string,
  latin: string,
  syllabary: string,
  abugida: string,
  meaning: string
}

interface SpellCheckEditorProps {
  value: string;
  onChange: (value: string) => void;
  onDiagnosticsChange: (diagnostics: readonly Diagnostic[]) => void;
  autofocus?: boolean;
}

const SpellCheckEditor: React.FC<SpellCheckEditorProps> = ({ value, onChange, onDiagnosticsChange, autofocus }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (viewRef.current) return; // Prevent re-initialization

    let isCancelled = false;

    const customAutocomplete = (context: CompletionContext, fuse: Fuse<HisyeoFuseResult>) => {
        const word = context.matchBefore(/\w*/);
        if (!word || (word.from === word.to && !context.explicit)) {
          return null;
        }
        console.log(word);
        const results = fuse.search(word.text);
        console.log(results);
        return {
          from: word.from,
          options: results.map(r => ({ label: r.item.latin, type: r.item.type, detail: r.item.meaning, info: 'information!' })),
        };
      };

    fetch('https://hisyeo.github.io/words.json')
      .then(response => response.json())
      .then(data => {
        if (isCancelled) return;

        const fuse = new Fuse(Object.values(data), { keys: ['latin'], includeScore: true, threshold: 0.1 });

        const spellLinter = linter(async (view) => {
          const diagnostics: Diagnostic[] = [];
          try {
            const spell = new NSpell(hisyeoAff, hisyeoDic);
    
            const text = view.state.doc.toString();
            const lookbehind = '(?<=^|[\\s\\-"\'“«<¿])'
            const lookahead = '(?=[\\s\\.,;:\\-"\'”»>?]|$)'
            const words = text.match(new RegExp(`${lookbehind}\\p{Letter}+${lookahead}`, 'gv')) || [];
            for (const w of words) if (!/^[A-Z]/.test(w) && !spell.correct(w)) for (const m of text.matchAll(new RegExp(`${lookbehind}${w}${lookahead}`, 'gv')))
              diagnostics.push({
                from: m.index!,
                to: m.index! + w.length,
                severity: 'error',
                message: `Suggestions: ${spell.suggest(w).join(', ')}`,
            });
          } catch (e) { console.error(e) }
          return diagnostics;
        });
    
        const grammarLinter = linter(view => {
            const diagnostics: Diagnostic[] = [];
            const text = view.state.doc.toString();
            const chars = new InputStream(`${text}.`); // Adding a period so we can use the EOF docuemnt rule
            const lexer = new HisyeoLexer(chars);
            const lexerListener = new HisyeoErrorListener();
            lexer.removeErrorListeners();
            lexer.addErrorListener(lexerListener);
            const tokens = new CommonTokenStream(lexer);
            const parser = new HisyeoParser(tokens);
            const parserListener = new HisyeoErrorListener();
            parser.removeErrorListeners();
            parser.addErrorListener(parserListener);
            parser.document();
    
            [...lexerListener.errors, ...parserListener.errors].forEach(err => {
                const firstSpacePostCol = text.indexOf(' ', err.column)
                diagnostics.push({
                    from: err.offendingSymbol?.start || Math.min(err.column, text.length) || 0,
                    to: err.offendingSymbol?.stop || firstSpacePostCol == -1 ? text.length : Math.min(firstSpacePostCol, text.length),
                    severity: 'info',
                    message: JSON.parse(`"${err.msg}"`),
                });
            });
    
            return diagnostics;
        });
    
        const state = EditorState.create({
          doc: value,
          extensions: [
            minimalSetup,
            spellLinter,
            grammarLinter,
            autocompletion({ filterStrict: true, override: [(ctx) => customAutocomplete(ctx, fuse as Fuse<HisyeoFuseResult>)] }),
            EditorView.updateListener.of((update) => {
              if (update.docChanged) {
                onChange(update.state.doc.toString());
              }
              const diagnostics: Diagnostic[] = []
              forEachDiagnostic(update.state, d => diagnostics.push(d))
              onDiagnosticsChange(diagnostics);
            }),
          ],
        });
    
        const view = new EditorView({
          state,
          parent: editorRef.current!,
        });
    
        viewRef.current = view;
    
        if (autofocus) {
          view.focus();
        }
      })
      .catch(error => console.error('Error fetching autocomplete words:', error));

    return () => {
      isCancelled = true;
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [autofocus, onChange, onDiagnosticsChange]);

  useEffect(() => {
    if (viewRef.current && value !== viewRef.current.state.doc.toString()) {
        viewRef.current.dispatch({
            changes: { from: 0, to: viewRef.current.state.doc.length, insert: value }
        });
    }
  }, [value]);

  return <div ref={editorRef} style={{paddingTop: '0.5em', paddingBottom: '0.5em'}}/>;
};

export default SpellCheckEditor;
