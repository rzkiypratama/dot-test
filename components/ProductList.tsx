"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, Spin } from "antd";
import { LoadingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Product } from "@/types/products";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        const data = await response.json();
        setProducts(data.products);
        setIsLoading(false);
       
        const initialImageLoading = data.products.reduce((acc: { [key: string]: boolean }, product: Product) => {
          acc[product.id] = true;
          return acc;
        }, {});
        setImageLoading(initialImageLoading);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [router]);

  const handleImageLoad = (productId: string) => {
    setImageLoading(prev => ({ ...prev, [productId]: false }));
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.title}
          cover={
            <div className="relative" style={{ height: '450px' }}>
              {imageLoading[product.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <Spin indicator={<LoadingOutlined spin />} />
                </div>
              )}
              <img
                alt={product.title}
                src={product.images}
                onLoad={() => handleImageLoad(product.id)}
                style={{ display: imageLoading[product.id] ? 'none' : 'block', width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          }
          actions={[
            <p key="category">{product.category}</p>,
            <p key="price" className="text-gray-600">${product.price}</p>,
            <ShoppingCartOutlined key="cart" />,
          ]}
          className="border p-4 rounded shadow"
        >
          <p className="mt-2">{product.description}</p>
        </Card>
      ))}
    </div>
  );
}