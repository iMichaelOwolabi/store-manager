const inMemoryProducts = require('../../model/products');

const getAll = (req, res) => {
	res.status(200).json(inMemoryProducts);
};

const getOne = (req, res) => {
  const {id} = req.params;
  const product = inMemoryProducts.filter(theProduct => theProduct.id === parseInt(id))[0];

  if(!product) {
    res.status(404).json(`The specified product does not exist on this platform`);
      return;
  }
  
  res.status(200).json(product);
}

const postProduct = (req, res) => {
  const { productName, price, category, quantity } = req.body;
  const lastId = inMemoryProducts.length;
  const id = lastId + 1;

  let newProduct = {
      id: id,
      productName: productName,
      price: price,
      category: category,
      quantity: quantity
  };

  inMemoryProducts.push(newProduct);
  res.status(201).json(newProduct);
}

const updateProduct = (req, res) => {
  const id = req.params.id;
  const {productName, price, category, quantity} = req.body;
  const product = inMemoryProducts.filter(theProduct => theProduct.id === parseInt(id))[0];
  if(!product){
      res.status(404).send(`The product with the given id cannot be found`);
  }

  const newUpdate = {
      'id': id, 
      'productName': productName,
      'price': price,
      'category': category,
      'quantity': quantity
  }
  if(!newUpdate){
      res.status(400).send(`Bad request, kindly check the supplied values`);
  }
  res.status(200).location(`./api/products/${id}`).json(newUpdate);
}
const deleteProduct = (req, res) => {
  const {id} = req.params;
  const product = inMemoryProducts.filter(theProduct => theProduct.id === parseInt(id))[0];

  if(!product){
      res.status(404).send(`The product with the given id cannot be found`);
      return;
  }
  const productIndex = inMemoryProducts.indexOf(product);
  inMemoryProducts.splice(productIndex, 1);
  
  res.status(200).json(`The product has been successfully deleted`);

}
module.exports = {
  updateProduct,
  getAll,
  getOne,
  postProduct,
  deleteProduct
};


