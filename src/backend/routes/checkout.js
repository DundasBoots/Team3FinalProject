const router = require("express").Router();

const Checkout = require("../models/CheckoutSchema");

//create checkout
router.post("/create", (req, res) => {
  const checkout = new Checkout({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    date: req.body.date,
    time: req.body.time,
    film: req.body.film,
    message: req.body.message,
    cart: req.body.cart,
  });
  checkout
    .save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

//read all checkouts
router.get("/read", async (req, res) => {
  try {
    const checkout = await Checkout.find();
    res.status(200).json(checkout);
  } catch (err) {
    res.json({ message: err });
  }
});

//read by checkout by username
router.get("/read/username/:email", async (req, res) => {
  try {
    const checkout = await Checkout.find({
      email: req.params.email,
    }).collation({
      locale: "en",
      strength: 2,
    });
    //collation for case insensitive search
    res.status(200).json(checkout);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/read/id/:id", async (req, res) => {
  try {
    const checkout = await Checkout.find({ _id: req.params.id });
    res.status(200).json(checkout);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a checkout
router.put("/update/:id", async (req, res) => {
  try {
    const updatedCheckout = await Checkout.updateOne(
      { _id: req.params.id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          date: req.body.date,
          time: req.body.time,
          film: req.body.film,
          message: req.body.message,
          cart: req.body.cart,
        },
      }
    );
    res.status(200).json(updatedCheckout);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete checkout by id
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedCheckout = await Checkout.remove({ _id: req.params.id });
    res.status(204).json(deletedCheckout);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
