import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/**
 * Schema defenition for User
 *
 * @type {Schema}
 */
const UserSchema = new Schema({
    email: String,
    password: { type: String, select: false },
    first_name: { type: String, default: null },
    last_name: 	{ type: String, default: null },
    kard_mastery_score: { type: Number },
    course_completion: { type: Number },
    courses: { type: Array },
    role: { type: String, default: 'default', enum: ['software developer', 'software engineer']},
    cohort: { type: Schema.Types.ObjectId, ref: 'Cohort' },
    notifications: { type: Boolean, default: false },
    skills: {type : Array},
    to_dos: { type: Array },
    sandbox_ideas: { type: Array },
    goal: { type: String }
});

export default mongoose.model('User', UserSchema);