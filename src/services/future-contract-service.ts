import { IFutureContract } from "@/models/future-contract";
import axios from "axios";
const baseApiUrl = "https://api.finexkomoditi.id/v1/futures-contracts";

export class FutureService {
  find(id: number): Promise<IFutureContract> {
    return new Promise<any>((resolve, reject) => {
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
  retrieve(): Promise<IFutureContract> {
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

  delete(id: number): Promise<IFutureContract> {
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

  create(entity: IFutureContract): Promise<any> {
    delete entity.codeUnix;
    return new Promise<any>((resolve, reject) => {
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

  update(entity: any): Promise<IFutureContract> {
    return new Promise<any>((resolve, reject) => {
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

  partialUpdate(entity: any, id: number): Promise<any> {
    delete entity.id;
    delete entity.codeUnix;
    return new Promise<any>((resolve, reject) => {
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
export const futureService = new FutureService();
