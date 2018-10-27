import inMemoryProducts from '../../model/products';

// get all products
export const getAllProducts = (req, res) => {
  return res.status(200).json({
    success: 'True',
    message: 'Below are all the products',
    products: inMemoryProducts,
  });
};

// get a single product
export const getOneProduct = (req, res) => {
  const { id } = req.params;
  const product = inMemoryProducts.filter(theProduct => theProduct.id === parseInt(id, 10))[0];

  if (!product) {
    return res.status(404).json({
      success: 'false',
      message: 'The specified product does not exist on this platform',
    });
  }

  return res.status(200).json({
    success: 'True',
    message: 'Below is the specified product',
    product,
  });
};

// create a product
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
  return res.status(201).json({
    success: 'True',
    message: 'Product added successfully',
    newProduct,
  });
};

// update a particular product
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const {
    productName, price, category, quantity,
  } = req.body;
  const product = inMemoryProducts.filter(theProduct => theProduct.id === parseInt(id, 10))[0];
  if (!product) {
    return res.status(404).send({
      success: 'False',
      message: 'The specified product does not exist on this platform',
    });
  }
  const newUpdate = {
    id,
    productName,
    price,
    category,
    quantity,
  };

  return res.status(201).json({
    success: 'True',
    message: 'Product updated successfully',
    newUpdate,
  });
};

// delete a product
export const deleteProduct = (req, res) => {
  const { id } = req.params;
  const product = inMemoryProducts.filter(theProduct => theProduct.id === parseInt(id, 10))[0];
  if (!product) {
    return res.status(404).send({
      success: 'False',
      message: 'The specified product does not exist on this platform',
    });
  }
  const productIndex = inMemoryProducts.indexOf(product);
  inMemoryProducts.splice(productIndex, 1);
  return res.status(204).json({
    success: 'True',
    message: 'The product has been successfully deleted',
  });
};
