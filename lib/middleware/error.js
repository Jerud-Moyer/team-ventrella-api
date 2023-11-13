const error = (err, req, res, next) => {
  const status = err.status || 500;

  res.status(status);

  console.log(err);

  res.send({
    status,
    message: err.message
  });
};

export default error;
