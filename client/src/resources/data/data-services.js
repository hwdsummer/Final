import {
  inject
} from 'aurelia-framework';
import {
  HttpClient,
  json
} from 'aurelia-fetch-client';

@inject(HttpClient)
export class DataServices {
  constructor(http) {
    this.httpClient = http;
    this.BASE_URL = "http://localhost:5000/api/";
    this.httpClient.configure(config => {
      config
        .withBaseUrl(this.BASE_URL)
        .withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(request) {
            var authHeader = 'Bearer ' + localStorage.getItem('aurelia_token')
            request.headers.append('Authorization', authHeader);

            console.log('Requesting ${request.method} ${request.url}');
            return request;
          },
          response(response) {
            console.log('Received ${response.status} ${response.url}');
            return response;
          }
        });
    });

  }
  get(url) {
    return this.httpClient.fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        return error;
      });
  }
  post(content, url) {
    return this.httpClient
      .fetch(url, {
        method: 'post',
        body: json(content)
      })
      .then(response => response.json())
      .then(object => {
        return object;
      })
      .catch(error => {
        return error;
      });
  }
  put(content, url) {
    return this.httpClient
      .fetch(url, {
        method: 'put',
        body: json(content)
      })
      .then(response => response.json())
      .then(object => {
        return object;
      })
      .catch(error => {
        return error;
      });
  }
  delete(url) {
    return this.httpClient
      .fetch(url, {
        method: 'delete'
      })
      .then(response => response.json())
      .then(object => {
        return object;
      })
      .catch(error => {
        return error;
      });
  }

  uploadFiles(files, url) {
    let formData = new FormData();

    files.forEach((item, index) => {
      formData.append("file" + index, item);
    })

    return this.httpClient
      .fetch(url, {
        method: 'post',
        body: formData
      })
      .then(response => response.json())
      .then(object => {
        return object;
      })
      .catch(error => {
        return error;
      });
  }

}
