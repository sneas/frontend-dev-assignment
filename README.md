## Developer's notes

The demo shows SearchBox embedded into standard HTML form.
The form reloads page with GET variable. This has been done on purpose
to demonstrate SearchBox's compatibility with regular forms.

* For the sake of simplicity Bootstrap's container class has been added to index.css
* Used fontawesome for appropriate icons
* Used prop-types for validation and IDE autocomplete
* SearchInput element doesn't properly works in MS browsers because `focus-within` pseudo class been used. A polyfill can help.
* Used enzyme for testing tools
* SuggestionBox box preferable behaviours and limitations:
    - debounce data requests (-)
    - memoize data requests (-)
    - case-insensitive (+)
    - request for new data on query change (+)
    - request for new data if query is 3 symbols and more (+)
    - hide search box in case of less than 3 symbols (+)
    - select next item with arrow down (+)
    - select previous item with arrow up (+)
    - nothing selected by default (+)
    - if the last item, arrow down leads to deselecting anything, the next arrow down selects first item (+)
    - if the first item selected, arrow up leads to deselection, the next arrow up selects the last item (+)
    - esc button deselects items (+)
    - when item is selected the query replaces with the selected text (+)
    - query shows original text on deselection (+)
    - suggestion disappears if form looses focus (+)
    - suggestion disappears if no items to be suggested (+)
    - display suggestion as a new query on selecting with keyboard (+)
    - apply suggestion and hide suggestion box on enter (+)
    - apply suggestion and hide suggestion box on mouse click (+)
    - display scroll in drop-down whenever needed (-)
* Basically, the suggestion box mocks Google Chrome's autosuggestor

## de Bijenkorf Frontend Dev assignment

This project allows de Bijenkorf to assess potential frontend candidates with real, working code.

It is bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) to give you the initial setup.

If you are not familiar with Create React App you can find an up to date guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Exercises

You will find the **exercises and associated instructions** in separate named folders(exercise-1, exercise-2, etc.) in the root of this project. **Follow the instructions in the folders and complete the exercises one by one**. Try not to spend more than **8 hours**. 


## Folder Structure

The initial project structure looks like this:

```
frontend-dev-assignment/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
    manifest.json
  src/
    App.js
    App.test.js
    index.css
    index.js
    registerServiceWorker.js
```

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>

## Notes
If you have any remarks or observations while working on this assignment you are encouraged submit these along with the assignment preferably in the READ.ME file.

## Submitting your code
If you are completing this offsite please push your local working copy to a remote repository and mail us back the link <mailto:anja.rupnik@debijenkorf.nl> <mailto:chris.asteriou@debijenkorf.nl>

Please contact us if you have any questions.
```
--
Anja Rupnik
anja.rupnik@debijenkorf.nl

Chris Asteriou
chris.asteriou@debijenkorf.nl

de Bijenkorf
```
