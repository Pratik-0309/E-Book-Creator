import mongoose, { mongo } from "mongoose";

const chapterchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type: String,
        default: ""
    },
    content:{
       type:String,
       default: ""
    }
},{
    timestamps: true
})

const bookSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type:String,
        required: true,
    },
    subtitle:{
        type:String,
        default: ""
    },
    coverImage:{
        type:String,    
        default: ""
    },
    chapters:[chapterchema],
    status:{
        type:String,
        enum:["draft","published"],
        default:"draft"
    }

},{
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema)

export default Book;