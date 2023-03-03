const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "something goes wrong" } = err;

  res.status(status).send({ errors: [message] });
};

module.exports = errorHandler;
