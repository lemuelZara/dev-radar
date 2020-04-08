const mongoose = require('mongoose')

// Estrutura em GeoJSON para armazenar pontos geográficos e polígonos
// Exemplo:
/**
{
  "type" : "Point",
  "coordinates" : [
    -122.5,
    37.7
  ]
}
*/
const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'], // location.type deve ser 'Point'
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

module.exports = PointSchema
