import inMemorySalesRecord from '../../model/sales';

export const getAllSales = (req, res) => {
  res.status(200).json(inMemorySalesRecord);
};

export const getOneSales = (req, res) => {
  const { id } = req.params;
  const sales = inMemorySalesRecord.filter(theSales => theSales.id === parseInt(id, 10))[0];

  if (!sales) {
    res.status(404).json('The specified sales record does not exist on this platform');
    return;
  }

  res.status(200).json(sales);
};

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
  res.status(201).json(newSalesRecord);
};
