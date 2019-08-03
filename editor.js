import { h } from './node_modules/snabbdom/es/snabbdom.js'


function init () {
  return ''
}


function view (rawText, handler) {
  return h('section', [
      h('textarea', {
        attrs: {
          placeholder: 'raw input text'
        },
        on: {
          keyup: (event) => handler({ type: 'edit', text: event.target.value })
        },
        props: {
          value: rawText
        },
        style: {
          backgroundColor: 'transparent',
          border: 'none',
          borderBottom: '1px solid #676e87',
          boxSizing: 'border-box',
          color: 'white',
          height: '300px',
          padding: '18px',
          width: '100%'
        }
      }),
      h('div', { style: { padding: '18px', fontFamily: 'orange kid' } }, rawText)
  ])
}


function update (rawText, action) {
  if (action.type === 'edit')
    return action.text

  if (action.type === 'import')
    return action.text[Object.keys(action.text)[0]]

  return rawText
}


export default { init, view, update }
