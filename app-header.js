import { h } from './node_modules/snabbdom/es/snabbdom.js'


function init () {
  return ''
}


function view (rawText, handler) {
  return h('header', {
    style: {
      borderBottom: '1px solid #676e87',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gridColumn: '1 / span 2',
      padding: '12px 18px'
    }
  }, [
    h('button', {
      on: {
        click: (event) => handler({ type: 'import' })
      },
      style: {
        cursor: 'pointer',
        border: 'none',
        borderRadius: '4px',
        padding: '8px',
        backgroundColor: 'rgb(88, 94, 127)',
        color: 'white',
        textTransform: 'uppercase'
      }
    }, 'Import'),
    h('button', {
      on: {
        click: (event) => handler({ type: 'export' })
      },
      style: {
        cursor: 'pointer',
        border: 'none',
        borderRadius: '4px',
        padding: '8px',
        backgroundColor: 'rgb(88, 94, 127)',
        color: 'white',
        textTransform: 'uppercase',
        marginLeft: '12px'
      }
    }, 'Export')
  ])
}


// TODO: should we move the dialog component in here?
function update (model, action) {
  return model
}


export default { init, view, update }
