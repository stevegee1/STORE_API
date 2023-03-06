const productDB = require("../Models/storeAPI_Model");

const getAllProductsStatic = async (req, res) => {
  console.log(req.query);
  const {
    featured,
    company,
    name,
    sort,
    createdAt,
    filterPrice,
    fields,
    limit,
    pageNumber,
    numericFilter
  } = req.query;
  console.log(limit);

  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (filterPrice) {
    queryObject.price={$lt:Number(filterPrice)}
  }
if (numericFilter){
  const operatorMap={
    ">":"$gt",
    ">=":"$gte",
    "=":"$eq",
    "<":"$lt",
    "<=":"$lte"
  }
  const regEx= /\b(<|>|<=|=|>=)\b/g
  let filters=numericFilter.replace(regEx,(match)=>`-${operatorMap[match]}-`)
  console.log(filters)
}
  let x = productDB.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    //console.log(sortList)
    x = x.sort(sortList);
  }
  if (createdAt) {
    x = x.select("createdAt");
  }
  if (fields) {
    const fieldList = fields.split(",").join(" ");
    //console.log(fieldList)
    x = x.select(fieldList);
    // x=x.limit(limit)
  }

  if (limit) {
    const y = Number(limit);
    console.log(typeof y);
    x = x.limit(limit);
  }
  if (pageNumber) {
    const skip = (pageNumber - 1) * limit;
    x = x.skip(skip);
  }
  const product = await x;
  res.status(200).json({ msg: product });

  // const x = await productDB.find(queryObject);
  // // console.log(featured)
  // // const x= await productDB.find({featured})
  // res.status(200).json({ msg: x });
};

const getAllProducts = async (req, res) => {
  const search = "a";
  const x = await productDB
    .find({ name: { $regex: search, $options: "i" } })
    .sort("price name");

  res.status(200).json({ msg: x });
};
const addTesting = async (req, res) => {
  //const {name, price}= req.body
  console.log(req.body);

  const cask = await productDB.create(req.body);
  res.status(200).json({ cask });
  if (!cask) {
    throw new Error("adding value failed");
  }
};

module.exports = { getAllProductsStatic, getAllProducts, addTesting };
