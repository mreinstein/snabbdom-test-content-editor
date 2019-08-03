import { h } from './node_modules/snabbdom/es/snabbdom.js'


function init () {
  return {
    selected: null,
    filter: '',
    translations: { }
  }
}


function view (model, handler) {
  const search = h('input', {
    attrs: {
      placeholder: 'Search',
      type: 'text'
    },
    on: {
      keyup: (event) => handler({ type: 'edit-filter', text: event.target.value })
    },
    style: {
      color: 'white',
      width: '100%',
      backgroundColor: '#3e4258',
      border: 'none',
      boxSizing: 'border-box',
      padding: '10px',
      textAlign: 'right'
    }
  })

  const controls = h('div',
    {
      style: {
        display: 'flex',
        borderBottom: '1px solid rgb(103, 110, 135)',
        marginBottom: '8px'
      }
    },
    [
      search,
      h('button', {
        style: {
          fontSize: '1.5em',
          backgroundColor: 'rgb(88, 94, 127)',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        },
        on: {
          click: function (e) {
            const translationKey = prompt('please enter a translation key:')
            // TODO: check if the key already exists
            if (translationKey)
              handler({ type: 'add-translation-key', translationKey })
          }
        }
      }, '+')
    ]
  )

  const ul = h('ul', {
    style: {
      listStyle: 'none',
      margin: '0px 8px',
      padding: '0',
      fontSize: '0.8em'
    }
  }, Object.keys(model.translations)
            .filter((translationKey) => !model.filter.trim().length || translationKey.indexOf(model.filter.trim()) > -1)
            .map((translationKey) => h('li', {
              style: {
                backgroundColor: (translationKey === model.selected) ? 'dodgerblue' : '',
                cursor: 'pointer',
                padding: '4px',
                wordBreak: 'break-word',
                display: 'flex',
                justifyContent: 'space-between'
              },
              on: {
                click: handler.bind(null, { type: 'select', selected: translationKey })
              }
            }, [
              translationKey,
              h('button', {
                on: {
                  click: function (e) {
                    const translationKey = prompt('enter new translation key name:')
                    // TODO: check if the key already exists
                    if (translationKey)
                      handler({ type: 'rename-translation-key', translationKey })
                  }
                },
                style: {
                  display: (translationKey === model.selected) ? '' : 'none',
                  backgroundColor: 'transparent',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  border: '1px solid'
                }
              }, 'rename')
            ])))

  return h('section', { style: {
    backgroundColor: '#485371',
    borderLeft: '1px solid rgb(105, 109, 125)',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column'
  }}, [ controls, ul ])
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
