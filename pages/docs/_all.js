import React from 'react'
import Head from 'next/head'
import axios from 'axios'

export default class extends React.Component {
  static getInitialProps ({ pathname }) {
    return new Promise( (resolve, reject) => (
        axios.get('http://localhost:4000/api/documents/2006EVS30276O')
            .then((response) => (resolve(response.data)))
            .catch((error) => (reject(error)))
        ))
        .then(
        function(_data) { return {_data} },
        function(err) { return  {doc: [], error: err, pathname: pathname} }
        )
    }
  render () {
    return (<div>
    <Head>
      <title>ffff</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content='fffff' />
    </Head>
    <div>
      this is document fff
    </div>
  </div>
    )
  }
}