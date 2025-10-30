# yôn Mocko

A CAT (computer-assisted translation) tool that works locally (no accounts). This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Functionality

### Import text in new source modal
This app does not bother with DOCX or ODT because the complexity outweighs the minimal work of a user copying and pasting their desired text into the input fields. Additionally, the user has full control over this source text directly in the editor and even if updates are made, it will try to match existing translations to the new segments after an update.

### Import MOCKO files
The tool allows you to export and import MOCKO files which are simply JSON files specifically designed for a single source, its segments, translations and memories.

### Magic story time!
Can't find a source? Simply hit the magic wand to pull in one of Aesop's fables.

### Set segmentation logic
Set the segmentation regular expression to be used (several common segmentation examples are provided). The Preview button allows you to see how the segmentation will be implemented on the source text.

### Export options
You can export to .txt, .mocko, or to the clipboard. You can also preview the final translation directly in the tool.

### Statistics about your translation
Find out some information about the source such as word count, segment count, average words per segment, and more!

### Grammar & spelling are checked
By default the grammar and spellchecker are enabled and will be enforced before saving any segment's translation. The grammar error messages are unfortunately cryptic but still indicate real errors with the grammar of your segment.

### Autocomplete words in the editor
Type anything and the editor will suggest words and you can hit enter to save the suggestion into your translation.

### Highlight and store memories
Select some text in the source and a popup will offer to save a memory for that source text. Memories are small tidbits of translated source that will be underlined in all other source segments saving you some time typing them out again. Manage memories in the Memories tab and see what segments they are used in.

### Basic keyboard navigation
Navigating from one translation segment to another should be three keystrokes backwards (shift-tab, enter) and two keystrokes forward (tab, enter).

### Themes and session settings
Change to another [bootswatch](https://bootswatch.com) theme or turn off some of the translation editor features and these settings will be saved in your session data. You can also backup and restore sessions which will include all of the source files currently in the tool.

## To Do

- [x] Make sidebar width adjustable
- [x] Add search box to sidebar for navigating long lists of sources
- [ ] Add a sort option to sidebar that allows you to organize by alphabetical (source), alphabetical (translation), last updated, or last added
- [ ] Add a way to pin sources so they show at the top of the source list
- [ ] Allow selection of grammar top-rule on a session-level, source-level, and segment-level (each layer superseding the previous)
- [x] Make memory dropdown only show up when source text is highlighted
- [ ] Add keyboard-based approach to add memories into text editor (using a number badge on each memory in the current segment)
- [ ] Add more statistics
- [ ] Add session setting for controlling whether Hîsyêô text content is converted to the abugida or syllabary (in the UI and export functions)
- [ ] Add UI natlang translations (include other conlangs and Hîsyêô!)
- [ ] Huge: Possibly add more file import types for ODT, DOCX, PDF, or EPUB
- [ ] Store update timestamp for each source in session and add an update session option in settings that allows users to import a session json file and any duplicate entries will be either overwritten or skipped (user-selectable)
- [ ] Make the Usage section of the memory card a hyperlink that expands into a full scrollable showcase of each source segment, memory in bold, and the translated segment below (if the memory's translation text is found in the translated segment, it should be in bold as well)
- [ ] Huge: Add a way to specify the target language and supply ANTLR grammar and hunspell files
- [ ] Huge: Add a button to each translation segment for pulling up a modal that presents valid translations as parse trees
- [ ] Add a wiktionary search link and a session setting for whether to open in a modal or in a new tab

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.\
No testing has been setup yet for this project but PRs are welcome!

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
