import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Error.css'
import { Link } from 'react-router-dom'
import PageTitle from '../../components/PageTitle/PageTitle'

const Error = () => {
  return (
    <Container className='text-center py-5 page_404'>
      <PageTitle title="404"></PageTitle>
      <Row>
        <Col>

		<div className=" text-center">
		<div className="four_zero_four_bg">
			<h1 className="text-center ">404</h1>
		</div>
		
		<div className="contant_box_404">
      <h3 className="h2">Look like you are lost</h3>
      <p>The page you are looking for not available!</p>
     <button> <Link className="text-decoration-none text-white px-4 py-4" style={{}} to={'/'}>Home</Link></button>
	</div>
		</div>


        </Col>
      </Row>
    </Container>
  )
}

export default Error