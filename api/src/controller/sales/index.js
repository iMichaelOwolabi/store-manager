import inMemorySalesRecord from '../../model/sales';

class SalesController {
  // get all sales record
  static getAllSales(req, res) {
    res.status(200).json({
      success: 'True',
      message: 'All sales record found',
      inMemorySalesRecord,
    });
  }

  // get one user sales record
  static getOneUserSales(req, res) {
    const { user } = req.params;

    let userSales;
    try {
      userSales = Object.entries(inMemorySalesRecord[user]);
    } catch (error) {
      console.error(error.message);
    }

    if (!userSales) {
      return res.status(404).json({
        success: 'False',
        message: 'The specified sales record does not exist on this platform',
      });
    }

    return res.status(200).json({
      success: 'True',
      message: 'Below is the specified user sales record',
      userSales,
    });
  }

  // get one sales record for one user
  static getOneSalesForOneUser(req, res) {
    let { user, id } = req.params;

    id = parseInt(id, 10);
    const salesId = id - 1;

    let userSales;
    try {
      userSales = (inMemorySalesRecord[user][salesId]);
    } catch (error) {
      console.error(error.message);
    }

    if (!userSales) {
      return res.status(404).json({
        success: 'False',
        message: 'The specified sales record does not exist on this platform',
      });
    }

    return res.status(200).json({
      success: 'True',
      message: 'Below is the specified sales record',
      userSales,
    });
  }

  // create a sales record
  static postSales(req, res) {
    const {
      productName,
      amount,
      quantity,
    } = req.body;

    const username = 'user4';
    let id;
    let lastId;

    // checking if the key already exists, if not creates it
    if (inMemorySalesRecord[username] === undefined) {
      id = 1;
    } else {
      lastId = inMemorySalesRecord[username].length;
      id = lastId + 1;
    }

    const newSales = {
      id,
      productName,
      quantity,
      amount,
    };

    if (inMemorySalesRecord[username] === undefined) {
      inMemorySalesRecord[username] = [];
      inMemorySalesRecord[username].push(newSales);
    } else {
      inMemorySalesRecord[username].push(newSales);
    }

    return res.status(201).json({
      success: 'True',
      message: 'Sales record successfully created',
      newSales,
    });
  }
}

export default SalesController;
