import { useState } from 'react';
import AdminPropertyList from './AdminPropertyList';
import AdminPropertyEditor from './AdminPropertyEditor';

type View = 'list' | 'create' | 'edit';

export default function AdminPropertyApp() {
  const [view, setView] = useState<View>('list');
  const [editingPropertyId, setEditingPropertyId] = useState<string | null>(null);

  const handleCreateNew = () => {
    setEditingPropertyId(null);
    setView('create');
  };

  const handleEditProperty = (id: string) => {
    setEditingPropertyId(id);
    setView('edit');
  };

  const handleBackToList = () => {
    setEditingPropertyId(null);
    setView('list');
  };

  const handleSave = () => {
    // After save, go back to list
    setEditingPropertyId(null);
    setView('list');
  };

  return (
    <>
      {view === 'list' && (
        <AdminPropertyList
          onCreateNew={handleCreateNew}
          onEditProperty={handleEditProperty}
        />
      )}
      
      {(view === 'create' || view === 'edit') && (
        <AdminPropertyEditor
          propertyId={editingPropertyId}
          onCancel={handleBackToList}
          onSave={handleSave}
        />
      )}
    </>
  );
}
