import Joi from 'joi';

export function validationMiddleware(schema) {

  return (req, res, next) => {
    const { error } = Joi.object()
      .keys(schema)
      .validate({
        ...req.body,
        ...req.params,
        ...req.query,
      });
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      res.status(422).send({ status: false, message });
    }
  };
}

