import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'
// import ReactRic

const item = gql`
  query Getitem($id: ID!) {
    item(id: $id) {
      id,
      name,
      content,
      categories{
        id,
        name
      }
    }
  }
`

export default function ItemDetails() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(item, {
    variables: { id: id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  console.log(data)

  return (
    <div className="item-card">
      <div className="rating">{data.item.rating}</div>
      <h2>{data.item.name}</h2>

      {data.item.categories.map(c => (
        <small key={c.id}>{c.name}</small>
      ))}

      <ReactMarkdown children={`${data.item.content}`} /> 
    </div>
  )
}
