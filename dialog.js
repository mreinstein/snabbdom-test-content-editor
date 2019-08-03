import { h } from './node_modules/snabbdom/es/snabbdom.js'


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

  return h('dialog', {
      props: {
        open: model.open
      },
      style: {
        backgroundColor: 'whitesmoke',
        paddingTop: '2em'
      }
    }, [
      h('button', {
        style: {
          position: 'absolute',
          top: '7px',
          right: '15px'
        },
        on: {
          click: () => handler({ type: 'close-dialog' })
        }
      }, 'x'),
      h('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }
        }, [
          h('textarea', {
            attrs: {
              readonly: (model.mode === 'export')
            },
            props: {
              value: model.rawText
            },
            on: {
              input: (event) => handler({ type: 'edit', rawText: event.target.value })
            },
            style: {
              height: '70vh',
              width: '70vw'
            }
          }, model.rawText),
          h('button', {
            attrs: {
              disabled: invalidJSON
            },
            on: {
              click: () => handler({ type: 'import', text: JSON.parse(model.rawText) })
            },
            style: {
              cursor: 'pointer',
              border: '1px solid',
              borderRadius: '4px',
              marginTop: '6px',
              padding: '10px',
              display: (model.mode === 'import') ? '' : 'none'
            }
          }, 'import')
        ])
    ])
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
