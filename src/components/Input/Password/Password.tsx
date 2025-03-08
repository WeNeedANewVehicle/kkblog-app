import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useMemo,
  useState,
} from 'react'
import Eye from '@/../public/icons/eye.svg'
import EyeSlach from '@/../public/icons/eye-slash.svg'
import Input, { InputProps } from '@/components/Input/Input'
import styles from '@/components/Input/Password/Password.module.css'
import Button from '@/components/Button/Button'

export type PassWordProps = Omit<InputProps, 'type' | 'ref'>

const Password = forwardRef<HTMLInputElement, PassWordProps>(
  ({ className, ...restProps }: PassWordProps, ref) => {
    const [isMasking, setMasking] = useState(true)

    const onToggleMasking = useCallback(() => {
      setMasking((masking) => !masking)
    }, [setMasking])

    const type = useMemo(() => (isMasking ? 'password' : 'text'), [isMasking])

    return (
      <div
        //
        className={`flex gap-4 items-center ${styles.wrapper} ${className ?? ''}`}
      >
        <Input
          //
          ref={ref}
          type={type}
          className={styles.input}
          {...restProps}
        />
        <Button
          //
          className={styles.masking}
          aria-label="암호 노출 여부 토글 버튼"
          onClick={onToggleMasking}
        >
          {isMasking ? (
            <EyeSlach className={styles.toggle} />
          ) : (
            <Eye className={styles.toggle} />
          )}
        </Button>
      </div>
    )
  }
)

Password.displayName = 'InputPassword'

export default React.memo(Password)
