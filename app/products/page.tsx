import ProductList from '@/components/ProductList';
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ProductList />
    </div>
    </Layout>
  );
}