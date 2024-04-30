import express from 'express';
import ProductManager from './ProductManager';

const productManager = new ProductManager('./product.js');

const app = express();

app.get('/products', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

})

app.use(express.json())


app.post('/products', async (req, res) => {
    try {
        // console.log(req.body);
        const product = await productManager.addProducts(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(id);
        if (!product) res.status(404).json({ msg: error.message })
        else res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productUpdate = await productManager.updateProduct(req.body, id);
        if (!productUpdate) res.status(404).json({ msg: error.message })
        else res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const delProduct = await productManager.deleteProduct(id);
        if (!delProduct) res.status(404).json({ msg: "Error delete product" })
        else res.status(200).json({ msg: `Product id: ${id} deleted sucessfully` })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query
        const products = await productManager.addProducts(limit)
        const productFilter = products.filter(p => p.price > parseInt(limit))
        if (!productFilter) res.status(404).json({ msg: "Error non products" })
        return productFilter
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }

})

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));



















