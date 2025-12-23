import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { adminAPI } from '../services/api';
import GalleryForm from '../components/forms/GalleryForm';

const GalleryFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    order: 0,
    isFeatured: false,
    isActive: true,
    imageFile: null
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Load gallery item data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadGalleryItem = async () => {
        try {
          const item = await adminAPI.getGalleryImageById(id);
          setFormData({
            title: item.title || '',
            description: item.description || '',
            imageUrl: item.image || '',
            category: item.category || '',
            order: item.order || 0,
            isFeatured: item.is_featured || false,
            isActive: item.is_active !== false,
            imageFile: null
          });
        } catch (error) {
          console.error('Error loading gallery item:', error);
          toast.error('Failed to load gallery item data');
          navigate('/admin/dashboard');
        }
      };
      loadGalleryItem();
    }
  }, [id, isEditMode, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Handle image file
      if (formData.imageFile) {
        // Ensure we're getting a proper File object
        if (!(formData.imageFile instanceof File)) {
          throw new Error('Invalid file selected');
        }
        formDataToSend.append('file', formData.imageFile);
      } else if (formData.imageUrl) {
        // Handle image URL if provided
        formDataToSend.append('image_url', formData.imageUrl);
      } else {
        throw new Error('Please provide either an image file or an image URL');
      }
      
      // Append other required fields
      const fields = {
        title: formData.title || 'Untitled',
        description: formData.description || '',
        category: formData.category || 'Events',
        order: formData.order ? parseInt(formData.order, 10) : 0,
        is_featured: formData.isFeatured ? 'true' : 'false',
        is_active: formData.isActive !== false ? 'true' : 'false'
      };
      
      // Append all fields to FormData
      Object.entries(fields).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Log the form data being sent (for debugging)
      console.log('Submitting form data:');
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value instanceof File ? `${value.name} (${value.type}, ${value.size} bytes)` : value);
      }

      setIsUploading(true);
      
      if (isEditMode) {
        await adminAPI.updateGalleryImage(id, formDataToSend);
        toast.success('Gallery item updated successfully');
      } else {
        await adminAPI.uploadGalleryImage(formDataToSend);
        toast.success('Image added to gallery successfully');
      }
      
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving gallery item:', error);
      toast.error(error.response?.data?.message || 'Failed to save gallery item');
    } finally {
      setSubmitting(false);
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="container mx-auto p-6">
      <GalleryForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitting={submitting || isUploading}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default GalleryFormPage;
