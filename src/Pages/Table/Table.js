import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loader from '../../components/Loader';

const Table = () => {
    const [loading, setLoading] = useState(true);

    // loaded users data
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://assessment-app-server.vercel.app/users');
            const data = await res.json();
            setLoading(false);
            return data;
        }
    })

    // loader
    if (loading) {
        return <div className='mt-28 ml-[500px]'>
            <Loader />
        </div>
    }

    return (
        <div className="overflow-x-auto mt-8">
            <h1 className='text-3xl font-semibold text-center mb-8'>Table Data</h1>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, idx) =>
                            <tr className="hover">
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.dob}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table;