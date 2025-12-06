import React from 'react'
import CoverageMap from './CoverageMap'
import { useLoaderData } from 'react-router'

const Coverage = () => {

    const Warehouses = useLoaderData();
    // console.log(Warehouses);

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-4">
        We are available in 64 districts
      </h2>

      <p className="text-center text-gray-600 mb-10">
        Search your district and check if we deliver there.
      </p>

      <CoverageMap Warehouses={Warehouses} />
    </section>
  )
}

export default Coverage