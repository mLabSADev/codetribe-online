import React, { useEffect, useState } from 'react'
import '../styles/home-content.css'
import { Button, Col, Divider, Row } from 'antd'
import { Link, navigate } from 'gatsby'
import PostListing from './post-listing'
import TutorialListing from './tutorial-listing'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { AuthService } from '../services/auth-service'
import WebinarListing from './webinar-listing'
import PageLayout from '../templates/layout'

const Webinars = () => {
    const [user, setUser] = useState(null)
    const [categories, setCategories] = useState(['All'])
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')

    const viewTutorials = () => {
        navigate('/tutorials')
    }

    const viewTemplates = () => {
        navigate('/templates')
    }

    const viewBlogs = () => {
        navigate('/blog')
    }

    const getInitials = user => {
        console.log(user);
        if (user)
            return user.firstname.substr(0, 1) + user.lastname.substr(0, 1)
        else
            return '-'
    }

    useEffect(() => {
        AuthService.currentUser().then(result => {
            console.log(result);
            setUser(result)
        })
    }, [])

    const onCategories = categories => {
        setCategories(categories)
    }

    const onSearch = event => {
        const term = event.target.value

        console.log(term);

        setSearchTerm(term)
    }

    const filteredCategories = categories => categories.filter(category => category.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1)

    const CategoryButton = ({category, isSelected}) => {
        return (
            <Button style={{
                background: isSelected ? '#82c803' : '#dfdfdf',
                borderRadius: 20,
                color: isSelected ? 'white' : 'black',
                fontWeight: 'bold',
                borderStyle: 'none',
                marginRight: 10
            }} onClick={() => {
                setSelectedCategory(category)
            }}>{category}</Button>
        )
    }

    return (
        <PageLayout active={'webinars'}>
        <div style={{padding: 0}}>
            {/* <div style={{display: 'flex', justifyContent: 'flex-end', padding: 10, background: '#f5f5f5', borderRadius: 20, marginBottom: 20, alignItems: 'center'}}>
                <div style={{flex: 1}}>
                {user && user.role === 'facilitator' && <Button type='link' onClick={() => {
                    navigate('/students')
                }}>View Students</Button>}
                </div>
                <div style={{width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 153, 255)', borderRadius: '100%', color: 'white', marginRight: 10}}>{getInitials(user)}</div>
                {user && <div style={{fontWeight: 'bold'}}>{user.firstname} {user.lastname}</div>}
            </div> */}

            <div style={{flex: 1}}>
                <div style={{width: '100%', background: "linear-gradient(105deg, #5c61ff 0%, hsl(214, 100%, 84%) 100%)", borderRadius: 20, padding: 30, overflow: 'hidden', position: 'relative'}}>
                    <Row>
                        <Col xs={24} sm={24} md={16} lg={12}>
                        <span style={{color: 'white', fontSize: 64, fontWeight: 'bold', display: 'block'}}>Browse our<br />useful <span style={{color: 'rgb(143, 230, 76)'}}>Webinars</span></span>
                        <div>
                        <span style={{color: 'white'}}>Nunc quis tortor ut diam scelerisque volutpat ac ut felis. Nullam tincidunt lacinia eleifend. Vestibulum nisi augue, commodo sed tellus sed, condimentum lobortis orci. Aenean eu enim et arcu finibus facilisis nec vel orci.</span>
                        </div>
                        </Col>
                        <Col xs={0} sm={0} md={0} lg={8}>
                        <img src='/images/ssss.webp' style={{
                            height: 300
                        }} />
                        </Col>
                    </Row>
                    
                    
                </div>

                <div style={{marginTop: 20, background: '#f5f5f5', borderRadius: 20, border: '0px solid #dedede', padding: 15, marginBottom: 20}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <div style={{fontWeight: 'bold', fontSize: 20, flexDirection: 'row', flex: 1, display: 'flex', flexWrap: 'nowrap', overflowX: 'scroll', alignItems: 'center'}}>
                                    <CategoryButton category={'All'} isSelected={selectedCategory === 'All'} />
                                    {filteredCategories(categories).map((category, index) => {
                                        return (
                                            <div key={`category-${index}`}>
                                                {<CategoryButton category={category} isSelected={selectedCategory === category} />}
                                            </div>
                                        )
                                    })}
                                </div>
                                <Row>
                                    <Col xs={0} sm={0} md={24}>
                                        <input onChange={onSearch} className='light-placeholder' style={{
                                            padding: 10,
                                            background: 'efefef',
                                            borderRadius: 15,
                                            borderStyle: 'none'
                                        }} placeholder='Search' />
                                    </Col>
                                </Row>
                            </div>
                    
                </div>

                <WebinarListing category={selectedCategory === 'All' ? null : selectedCategory} limit={6} onCategories={onCategories} />
            </div>
        </div>
        </PageLayout>
    )
}

export default Webinars