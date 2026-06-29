'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  TextField, MenuItem, RadioGroup, FormControlLabel, Radio, 
  Button, Box, FormLabel, FormControl 
} from '@mui/material';

interface Field {
  id: number;
  name: string;
  fieldType: 'TEXT' | 'LIST' | 'RADIO';
  defaultValue?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  listOfValues1?: string[];
}

interface DynamicFormProps {
  fields: Field[];
  products: any[];
}

export default function DynamicForm({ fields, products }: DynamicFormProps) {
 const {
  register,
  handleSubmit,
  control,
  setValue,
  formState: { errors }
} = useForm<Record<string, any>>({
  defaultValues: fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: field.defaultValue ?? "",
    }),
    {}
  ),
});

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      Object.keys(parsed).forEach(key => setValue(key, parsed[key]));
    }
  }, [setValue]);

  const onSubmit = async (data: any) => {
    localStorage.setItem('formData', JSON.stringify(data));
    
    // Logic: Find Product ID if "Product Selection" exists in form
    const selectedProductName = data["Product Selection"];
    const selectedProduct = products.find(p => p.name === selectedProductName);
    const payload = { ...data, productId: selectedProduct?.id || null };

    try {
      const response = await fetch('https://backendtaskorder.onrender.com/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) alert("Order successfully created!");
      else alert("Failed to create order.");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <Box key={field.id} sx={{ mb: 3 }}>

          {field.fieldType === 'TEXT' && (

           <TextField
    fullWidth
    margin="normal"
    label={field.name}
    defaultValue={field.defaultValue}
    error={!!errors[field.name]}
    helperText={errors[field.name]?.message as string}
    {...register(field.name, {
        required: field.required ? `${field.name} is required` : false,
        minLength: field.minLength
            ? {
                  value: field.minLength,
                  message: `Minimum ${field.minLength} characters`
              }
            : undefined,
        maxLength: field.maxLength
            ? {
                  value: field.maxLength,
                  message: `Maximum ${field.maxLength} characters`
              }
            : undefined,
        ...(field.name === "Email"
            ? {
                  pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Invalid email"
                  }
              }
            : {})
    })}
/>
          )
          
          }


{field.fieldType === 'LIST' && (
  <FormControl fullWidth>
    <FormLabel>{field.name}</FormLabel>
    <Controller
      name={field.name}
      control={control}
      rules={{ required: field.required }}
      render={({ field: { onChange, value } }) => (
        <TextField
          select
          value={value || ''} // Always provide a fallback string
          onChange={onChange}
        >
          {field.listOfValues1?.map((val) => (
            <MenuItem key={val} value={val}>{val}</MenuItem>
          ))}
        </TextField>
      )}
    />
  </FormControl>
)}

          {field.fieldType === 'RADIO' && (
            <FormControl component="fieldset">
              <FormLabel component="legend">{field.name}</FormLabel>
              <Controller
                name={field.name}
                control={control}
                rules={{ required: field.required }}
                render={({ field: radioField }) => (
                  <RadioGroup {...radioField}>
                    {field.listOfValues1?.map((val) => (
                      <FormControlLabel key={val} value={val} control={<Radio />} label={val} />
                    ))}
                  </RadioGroup>
                )}
              />
            </FormControl>
          )}
        </Box>
      ))}
      <Button type="submit" variant="contained" size="large">Submit</Button>
    </form>
  );
}