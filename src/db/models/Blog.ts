import mongoose, { Schema,Document,Model, model } from 'mongoose'
import slugify from 'slugify';
const BlogSchema: Schema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true  
    },
    slug: {
        type: String,
        // unique: [true,'This content title is already exist']
    },
    title:{
        type: String,
        required: [true,'Title has to be specified'],
        maxlength: [ 50, 'Title can not be more than 50 characters' ]
    },
    content:{
        type: String,
        required: [true,'Content has to be specified'],
        minlength: [10,'Content can not be less than 10 characters']
    },
    createdAt: {
		type: Date,
		default: Date.now
	}
})

//@Based schema
interface IBlogSchema extends Document {
    user: Schema.Types.ObjectId;
    slug: string;
	title: string;
	content: string;
	createdAt: Date;

}

// Create post slug from the title
BlogSchema.pre<IBlogSchema>('save', function(next) {
	this.slug = slugify(this.title, { lower: true });
	next();
});

var BlogModel: Model<IBlogSchema> = model<IBlogSchema>('Blog', BlogSchema);
export default BlogModel;