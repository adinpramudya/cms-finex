import { IBerita } from "@/models/berita";
import axios from "axios";
const baseApiUrl = "https://api.finexkomoditi.id/v1/posts";

export class PostService {
  find(id: number): Promise<IBerita> {
    return new Promise<IBerita>((resolve, reject) => {
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
        .get(baseApiUrl, {
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

  create(entity: IBerita): Promise<IBerita> {
    return new Promise<IBerita>((resolve, reject) => {
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

  update(entity: IBerita): Promise<IBerita> {
    return new Promise<IBerita>((resolve, reject) => {
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

  partialUpdate(entity: IBerita, id: number): Promise<IBerita> {
    delete entity.id;
    return new Promise<IBerita>((resolve, reject) => {
      axios
        .patch(`${baseApiUrl}/${id}`, entity, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
export const postService = new PostService();
