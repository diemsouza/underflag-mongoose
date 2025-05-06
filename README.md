
# Mongoose Provider

This is a Mongoose provider for underflag (feature flag/feature toggle)

> ⚠️ This repository has been **archived** for visual organization on GitHub.  
> It is part of the [`underflag`](https://github.com/diemsouza/underflag) monorepo, where it's maintained and updated.  
> The package is still available on [NPM](https://www.npmjs.com/package/underflag-mongoose).

## Install

Using npm:

```bash
npm install underflag-mongoose
```

Using yarn:

```bash
yarn add underflag-mongoose
```

## How to use

Import the underflag and prepare to load data provider

```js
import { Underflag } from "underflag";
import { MongooseDataProvider } from "underflag-mongoose";
import mongoose from 'mongoose';

await mongoose.connect();
const dataProvider = new MongooseDataProvider();
const underflag = new Underflag({ dataProvider });
if (await underflag.isOn("feature")) {
    // ...
}
```

_Attention: Do not forget of create the features collection in mongoose with the key and value fields._

Know more on [underflag npm page](https://www.npmjs.com/package/underflag)

### License

[MIT](LICENSE)
