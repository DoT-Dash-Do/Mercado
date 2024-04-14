import { Document, Schema, model, Types} from 'mongoose';
import Seller from './seller'
export interface Product {
  name: string;
  price: number;
  description: string;
  seller: Types.ObjectId | Seller;
}

interface ProductModel extends Product, Document {}

const productSchema = new Schema<ProductModel>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true }
}, { timestamps: true });

const ProductModel = model<ProductModel>('Product', productSchema);

export default ProductModel;
