import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import sys
import json

# 模拟用户行为数据
data = {
    'user_id': [1, 1, 2, 2, 3],
    'product_id': [101, 102, 101, 103, 102],
    'rating': [5, 3, 4, 2, 5]
}
df = pd.DataFrame(data)

# 构建用户-商品矩阵
user_product_matrix = df.pivot(index='user_id', columns='product_id', values='rating').fillna(0)

# 计算余弦相似度
def recommend_products(user_id):
    user_vector = user_product_matrix.loc[user_id].values.reshape(1, -1)
    similarities = cosine_similarity(user_vector, user_product_matrix)
    similar_users = similarities.argsort()[0][-2:]  # 找到最相似的用户
    recommended_products = user_product_matrix.iloc[similar_users].mean().sort_values(ascending=False)
    return recommended_products.index.tolist()

# 示例调用
if __name__ == "__main__":
    # 假设从命令行参数获取用户ID
    user_id = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    recommended_products = recommend_products(user_id)
    print(json.dumps(recommended_products))