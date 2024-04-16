import { Document, Schema, model, Types} from 'mongoose';
import Seller from './seller'
export interface Product {
  ProductName: string;
  price: number;
  type: string;
  description: string;
  images: string[],
  stock:number;
  seller: Types.ObjectId | Seller;
}

interface ProductModel extends Product, Document {}

const productSchema = new Schema<ProductModel>({
  ProductName: { type: String, required: true },
  price: { type: Number, required: true },
  type: {type:String,required:true},
  images:{type:[String],default:[]},
  stock:{ type:Number , required:true,default:0},
  description: { type: String, required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true }
}, { timestamps: true });

const ProductModel = model<ProductModel>('Product', productSchema);

export default ProductModel;
