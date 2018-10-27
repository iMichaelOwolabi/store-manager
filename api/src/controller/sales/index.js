import inMemorySalesRecord from '../../model/sales';

// get all sales record
export const getAllSales = (req, res) => {
  return res.status(200).json({
    success: 'True',
    message: 'All sales record found',
    inMemorySalesRecord,
  });
};

// get one sales record
export const getOneSales = (req, res) => {
  const { id } = req.params;
  const sales = inMemorySalesRecord.filter(theSales => theSales.id === parseInt(id, 10))[0];

  if (!sales) {
    return res.status(404).json({
      success: 'False',
      message: 'The specified sales record does not exist on this platform',
    });
  }

  return res.status(200).json({
    success: 'True',
    message: 'Below is the specified sales record',
    sales,
  });
};

// create a sales record
export const postSales = (req, res) => {
  const { productName, price, quantity } = req.body;
  const lastId = inMemorySalesRecord.length;
  const id = lastId + 1;

  const username = 'user2';

  const newSales = {
    id,
    productName,
    quantity,
    price,
  };
  const amount = newSales.price * newSales.quantity;

  const newSalesRecord = {
    id: newSales.id,
    productName: newSales.productName,
    quantity: newSales.quantity,
    amount,
    attendant: username,
  };

  inMemorySalesRecord.push(newSalesRecord);

  return res.status(201).json({
    success: 'True',
    message: 'Sales record successfully created',
    newSalesRecord,
  });
};
