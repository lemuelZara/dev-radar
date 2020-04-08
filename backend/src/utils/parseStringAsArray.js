module.exports = function parseStringAsArray(arrayAsString) {    
    // split(',')               -> Separando a string pela vírgula
    // map(tech => tech.trim()) -> Tirando os espaços (antes e depois)
    return arrayAsString.split(',').map(tech => tech.trim())
}