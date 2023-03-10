const express = require("express");
const uuid = require("uuid");
const router = express.Router();

const members = require("../../Members");

// Gets all the members
router.get("/", (req, res) => res.json(members));

// Get a single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id == req.params.id);
  if (found) {
    res.json(members.filter((member) => member.id == req.params.id));
  } else {
    res.status(400).json({ msg: `Member with id ${req.params.id} not found` });
  }
});

// Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "Please provide a name and email" });
  }

  members.push(newMember);

  // res.send(members);
  res.redirect('/');
});

// Update Member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id == req.params.id);
  if (found) {
    const updatedMember = req.body;
    members.forEach((member) => {
      if (member.id == req.params.id) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;
        res.json({ msg: "Member Updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `Member with id ${req.params.id} not found` });
  }
});

// Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id == req.params.id);
  if (found) {
    res.json({
      msg: "Member Deleted",
      members: members.filter((member) => member.id != req.params.id),
    });
  } else {
    res.status(400).json({ msg: `Member with id ${req.params.id} not found` });
  }
});

module.exports = router;
