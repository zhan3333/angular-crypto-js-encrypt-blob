import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {decryptBlobToBlob, encryptBlobToBlob} from './decrypt'
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {mergeMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DecryptService {
  constructor(private http: HttpClient) {
  }

  // 根据 asset path 加密文件
  encryptFile(assetPath: string, password: string) {
      // 使用HttpClient获取文件内容
      return this.http.get(assetPath, {
        responseType: 'blob'
      }).pipe(
        mergeMap(v => this.encryptBlob(v, password))
      )
  }

  // 加密 blob
  encryptBlob(b: Blob, password: string) {
    return fromPromise(encryptBlobToBlob(b, password))
  }

  // 根据 asset path 解密文件
  decryptFile(encryptedFilePath: string, password: string) {
    return this.http.get(encryptedFilePath, {responseType: 'blob'})
      .pipe(
        mergeMap(v => this.decryptBlob(v, password))
      )
  }

  // 解密 blob
  decryptBlob(b: Blob, password: string) {
    return fromPromise(decryptBlobToBlob(b, password))
  }
}





