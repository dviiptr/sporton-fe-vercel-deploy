"use client";


import Button from "@/app/components/ui/button";
import { FiPlus } from "react-icons/fi";
import CategoryTable from "../../components/categories/category-table";
import CategorysModal from "../../components/categories/category-modal";
import { useEffect, useState } from "react";
import { Category } from "@/app/types";
import { deleteCategory, getAllCategories } from "@/app/services/category.service";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";

const CategoryManagement = () => {
    const [isModelOpen, setIsModalOpen] = useState(false);
     const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
     const [categories, setCategories] = useState<Category[]>([]);

     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
     const [categoryToDeleteId ,setCategoryToDeleteId] = useState("");

     const fetchCategories = async () => {
        try {
            const data = await getAllCategories();
            setCategories(data)
        } catch(error) {
            console.error("Failed to fetch categories", error)
        }
    };

     const handleEdit = (category: Category) => {
            setSelectedCategory(category);
            setIsModalOpen(true);
        }

     const handleDelete = (id: string) => {
        setCategoryToDeleteId(id);
        setIsDeleteModalOpen(true)
    }

      const handleDeleteConfirm = async () => {
            if (!categoryToDeleteId) return;
            try {
                await deleteCategory(categoryToDeleteId);
                fetchCategories();
                toast.success("Category deleted successfuly!");
                setIsDeleteModalOpen(false);
                setCategoryToDeleteId("");
            } catch (error) {
                console.error("Failed to delete category", error);
                toast.error("Failed to delete category");
            }
        };


    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

     useEffect(() => {
            fetchCategories();
        } , []);

    return (
        <div>
            <div className="flex justify-between items-center mb-10">
            <div>
            <h1 className="font-bold text-2xl">Category Management</h1>
            <p className="opacity-50">Organize your categorys into categories.</p>
        </div>
        <Button className="rounded-lg" onClick={() => setIsModalOpen(true)}>
            <FiPlus size={24} /> 
            Add Category 
            </Button>
        </div>
        <CategoryTable  
        categories={categories} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        />
        <CategorysModal
        category={selectedCategory} 
        onSuccess={fetchCategories} 
        isOpen={isModelOpen} 
        onClose={handleCloseModal}
        />
       <DeleteModal isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm} 
        />
    </div>
    );
};

export default CategoryManagement;