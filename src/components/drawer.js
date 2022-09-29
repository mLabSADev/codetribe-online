import { ArrowLeftOutlined, EditOutlined, PoweroffOutlined, UnorderedListOutlined, VideoCameraAddOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { Link, navigate } from 'gatsby'
import React, { useEffect, useState } from 'react'
import EditProfile from '../modals/edit-profile'
import { ProfileService } from '../services/profile-service'

const MenuButton = ({
    children,
    to,
    active = false,
    icon
}) => {
    return (
        <Link to={to}><button style={{
            background: 'rgba(61, 61, 61, 0.05)',
            borderStyle: 'none',
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 28,
            color: active ? 'rgb(143, 230, 76)' : 'rgb(61, 61, 61)',
            cursor: 'pointer',
            width: '100%',
            marginRight: 20,
            fontWeight: 'bold',
            textAlign: 'left',
            marginBottom: 10,
            display: 'flex'
        }}>
            {icon && <div style={{ marginRight: 10 }}>{icon}</div>}{children}
        </button></Link>
    )
}

const Drawer = ({
    active
}) => {
    const image = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b290ad14-8fde-4b91-bbd2-6cb837f60313/da2ijnn-ba9c9710-f50d-4561-a79d-57573fc1fc9b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi9iMjkwYWQxNC04ZmRlLTRiOTEtYmJkMi02Y2I4MzdmNjAzMTMvZGEyaWpubi1iYTljOTcxMC1mNTBkLTQ1NjEtYTc5ZC01NzU3M2ZjMWZjOWIucG5nIn1dXX0.d1-jK5bL9B_FW3_HH8lcfNkkRrR3wrIKhhjdzzPXXhY'
    const [profile, setProfile] = useState()
    const [showEditProfile, setShowEditProfile] = useState(false)
    const [savingPassword, setSavingPassword] = useState(false)
    const [onCancel, setOnCancel] = useState(false)

    useEffect(() => {
        ProfileService.observerProfile(profile => {
            setProfile(profile)
            console.log(profile);
        })
    }, [])

    const onCloseEditProfile = () => {
        setShowEditProfile(false)
    }

    const onOpenEditProfile = () => {
        console.log(`Open Profile`);
        setShowEditProfile(true)
    }

    const handleEditProfile = values => {
        console.log(values);

        setSavingPassword(true)
        ProfileService.updateProfile(profile.uid, values)
        .then(() => {
            console.log(`Saved successfully`);
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setSavingPassword(false)
            setShowEditProfile(false)
        })
        // console.log(values);
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh'
        }}>
            <img src={image} style={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                borderRadius: '100%',
                marginTop: 30,
                marginBottom: 20,
                cursor: 'pointer'
            }} onClick={() => navigate('/profile')} />

            <div style={{ fontWeight: 'bold' }}>{profile?.firstname} {profile?.lastname}</div>
            <div style={{ marginBottom: 10 }}>{profile?.role == 'facilitator' ? 'Facilitator' : profile?.location}</div>

            <EditOutlined onClick={onOpenEditProfile} />

            <div style={{ padding: 20, width: '100%', marginTop: 20 }}>
                <MenuButton to={'/home'} icon={<UnorderedListOutlined />} active={active === 'browse'}>Browse</MenuButton>
                <MenuButton to={'/webinars'} icon={<VideoCameraAddOutlined />} active={active === 'webinars'}>Webinars</MenuButton>
                <MenuButton to={'/students'} icon={<UserOutlined />} active={active === 'students'}>Students</MenuButton>
            </div>

            <div style={{ flex: 1 }} />

            <div style={{ padding: 20, width: '100%' }}>
                <MenuButton icon={<PoweroffOutlined />}>Sign out</MenuButton>
            </div>

            <Modal title="Update Profile" open={showEditProfile} onOk={handleEditProfile} onCancel={onCloseEditProfile} okButtonProps={{style: {display: 'none'}}}>
                <Form layout="vertical" initialValues={profile} onFinish={handleEditProfile}>
                    {/* {errorMessage && <Alert message={errorMessage} type="error" style={{ marginBottom: 20 }} />} */}
                    {/* {success && <Alert message={'A password reset link has been sent to your email'} type="success" style={{ marginBottom: 20 }} />} */}
                    
                    <Form.Item style={{}} label="Email" name='email' rules={[
                        {
                            required: true,
                            message: 'Your email address is required'
                        }
                    ]}>
                        <Input placeholder="Email Address" disabled style={{
                            height: 50,
                            borderRadius: 10,
                            borderColor: 'rgb(143, 230, 76)',
                            borderStyle: 'solid',
                            padding: 10,
                            borderWidth: 2
                        }} />
                    </Form.Item>
                    <Form.Item style={{}} label="First Name" name='firstname' rules={[
                        {
                            required: true,
                            message: 'Your first name is required'
                        }
                    ]}>
                        <Input placeholder="First Name" style={{
                            height: 50,
                            borderRadius: 10,
                            borderColor: 'rgb(143, 230, 76)',
                            borderStyle: 'solid',
                            padding: 10,
                            borderWidth: 2
                        }} />
                    </Form.Item>
                    <Form.Item style={{}} label="Last Name" name='lastname' rules={[
                        {
                            required: true,
                            message: 'Your last name is required'
                        }
                    ]}>
                        <Input placeholder="Last Name" style={{
                            height: 50,
                            borderRadius: 10,
                            borderColor: 'rgb(143, 230, 76)',
                            borderStyle: 'solid',
                            padding: 10,
                            borderWidth: 2
                        }} />
                    </Form.Item>
                    <Form.Item style={{}} label="Cell Phone" name='phone' rules={[
                        {
                            required: true,
                            message: 'Your phone is required'
                        }
                    ]}>
                        <Input placeholder="Cell Phone" style={{
                            height: 50,
                            borderRadius: 10,
                            borderColor: 'rgb(143, 230, 76)',
                            borderStyle: 'solid',
                            padding: 10,
                            borderWidth: 2
                        }} />
                    </Form.Item>

                    <Button size='large' loading={savingPassword} disabled={savingPassword} htmlType='submit' style={{
                            background: 'rgb(143, 230, 76)',
                            borderStyle: 'none',
                            borderRadius: 28,
                            color: 'white',
                            cursor: 'pointer',
                            width: '100%'
                        }}>Update</Button>
                </Form>
            </Modal>
        </div>
    )
}

export default Drawer