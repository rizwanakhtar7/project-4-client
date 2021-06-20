import React from 'react'

export function useForm(initialFormData) {
  const [formData, setFormData] = React.useState(initialFormData)

  const handleChange = e => {
    // Use form name attribute as computed key
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  return {
    // key / value have the same name so use js shorthand
    formData,
    handleChange,
  }
}

