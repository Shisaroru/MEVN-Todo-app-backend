import Works from "../models/workModel.js";

import { ResponseError } from "../class/ResponseError.js";

const workCtrl = {
  getWorks: async (req, res, next) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return next(new ResponseError(400, "Invalid user id"));
      }

      const result = await Works.find({ userId: userId });

      return res.json({
        result,
      });
    } catch (error) {
      console.log(error);
      return next(new ResponseError(500, "Something went wrong"));
    }
  },
  add: async (req, res, next) => {
    try {
      const { userId, name, details, expireDate } = req.body;

      if (!name || !details || !expireDate) {
        return next(new ResponseError(400, "Invalid request"));
      }

      const newWork = new Works({
        userId,
        name,
        details,
        expireDate: new Date(expireDate),
      });

      const result = await newWork.save();

      return res.json({ result });
    } catch (error) {
      console.log(error);
      return next(new ResponseError(500, "Something went wrong"));
    }
  },
  delete: async (req, res, next) => {
    try {
      const { _id } = req.body;

      if (!_id) {
        return next(new ResponseError(400, "Invalid id"));
      }

      const result = await Works.findByIdAndDelete(_id);

      return res.json({
        message: "Deleted",
        result,
      });
    } catch (error) {
      console.log(error);
      return next(new ResponseError(500, "Something went wrong"));
    }
  },
  edit: async (req, res, next) => {
    try {
      const { _id, name, details, expireDate } = req.body;

      if (!name || !details || !expireDate || !_id) {
        return next(new ResponseError(400, "Invalid request"));
      }

      const result = await Works.findByIdAndUpdate(
        _id,
        {
          name,
          details,
          expireDate: new Date(expireDate),
        },
        {
          new: true,
        }
      );

      return res.json({
        message: "Updated",
        result,
      });
    } catch (error) {
      console.log(error);
      return next(new ResponseError(500, "Something went wrong"));
    }
  },
  finished: async (req, res, next) => {
    try {
      const { _id, finished } = req.body;

      if (!_id) {
        return next(new ResponseError(400, "Invalid id"));
      }

      const result = await Works.findByIdAndUpdate(
        _id,
        {
          finished,
        },
        {
          new: true,
        }
      );

      return res.json({
        message: "Updated",
        result,
      });
    } catch (error) {
      console.log(error);
      return next(new ResponseError(500, "Something went wrong"));
    }
  },
};

export default workCtrl;
