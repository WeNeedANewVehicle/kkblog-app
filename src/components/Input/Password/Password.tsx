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
        className={`flex gap-4 items-center border-2 pr-3 border-gray-800 dark:bg-[none] ${className ?? ''}`}
      >
        <Input
          //
          ref={ref}
          className="border-0!"
          type={type}
          {...restProps}
        />
        <Button
          //
          className="bg"
          aria-label="암호 노출 여부 토글 버튼"
          onClick={onToggleMasking}
        >
          {isMasking ? (
            <EyeSlach className="stroke-1 stroke-black dark:stroke-gray-800" />
          ) : (
            <Eye className="stroke-1 stroke-black dark:stroke-gray-800" />
          )}
        </Button>
      </div>
    )
  }
)

Password.displayName = 'InputPassword'

export default React.memo(Password)
