import { Underflag } from 'underflag';
import mongoose from 'mongoose';
import { MongooseDataProvider } from '../../src/providers/MongooseDataProvider';
import config from './config.json';

const print = async (underflag: Underflag, key: string) => {
    const data = await underflag.getFeature(key);
    return {
        key,
        status: data?.isOn() ? 'on' : 'off',
        value: data?.value,
        origin: data?.origin
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