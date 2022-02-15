import { Schema, model, Model, Connection } from 'mongoose';
import { IDataProvider, BaseFeature } from 'underflag';

const DEFAULT_COLLECTION = 'features';

const schema = new Schema<BaseFeature>({
    key: { type: String, required: true, index: true },
    value: { type: Schema.Types.Mixed },
    description: String
});

interface Options {
    /** Collection name of data. Default: 'features' */
    collectionName?: string,
    /** An instance of mongoose connection. Default: global mongoose instance */
    connection?: Connection
}

export class MongooseDataProvider implements IDataProvider {
    private featureModel: Model<BaseFeature>;
    private connection: Connection | undefined;

    constructor(options?: Options) {
        if (options?.connection) {
            this.connection = options.connection;
            this.featureModel = this.connection.model<BaseFeature>('BaseFeature', schema, options.collectionName || DEFAULT_COLLECTION);
        } else {
            this.featureModel = model<BaseFeature>('BaseFeature', schema, options?.collectionName || DEFAULT_COLLECTION);
        }
    }

    async getAll(): Promise<BaseFeature[]> {
        const results = await this.featureModel.find({});
        return results;
    }

    async get(key: string): Promise<BaseFeature | undefined> {
        const result = await this.featureModel.findOne({ key });
        if (!result) return undefined;
        return result;
    }
}