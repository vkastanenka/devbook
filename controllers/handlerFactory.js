const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");
const query404 = require("../utils/query404");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1. Find document by id
    const doc = await Model.findByIdAndDelete(req.params.id);

    // 2. If no document, respond with an error
    query404(res, doc, "No document found with that ID");

    // 3. Respond
    res.status(204).json({ status: "success" });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1. Find document by id and update
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // 2. If no document, respond with an error
    query404(res, doc, "No document found with that ID");

    // 3. Respond
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1. Create a new document
    const doc = await Model.create(req.body);

    // 2. Respond
    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // 1. Find the document by id
    let query = Model.findById(req.params.id);

    // 2. If population options present, populate and await the query
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    // 3. If no document, respond with an error
    query404(res, doc, "No document found with that ID");

    // 4. Respond
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // 1. Find the document based on query parameters in API Features
    const features = new APIFeatures(Model, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    if (popOptions) features.query = features.query.populate(popOptions);
    const doc = await features.query;

    // 2. Respond
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  });
