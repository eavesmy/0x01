module.exports = mongoose => {


    const Schema = mongoose.Schema;
    
    //"id", "预览", "名称", "大小", "类型","最后修改时间", "路径", "操作"
    const AssertSchema = new Schema({
        name: { type : String },
        img: { type : String },
        size: { type : Number },
        type: { type : String },
        modify: { type : String },
        path: { type : String },
    });

    return mongoose.model("Asserts",AssertSchema,"asserts");
}
