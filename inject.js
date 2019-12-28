'use strict';

var OPTIMAL_ATTR_NAME = 'optimal';
function showOptimal() {
  var products = Array.from(document.querySelectorAll('#products .product.unlocked'))
  .map(function(x) {
    var id = parseInt(x.id.replace('product',''));
    var gameObject = Game.ObjectsById[id];
    var paybackTime = gameObject.price/((gameObject.storedTotalCps/gameObject.amount)*Game.globalCpsMult);
    return {
      'id' : id,
      'paybackTime' : paybackTime,
      'element' : x
    };
  })
  .sort(function(e1,e2) {
     return e1.paybackTime - e2.paybackTime;
  })
  // console.log(products);
  var minPaybackTime = products[0].paybackTime;
  var optimalBuildings = products.filter(function(item) 
  {
    return item.paybackTime <= minPaybackTime;
  });
  cleanUpOptimal();
  highlightOptiomal(optimalBuildings);
}

function highlightOptiomal(optimalBuildings)
{
  optimalBuildings.forEach(item => item.element.setAttribute(OPTIMAL_ATTR_NAME, ''));
}

function cleanUpOptimal()
{
  document.querySelectorAll('#products .product')
              .forEach(item => item.removeAttribute(OPTIMAL_ATTR_NAME));
}

setInterval(showOptimal, 500)