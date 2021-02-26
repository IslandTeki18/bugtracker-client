import asyncHandler from "express-async-handler";
import Bug from "../models/bugModel.js";

//@desc     Get all user bugs
//@route    GET /api/bugs
//@access   Private
const getUserBugs = asyncHandler(async (req, res) => {
   const bugs = await Bug.find({ user: req.user._id})
   res.json(bugs)
})

//@desc     Create new bug issue
//@route    POST /api/bugs
//@access   Private
const postCreateBug = asyncHandler(async (req, res) => {
   const bug = new Bug({
      title: "Sample Bug Title",
      reproSteps: "",
      desc: "",
      status: "New",
      assignmentTo: "",
      priority: 4,
      severity: "1 - Critical",
      originalEstimate: 0,
      remainging: 0,
      hoursSpent: 0,
      levelOfEffort: 1,
   })

   await bug.save()
   res.status(201).json(bug)
})

//@desc     Get bug details by ID
//@route    GET /api/bugs/:id
//@access   Private

//@desc     Update a bug by ID
//@route    PUT /api/bugs/:id
//@access   Private

//@desc     Delete a bug by ID
//@route    DELETE /api/bugs/:id
//@access   Private


export {getUserBugs, postCreateBug}