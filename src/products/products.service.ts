import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product> ){}

  async create(createProductDto: CreateProductDto):Promise<Product> {
    const product = await this.productRepository.save(createProductDto);
    return product;
  }

 async findAll():Promise<Product[]> {
  const products = await this.productRepository.find();
    return products;
  }

 async findOne(productId: number):Promise<Product> {
  const oneproduct = await this.productRepository.findOne({where:{productId}})
    return oneproduct;
  }

  async findByCategory(category:string):Promise<Product[] | null> {
    if(!category || typeof category !== 'string'){
      return null;
    }
    const productByCategory= await this.productRepository.find({where:{category}})
    return productByCategory
  }

 async update(productId: number, updateProductDto: UpdateProductDto) {
    const updateProduct = await this.productRepository.findOne({where:{productId}});
    if(!updateProduct){
      throw error('product not found')
    }
    await this.productRepository.update(productId, updateProductDto);
     const updated= await this.productRepository.findOne({where:{productId}});
   
     return updated

  
  }

  async remove(productId: number):Promise<any> {
    const deleteProduct = await this.productRepository.delete(productId)
    return deleteProduct;
  }

  
}
