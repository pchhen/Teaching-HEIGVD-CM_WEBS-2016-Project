var express = require('express'),
        router = express.Router(),
        mongoose = require('mongoose'),
        Type = mongoose.model('IssueType'),
        toolsFYS = require('toolsFYS');

module.exports = function (app) {
    app.use('/api/v1/issuesTypes', router);
};

/**
 * @api {post} /issuesTypes Create a new type
 * @apiVersion 1.0.0
 * @apiName PostType
 * @apiGroup Issues Types
 * @apiHeader {String} X-USERID Username.
 * @apiHeader {String} X-USERHASH Password hashed of the Username.
 * @apiPermission staff
 *
 * @apiParam {String} _id Name of the Type.
 * @apiParam {String} description Description of the Type.
 *
 * @apiSuccess {String} _id Name of the Type.
 * @apiSuccess {String} description  Description of the Type.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "streetlight",
 *       "description": "A raised source of light on the edge of a road or walkway."
 *     }
 */

router.post('/', toolsFYS.CheckStaffAuthorization, function (req, res, next) {
      var type = new Type(req.body);

      type.save(function (err, createdType) {
          if (err) {
              res.status(500).send(err);
              return;
          }

          res.send(createdType);
      });
});

/**
 * @api {put} /issuesTypes/:id Update a type
 * @apiVersion 1.0.0
 * @apiName PutType
 * @apiGroup Issues Types
 * @apiHeader {String} X-USERID Username.
 * @apiHeader {String} X-USERHASH Password hashed of the Username.
 * @apiPermission staff
 *
 * @apiParam {String} [_id] Name of the Type.
 * @apiParam {String} [description] Description of the Type.
 *
 * @apiSuccess {String} _id Name of the Type.
 * @apiSuccess {String} description  Description of the Type.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "streetlight",
 *       "description": "A raised source of light on the edge of a road or walkway."
 *     }
 */

router.put('/:id', toolsFYS.CheckStaffAuthorization, findType, function (req, res, next) {
      type._id = req.body._id;
      type.description = req.body.description;

      type.save(function (err, updatedType) {
          if (err) {
              res.status(500).send(err);
              return;
          }

          res.send(updatedType);
      });
});

/**
 * @api {delete} /issuesTypes/:id Delete a type
 * @apiVersion 1.0.0
 * @apiName DeleteType
 * @apiGroup Issues Types
 * @apiHeader {String} X-USERID Username.
 * @apiHeader {String} X-USERHASH Password hashed of the Username.
 * @apiPermission staff
 *
 * @apiParam {String} _id Name of the Type.
 *
 * @apiSuccessExample {json} Success example
 * HTTP/1.1 204 No Content
 */

router.delete('/:id', toolsFYS.CheckStaffAuthorization, function (req, res, next) {
      var typeId = req.params.id;

      Type.remove({
          _id: typeId
      }, function (err, data) {
          if (err) {
              res.status(500).send(err);
              return;
          }

          console.log('Deleted ' + data + ' documents');
          res.sendStatus(204);
      });
});

/**
 * @api {get} /issuesTypes List all types
 * @apiVersion 1.0.0
 * @apiName GetTypes
 * @apiGroup Issues Types
 * @apiPermission none
 *
 * @apiSuccess {String} _id Name of the Type.
 * @apiSuccess {String} description  Description of the Type.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "streetlight",
 *       "description": "A raised source of light on the edge of a road or walkway."
 *     }
 */

router.get('/', function (req, res, next) {
    Type.find(function (err, types) {
        if (err) {
            res.status(500).send(err);
            return;
        }else if (!types.length) {
            res.status(404).send('No Type found');
            return;
        }

        res.send(types);
    });
});

/**
 * @api {get} /issuesTypes/:id Read data of a type
 * @apiVersion 1.0.0
 * @apiName GetType
 * @apiGroup Issues Types
 * @apiPermission none
 *
 * @apiParam {String} _id Name of the Type.
 *
 * @apiSuccess {String} _id Name of the Type.
 * @apiSuccess {String} description  Description of the Type.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "streetlight",
 *       "description": "A raised source of light on the edge of a road or walkway."
 *     }
 */

router.get('/:id', findType, function (req, res, next) {
    res.send(req.type);
});

/**
 * Middleware that finds the type corresponding to the :id URL parameter
 * and stores it in `req.type`.
 */

function findType(req, res, next) {
  Type.findById(req.params.id, function (err, type) {
      if (err) {
          res.status(500).send(err);
          return;
      } else if (!type) {
          res.status(404).send('Type not found');
          return;
      }
      req.type = type;

      next();
  });
}
