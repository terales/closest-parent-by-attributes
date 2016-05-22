const assert = require('chai').assert
const jsdom = require('mocha-jsdom')
const fs = require('fs')
const path = require('path')

const getClosestParentByAttributes = require('./../index')

describe('closest-parent-by-attributes', function() {
  describe('main behavior', function () {
    let container
    let getHtmlFixture = function (fileName) {
      return fs.readFileSync(path.join(__dirname, fileName + '.html'), 'utf-8')
    }

    jsdom()
    
    beforeEach(function () {
      container = document.createElement('div')
    })

    afterEach(function () {
      container = null
    })

    it('should return \'[class="menu-link"][title="Click to go"][data-interaction-id="12345"] span\' for simplest case', function () {
      container.innerHTML = getHtmlFixture('00-simplest-case')

      let desiredSelector = '[class="menu-link"][title="Click to go"][data-interaction-id="12345"] span'
      let clickTarget = container.querySelector(desiredSelector)

      assert.equal(desiredSelector, getClosestParentByAttributes(clickTarget, ['class', 'title', 'data-interaction-id']))
    })

    it('should return \'[id="click-listener"] span\' for id found', function () {
      container.innerHTML = getHtmlFixture('01-fast-return-on-id')

      let desiredSelector = '[id="click-listener"] span'
      let clickTarget = container.querySelector(desiredSelector)

      assert.equal(desiredSelector, getClosestParentByAttributes(clickTarget, ['id', 'class', 'title', 'data-interaction-id']))
    })

    it('should return \'[class="menu-link"][title="Click to go"][data-interaction-id="12345"] span\' even if id is passed', function () {
      container.innerHTML = getHtmlFixture('02-id-upper-desired-el')

      let desiredSelector = '[class="menu-link"][title="Click to go"][data-interaction-id="12345"] span'
      let clickTarget = container.querySelector(desiredSelector)

      assert.equal(desiredSelector, getClosestParentByAttributes(clickTarget, ['id', 'class', 'title', 'data-interaction-id']))
    })

    it('should return \'[title="Some title"][clickid="Some_Click_Mod_Id_156722377823"] div img\' for several nesting levels', function () {
      container.innerHTML = getHtmlFixture('03-several-nesting-levels')

      let desiredSelector = '[title="Some title"][clickid="Some_Click_Mod_Id_156722377823"] div img'
      let clickTarget = container.querySelector(desiredSelector)

      assert.equal(desiredSelector, getClosestParentByAttributes(clickTarget, ['title', 'clickid']))
    })

    it('should return nothing if match not found', function () {
      container.innerHTML = getHtmlFixture('04-check-if-nothing-matches')

      let clickTarget = container.querySelector('ul li a div img')

      assert.equal('', getClosestParentByAttributes(clickTarget, ['title', 'clickid']))
    })

    // 05-check-if-attributes-on-click-target
    it('should return \'[class="menu-link"][title="Click to go"][data-interaction-id="12345"]\' if match is on click target', function () {
      container.innerHTML = getHtmlFixture('05-check-if-attributes-on-click-target')

      let desiredSelector = '[class="menu-link"][title="Click to go"][data-interaction-id="12345"]'
      let clickTarget = container.querySelector(desiredSelector)

      assert.equal(desiredSelector, getClosestParentByAttributes(clickTarget, ['class', 'title', 'data-interaction-id']))
    })
  })
})