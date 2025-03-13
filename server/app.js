const express = require('express');
const axios = require('axios');
const app = express();
const { exec } = require('child_process'); // 用于调用Python脚本
app.use(express.json());

// 模拟AI推荐算法
function recommendProducts(query) {
    // 这里可以替换为实际的AI算法
    return new Promise((resolve, reject) => {
        exec('python D:\\data\\AI agent\\ai\\recommendation.py', (error, stdout, stderr) => {
            if (error) {
                console.error(`执行出错: ${error.message}`);
                reject([]);
                return;
            }
            if (stderr) {
                console.error(`错误输出: ${stderr}`);
                reject([]);
                return;
            }
            // 假设Python脚本返回的是一个JSON数组
            try {
                const recommendedProducts = JSON.parse(stdout);
                resolve(recommendedProducts);
            } catch (parseError) {
                console.error(`解析错误: ${parseError.message}`);
                reject([]);
            }
        });
    });
}

// 商品搜索接口
app.post('/search', async (req, res) => {
    const { query } = req.body;
    try {
        // 调用京东联盟API获取商品数据
        const jdResponse = await axios.get('https://jd-api.com/products', { params: { keyword: query } });
        const products = jdResponse.data.products;

        // 结合AI推荐算法
        const recommendedProducts = await recommendProducts(query);
        res.json({ products: [...products, ...recommendedProducts] });
    } catch (error) {
        res.status(500).json({ error: '商品搜索失败' });
    }
});

// 启动服务器
app.listen(3000, () => {
    console.log('后端服务已启动：http://localhost:3000');
});