import { Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { AuthService } from '../services/auth-service';
import PageLayout from './page-layout';

const VerifyStudent = ({ params }) => {
    const { id } = params
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    console.log(params);
    console.log(id);

    useEffect(() => {
        AuthService.getUser(id).then(result => {
            console.log(id);
            setUser(result)
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <PageLayout title='CodeTribe Student' active='tutorials'>
            {loading && <Spin style={{ marginLeft: 'auto', marginRight: 'auto' }} />}
            {user && (
                <div>
                    <p style={{
                        fontSize: 40,
                        marginBottom: 10
                    }}>{user.firstname} {user.lastname}</p>
                    <p>Location: {user.location}</p>
                </div>
            )}
            {!user && !loading && (
                <p style={{
                    fontSize: 25,
                    marginBottom: 10,
                    textAlign: 'center'
                }}>CodeTriber not found</p>
            )}
        </PageLayout>
    )
}

export default VerifyStudent