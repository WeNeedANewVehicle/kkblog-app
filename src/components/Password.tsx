import React, {
  forwardRef,
  HTMLAttributes,
  useCallback,
  useMemo,
  useState,
} from 'react'
import VisibilityOff from '../components/Icons/VisibilityOff'
import Visibility from '../components/Icons/Visibility'

interface PassWordProps
  extends Omit<HTMLAttributes<HTMLInputElement>, 'type' | 'ref'> {
  cssClass?: string
}

const Password = forwardRef<HTMLInputElement, PassWordProps>(
  ({ cssClass, ...restProps }: PassWordProps, ref) => {
    const [isMasking, setMasking] = useState(true)

    const onToggleMasking = useCallback(() => {
      setMasking((masking) => !masking)
    }, [setMasking])

    const type = useMemo(() => (isMasking ? 'password' : 'text'), [isMasking])

    return (
      <div className={`flex gap-4 items-center ${cssClass ?? ''}`}>
        <input ref={ref} type={type} {...restProps} />
        <span className={'px-2'} onClick={onToggleMasking}>
          {isMasking ? <VisibilityOff /> : <Visibility />}
        </span>
      </div>
    )
  }
)

Password.displayName = 'InputPassword'

export default Password
