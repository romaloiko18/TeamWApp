import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { authService } from './auth';

axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    try {
      if (error.response) {
        const { status, data } = error.response as {
          status: number;
          data: { [key: string]: string | object };
        };

        if (status === 401 && data?.message === 'Unauthenticated.') {
          authService.removeToken();
          window.location.replace('/app/login');
        }

        return Promise.reject(error.response.data);
      }

      console.log(error);

      return Promise.reject(error);
    } catch (error) {
      console.log(error);
    }
  }
);

export class ApiService {
  protected getCurrentUrl(path: string): string {
    if (process.env.NEXT_PUBLIC_API) {
      return `http://localhost:8080${path}`;
    }

    return `http://localhost:8080${path}`;
  }

  protected get headers(): { headers: { [key: string]: string } } {
    return {
      headers: {
        Accept: 'application/json'
      }
    };
  }

  public async get<T extends { data: any }>(route: string, customHeaders?: AxiosRequestConfig) {
    const url: string = this.getCurrentUrl(route);

    return await axios.get<T>(url, { ...this.headers, ...(customHeaders ?? {}) });
  }

  public async post<T extends Partial<T>>(route: string, data: object, customHeaders = {}) {
    const url: string = this.getCurrentUrl(route);
    console.log(url);
    return await axios.post<T>(url, data, {
      headers: { ...this.headers.headers, ...customHeaders }
    });
  }

  public async put(route: string, data: object) {
    const url: string = this.getCurrentUrl(route);

    return await axios.put(url, data, this.headers);
  }

  public async patch(route: string, data: object) {
    const url: string = this.getCurrentUrl(route);

    return await axios.patch(url, data, this.headers);
  }

  public async delete<T extends { data: any }>(route: string, data = {}) {
    const url: string = this.getCurrentUrl(route);

    return await axios.delete<T>(url, { ...this.headers, data });
  }
}

export const http = new ApiService();
