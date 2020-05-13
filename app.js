import dlg        from './dialog.js'
import editor     from './editor.js'
import html       from 'https://cdn.jsdelivr.net/gh/mreinstein/snabby@248d06d727659a0bb43a1c0f4f22cbd69be9177/snabby.js'
import header     from './app-header.js'
import stringList from './string-list.js'


function init () {
  return {
    dialog: dlg.init(),
    editor: editor.init(),
    header: header.init(),
    translations: stringList.init()
  }
}


function view (model, handler) {
  return html`<main style="display: grid; grid-template-columns: 2fr minmax(370px, 1fr); grid-template-rows: 40px 1fr; height: 100vh; color: white; background-color: #3f4554">
      ${header.view(model.header, a => handler({ type: 'HEADER', data: a }))}
      ${editor.view(model.editor, a => handler({ type: 'EDITOR', data: a }))}
      ${stringList.view(model.translations, a => handler({ type: 'TRANSLATIONS', data: a }))}
      ${dlg.view(model.dialog, a => handler({ type: 'IMPORT', data: a }))}
    </main>`
}


function update (model, action) {
  if (action.type === 'EDITOR') {
    return {
      ...model,
      editor: editor.update(model.editor, action.data),
      translations: stringList.update(model.translations, action.data)
    }
  }

  if (action.type === 'TRANSLATIONS') {
    const newModel = { ...model, translations: stringList.update(model.translations, action.data) }

    if (action.data.type === 'select')
      newModel.editor = newModel.translations.translations[action.data.selected]

    return newModel
  }

  if (action.type === 'IMPORT') {
    if (action.data.type === 'import') {
      return {
        ...model,
        editor: editor.update(model.editor, action.data),
        dialog: dlg.update(model.dialog, action.data),
        translations: stringList.update(model.translations, action.data)
      }
    }
    return { ...model, dialog: dlg.update(model.dialog, action.data) }
  }

  if (action.type === 'HEADER') {
    if (action.data.type === 'import') {
      return {
        ...model,
        dialog: { rawText: '{ }', mode: 'import', open: true }
      }
    }

    if (action.data.type === 'export') {
      return {
        ...model,
        dialog: dlg.update({ rawText: JSON.stringify(model.translations.translations, null, 2), open: true }, action.data)
      }
    }
  }

  return model
}


export default { init, view, update }
