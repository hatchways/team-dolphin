const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    companies: {
      type: Array,
      required: true,
    },
    activeCompany: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    reportEmail: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    platforms: {
      reddit: { type: Boolean, required: true, default: true },
      twitter: { type: Boolean, required: true, default: false },
      nyt: { type: Boolean, required: true, default: false },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.getAllCompanies = async function () {
  const companiesObj = await this.find({}, { _id: 0, companies: 1 });
  return [
    ...new Set(
      companiesObj.reduce((acc, val) => acc.concat(val.companies), [])
    ),
  ];
};

module.exports = mongoose.model("User", userSchema);
