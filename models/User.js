const mongoose = require('mongoose');
/**
 * this is object destructuring
 * we're taking the "Schema" function from the mongoose object
 * it can be written like this:
 *   const Schema = mongoose.Schema;
 */
const { Schema } = mongoose;

/**
 * We're creating a 'schema' or a 'model'
 *   using mongoose's Schema method
 * @type {Schema}
 */
const userSchema = new Schema({
  googleID: String
});

/**
 * this tells mongoose to create the 'users' collection
 *   following the userSchema schema
 * this doesn't overwrite existing databases
 *   it just creates one if it doesn't already exist
 * the first argument in mongoose.model() is the name of the collection
 *   the second argument is the schema we created above
 * !NOTE! Stephen is using 'users' and I'm using 'user'
 */
const User = mongoose.model('user', userSchema);

module.exports = User;
