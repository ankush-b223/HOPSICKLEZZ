const mongoose = require('mongoose');

const ContactDataSchema = mongoose.Schema({

    name: {type:String , required: true },
    email: {type:String , required: true },
    message: {type:String , required: true}
    },
    
    {collection:'contact_form'}

)

const contactData = mongoose.model('ContactDataSchema',ContactDataSchema);

module.exports = contactData;