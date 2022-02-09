import { Schema, model, Model, Connection } from 'mongoose';
import { IDataProvider, Feature } from 'underflag';

const DEFAULT_COLLECTION = 'features';

const schema = new Schema<Feature>({
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
    private featureModel: Model<Feature>;
    private connection: Connection | undefined;

    constructor(options?: Options) {
        if (options?.connection) {
            this.connection = options.connection;
            this.featureModel = this.connection.model<Feature>('Feature', schema, options.collectionName || DEFAULT_COLLECTION);
        } else {
            this.featureModel = model<Feature>('Feature', schema, options?.collectionName || DEFAULT_COLLECTION);
        }
    }

    async getAll(): Promise<Feature[]> {
        const results = await this.featureModel.find({});
        return results;
    }

    async get(key: string): Promise<Feature | undefined> {
        const result = await this.featureModel.findOne({ key });
        if (!result) return undefined;
        return result;
    }
}