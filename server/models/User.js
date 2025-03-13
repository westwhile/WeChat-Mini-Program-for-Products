const mongoose = require('mongoose');

// 添加Mongoose连接代码
mongoose.connect('mongodb://localhost:27017/aisearch', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    openid: String,
    nickname: String,
    avatarUrl: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);