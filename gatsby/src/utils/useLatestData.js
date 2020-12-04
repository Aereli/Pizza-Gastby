import { useState, useEffect } from 'react'

//this is for syntax highlighting for the gql query :D
const gql = String.raw

const deets = `
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
`

export default function useLatestData() {
  const [hotSlices, setHotSlices] = useState()
  const [slicemasters, setSlicemasters] = useState()

  useEffect(function () {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        // set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices)
        setSlicemasters(res.data.StoreSettings.slicemaster)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return {
    hotSlices,
    slicemasters,
  }
}
