import html from 'https://cdn.jsdelivr.net/npm/snabby@2/snabby.js'


function init () {
  return {
    selected: null,
    filter: '',
    translations: { }
  }
}


function view (model, handler) {
  const addKey = function (e) {
    const translationKey = prompt('please enter a translation key:')
    // TODO: check if the key already exists
    if (translationKey)
      handler({ type: 'add-translation-key', translationKey })
  }

  const translationList = Object.keys(model.translations)
            .filter((translationKey) => !model.filter.trim().length || translationKey.indexOf(model.filter.trim()) > -1)
            .map((translationKey) => {

              const renameKey = function (ev) {
                const translationKey = prompt('enter new translation key name:')
                // TODO: check if the key already exists
                if (translationKey)
                  handler({ type: 'rename-translation-key', translationKey })
              }

              return html`
                <li style="cursor: pointer; padding: 4px; word-break: break-word; display: flex; justify-content: space-between;"
                    @style:background-color=${(translationKey === model.selected) ? 'dodgerblue' : ''}
                    @on:click=${handler.bind(null, { type: 'select', selected: translationKey })}>
                  ${translationKey}
                  <button style="background-color: transparent; color: white; border-radius: 4px; cursor: pointer; border: 1px solid;"
                          @on:click=${renameKey}
                          @style:display=${(translationKey === model.selected) ? '' : 'none'}>rename</button>
                </li>`
            })


  return html`
    <section style="background-color: rgb(72, 83, 113); border-left: 1px solid rgb(105, 109, 125); overflow-y: scroll; display: flex; flex-direction: column;">
      <div style="display: flex; border-bottom: 1px solid rgb(103, 110, 135); margin-bottom: 8px;">
        <input placeholder="Search"
               type="text"
               @on:keyup=${(event) => handler({ type: 'edit-filter', text: event.target.value })}
               style="color: white; width: 100%; background-color: rgb(62, 66, 88); border: none; box-sizing: border-box; padding: 10px; text-align: right;">
        <button style="font-size: 1.5em; background-color: rgb(88, 94, 127); color: white; border: none; cursor: pointer;"
                @on:click=${addKey}>+</button>
      </div>
      <ul style="list-style: none; margin: 0px 8px; padding: 0px; font-size: 0.8em;">${translationList}</ul>
    </section>`
}


function update (model, action) {
  if (action.type === 'select') {
    return {
      selected: action.selected,
      filter: '',
      translations: { ...model.translations }
    }
  } else if (action.type === 'import') {
    return {
      selected: Object.keys(action.text)[0],
      filter: '',
      translations: { ...action.text }
    }
  } else if (action.type === 'edit') {
    const newModel = {
      selected: model.selected,
      filter: '',
      translations: { ...model.translations }
    }
    newModel.translations[model.selected] = action.text
    return newModel
  } else if (action.type === 'add-translation-key') {
    //console.log('TODO: deal with new translation key.', action)
    const newModel = { ...model }
    newModel.translations[action.translationKey] = ''
    return newModel
  } else if (action.type === 'rename-translation-key') {
    const newModel = { ...model, selected: action.translationKey }
    newModel.translations[action.translationKey] = model.translations[model.selected]
    delete newModel.translations[model.selected]
    return newModel
  } else if (action.type === 'edit-filter') {
    return { ...model, filter: action.text }
  }

  return model
}


export default { init, view, update }
