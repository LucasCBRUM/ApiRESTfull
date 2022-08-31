const ProductModel = require('../models/product');

const transformer = product => ({
    type: 'products',
    id: product.id,
    attributes: {
        name: product.name,
        price: product.price,
    },
    links:
    {
        self: `/api/v1/products/${product.id}`
    }
});


const getAll = async (request, h) =>{
const products = await ProductModel.find({});
return products.map(transformer);
};

const find = async (req, h) => {
    const product = await ProductModel.findById(req.params.id);
    return {data: transformer(product)};

}


const save = async (req, h) =>{
//console.log(req.payload.name, req.payload.price)    // ou utilizar req.payload para pegar tudo de uma vez
const {name , price} = req.payload;

const product = new ProductModel;

product.name = name;
product.price = price;

await product.save();


return h.response(transformer(product)).code(201);				// CREATED => HTTP = criado
};


const remove = async (req, h) => {
    await ProductModel.findOneAndDelete({ _id: req.params.id });
    console.log(req.params.id);
    return h.response().code(204);
}

module.exports = {getAll, save, remove, find};