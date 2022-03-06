import React from 'react'
import Product from './Product'

function ProductFeed({ products }) {
  return (
    <div className="mx-auto  grid grid-flow-row-dense md:-mt-48 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {products
        .slice(0, 4)
        .map(({ id, title, description, category, price, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            description={description}
            category={category}
            price={price}
            image={image}
          />
        ))}

      <img
        className="md:col-span-full"
        src="http://links.papareact.com/dyz"
        alt=""
      />

      <div className="md:col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, description, category, price, image }) => (
            <Product
              key={id}
              id={id}
              title={title}
              description={description}
              category={category}
              price={price}
              image={image}
            />
          ))}
      </div>

      {products
        .slice(5)
        .map(({ id, title, description, category, price, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            description={description}
            category={category}
            price={price}
            image={image}
          />
        ))}
    </div>
  )
}

export default ProductFeed
