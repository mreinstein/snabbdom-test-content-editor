import html from 'https://cdn.jsdelivr.net/gh/mreinstein/snabby@248d06d727659a0bb43a1c0f4f22cbd69be9177/snabby.js'


function init () {
  return ''
}


function view (rawText, handler) {
  return html`
    <section>
        <textarea placeholder="raw input text"
                  @on:keyup=${(event) => handler({ type: 'edit', text: event.target.value })}
                  @props:value=${rawText}
                  style="background-color: transparent; border-top: none; border-right: none; border-bottom: 1px solid rgb(103, 110, 135); border-left: none; border-image: initial; box-sizing: border-box; color: white; height: 300px; padding: 18px; width: 100%;"></textarea>
        <div style="padding: 18px; font-family: &quot;orange kid&quot;;">${rawText}</div>
    </section>`
}


function update (rawText, action) {
  if (action.type === 'edit')
    return action.text

  if (action.type === 'import')
    return action.text[Object.keys(action.text)[0]]

  return rawText
}


export default { init, view, update }
