const express = require("express");
const app = express();

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Listening on localhost port ${port}`);
});

// ---------------------------------------------------

//69
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//191
const jwt = require("jsonwebtoken");

//196 middleware
const auth = require("./utils/auth");

//96
const connectDB = require("./utils/database");

//106 ItemModel reading from schemaModels, //154 UserModel reading from schemaModels
const { ItemModel, UserModel } = require("./utils/schemaModels");

// ITEM function---------------------------------------------------
// Create Item---------------------------------------------------

// 109 added async await // 196 middleware //185 auth
app.post("/item/create", auth, async (req, res) => {
  //96
  try {
    await connectDB();
    //console.log(req.body); // 116 comment out //109 corrected "req.body.title" to "req.body"
    await ItemModel.create(req.body); //109 added ItemModel, then after await
    //108 added message
    return res.status(200).json({ message: "successfully created item!" });
  } catch (err) {
    return res.status(400).json({ message: "failed created item!" });
  }
});
// Read All Item---------------------------------------------------
app.get("/", async (req, res) => {
  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return res
      .status(200)
      .json({ message: "successfully read all items!", allItems }); //120 allItems
  } catch (err) {
    return res.status(400).json({ message: "failed read all items!" });
  }
});
// Read Single Item---------------------------------------------------
app.get("/item/:id", async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id); //133 ItemModel.findById
    return res.status(200).json({
      message: "successfully read single item!",
      singleItem: singleItem,
    }); //134[singleItem:singleItem] This will store the read data in a singleItem, which is then sent to the browser via json() for display
  } catch (err) {
    return res.status(400).json({ message: "failed read single item!" });
  }
});
// Update Item---------------------------------------------------
//141 //185 auth
app.put("/item/update/:id", auth, async (req, res) => {
  //app.put-->update
  //197 console.log(req); //check if the email-address of logged-in user inside "req.body.email"
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    //200 Before editing item, first retrieve the item data with "findById()" and store it in "singleItem".The email in "singleItem" is compared with the email in "req.body", and only if the two are the same, the "modification" process should be executed. Delete section is also same.
    if (singleItem.email === req.body.email) {
      await ItemModel.updateOne({ _id: req.params.id }, req.body);
      return res.status(200).json({ message: "successfully edited item!" });
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.status(400).json({ message: "failed edited item!" });
  }
});

// Delete Item---------------------------------------------------
//146 //185 auth
app.delete("/item/delete/:id", auth, async (req, res) => {
  //197 console.log(req); //check if the email-address of logged-in user inside "req.body.email"
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    //200 Before editing item, first retrieve the item data with "findById()" and store it in "singleItem".The email in "singleItem" is compared with the email in "req.body", and only if the two are the same, the "modification" process should be executed. Delete section is also same.
    if (singleItem.email === req.body.email) {
      await ItemModel.deleteOne({ _id: req.params.id });
      return res.status(200).json({ message: "successfully deleted item!" });
    } else {
      throw new Error();
    }
  } catch (err) {
    return res.status(400).json({ message: "failed deleted item!" });
  }
});

// USER functions---------------------------------------------------
// Register User---------------------------------------------------
//155
app.post("/user/register", async (req, res) => {
  try {
    await connectDB();
    await UserModel.create(req.body);
    return res.status(200).json({ message: "successfully registered user!" });
  } catch (err) {
    return res.status(400).json({ message: "failed registered user!" });
  }
});
// Login User---------------------------------------------------
//172
const secret_key = "pizza-blog";

//159
app.post("/user/login", async (req, res) => {
  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: req.body.email });
    if (savedUserData) {
      //Case1: already registered user-data
      if (req.body.password === savedUserData.password) {
        //---right password
        //173
        const payload = {
          email: req.body.email,
        };
        const token = jwt.sign(payload, secret_key, { expiresIn: "23h" });
        console.log(token);
        return res
          .status(200)
          .json({ message: "successfully login!", token: token });
      } else {
        //---wrong password
        return res
          .status(400)
          .json({ message: "failed login! wrong password!" });
      }
    } else {
      //Case2: not registered user-data
      return res
        .status(400)
        .json({ message: "failed login! please register yourself" });
    }
  } catch (err) {
    return res.status(400).json({ message: "failed login!" });
  }
});


