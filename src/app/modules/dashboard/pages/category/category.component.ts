import { Component, OnInit } from '@angular/core';
import {
  CategoryService,
  Category,
} from '../../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  isEditing = false;
  currentCategory: Category = { name: '', description: '' };

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response.data;
    });
  }

  editCategory(category: Category) {
    this.isEditing = true;
    this.currentCategory = { ...category };
  }

  saveCategory() {
    if (!this.currentCategory.name) {
      alert('Vui lòng nhập tên danh mục!');
      return;
    }

    if (this.isEditing && this.currentCategory.id) {
      this.categoryService
        .updateCategory(this.currentCategory.id, this.currentCategory)
        .subscribe(() => {
          this.loadCategories();
          this.resetForm();
        });
    } else {
      this.categoryService.addCategory(this.currentCategory).subscribe(() => {
        this.loadCategories();
        this.resetForm();
      });
    }
  }

  deleteCategory(id?: string) {
    if (!id) return;
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.currentCategory = { name: '', description: '' };
  }

  trackById(index: number, item: Category) {
    return item.id;
  }
}
