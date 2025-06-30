'use client'

import Article from '@/components/Article/Article'
import LoginGuard from '@/components/Guard/LoginGuard'
import React from 'react'

function ProfilePage() {
  return (
    <LoginGuard>
      <section>
        <Article title="사용자 정보" />
      </section>
    </LoginGuard>
  )
}

export default ProfilePage
