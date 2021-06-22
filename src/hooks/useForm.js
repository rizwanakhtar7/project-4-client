import React from 'react'

export function useForm(initialFormData) {
  const [formData, setFormData] = React.useState(initialFormData)
  const [formErrors, setFormErrors] = React.useState(initialFormData)

  const handleChange = e => {
    // Use form name attribute as computed key
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  return {
    formData,
    formErrors,
    handleChange,
    setFormErrors,
    setFormData,
  }
  
}

