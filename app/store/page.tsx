"use client";

import React from 'react'
// import ProductGrid from '../../components/ProductGrid'
// import { products } from '../../app/data/products'

export default function Store() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="mb-6 text-4xl font-bold">DS UCSB Store</h1>
        <p className="text-lg text-gray-600">
          Support the Data Science Club at UCSB by purchasing our official merchandise 
          and memberships. All proceeds go towards club activities and events.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Available Products</h2>
        {/* <ProductGrid products={products} /> */}
      </section>

      <section className="rounded-lg bg-blue-50 p-6">
        <h2 className="mb-4 text-xl font-semibold">Payment Information</h2>
        <p className="text-gray-700">
          We accept payments through Zelle. After placing your order, you will receive 
          payment instructions and details for completing your purchase.
        </p>
      </section>
    </div>
  )
}