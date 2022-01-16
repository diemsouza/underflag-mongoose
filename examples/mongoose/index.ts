import { Underflag, isOn } from 'underflag';
import mongoose from 'mongoose';
import { MongooseDataProvider } from '../../src/providers/MongooseDataProvider';
import config from './config.json';

const print = async (underflag: Underflag, key: string) => {
    const data = await underflag.get(key);
    return {
        key,
        status: isOn(data) ? 'on' : 'off',
        value: data && data.value,
        origin: data && data.origin
    };
};

(async () => {
    // config data provider
    await mongoose.connect(config.mongoUrl);

    // use data provider
    const dataProvider = new MongooseDataProvider();
    const underflag = new Underflag({ dataProvider });

    // load all features from data provider to memory
    // await underflag.loadAll();

    // check flags
    const list: any[] = [];
    for (const key of config.features) {
        list.push(await print(underflag, key));
    }
    list.push(await print(underflag, 'other'));
    console.table(list);

    mongoose.disconnect();
})();