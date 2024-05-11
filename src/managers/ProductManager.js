import { vs as uuidv4 } from 'uuid';


import fs from "fs";






export default class ProductManager {
  constructor(path) {
    this.path = path;
  }




  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(products);
      } else return [];
    } catch (error) {
      console.log(error);
    }
  };

  async addProducts(product) {
    try {
      const products = await this.getProducts();
      const ids = uuidv4();
      const productids = { ...product, id: ids };
      products.push(productids);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return products
    } catch (error) {
      console.log(error);
    }
  };


  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const prod = products.find((prod) => prod.id === id);
      if (!prod) return null;
      return prod
    } catch (error) {
      console.log(error);

    }
  }

  async updateProduct(id, newObj) {
    try {
      const products = await this.getProducts();

      let obj = await this.getProductById(id)
      if (!obj) {
        throw new Error(null);
      }
      obj = { ...obj, ...newObj }

      const newArray = products.filter((ob) => ob.id !== id)
      newArray.push(obj)
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));


    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      if (products.length > 0) {
        const obj = await this.getProductById(id)
        const neyArray = products.filter((ob) => ob.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(neyArray));
        return obj
      }else return null;


    } catch (error) {
      console.log(error);
    }
  }





};



