module.exports = function closestParentByAttributes(target, attributes) {
  let iteratedNodes = []
  let currNode = target
  let attributesFiltered = attributes.filter(attr => attr != 'id')

  while (currNode && currNode != document.body) {
    let foundAttributes = 0

    attributesFiltered.forEach(attr => {
      if (currNode.getAttribute(attr) != null) {
        foundAttributes++
      }
    })

    iteratedNodes.push({
      node: currNode,
      foundAttributes: foundAttributes
    })

    if (foundAttributes == attributesFiltered.length) {
      return buildSelector(iteratedNodes, attributesFiltered)
    }

    currNode = currNode.parentNode
  }

  return ''
}

function buildSelector(iteratedNodes, attributes) {
  return iteratedNodes.reduceRight((selector, { node }) => {
    if (selector == '') {
      if (node.getAttribute('id')) {
        return `[id="${node.getAttribute('id')}"]`
      }

      let initialSelector = ''
      attributes.forEach(attr => {
        if (node.getAttribute(attr)) {
          initialSelector += `[${attr}="${node.getAttribute(attr)}"]`
        }
      })

      return initialSelector
    }

    return selector + ' ' + node.nodeName.toLowerCase()
  }, '')
}