var validateHal = (function () {
  var validateEmbedObj = function (isEmbedValid, obj) {
    return isEmbedValid && validateHal(obj);
  };

  return function (obj) {
    var links = obj._links,
  
      self = links !== undefined && links.self,
  
      embed = obj._embedded,
  
      isEmbedValid = embed !== undefined && Object.keys(embed).reduce(
        function (isEmbedValid, key) {
          var embedObj = obj._embedded[key];
          if (isEmbedValid && embedObj instanceof Array) {
            return embedObj.reduce(validateEmbedObj, isEmbedValid);
          }
          return validateEmbedObj(isEmbedValid, embedObj);
        },
        true
      );

    return links !== undefined && self && (!embed || isEmbedValid);
  };
}());
