import html from 'https://cdn.jsdelivr.net/gh/mreinstein/snabby@248d06d727659a0bb43a1c0f4f22cbd69be9177/snabby.js'


function init () {
  return {
    open: false,
    mode: 'import', // import | export
    rawText: '{}'
  }
}


function view (model, handler) {
  let invalidJSON = true
  try {
    JSON.parse(model.rawText)
    invalidJSON = false
  } catch (er) { }

  return html`
    <dialog style="background-color: whitesmoke; padding-top: 2em;" @attrs:open=${model.open}>
      <button style="position: absolute; top: 7px; right: 15px;"
              @on:click=${() => handler({ type: 'close-dialog' })}>x</button>
      <div style="display: flex; flex-direction: column; align-items: flex-end;">
        <textarea style="height: 70vh; width: 70vw;"
                  @attrs:readonly=${model.mode === 'export'}
                  @props:value=${model.rawText}
                  @on:input=${(event) => handler({ type: 'edit', rawText: event.target.value })}>${model.rawText}</textarea>
        <button style="cursor: pointer; border: 1px solid; border-radius: 4px; margin-top: 6px; padding: 10px; display: none;"
                @attrs:disabled=${invalidJSON}
                @on:click=${() => handler({ type: 'import', text: JSON.parse(model.rawText) })}
                @style:display=${(model.mode === 'import') ? '' : 'none'}>import</button>
      </div>
    </dialog>`
}


function update (model, action) {
  if (action.type === 'edit')
    return { ...model, rawText: action.rawText }

  if (action.type === 'import')
    return { open: false, mode: 'import', rawText: '{ }' }

  if (action.type === 'export')
    return { ...model, mode: 'export' }

  if (action.type === 'close-dialog')
    return { ...model, open: false }

  return model
}


export default { init, view, update }
