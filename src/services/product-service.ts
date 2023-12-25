import { IProduct } from "@/models/product";
import axios from "axios";
const baseApiUrl = "https://api.finexkomoditi.id/v1/products";

export class ProductService {
  find(id: number): Promise<IProduct> {
    return new Promise<IProduct>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  retrieve(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  retrieveCount(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl)
        .then((res) => {
          resolve(res.data.data.length);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  create(entity: IProduct): Promise<IProduct> {
    return new Promise<IProduct>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  update(entity: IProduct): Promise<IProduct> {
    return new Promise<IProduct>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}`, entity)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  partialUpdate(entity: IProduct, id: number): Promise<IProduct> {
    delete entity.id;
    return new Promise<IProduct>((resolve, reject) => {
      axios
        .patch(`${baseApiUrl}/${id}`, entity, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
export const productService = new ProductService();
