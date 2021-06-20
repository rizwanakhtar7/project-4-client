import React from 'react'

export default function useFormComment(initialFormData) {
  const [formData, setFormData] = React.useState(initialFormData)

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }
  return {
    formData,
    handleChange,
    setFormData,
  }
}

