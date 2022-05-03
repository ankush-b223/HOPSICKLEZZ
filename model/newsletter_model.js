const mongoose = require('mongoose');

const newsletterDataSchema = mongoose.Schema({

    name: {type:String , required: true},
    email: {type:String , required: true}
    },

    {collection:'newsletter_form'}

)

const newsletterData = mongoose.model('newsletterDataSchema',newsletterDataSchema);

module.exports = newsletterData;