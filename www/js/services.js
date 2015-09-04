angular.module('starter.services', [])

.factory('$localstorage', ['$window', function($window) {
  return{
    set: function(key,value){
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue){
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value){
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key){
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('QuoteService', function(){
  var quotes = [
    {
      author: "Bobby McFerrin",
      quote: "Don't worry, be happy. Every little thing is gonna be alright."
    },
    {
      author: "Winnie the Pooh",
      quote: "Nobody can be uncheered with a balloon."
    },
    {
      author: "Mark Twain",
      quote: "The best way to cheer yourself up is to try to cheer somebody else up."
    },
    {
      author: "Leo Tolstoy",
      quote: "If you want to be happy, be."
    },
    {
      author: "Anne Frank",
      quote: "Think of all the beauty still left around you and be happy."
    },
    {
      author: "Phyllis Diller",
      quote: "A smile is a curve that sets everything straight."
    },
    {
      author: "Tom Wilson",
      quote: "A smile is happiness you'll find right under your nose."
    },
    {
      author: "Buddha",
      quote: "Learn to let go, that is the key to happiness"
    }
  ];
  
  return{
    get: function(){
      return quotes[Math.floor(Math.random()*8)];
    }
  };
  
});
