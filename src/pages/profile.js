import { HomeFilled, MailFilled } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { ProfileService } from '../services/profile-service'
import PageLayout from "../templates/layout"

const Tag = ({children, icon}) => {
    return (
        <div style={{
            borderRadius: 20,
            borderStyle: 'solid',
            color: 'black',
            borderWidth: 1,
            padding: 10,
            marginRight: 10,
            marginLeft: 10,
            display: 'flex'
        }}>
            <div style={{marginRight: 10}}>
                {icon}
            </div> {children}
        </div>
    )
}

const Profile = () => {
    const image = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b290ad14-8fde-4b91-bbd2-6cb837f60313/da2ijnn-ba9c9710-f50d-4561-a79d-57573fc1fc9b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9iMjkwYWQxNC04ZmRlLTRiOTEtYmJkMi02Y2I4MzdmNjAzMTMvZGEyaWpubi1iYTljOTcxMC1mNTBkLTQ1NjEtYTc5ZC01NzU3M2ZjMWZjOWIucG5nIn1dXX0.d1-jK5bL9B_FW3_HH8lcfNkkRrR3wrIKhhjdzzPXXhY'
    const [profile, setProfile] = useState()
    
    useEffect(() => {
        ProfileService.observerProfile(profile => {
            setProfile(profile)
        })
    }, [])

    return (
        <PageLayout>
            <Row>
                <Col xs={0} sm={0} md={3} lg={4}></Col>
                <Col xs={24} sm={24} md={18} lg={16}>
                <div style={{
                    padding: 10,
                    borderRadius: 20,
                    backgroundImage: 'url(/images/profile-bg.jpg)',
                    marginTop: 30
                }}>
                    <div style={{
                        background: 'rgba(256, 256, 256, 0.97)',
                        padding: 40,
                        borderRadius: 15
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <img src={image} style={{
                                width: 140,
                                height: 140,
                                objectFit: 'cover',
                                borderRadius: '100%',
                                marginBottom: 20
                            }} />

                            <div style={{fontWeight: 'bold', fontSize: '2.5em', marginBottom: 20}}>{profile?.firstname} {profile?.lastname}</div>

                            <div style={{
                                marginBottom: 20
                            }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi lacus sed viverra. Viverra adipiscing at in tellus integer feugiat.
                            </div>

                            <div style={{
                                display: 'flex'
                            }}>
                                <Tag icon={<MailFilled />}>{profile?.email}</Tag>
                                <Tag icon={<HomeFilled />}>{profile?.role == 'facilitator' ? 'Facilitator' : profile?.location}</Tag>
                                
                            </div>
                            <div style={{
                                display: 'flex',
                                marginTop: 20
                            }}>
                                {profile?.groups.map(group => {
                                    return <Tag >{group}</Tag>
                                })}
                            </div>
                        </div>
                    </div>
            </div>
                </Col>
            </Row>
            
        </PageLayout>
    )
}

export default Profile