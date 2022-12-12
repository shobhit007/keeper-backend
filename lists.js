import express from "express";
import List from "./lists.model.js";

const router = express.Router();

router.get("/", (req, res) => {
    List.find(function(err, lists){
        if(!err){
            res.send(lists);
        }else {
            res.send(err);
        }
    });
});

router.post("/add", (req, res) => {
    const list = new List({
        title: req.body.title,
        content: req.body.content
    });

    list.save(err => {
        if (!err){
            res.send("List successfully added to database.");
        }else {
            res.send(err);
        }
    });

});

router.delete("/:id", (req, res) => {
    List.findByIdAndDelete(req.params.id, function(err){
        if (!err){
            res.send("Successfully deleted.");
        }else {
            res.send(err);
        }
    });
});

export default router;