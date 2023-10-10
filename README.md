# Angular crypto-js encrypt/decrypt Blob object example

Angular 使用 crypto-js 实现 Blob 对象加解密示例。

`@types/crypto-js` 库有问题，下面这行代码会报错，直接忽略即可。

```typescript
CryptoJS.lib.WordArray.create(await blob.arrayBuffer());
```

---

`@types/crypto-js` There's something wrong with the library. The following line will give you an error, so just ignore it.

```typescript
CryptoJS.lib.WordArray.create(await blob.arrayBuffer());
```
