import React, { useContext, useEffect, useState } from 'react';
import categoryContext from '../context/categories/categoryContext';
import { Button } from '../Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../Components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../Components/ui/dialog';
import { Input } from '../Components/ui/input';
import { Plus, Folder, Edit, Trash2 } from 'lucide-react';

const CategorySidebar = ({ selectedCategory, onCategorySelect, showAlert }) => {
    const context = useContext(categoryContext);
    const { categories, getCategories, addCategory, deleteCategory, editCategory } = context;
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        color: '#3B82F6',
        icon: '📁'
    });

    useEffect(() => {
        getCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (formData.name.trim()) {
            await addCategory(formData.name, formData.color, formData.icon);
            setFormData({ name: '', color: '#3B82F6', icon: '📁' });
            setIsAddDialogOpen(false);
            showAlert("Category added successfully", "success");
        }
    };

    const handleEditCategory = async (e) => {
        e.preventDefault();
        if (formData.name.trim() && editingCategory) {
            await editCategory(editingCategory._id, formData.name, formData.color, formData.icon);
            setFormData({ name: '', color: '#3B82F6', icon: '📁' });
            setEditingCategory(null);
            setIsEditDialogOpen(false);
            showAlert("Category updated successfully", "success");
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            await deleteCategory(categoryId);
            showAlert("Category deleted successfully", "success");
        }
    };

    const openEditDialog = (category) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            color: category.color,
            icon: category.icon
        });
        setIsEditDialogOpen(true);
    };

    const colorOptions = [
        { name: 'Blue', value: '#3B82F6' },
        { name: 'Green', value: '#10B981' },
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Red', value: '#EF4444' },
        { name: 'Orange', value: '#F97316' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'Yellow', value: '#F59E0B' },
        { name: 'Gray', value: '#6B7280' }
    ];

    const iconOptions = ['📁', '📚', '💡', '🎯', '📝', '📊', '🔬', '🧪', '📖', '✏️'];

    return (
        <div className="w-64 bg-background border-r border-border h-full p-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Categories</h2>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="h-8 w-8 p-0">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Category</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAddCategory} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Enter category name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Color</label>
                                <div className="grid grid-cols-4 gap-2 mt-2">
                                    {colorOptions.map((color) => (
                                        <button
                                            key={color.value}
                                            type="button"
                                            className="w-8 h-8 rounded-full border-2 border-border hover:border-primary"
                                            style={{ backgroundColor: color.value }}
                                            onClick={() => setFormData({ ...formData, color: color.value })}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Icon</label>
                                <div className="grid grid-cols-5 gap-2 mt-2">
                                    {iconOptions.map((icon) => (
                                        <button
                                            key={icon}
                                            type="button"
                                            className="w-8 h-8 text-lg hover:bg-accent rounded"
                                            onClick={() => setFormData({ ...formData, icon })}
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Add Category</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-2">
                <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onCategorySelect(null)}
                >
                    <Folder className="mr-2 h-4 w-4" />
                    All Notes
                </Button>

                {categories.map((category) => (
                    <div key={category._id} className="group relative">
                        <Button
                            variant={selectedCategory === category._id ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => onCategorySelect(category._id)}
                            style={{ 
                                backgroundColor: selectedCategory === category._id ? category.color : 'transparent',
                                color: selectedCategory === category._id ? 'white' : 'inherit'
                            }}
                        >
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                        </Button>
                        
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex space-x-1">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0"
                                    onClick={() => openEditDialog(category)}
                                >
                                    <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-6 w-6 p-0 text-destructive"
                                    onClick={() => handleDeleteCategory(category._id)}
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditCategory} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Name</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter category name"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Color</label>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        className="w-8 h-8 rounded-full border-2 border-border hover:border-primary"
                                        style={{ backgroundColor: color.value }}
                                        onClick={() => setFormData({ ...formData, color: color.value })}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Icon</label>
                            <div className="grid grid-cols-5 gap-2 mt-2">
                                {iconOptions.map((icon) => (
                                    <button
                                        key={icon}
                                        type="button"
                                        className="w-8 h-8 text-lg hover:bg-accent rounded"
                                        onClick={() => setFormData({ ...formData, icon })}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Update Category</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CategorySidebar; 