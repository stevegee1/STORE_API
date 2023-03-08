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
    numericFilter,
  } = req.query;
  console.log(limit);

  const queryObject = {}; //created an empty queryObject

  //add element, feature, to our empty queryObject if the condition is true
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  //add element, company, to our empty queryObject if the condition is true
  if (company) {
    queryObject.company = company;
  }

  //add element, name, to our empty queryObject if the condition is true
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  //add element, filterPrice, to our empty queryObject if the condition is true
  if (filterPrice) {
    queryObject.price = { $lt: Number(filterPrice) };
  }
  if (numericFilter) {
    //define an object to match the operator to the regex mongodb understands
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    //define a regex for our string manipulation and pattern matching
    const regEx = /\b(<|>|<=|=|>=)\b/g;

    //replace if it matches our pattern
    let filters = numericFilter.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
    const options = ["price", "rating"];

    //creating an object
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = {
          [operator]: Number(value),
        };
      }
    });
  }
  console.log(queryObject);
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
  const x= req.body

  const cask = await productDB.create(req.body);
  
 // throw new Error("adding value failed");
 if (!cask) throw Error("Access denied")
  // res.status(200).json({ cask });
  console.log(cask);
};

module.exports = { getAllProductsStatic, getAllProducts, addTesting };
