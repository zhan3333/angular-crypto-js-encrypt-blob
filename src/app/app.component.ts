import {Component} from '@angular/core';
import {DecryptService} from "./decrypt.service";
import {from} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private password = '123456'

  constructor(private decrypt: DecryptService) {
  }

  // 加密文件
  encryptFile(event: any) {
    console.log('event', event, typeof event)
    const file: File = event.target.files[0];
    const [basename, extension] = file.name.split('.')
    from(file.arrayBuffer()).subscribe(v => {
      const blob = new Blob([v], { type: "application/octet-stream" });
      this.decrypt.encryptBlob(blob, this.password).subscribe(v => {
        this.openDownloadDialog(v, basename+ '-' + 'encrypted' + '.' + extension)
      })
    })
  }

  // 解密文件
  decryptFile(event: any) {
    const file: File = event.target.files[0];
    const [basename, extension] = file.name.split('.')
    from(file.arrayBuffer()).subscribe(v => {
      const blob = new Blob([v], { type: "application/octet-stream" });
      this.decrypt.decryptBlob(blob, this.password).subscribe(v => {
        this.openDownloadDialog(v,  basename+ '-' + 'decrypted' + '.' + extension)
      })
    })
  }

  openDownloadDialog(b: Blob, filename: string) {
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(b);
    downloadLink.download = filename;

    // 设置下载文件的名称
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
