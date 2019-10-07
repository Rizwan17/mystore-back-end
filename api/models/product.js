const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    description: { type: String },
    offer: { type: Number, default: 0},
    productPic: [
        {
            img: String
        }
    ],
    reviews: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            review: String,
            createdAt: Date
        }
    ],
    keyword: {type: String},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true  },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    updatedAt: Date,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
});

module.exports = mongoose.model('Product', productSchema);