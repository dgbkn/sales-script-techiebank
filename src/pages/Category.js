import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'

const CATEGORY= gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name,
      id,
      items{
        id,
        name,
        content,
        categories{
          id,
          name
        }
      }
    }
  }
`

export default function Category() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div>
      <h2>{ data.category.name } Items </h2>
      {data.category.items.map(item => (
        <div key={item.id} className="review-card">
          <h2>{item.name}</h2>

          {item.categories.map(c => (
            <small key={c.id}>{c.name}</small>
          ))}
          
          <p>{item.content.substring(0, 200)}...</p>
          <Link to={`/details/${item.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}
