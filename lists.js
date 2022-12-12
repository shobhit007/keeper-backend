import express from "express";
import List from "./lists.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  List.find(function (err, lists) {
    if (!err) {
      res.send(lists);
    } else {
      res.send(err);
    }
  });
});

router.post("/add", async (req, res) => {
  const list = new List({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await list.save();

    const lists = await List.find({});
    res.send(lists);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.id);
    const lists = await List.find({});
    res.send(lists);
  } catch (error) {}
});

export default router;
