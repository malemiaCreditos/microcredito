'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@app/profile/page';
function MyProfile() {
  const {data: session} = useSession();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }
    if(session?.user.id) fetchPosts();
  },[])

  const handleEdit = () => {

  }

  const handleDelete = async () => {

  }
  return (
    <Profile
      name="My"
      dec="Seu Evento"
      data={[posts]}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile