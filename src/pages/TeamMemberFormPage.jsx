import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { adminAPI } from '../services/api';
import TeamMemberForm from '../components/forms/TeamMemberForm';

const TeamMemberFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    bio: '',
    imageUrl: '',
    order: 0,
    isLeadership: false,
    isActive: true
  });
  
  const [submitting, setSubmitting] = useState(false);

  // Load team member data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const loadTeamMember = async () => {
        try {
          const member = await adminAPI.getTeamMemberById(id);
          setFormData({
            ...member,
            // Ensure all fields have default values
            firstName: member.firstName || '',
            lastName: member.lastName || '',
            position: member.position || '',
            department: member.department || '',
            email: member.email || '',
            phone: member.phone || '',
            bio: member.bio || '',
            imageUrl: member.imageUrl || '',
            order: member.order || 0,
            isLeadership: member.isLeadership || false,
            isActive: member.isActive !== false // Default to true if not specified
          });
        } catch (error) {
          console.error('Error loading team member:', error);
          toast.error('Failed to load team member data');
          navigate('/admin/dashboard');
        }
      };
      loadTeamMember();
    }
  }, [id, isEditMode, navigate]);

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'position', 'bio'];
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    if (formData.bio && formData.bio.length < 10) {
      toast.error('Bio must be at least 10 characters long');
      return false;
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Map frontend fields to backend fields
      const memberData = {
        name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim(),
        role: formData.position || '',
        bio: formData.bio || '',
        email: formData.email || '',
        phone: formData.phone || '',
        department: formData.department || '',
        imageUrl: formData.imageUrl || '',
        order: formData.order || 0,
        isLeadership: formData.isLeadership || false,
        isActive: formData.isActive !== false,
        // Default values for required fields in the backend
        responsibilities: [],
        socialLinks: {}
      };
      
      if (isEditMode) {
        await adminAPI.updateTeamMember(id, memberData);
        toast.success('Team member updated successfully');
      } else {
        await adminAPI.createTeamMember(memberData);
        toast.success('Team member added successfully');
      }
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving team member:', error);
      // Show more detailed error message from the backend if available
      const errorMessage = error.response?.data?.detail || 
                         error.response?.data?.message || 
                         'Failed to save team member';
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="container mx-auto p-6">
      <TeamMemberForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        submitting={submitting}
        isEdit={isEditMode}
      />
    </div>
  );
};

export default TeamMemberFormPage;
