import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Product } from '../../../../core/models/Product';
import { ProductService } from '../../../../core/services/product.service';
import { CategoryService } from '../../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  categories: { id: string; name: string }[] = [];
  isEditing = false;
  currentProduct: Product = {
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    categoryId: '',
  };
  trackById: TrackByFunction<Product> | undefined;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  // Load categories from API
  loadCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data.map((category) => ({
        id: category.id ?? '',
        name: category.name,
      })) as { id: string; name: string }[];
    });
  }

  // Get category name by categoryId
  getCategoryName(categoryId: string): string {
    const category = this.categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Không xác định';
  }

  // Load list of products from API
  loadProducts() {
    this.productService
      .getProducts()
      .pipe(map((response) => response.data))
      .subscribe((products) => {
        this.products = products;
      });
  }

  // Save (Add or Update) product
  saveProduct() {
    if (
      !this.currentProduct.name ||
      !this.currentProduct.price ||
      !this.currentProduct.categoryId
    ) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    if (this.isEditing && this.currentProduct.id) {
      this.productService
        .updateProduct(this.currentProduct.id, this.currentProduct)
        .subscribe(() => {
          this.loadProducts();
          this.resetForm();
        });
    } else {
      this.productService.addProduct(this.currentProduct).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    }
  }

  // Reset the form and toggle editing mode
  resetForm() {
    this.isEditing = false;
    this.currentProduct = {
      name: '',
      description: '',
      price: 0,
      stockQuantity: 0,
      categoryId: '',
    };
  }

  // Edit a product (set it for editing mode)
  editProduct(product: Product) {
    this.isEditing = true;
    this.currentProduct = { ...product };
  }

  showCategoryName(categoryId: string): void {
    console.log(this.getCategoryName(categoryId));
  }

  // Delete a product
  deleteProduct(productId: string) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          // Successfully deleted, now reload the product list
          this.loadProducts();
        },
        (error) => {
          // Handle error if deletion fails
          alert('Có lỗi xảy ra khi xóa sản phẩm!');
        }
      );
    }
  }
}
