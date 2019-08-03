import dlg        from './dialog.js'
import editor     from './editor.js'
import { h }      from './node_modules/snabbdom/es/snabbdom.js'
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
  return h('main', {
      style: {
        display: 'grid',
        gridTemplateColumns: '2fr minmax(370px, 1fr)',
        gridTemplateRows: '40px 1fr',
        height: '100vh',
        color: 'white',
        backgroundColor: '#3f4554'
      }
    }, [
      header.view(model.header, a => handler({ type: 'HEADER', data: a })),
      editor.view(model.editor, a => handler({ type: 'EDITOR', data: a })),
      stringList.view(model.translations, a => handler({ type: 'TRANSLATIONS', data: a })),
      dlg.view(model.dialog, a => handler({ type: 'IMPORT', data: a }))
    ])
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
