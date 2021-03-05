import mongoose from "mongoose";
const notesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const bugSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
    },
    project: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Bug", "Issue", "Design", "Test Case", "Task"],
      default: "Bug",
    },
    reproSteps: {
      type: String,
    },
    desc: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Resolved", "Closed", "Active", "New"],
      default: "New",
    },
    assignmentTo: {
      type: [String],
    },
    priority: {
      type: Number,
    },
    severity: {
      type: String,
      enum: ["1 - Critical", "2 - High", "3 - Medium", "4 - Low"],
    },
    originalEstimate: {
      type: Number,
      required: true,
    },
    remaining: {
      type: Number,
    },
    hoursSpent: {
      type: Number,
    },
    levelOfEffort: {
      type: Number,
    },
    notes: [notesSchema],
  },
  {
    timestamps: true,
  }
);

const Bug = mongoose.model("Bug", bugSchema);
export default Bug;
