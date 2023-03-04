const errorHandler = async(err, req, res, next) => {
  console.log(err)
   return res.send(err.message)
};

module.exports = errorHandler;
