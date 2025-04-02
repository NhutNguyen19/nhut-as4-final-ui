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
  categories: { id: string; name: string; description: string }[] = [];
  isEditing = false;
  trackById: TrackByFunction<Product> = (index, item) => item.id;

  currentProduct: Product = {
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    category: { id: '' },
  };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      console.log('API Categories:', response.data);
      this.categories = response.data.map((category) => ({
        id: category.id ?? '',
        name: category.name,
        description: category.description || 'Không có mô tả',
      }));
    });
  }

  getCategoryName(categoryId: string | undefined): string {
    if (!categoryId) {
      console.warn('categoryId không hợp lệ!');
      return 'Không xác định';
    }

    const category = this.categories.find((cat) => cat.id === categoryId);
    if (!category) {
      console.warn(`Không tìm thấy danh mục với categoryId: ${categoryId}`);
      return 'Không xác định';
    }
    return category.name;
  }

  loadProducts() {
    this.productService
      .getProducts()
      .pipe(map((response) => response.data))
      .subscribe((products) => {
        this.products = products.map((product) => ({
          ...product,
          category: product.category || { id: '' },
        }));
        console.log('Loaded Products:', products);
      });
  }

  saveProduct() {
    console.log('Current Product:', this.currentProduct);
    console.log('Name:', this.currentProduct.name);
    console.log('Price:', this.currentProduct.price);
    console.log('Category ID:', this.currentProduct.category?.id);

    if (
      !this.currentProduct.name?.trim() ||
      this.currentProduct.price == null ||
      this.currentProduct.price < 0 ||
      !this.currentProduct.category?.id?.trim()
    ) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const existingCategory = this.categories.find(
      (cat) => cat.id === this.currentProduct.category.id
    );

    if (existingCategory) {
      console.log('categoryId hợp lệ:', this.currentProduct.category.id);
      this.processSaveProduct();
    } else {
      console.log('categoryId không hợp lệ:', this.currentProduct.category.id);
      alert('Danh mục không hợp lệ!');
    }
  }

  private processSaveProduct() {
    if (
      !this.currentProduct.category?.id ||
      this.currentProduct.category.id.trim() === ''
    ) {
      alert('Vui lòng chọn danh mục hợp lệ!');
      return;
    }

    const productData: Product = {
      ...this.currentProduct,
      category: { id: this.currentProduct.category.id.trim() },
    };

    console.log('Product data to send:', productData);

    if (this.isEditing && this.currentProduct.id) {
      this.productService
        .updateProduct(this.currentProduct.id, productData)
        .subscribe({
          next: () => {
            this.loadProducts();
            this.resetForm();
          },
          error: (err) => console.error('Update error:', err),
        });
    } else {
      this.productService.addProduct(productData).subscribe({
        next: () => {
          this.loadProducts();
          this.resetForm();
        },
        error: (err) => console.error('Add error:', err),
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.currentProduct = {
      name: '',
      description: '',
      price: 0,
      stockQuantity: 0,
      category: { id: '' },
    };
  }

  editProduct(product: Product) {
    this.isEditing = true;
    this.currentProduct = {
      ...product,
      category: product.category || { id: '' },
    };
  }

  deleteProduct(productId: string) {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.loadProducts();
        },
        (error) => {
          alert('Có lỗi xảy ra khi xóa sản phẩm!');
        }
      );
    }
  }

  showCategoryName(categoryId: string): void {
    const categoryName = this.getCategoryName(categoryId);
    console.log(`Category Name: ${categoryName}`);
  }
}
