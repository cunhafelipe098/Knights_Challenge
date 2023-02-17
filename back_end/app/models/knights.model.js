module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      nickname: String,
      birthday: Date,
      weapons: [
        {
          name: String,
          mod: Number,
          attr: String,
          equipped: Boolean
        }
      ],
      attributes: { 
        strength: Number,
        dexterity: Number,
        constitution: Number,
        intelligence: Number,
        wisdom: Number,
        charisma: Number,
      },
      keyAttribute: String,
      hallOfHeroes: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Knights = mongoose.model("knights", schema);
  return Knights;
};
