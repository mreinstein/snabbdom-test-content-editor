import html from 'https://cdn.jsdelivr.net/npm/snabby@2/snabby.js'


function init () {
  return ''
}


function view (rawText, handler) {
  return html`
    <header style="border-bottom: 1px solid rgb(103, 110, 135); display: flex; flex-direction: row; align-items: center; justify-content: flex-end; grid-column: 1 / span 2; padding: 12px 18px;">
      <button @on:click=${(event) => handler({ type: 'import' })}
              style="cursor: pointer; border: none; border-radius: 4px; padding: 8px; background-color: rgb(88, 94, 127); color: white; text-transform: uppercase;">Import</button>
      <button @on:click=${(event) => handler({ type: 'export' })}
              style="cursor: pointer; border: none; border-radius: 4px; padding: 8px; background-color: rgb(88, 94, 127); color: white; text-transform: uppercase; margin-left: 12px;">Export</button>
    </header>`
}


// TODO: should we move the dialog component in here?
function update (model, action) {
  return model
}


export default { init, view, update }
