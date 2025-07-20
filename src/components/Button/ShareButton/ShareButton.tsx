'use client'
import Button from '@/components/Button/Button'
import ShareIcon from '@/../public/icons/share.svg'

function ShareButton() {
  const copyClipBoard = () => {
    try {
      const url = window.location.href
      navigator.clipboard.writeText(url)
      alert('클립보드에 URL 이 복사되었습니다.')
    } catch (err) {
      alert('클립보드 URL 복사에 실패했습니다.')
    }
  }

  return (
    <Button
      onClick={copyClipBoard}
      className="btn-black rounded-4xl p-4 dark:border-gray-200 hover:after:hover-desc"
    >
      <ShareIcon className="icon" />
    </Button>
  )
}

export default ShareButton
