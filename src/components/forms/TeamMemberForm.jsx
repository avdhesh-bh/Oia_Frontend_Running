import React from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import BaseForm from './BaseForm';

const TeamMemberForm = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  submitting,
  isEdit = false
}) => {
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <BaseForm
      title={isEdit ? 'Edit Team Member' : 'Add Team Member'}
      description="Add or update team member details"
      onSubmit={onSubmit}
      onCancel={onCancel}
      submitting={submitting}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name *</label>
            <Input
              id="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              placeholder="First name"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name *</label>
            <Input
              id="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              placeholder="Last name"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="position" className="block text-sm font-medium mb-1">Position *</label>
            <Input
              id="position"
              value={formData.position || ''}
              onChange={handleChange}
              placeholder="e.g., Director, Coordinator"
              minLength={1}
              maxLength={200}
              required
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium mb-1">Department *</label>
            <Input
              id="department"
              value={formData.department || ''}
              onChange={handleChange}
              placeholder="e.g., International Office"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange}
              placeholder="email@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
            <Input
              id="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              placeholder="+1 (123) 456-7890"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="bio" className="block text-sm font-medium">Bio *</label>
            <span className="text-xs text-gray-500">
              {formData.bio?.length || 0}/10+ characters
            </span>
          </div>
          <Textarea
            id="bio"
            value={formData.bio || ''}
            onChange={handleChange}
            placeholder="Brief bio about the team member (minimum 10 characters)"
            rows={4}
            minLength={10}
            maxLength={1000}
            className={formData.bio && formData.bio.length < 10 ? 'border-red-500' : ''}
            required
          />
          {formData.bio && formData.bio.length < 10 && (
            <p className="mt-1 text-sm text-red-600">Bio must be at least 10 characters long</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">Profile Photo URL</label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl || ''}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          <div>
            <label htmlFor="order" className="block text-sm font-medium mb-1">Display Order</label>
            <Input
              id="order"
              type="number"
              min="0"
              value={formData.order || ''}
              onChange={handleChange}
              placeholder="Display order (lower numbers first)"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="isLeadership" className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isLeadership"
                checked={!!formData.isLeadership}
                onChange={(e) => setFormData(prev => ({ ...prev, isLeadership: e.target.checked }))}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Leadership Team</span>
            </label>
          </div>
          <div>
            <label htmlFor="isActive" className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive !== false}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Active Member</span>
            </label>
          </div>
        </div>
      </div>
    </BaseForm>
  );
};

export default TeamMemberForm;
