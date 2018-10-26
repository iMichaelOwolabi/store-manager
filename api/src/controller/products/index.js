import inMemoryProducts from '../../model/products';

export const getAllProducts = (req, res) => {
  res.status(200).json(inMemoryProducts);
};

export const getOneProduct = (req, res) => {
  const { id } = req.params;
  const product = inMemoryProducts.filter(theProduct => theProduct.id === parseInt(id, 10))[0];

  if (!product) {
    res.status(404).json('The specified product does not exist on this platform');
    return;
  }

  res.status(200).json(product);
};

export const postProduct = (req, res) => {
  const {
    productName, price, category, quantity,
  } = req.body;
  const lastId = inMemoryProducts.length;
  const id = lastId + 1;

  const newProduct = {
    id,
    productName,
    price,
    category,
    quantity,
  };

  inMemoryProducts.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const { id } = req.params;
  const {
    productName, price, category, quantity,
  } = req.body;
  const product = inMemoryProducts.filter(theProduct => theProduct.id === parseInt(id, 10))[0];
  if (!product) {
    res.status(404).send('The product with the given id cannot be found');
  }
  const newUpdate = {
    id,
    productName,
    price,
    category,
    quantity,
  };
  if (!newUpdate) {
    res.status(400).send('Bad request, kindly check the supplied values');
  }
  res.status(200).location(`./api/products/${id}`).json(newUpdate);
};
export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const product = inMemoryProducts.filter(theProduct => theProduct.id === parseInt(id, 10))[0];
  if (!product) {
    res.status(404).send('The product with the given id cannot be found');
    return;
  }
  const productIndex = inMemoryProducts.indexOf(product);
  inMemoryProducts.splice(productIndex, 1);
  res.status(200).json('The product has been successfully deleted');
};
