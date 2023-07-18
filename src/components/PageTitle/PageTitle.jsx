import React from 'react'

import {Helmet} from "react-helmet";

const PageTitle = ({title}) => {
  return (
    <Helmet>
        <title>Art And Craft | {title}</title>
    </Helmet>
  )
}

export default PageTitle