import inMemoryProducts from '../../model/products';
import client from '../../utility/dbConnect';

class ProductsController {
  // get all products
  static getAllProducts(req, res) {
    client.query('SELECT * FROM user', (err, data) => res.status(200).json({
      success: 'True',
      message: 'Below are all the products',
      data,
    }));
  }

  // get a single product
  static getOneProduct(req, res) {
    client.query('SELECT * FROM user', (err, data) => res.status(200).json({
      success: 'True',
      message: 'Below are all the products',
      data,
    }));
  }

  // create a product
  static postProduct(req, res) {
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
  }

  // update a particular product
  static updateProduct(req, res) {
    const { id } = req.params;
    const product = inMemoryProducts.filter(theProduct => theProduct.id === parseInt(id, 10))[0];
    if (!product) {
      return res.status(404).send({
        success: 'False',
        message: 'The specified product does not exist on this platform',
      });
    }
    const {
      productName,
      price,
      category,
      quantity,
    } = req.body;
    const updatedProduct = {
      id: product.id,
      productName,
      price,
      category,
      quantity,
    };
    const productIndex = inMemoryProducts.indexOf(product);
    inMemoryProducts.splice(productIndex, 1, updatedProduct);

    return res.status(201).json({
      success: 'True',
      message: 'Product updated successfully',
      updatedProduct,
    });
  }

  // delete a product
  static deleteProduct(req, res) {
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
  }
}

export default ProductsController;
