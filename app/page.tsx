'use client';

import DynamicForm from './components/DynamicForm';
import ClientOnly from './components/ClientOnly';
import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

const initialFormData = {
  data: [
    {
      id: 1,
      name: "Full Name",
      fieldType: "TEXT" as const,
      defaultValue: "",
      required: true,
      minLength: 3,
      maxLength: 100
    },
    {
      id: 2,
      name: "Email",
      fieldType: "TEXT" as const,
      defaultValue: "",
      required: true,
      minLength: 5,
      maxLength: 50
    },
    {
      id: 3,
      name: "Gender",
      fieldType: "LIST" as const,
      defaultValue: "Male",
      required: true,
      listOfValues1: ["Male", "Female", "Others"]
    },
    {
      id: 4,
      name: "Product Selection",
      fieldType: "LIST" as const,
      defaultValue: "",
      required: true,
      listOfValues1: []
    }
  ]
};

export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://backendtask-91bz.onrender.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const dynamicFields = initialFormData.data.map(field => {

    if (field.name === "Product Selection") {
      return {
        ...field,
        listOfValues1: products.map(product => product.name)
      };
    }

    return field;
  });

  return (
    <ClientOnly>
      <Container maxWidth="sm" sx={{ mt: 5 }}>

        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 4 }}
        >
          Retail Tech Registration
        </Typography>

        <DynamicForm
          fields={dynamicFields}
          products={products}
        />

      </Container>
    </ClientOnly>
  );
}