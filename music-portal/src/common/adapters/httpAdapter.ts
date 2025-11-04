import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class HttpAdapter {
  private readonly axios: AxiosInstance = axios;

  /**
   * Realiza una petición HTTP GET
   * @param url URL de la petición
   * @param headers cabeceras de la petición
   * @returns Promesa con el resultado de la petición
   */
  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    try {
      const config = {
        headers: headers || {},
      };

      const { data } = await this.axios.get<T>(url, config);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(`This action failed: ${error.message}`);
    }
  }

  /**
   * Realiza una petición HTTP GET
   * @param url URL de la petición
   * @param headers cabeceras de la petición
   * @returns Promesa con el resultado de la petición
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getAll<T>(url: string, headers?: Record<string, string>): Promise<AxiosResponse<T, any>> {
    try {
      const config = {
        headers: headers || {},
      };

      const data  = await this.axios.get<T>(url, config);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      throw error.response
    }
  }

   /**
   * Realiza una petición HTTP POST
   * @param url URL de la petición
   * @param data Datos a enviar en el cuerpo de la petición
   * @param headers Cabeceras de la petición
   * @returns Promesa con el resultado de la petición
   */
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   async post<T>(url: string, body?: any, headers?: Record<string, string>): Promise<T> {
    try {
      const config = {
        headers: headers || {},
      };

      const res = await this.axios.post<T>(url, body, config);
      // console.log(res);
      return res.data;
      // Extraer los datos de la propiedad "data" de la respuesta
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
      //? Si la petición falla, retornamos el resultado de la petición
      return error.response.data;
    }
  }

  /**
   * Realiza una petición HTTP POST para enviar un archivo en formato FormData
   * @param url URL de la petición
   * @param data Datos a enviar en el cuerpo de la petición
   * @param headers Cabeceras de la petición
   * @returns Promesa con el resultado de la petición
   */
  async postFile<T>(url: string, body: FormData, headers?: Record<string, string>): Promise<T> {
    try {
      const config = {
        headers: headers || {},
      };

      const res = await this.axios.post<T>(url, body, config);
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
      //? Si la petición falla, retornamos el resultado de la petición
      return error.response.data;
    }
  }

  /**
   * Realiza una petición HTTP PATCH
   * @param url URL de la petición
   * @param data Datos a enviar en el cuerpo de la petición
   * @param headers Cabeceras de la petición
   * @returns Promesa con el resultado de la petición
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async patch<T>(url: string, body?: any, headers?: Record<string, string>): Promise<T> {
    try {
      const config = {
        headers: headers || {},
      };

      const res = await this.axios.patch<T>(url, body, config);
      // console.log(res);
      return res.data;
      // Extraer los datos de la propiedad "data" de la respuesta
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
      //? Si la petición falla, retornamos el resultado de la petición
      return error.response.data;
    }
  }

  /**
   * Realiza una petición HTTP DELETE
   * @param url URL de la petición
   * @param headers Cabeceras de la petición
   * @returns Promesa con el resultado de la petición
   */
  async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    try {
      const config = {
        headers: headers || {},
      };

      const res = await this.axios.delete<T>(url, config);
      return res.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
      //? Si la petición falla, retornamos el resultado de la petición
      return error.response.data;
    }
  }


}

// export const urlBase = "http://192.168.104.15:6500";
// Obtenem
// export const urlBase = "https://192.168.104.15:3000";

// export const urlBase = "https://oficina.unibol.com.co:3000";

export const urlBase = "http://localhost:3000";

export const httpAdapter = new HttpAdapter();